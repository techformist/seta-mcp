import fs from "fs/promises";
import path from "path";
import {
  LocalSearchResponse,
  LocalLibraryManifest,
  LocalSearchResultItem,
  Topic,
} from "./types.js";
import { logger } from "./logger.js";

let localDocsPath: string | undefined = process.env.LOCAL_DOCS_PATH;

// Function to set or update the docs path, e.g., after dotenv.config()
export function initializeLocalApi(docsPath?: string) {
  if (docsPath) {
    localDocsPath = docsPath;
  }
  if (!localDocsPath) {
    console.error(
      "FATAL: LOCAL_DOCS_PATH environment variable is not set. Local documentation features will not work."
    );
  }
}

/**
 * Searches for local libraries matching the given query.
 * @param query The search query (matches against manifest name, description, topic names, tags, use_cases, and code_patterns)
 * @returns Search results or null if the base path is not configured or an error occurs.
 */
export async function searchLocalLibraries(
  query: string
): Promise<LocalSearchResponse | null> {
  if (!localDocsPath) {
    console.error("FATAL: LOCAL_DOCS_PATH is not configured.");
    return { results: [] };
  }

  try {
    const Direntsoriginal = await fs.readdir(localDocsPath, {
      withFileTypes: true,
    });
    const directories = Direntsoriginal.filter(
      (dirent) => dirent.isDirectory() && dirent.name !== "_semantic_only"
    );
    const results: LocalSearchResultItem[] = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const dir of directories) {
      const manifestPath = path.join(localDocsPath, dir.name, "manifest.json");
      try {
        const manifestContent = await fs.readFile(manifestPath, "utf-8");
        const manifest: LocalLibraryManifest = JSON.parse(manifestContent);

        let topicMatch = false;
        const allDifficulties = new Set<string>();
        const allUseCases = new Set<string>();

        if (Array.isArray(manifest.topics)) {
          for (const topic of manifest.topics) {
            // Collect metadata for search result
            if (topic.difficulty) {
              allDifficulties.add(topic.difficulty);
            }
            if (topic.use_cases) {
              topic.use_cases.forEach((uc) => allUseCases.add(uc));
            }

            // Enhanced matching logic
            const nameMatch =
              topic.name && topic.name.toLowerCase().includes(lowerCaseQuery);
            const tagMatch =
              Array.isArray(topic.tags) &&
              topic.tags.some((tag: string) =>
                tag.toLowerCase().includes(lowerCaseQuery)
              );
            const useCaseMatch =
              Array.isArray(topic.use_cases) &&
              topic.use_cases.some((uc: string) =>
                uc.toLowerCase().includes(lowerCaseQuery)
              );
            const codePatternMatch =
              Array.isArray(topic.code_patterns) &&
              topic.code_patterns.some((cp: string) =>
                cp.toLowerCase().includes(lowerCaseQuery)
              );

            if (nameMatch || tagMatch || useCaseMatch || codePatternMatch) {
              // Note: Logging removed to avoid MCP protocol interference
              topicMatch = true;
            }
          }
        }

        const nameMatch =
          manifest.name && manifest.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch =
          manifest.description &&
          manifest.description.toLowerCase().includes(lowerCaseQuery);

        if (nameMatch || descriptionMatch || topicMatch) {
          results.push({
            id: dir.name, // Use directory name as ID
            name: manifest.name,
            description: manifest.description,
            version: manifest.version,
            stars: manifest.stars ?? -1,
            totalSnippets: manifest.totalSnippets ?? -1,
            topic_count: manifest.topics?.length || 0,
            available_difficulties: Array.from(allDifficulties),
            sample_use_cases: Array.from(allUseCases).slice(0, 5), // Limit to 5 examples
            available_semantic_groups: manifest.semantic_groups
              ? Object.keys(manifest.semantic_groups)
              : [],
            available_learning_paths: manifest.learning_paths
              ? Object.keys(manifest.learning_paths)
              : [],
          });
        }
      } catch (err) {
        // Ignore directories without manifest.json or with malformed manifest
      }
    }
    return { results };
  } catch (error) {
    logger.error("Error searching local libraries:", error);
    return null; // Or return { results: [] } to indicate an error but conform to type
  }
}

/**
 * Extracts a summary from content, preferring "Key Points" or "Summary" sections
 */
function extractSummary(content: string, maxLength: number = 500): string {
  // Look for Key Points or Summary sections
  const keyPointsMatch = content.match(
    /##?\s*Key\s*Points?\s*\n([\s\S]*?)(?=\n##|\n#|$)/i
  );
  const summaryMatch = content.match(
    /##?\s*Summary\s*\n([\s\S]*?)(?=\n##|\n#|$)/i
  );

  if (keyPointsMatch) {
    return keyPointsMatch[1].trim().substring(0, maxLength);
  }
  if (summaryMatch) {
    return summaryMatch[1].trim().substring(0, maxLength);
  }

  // Fallback to first paragraph or first N characters
  const firstParagraph = content.split("\n\n")[0];
  return firstParagraph.substring(0, maxLength);
}

