#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";
import path from "path";
import fs from "fs/promises";

import {
  initializeLocalApi,
  searchLocalLibraries,
  fetchLocalLibraryDocumentation,
} from "./lib/api.js"; // MODIFIED: Using local API
import { formatSearchResults } from "./lib/utils.js";
import { logger } from "./lib/logger.js";

// Import indexer modules for semantic search
import { INDEXER_CONFIG } from "./indexer/config.js";
import {
  initializeEmbeddingModel,
  generateEmbeddingForChunk,
} from "./indexer/embeddingUtils.js";
import {
  connectToLanceDb,
  openOrCreateTable,
  searchSimilarChunks,
} from "./indexer/lanceDbUtils.js";

// Initialize Local API with path from environment variable
const localDocsPath = process.env.LOCAL_DOCS_PATH;

if (!localDocsPath) {
  console.error(
    "FATAL: LOCAL_DOCS_PATH environment variable is not set. The server cannot operate without it."
  );
  process.exit(1); // Exit if critical env var is missing
}
initializeLocalApi(localDocsPath);

// Get DEFAULT_MAX_TOKENS from environment variable or use default
let DEFAULT_MAX_TOKENS = 5000; // This will now be a character limit
if (process.env.DEFAULT_MAX_TOKENS) {
  const parsedValue = parseInt(process.env.DEFAULT_MAX_TOKENS, 10);
  if (!isNaN(parsedValue) && parsedValue > 0) {
    DEFAULT_MAX_TOKENS = parsedValue;
  } else {
    console.warn(
      `Warning: Invalid DEFAULT_MAX_TOKENS value provided. Using default of ${DEFAULT_MAX_TOKENS} characters.`
    );
  }
}

// Global variables for semantic search
let embeddingPipeline: any = null;
let lanceDbConnection: any = null;
let lanceDbTable: any = null;

// Initialize semantic search components
async function initializeSemanticSearch() {
  try {
    if (!localDocsPath) {
      logger.warn("LOCAL_DOCS_PATH not set, semantic search unavailable");
      return;
    }

    const dbPath = path.join(localDocsPath, INDEXER_CONFIG.LANCEDB_SUBDIR);

    // Check if the database exists
    if (
      await fs
        .access(dbPath)
        .then(() => true)
        .catch(() => false)
    ) {
      logger.info("Initializing semantic search components...");

      // Initialize embedding model
      embeddingPipeline = await initializeEmbeddingModel();

      // Connect to LanceDB
      lanceDbConnection = await connectToLanceDb(dbPath);
      lanceDbTable = await openOrCreateTable(
        lanceDbConnection,
        INDEXER_CONFIG.TABLE_NAME
      );

      logger.info("Semantic search initialized successfully");
    } else {
      logger.info(
        "No semantic search database found. Run 'seta-indexer' first to enable semantic search."
      );
    }
  } catch (error) {
    logger.error("Failed to initialize semantic search:", error);
    logger.info(
      "Semantic search will not be available. Run 'seta-indexer' to create the database."
    );
  }
}