/**
 * Fetches documentation content for a specific local library.
 * @param libraryId The library ID (directory name) to fetch documentation for.
 * @param options Options for the request, including topic and character limit.
 * @returns The documentation text (possibly truncated) or null if not found or an error occurs.
 */
export async function fetchLocalLibraryDocumentation(
  libraryId: string,
  options: {
    topic?: string;
    tokens?: number; // Character limit
  } = {}
): Promise<string | null> {
  if (!localDocsPath) {
    console.error("FATAL: LOCAL_DOCS_PATH is not configured.");
    return null;
  }

  const libPath = path.join(localDocsPath, libraryId);
  const manifestPath = path.join(libPath, "manifest.json");

  try {
    const manifestContent = await fs.readFile(manifestPath, "utf-8");
    const manifest: LocalLibraryManifest = JSON.parse(manifestContent);

    let docFileName: string | undefined;
    let allContent: string[] = [];
    const maxTokens = options.tokens || 10000;

    if (options.topic && Array.isArray(manifest.topics)) {
      const searchTerm = options.topic.toLowerCase();

      // Check if topic is a semantic group
      if (manifest.semantic_groups && manifest.semantic_groups[searchTerm]) {
        const groupTopics = manifest.semantic_groups[searchTerm];
        allContent.push(
          `# Semantic Group: ${options.topic}\nThis group covers the following topics:\n`
        );

        for (const topicName of groupTopics) {
          const topic = manifest.topics.find(
            (t) => t.name.toLowerCase() === topicName.toLowerCase()
          );
          if (topic && topic.file) {
            try {
              const topicFilePath = path.join(libPath, topic.file);
              const topicContent = await fs.readFile(topicFilePath, "utf-8");
              const summary = extractSummary(topicContent, 300);
              allContent.push(
                `## Topic: ${topic.name} (Difficulty: ${topic.difficulty || "N/A"})\n${summary}\n---`
              );
            } catch (err) {
              allContent.push(
                `## Topic: ${topic.name}\n(Content unavailable)\n---`
              );
            }
          }
        }

        let combinedContent = allContent.join("\n\n");
        if (combinedContent.length > maxTokens) {
          combinedContent =
            combinedContent.substring(0, maxTokens) +
            "\n\n(Content truncated due to token limit)";
        }
        return combinedContent;
      }

      // Check if topic is a learning path
      if (manifest.learning_paths && manifest.learning_paths[searchTerm]) {
        const pathTopics = manifest.learning_paths[searchTerm];
        allContent.push(
          `# Learning Path: ${options.topic}\nThis learning path includes the following topics in sequence:\n`
        );

        for (const topicName of pathTopics) {
          const topic = manifest.topics.find(
            (t) => t.name.toLowerCase() === topicName.toLowerCase()
          );
          if (topic && topic.file) {
            try {
              const topicFilePath = path.join(libPath, topic.file);
              const topicContent = await fs.readFile(topicFilePath, "utf-8");
              const summary = extractSummary(topicContent, 300);
              allContent.push(
                `## Topic: ${topic.name} (Difficulty: ${topic.difficulty || "N/A"})\n${summary}\n---`
              );
            } catch (err) {
              allContent.push(
                `## Topic: ${topic.name}\n(Content unavailable)\n---`
              );
            }
          }
        }

        let combinedContent = allContent.join("\n\n");
        if (combinedContent.length > maxTokens) {
          combinedContent =
            combinedContent.substring(0, maxTokens) +
            "\n\n(Content truncated due to token limit)";
        }
        return combinedContent;
      }

      // Regular topic search
      // First try exact match
      let mainTopic = manifest.topics.find(
        (t: Topic) =>
          t.name.toLowerCase() === searchTerm ||
          (Array.isArray(t.tags) &&
            t.tags.some((tag: string) => tag.toLowerCase() === searchTerm))
      );

      // If no exact match, try partial match
      if (!mainTopic) {
        mainTopic = manifest.topics.find(
          (t: Topic) =>
            t.name.toLowerCase().includes(searchTerm) ||
            (Array.isArray(t.tags) &&
              t.tags.some(
                (tag: string) =>
                  tag.toLowerCase().includes(searchTerm) ||
                  searchTerm.includes(tag.toLowerCase())
              ))
        );
      }

      // Process main topic with enhanced context
      if (mainTopic && typeof mainTopic.file === "string") {
        const docFileName = mainTopic.file;
        const mainFilePath = path.join(libPath, docFileName);
        try {
          const mainContent = await fs.readFile(mainFilePath, "utf-8");

          // Create topic header with metadata
          let topicHeader = `# Topic: ${mainTopic.name}\n`;
          if (mainTopic.difficulty)
            topicHeader += `Difficulty: ${mainTopic.difficulty}\n`;
          if (mainTopic.use_cases?.length)
            topicHeader += `Key Use Cases: ${mainTopic.use_cases.join(", ")}\n`;
          if (mainTopic.code_patterns?.length)
            topicHeader += `Relevant Code Patterns: ${mainTopic.code_patterns.join(", ")}\n`;
          topicHeader += `---\n`;

          allContent.push(topicHeader + mainContent);

          let remainingTokens = maxTokens - allContent.join("\n\n").length;

          // Add prerequisites content
          if (mainTopic.prerequisites?.length && remainingTokens > 200) {
            for (const prereqName of mainTopic.prerequisites) {
              const prereqTopic = manifest.topics.find(
                (t: Topic) => t.name.toLowerCase() === prereqName.toLowerCase()
              );
              if (prereqTopic && prereqTopic.file && remainingTokens > 100) {
                try {
                  const prereqFilePath = path.join(libPath, prereqTopic.file);
                  const prereqContent = await fs.readFile(
                    prereqFilePath,
                    "utf-8"
                  );
                  const prereqSummary = extractSummary(
                    prereqContent,
                    Math.min(300, remainingTokens - 50)
                  );
                  allContent.push(
                    `## PREREQUISITE: ${prereqTopic.name}\n${prereqSummary}`
                  );
                  remainingTokens -= prereqSummary.length + 50;
                } catch (err) {
                  logger.warn(
                    `Could not read prerequisite topic file: ${prereqTopic.file}`
                  );
                }
              }
            }
          }

          // Add related content (existing logic, but with token awareness)
          if (mainTopic.related?.length && remainingTokens > 200) {
            for (const relatedName of mainTopic.related) {
              const relatedTopic = manifest.topics.find(
                (t: Topic) => t.name.toLowerCase() === relatedName.toLowerCase()
              );
              if (relatedTopic && relatedTopic.file && remainingTokens > 100) {
                try {
                  const relatedFilePath = path.join(libPath, relatedTopic.file);
                  const relatedContent = await fs.readFile(
                    relatedFilePath,
                    "utf-8"
                  );
                  const relatedSummary = extractSummary(
                    relatedContent,
                    Math.min(300, remainingTokens - 50)
                  );
                  allContent.push(
                    `## RELATED: ${relatedTopic.name}\n${relatedSummary}`
                  );
                  remainingTokens -= relatedSummary.length + 50;
                } catch (err) {
                  logger.warn(
                    `Could not read related topic file: ${relatedTopic.file}`
                  );
                }
              }
            }
          }

          // Add leads_to content
          if (mainTopic.leads_to?.length && remainingTokens > 200) {
            for (const leadsToName of mainTopic.leads_to) {
              const leadsToTopic = manifest.topics.find(
                (t: Topic) => t.name.toLowerCase() === leadsToName.toLowerCase()
              );
              if (leadsToTopic && leadsToTopic.file && remainingTokens > 100) {
                try {
                  const leadsToFilePath = path.join(libPath, leadsToTopic.file);
                  const leadsToContent = await fs.readFile(
                    leadsToFilePath,
                    "utf-8"
                  );
                  const leadsToSummary = extractSummary(
                    leadsToContent,
                    Math.min(300, remainingTokens - 50)
                  );
                  allContent.push(
                    `## NEXT STEPS / LEADS TO: ${leadsToTopic.name}\n${leadsToSummary}`
                  );
                  remainingTokens -= leadsToSummary.length + 50;
                } catch (err) {
                  logger.warn(
                    `Could not read leads_to topic file: ${leadsToTopic.file}`
                  );
                }
              }
            }
          }
        } catch (err) {
          logger.warn(`Could not read main topic file: ${docFileName}`);
        }
      }
    }

    // If we found any content (main or related), return it
    if (allContent.length > 0) {
      let combinedContent = allContent.join("\n\n");
      if (combinedContent.length > maxTokens) {
        combinedContent =
          combinedContent.substring(0, maxTokens) +
          "\n\n(Content truncated due to token limit)";
      }
      return combinedContent;
    }

    // Fallback to default_doc if no topic-specific content was found
    if (!docFileName && manifest.default_doc) {
      docFileName = manifest.default_doc;
    }

    if (!docFileName) {
      // Try to find any .md file as a fallback
      const filesInLib = await fs.readdir(libPath);
      docFileName = filesInLib.find(
        (f: string) => f.endsWith(".md") || f.endsWith(".txt")
      );
      if (!docFileName) {
        logger.error(`No documentation file found for library ${libraryId}.`);
        return null;
      }
      logger.warn(
        `Using fallback document: ${docFileName} for library ${libraryId}`
      );
    }

    // Read the fallback document if we didn't find topic-specific content
    const docFilePath = path.join(libPath, docFileName);
    let content = await fs.readFile(docFilePath, "utf-8");

    // Add metadata header for default document if available
    if (manifest.version || manifest.description) {
      let header = `# ${manifest.name}\n`;
      if (manifest.version) header += `Version: ${manifest.version}\n`;
      if (manifest.description)
        header += `Description: ${manifest.description}\n`;
      header += `---\n\n`;
      content = header + content;
    }

    if (maxTokens && content.length > maxTokens) {
      content =
        content.substring(0, maxTokens) +
        "\n\n(Content truncated due to token limit)";
    }

    return content;
  } catch (error) {
    logger.error(`Error fetching local documentation for ${libraryId}:`, error);
    return null;
  }
}