const server = new McpServer({
  name: "seta",
  description:
    "Retrieves documentation and code examples for Salesforce development from local file system.", // MODIFIED
  version: "0.2.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register tools
server.tool(
  "get-library-id",
  `Resolves library, framework, or technology names (like Apex, LWC, Visualforce, SOQL, DML, Triggers, Batch Apex, Asynchronous Apex, Salesforce APIs) into a unique local documentation ID. Returns detailed information about libraries including difficulties, use cases, semantic groups, and learning paths to help make better choices. Use this tool first when you need up-to-date documentation, code examples, or best practices for Salesforce development tasks mentioned in the prompt.`,
  {
    libraryName: z
      .string()
      .describe("Library name to search for in local documentation."),
  },
  async ({ libraryName }) => {
    const searchResponse = await searchLocalLibraries(libraryName);

    if (!searchResponse || !searchResponse.results) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to search local libraries. Check server logs and LOCAL_DOCS_PATH.",
          },
        ],
      };
    }

    if (searchResponse.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No local documentation libraries found matching '${libraryName}'.`,
          },
        ],
      };
    }

    const resultsText = formatSearchResults(searchResponse);

    return {
      content: [
        {
          type: "text",
          text: `Found the following local libraries matching '${libraryName}':

Each result includes:
- Name & Version: Official library name and version.
- Local Library ID: Directory name for use with 'get-library-docs'.
- Description: Short summary.
- Topics: Number of distinct topics within this library.
- Available Difficulties: Difficulty levels covered (e.g., beginner, intermediate).
- Sample Use Cases: Examples of what this library helps achieve.
- Semantic Groups: Pre-defined collections of related topics (e.g., "fundamentals", "ui_styling"). You can request docs for a whole group.
- Learning Paths: Suggested sequences of topics for learning (e.g., "beginner", "intermediate"). You can request docs for a whole path.

Use 'get-library-docs' with a Local Library ID and optionally a specific topic name, semantic group, or learning path.
---
${resultsText}`,
        },
      ],
    };
  }
);

server.tool(
  "get-library-docs",
  "Fetches specific, up-to-date documentation, code examples, API details, and best practices for a given local library ID (obtained from 'get-library-id'). When requesting a specific topic, automatically includes context from prerequisites, related topics, and next steps. The 'topic' parameter can also be a semantic group name or learning path name from the library's manifest to get an overview of that collection. Use this tool *after* identifying the correct library ID to get detailed context for tasks like writing Apex classes, LWC components, SOQL queries, understanding governor limits, implementing triggers, or using specific Salesforce features.",
  {
    localLibraryID: z
      .string()
      .describe(
        "Exact local library ID (directory name, e.g., 'my-library') retrieved from 'get-library-id'."
      ),
    topic: z
      .string()
      .optional()
      .describe(
        "Topic name, semantic group name, or learning path name to focus documentation on. When a topic is specified, includes context from prerequisites, related topics, and next steps."
      ),
    tokens: z
      .preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number()
      )
      .transform((val) => (val > DEFAULT_MAX_TOKENS ? DEFAULT_MAX_TOKENS : val))
      .optional()
      .describe(
        `Maximum number of characters (approx. tokens) of documentation to retrieve (default: ${DEFAULT_MAX_TOKENS}). Lower values provide less context.`
      ),
  },
  async ({ localLibraryID, tokens = DEFAULT_MAX_TOKENS, topic = "" }) => {
    const documentationText = await fetchLocalLibraryDocumentation(
      localLibraryID,
      {
        tokens,
        topic,
      }
    );

    if (!documentationText) {
      return {
        content: [
          {
            type: "text",
            text: `Documentation not found for local library ID '${localLibraryID}' (topic: '${topic || "default"}').
This might happen if:
1. The local library ID is incorrect (use 'get-library-id' first).
2. The library's manifest.json is missing, malformed, or doesn't define the topic/semantic group/learning path/default document.
3. The document file itself is missing or unreadable.
4. LOCAL_DOCS_PATH is not configured correctly on the server.`, // MODIFIED error message
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: documentationText,
        },
      ],
    };
  }
);

server.tool(
  "get-semantic-docs",
  "Performs semantic search across all indexed documentation to find the most relevant content for your query. This uses vector embeddings to find conceptually similar content, even if the exact keywords don't match. Requires that 'seta-indexer' has been run to create the semantic search database.",
  {
    query: z
      .string()
      .describe(
        "Natural language query describing what you're looking for (e.g., 'how to handle bulk data operations in Apex')"
      ),
    limit: z
      .number()
      .optional()
      .default(10)
      .describe("Maximum number of relevant chunks to return (default: 10)"),
    library_filter: z
      .string()
      .optional()
      .describe("Optional filter to search only within a specific library ID"),
    difficulty_filter: z
      .string()
      .optional()
      .describe(
        "Optional filter by difficulty level (e.g., 'beginner', 'intermediate', 'advanced')"
      ),
  },
  async ({ query, limit = 10, library_filter, difficulty_filter }) => {
    if (!embeddingPipeline || !lanceDbTable) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Semantic search is not available. 

This could be because:
1. The semantic search database hasn't been created yet. Run 'seta-indexer <docs_folder>' to create it.
2. The database failed to initialize on server startup.
3. The LOCAL_DOCS_PATH doesn't contain a '${INDEXER_CONFIG.LANCEDB_SUBDIR}' directory.

To enable semantic search:
1. Run: npx @techformist/seta-mcp seta-indexer <path_to_your_docs_folder>
2. Restart the MCP server`,
          },
        ],
      };
    }

    try {
      // Generate embedding for the query
      const queryEmbedding = await generateEmbeddingForChunk(
        query,
        embeddingPipeline
      );

      // Search for similar chunks
      const filters: any = {};
      if (library_filter) filters.libraryId = library_filter;
      if (difficulty_filter) filters.difficulty = difficulty_filter;

      const results = await searchSimilarChunks(
        lanceDbTable,
        queryEmbedding,
        limit,
        filters
      );

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No relevant documentation found for query: "${query}"

Try:
- Using different keywords or phrases
- Removing filters if you applied any
- Checking if the documentation has been indexed with 'seta-indexer'`,
            },
          ],
        };
      }

      // Format results
      let responseText = `🔍 Found ${results.length} relevant documentation chunks for: "${query}"\n\n`;

      results.forEach((result, index) => {
        const score = result._distance
          ? (1 - result._distance).toFixed(3)
          : "N/A";
        responseText += `## Result ${index + 1} (Relevance: ${score})\n`;
        responseText += `**Library:** ${result.libraryId}\n`;
        if (result.topicName) {
          responseText += `**Topic:** ${result.topicName}\n`;
        }
        if (result.difficulty) {
          responseText += `**Difficulty:** ${result.difficulty}\n`;
        }
        responseText += `**Source:** ${result.originalFilePath}\n\n`;
        responseText += `${result.text}\n\n`;
        responseText += `---\n\n`;
      });

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    } catch (error) {
      console.error("Error performing semantic search:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ Error performing semantic search: ${error}

Please check the server logs for more details.`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get-library-topics",
  "Lists all topics within a specific library with their metadata (difficulty, use cases, prerequisites, leads_to). Useful for exploring what's available in a library before fetching specific documentation. Can filter by difficulty or use case keywords.",
  {
    localLibraryID: z
      .string()
      .describe("Exact local library ID retrieved from 'get-library-id'."),
    difficulty: z
      .string()
      .optional()
      .describe(
        "Filter topics by difficulty level (e.g., 'beginner', 'intermediate', 'advanced')."
      ),
    use_case_keyword: z
      .string()
      .optional()
      .describe("Filter topics that include this keyword in their use_cases."),
  },
  async ({ localLibraryID, difficulty, use_case_keyword }) => {
    if (!localDocsPath) {
      return {
        content: [
          {
            type: "text",
            text: "LOCAL_DOCS_PATH is not configured.",
          },
        ],
      };
    }

    const libPath = path.join(localDocsPath, localLibraryID);
    const manifestPath = path.join(libPath, "manifest.json");

    try {
      const manifestContent = await fs.readFile(manifestPath, "utf-8");
      const manifest = JSON.parse(manifestContent);

      if (!Array.isArray(manifest.topics)) {
        return {
          content: [
            {
              type: "text",
              text: `No topics found in library '${localLibraryID}'.`,
            },
          ],
        };
      }

      let filteredTopics = manifest.topics;

      // Apply difficulty filter
      if (difficulty) {
        filteredTopics = filteredTopics.filter(
          (topic: any) =>
            topic.difficulty?.toLowerCase() === difficulty.toLowerCase()
        );
      }

      // Apply use case keyword filter
      if (use_case_keyword) {
        const keyword = use_case_keyword.toLowerCase();
        filteredTopics = filteredTopics.filter(
          (topic: any) =>
            Array.isArray(topic.use_cases) &&
            topic.use_cases.some((uc: string) =>
              uc.toLowerCase().includes(keyword)
            )
        );
      }

      if (filteredTopics.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No topics found matching the specified filters in library '${localLibraryID}'.`,
            },
          ],
        };
      }

      const topicsList = filteredTopics
        .map((topic: any) => {
          const lines = [
            `**${topic.name}**`,
            `- File: ${topic.file}`,
            `- Difficulty: ${topic.difficulty || "N/A"}`,
          ];

          if (topic.use_cases?.length) {
            lines.push(`- Use Cases: ${topic.use_cases.join(", ")}`);
          }

          if (topic.prerequisites?.length) {
            lines.push(`- Prerequisites: ${topic.prerequisites.join(", ")}`);
          }

          if (topic.leads_to?.length) {
            lines.push(`- Leads To: ${topic.leads_to.join(", ")}`);
          }

          if (topic.tags?.length) {
            lines.push(`- Tags: ${topic.tags.join(", ")}`);
          }

          if (topic.code_patterns?.length) {
            lines.push(`- Code Patterns: ${topic.code_patterns.join(", ")}`);
          }

          return lines.join("\n");
        })
        .join("\n\n---\n\n");

      return {
        content: [
          {
            type: "text",
            text: `Topics in library '${localLibraryID}' (${filteredTopics.length} found):\n\n${topicsList}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading library manifest for '${localLibraryID}': ${error}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get-topic-details",
  "Gets detailed metadata for a specific topic without fetching its full documentation content. Useful for understanding a topic's context, difficulty, prerequisites, and relationships before committing to fetching its full documentation.",
  {
    localLibraryID: z
      .string()
      .describe("Exact local library ID retrieved from 'get-library-id'."),
    topicName: z.string().describe("Name of the topic to get details for."),
  },
  async ({ localLibraryID, topicName }) => {
    if (!localDocsPath) {
      return {
        content: [
          {
            type: "text",
            text: "LOCAL_DOCS_PATH is not configured.",
          },
        ],
      };
    }

    const libPath = path.join(localDocsPath, localLibraryID);
    const manifestPath = path.join(libPath, "manifest.json");

    try {
      const manifestContent = await fs.readFile(manifestPath, "utf-8");
      const manifest = JSON.parse(manifestContent);

      if (!Array.isArray(manifest.topics)) {
        return {
          content: [
            {
              type: "text",
              text: `No topics found in library '${localLibraryID}'.`,
            },
          ],
        };
      }

      const topic = manifest.topics.find(
        (t: any) => t.name.toLowerCase() === topicName.toLowerCase()
      );

      if (!topic) {
        return {
          content: [
            {
              type: "text",
              text: `Topic '${topicName}' not found in library '${localLibraryID}'.`,
            },
          ],
        };
      }

      const details = [
        `# Topic Details: ${topic.name}`,
        `- File: ${topic.file}`,
        `- Difficulty: ${topic.difficulty || "N/A"}`,
      ];

      if (topic.use_cases?.length) {
        details.push(`- Use Cases: ${topic.use_cases.join(", ")}`);
      }

      if (topic.prerequisites?.length) {
        details.push(`- Prerequisites: ${topic.prerequisites.join(", ")}`);
      }

      if (topic.leads_to?.length) {
        details.push(`- Leads To: ${topic.leads_to.join(", ")}`);
      }

      if (topic.related?.length) {
        details.push(`- Related Topics: ${topic.related.join(", ")}`);
      }

      if (topic.tags?.length) {
        details.push(`- Tags: ${topic.tags.join(", ")}`);
      }

      if (topic.code_patterns?.length) {
        details.push(`- Code Patterns: ${topic.code_patterns.join(", ")}`);
      }

      return {
        content: [
          {
            type: "text",
            text: details.join("\n"),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading topic details for '${topicName}' in library '${localLibraryID}': ${error}`,
          },
        ],
      };
    }
  }
);

async function main() {
  // LOCAL_DOCS_PATH check is now at the top
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info(`seta MCP Server running on stdio`);
  logger.info(`Reading documentation from: ${localDocsPath}`);
  logger.info(`Default maximum characters for docs: ${DEFAULT_MAX_TOKENS}`);

  // Initialize semantic search after server is running
  await initializeSemanticSearch();
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
