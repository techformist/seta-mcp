# Seta MCP - Up-to-date Local Docs for Coding

Assist Salesforce developers to create code and configuration! This is a MCP server that you can run locally or host remotely.

Designed to fetch documentation from your local file system, giving you complete control over the context provided to your AI assistant.

Inspired by context7 - but this application uses local documentation library.

## Why use this?

Seta MCP server consists of three primary components:

- MCP server code (this repository)
- Open / public, internal or proprietary documentation for Apex, LWC, configuration etc.
- **NEW**: Semantic search indexer for intelligent document discovery

Seta MCP helps you to -

- Work entirely offline.
- Have fine-grained control over the exact documentation versions and content.
- Quickly iterate on documentation and have it immediately available to your LLM.
- **NEW**: Find relevant documentation using semantic search, even when exact keywords don't match.

## 💡 How It Works?

This MCP server reads documentation from a local directory structure you define and optionally creates a semantic search index for intelligent document discovery.

1.  **Set `LOCAL_DOCS_PATH`**: You specify a root directory for your documentation via the `LOCAL_DOCS_PATH` environment variable.
2.  **Organize Libraries**: Inside `LOCAL_DOCS_PATH`, each library or documentation set should reside in its own subdirectory.
3.  **Enhanced `manifest.json`**: Each library subdirectory **must** contain a `manifest.json` file with rich metadata including difficulty levels, use cases, learning paths, and semantic groups.
4.  **Optional Semantic Indexing**: Run `seta-indexer` to create a vector database for semantic search capabilities.

When you prompt your LLM (e.g., in VSCode) with `use latest Apex docs`, `use seta` or just reference any of the below tools in the prompt:

- The `get-library-id` tool searches the `manifest.json` files in your `LOCAL_DOCS_PATH` to find matching libraries.
- The `get-library-docs` tool then fetches the content of the specified document file from your local file system.
- **NEW**: The `get-semantic-docs` tool performs vector similarity search to find conceptually relevant content.

## 🛠️ Getting Started

### Requirements

- Node.js >= v18.0.0
- VSCode, Cursor, Windsurf, Claude Desktop, or another MCP Client.
- A local directory containing your documentation, structured as described below.
- The `LOCAL_DOCS_PATH` environment variable must be set to point to this directory.

### Local Documentation Structure

Your `LOCAL_DOCS_PATH` should point to a root directory. Inside this, each library has its own folder:

```
<your_LOCAL_DOCS_PATH>/
├── my-awesome-lib/
│   ├── manifest.json
│   ├── main_guide.md
│   ├── .seta_lancedb/          # Created by seta-indexer (optional)
│   └── topics/
│       └── report.md
│       └── advanced_reports.txt
└── another-tool/
    ├── manifest.json
    └── quick_start.md
```

### Enhanced `manifest.json` Format

Each library directory (e.g., `my-awesome-lib/`) **must** contain a `manifest.json` file in the following enhanced format:

```json
{
  "name": "My Awesome Library",
  "description": "A brief description of what this library does.",
  "version": "2.1.0",
  "default_doc": "main_guide.md", // File to use if no topic is specified
  "topics": [
    {
      "name": "report",
      "file": "report.md",
      "tags": ["report"],
      "related": ["advanced"],
      "prerequisites": [],
      "leads_to": ["advanced"],
      "difficulty": "beginner",
      "use_cases": ["basic reporting", "data visualization"],
      "code_patterns": ["SOQL queries", "report types"]
    },
    {
      "name": "advanced",
      "file": "topics/advanced_reports.txt",
      "tags": ["advanced"],
      "related": ["report"],
      "prerequisites": ["report"],
      "leads_to": [],
      "difficulty": "advanced",
      "use_cases": ["complex analytics", "custom report types"],
      "code_patterns": ["dynamic SOQL", "custom report builders"]
    }
  ],
  "semantic_groups": {
    "fundamentals": ["report"],
    "advanced_features": ["advanced"]
  },
  "learning_paths": {
    "beginner": ["report"],
    "expert": ["report", "advanced"]
  },
  "totalSnippets": 25 // Optional: for display purposes
}
```

**Enhanced topic properties:**

- `prerequisites` (array of strings, optional): Topics that should be understood first
- `leads_to` (array of strings, optional): Topics that naturally follow this one
- `difficulty` (string, optional): "beginner", "intermediate", or "advanced"
- `use_cases` (array of strings, optional): Practical applications of this topic
- `code_patterns` (array of strings, optional): Code patterns or techniques covered

**New library-level properties:**

- `semantic_groups` (object, optional): Named collections of related topics
- `learning_paths` (object, optional): Suggested sequences of topics for different skill levels

**How enhanced topic lookup works:**

- When searching, the server matches your query against library name, description, topic names, tags, use_cases, and code_patterns.
- When fetching documentation for a topic, the server automatically includes context from prerequisites, related topics, and next steps.
- You can request entire semantic groups or learning paths by name.

## 🔍 Semantic Search with seta-indexer

The `seta-indexer` command creates a vector database for semantic search capabilities.

### Creating the Semantic Search Index

```bash
# Index your documentation for semantic search
npx @techformist/seta-mcp@latest seta-indexer <path_to_your_docs_folder>

# With options
npx @techformist/seta-mcp@latest seta-indexer /path/to/docs --verbose --chunk-size 1500 --chunk-overlap 300

# Force re-indexing of all files
npx @techformist/seta-mcp@latest seta-indexer /path/to/docs --force
```

If you are running the indexer locally, you can run the following command to start the MCP server:

```bash
#Build the project:
npm run build
#Run the indexer:
node dist/indexer/cli.js "C:\dev\1p\ai\seta-salesforce-docs"
```

**Indexer Options:**

- `--verbose, -v`: Enable detailed logging
- `--force`: Force re-indexing of all files (ignores change detection)
- `--chunk-size <size>`: Chunk size in characters (default: 1000)
- `--chunk-overlap <overlap>`: Overlap between chunks in characters (default: 200)

**What the indexer does:**

1. Scans all documentation files in your `LOCAL_DOCS_PATH`
2. Processes regular libraries (with `manifest.json`) AND the special `_semantic_only` folder
3. Splits documents into chunks with intelligent boundary detection
4. Generates vector embeddings using a lightweight AI model
5. Stores everything in a LanceDB database (`.seta_lancedb` folder)
6. Tracks file changes for incremental updates

**File Change Detection:**
The indexer maintains an index state file that tracks file hashes and modification times. On subsequent runs, it only processes new or changed files, making updates very fast.

### Install in VS Code

Add this to your VS Code MCP config file. Ensure `LOCAL_DOCS_PATH` is set in the environment VS Code uses to launch the server. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
{
  "servers": {
    "seta": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@techformist/seta-mcp@latest"],
      "env": {
        "LOCAL_DOCS_PATH": "local_path_to_docs", // <-- IMPORTANT!
        "DEFAULT_MAX_TOKENS": "5000" // Optional
      }
    }
  }
}
```

If you want to run everything locally.

```bash
git clone https://github.com/techformist/seta-mcp
cd seta-mcp
npm i
npm run dev
```

Create document library or copy over existing LLM-friendly documentation to a local folder. e.g., `c:\\dev\\mcp\\seta-mcp\\docs`.

Open your code repository in VSCode.

Add MCP server with `command (stdio)`. Provide the name as `seta` and include the command specified in the configuration below.

Your MCP configuration should look like this -

```json
"mcp": {
    "servers": {
      "seta": {
        "envFile": "./.env",
        "type": "stdio",
        "command": "npx",
        "args": ["tsx", "C:\\dev\\mcp\\seta-mcp\\main.ts"]
      }
    }
  }
```

You can provide `env` as an argument instead of `envFile` - both point to the path of the document library. If you do choose `envFile`, create `.env` file in your code repo root and create the variable to point to the library path.

```md
# example

LOCAL_DOCS_PATH="C:\\dev\\mcp\\seta-mcp\\docs"
```

Start the MCP server either in Agent window or directly from the settings file.

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

**Remember to set the `LOCAL_DOCS_PATH` environment variable where Cursor executes this command.** This might involve setting it globally in your shell profile (e.g., `.zshrc`, `.bashrc`) or configuring it within Cursor's environment settings if available.

```json
{
  "mcpServers": {
    "seta": {
      "command": "npx",
      "args": ["-y", "@techformist/seta-mcp@latest"],
      "env": {
        "LOCAL_DOCS_PATH": "/path/to/your/documentation_root", // <-- IMPORTANT! Set this
        "DEFAULT_MAX_TOKENS": "5000" // Optional
      }
    }
  }
}
```

### Environment Variables

- `LOCAL_DOCS_PATH` (**Required**): The absolute or relative path to the root directory containing your library documentation subdirectories. Each subdirectory should have a `manifest.json`.
- `DEFAULT_MAX_TOKENS`: Sets the maximum character limit for documentation retrieval (default: 5000). If the `tokens` parameter in `get-library-docs` is higher than this value, content will be truncated to this limit. This helps manage response size and prevent overwhelming the client.

Example:
If `LOCAL_DOCS_PATH` is set in your shell's environment (e.g., in `.zshrc` or `.bashrc`), you might not need to set it in each client's config.

```bash
export LOCAL_DOCS_PATH="/Users/me/my_project_docs"
export DEFAULT_MAX_TOKENS="5000"
```

See sample [LLM-friendly Apex docs](https://github.com/prashanth1k/seta-apex-docs-example) for an example documentation library.

### Special Folder: `_semantic_only`

You can create a special folder named `_semantic_only` within your `LOCAL_DOCS_PATH` for content that should be included in semantic search but not appear in the structured library system.

**Purpose:**

- Content in `_semantic_only` will be indexed for semantic search (`get-semantic-docs`)
- It will **NOT** appear in `get-library-id` or `get-library-docs` results
- No `manifest.json` is required or used for this folder

**Supported file types:** `.md`, `.txt`, `.mdx`, `.pdf`, `.json`, `.yaml`, `.yml`, `.xml`, `.csv`

**Structure example:**

```
LOCAL_DOCS_PATH/
├── apex-library/           # Regular library with manifest.json
│   ├── manifest.json
│   └── triggers.md
├── lwc-library/            # Regular library with manifest.json
│   ├── manifest.json
│   └── components.md
└── _semantic_only/         # Special folder - no manifest needed
    ├── additional-notes.md
    ├── troubleshooting/
    │   ├── common-issues.md
    │   └── debug-guide.pdf
    ├── reference/
    │   ├── api-examples.txt
    │   └── config-schema.json
    └── data/
        └── sample-data.csv
```

**Features:**

- **Change detection**: Only processes files modified since last indexing run
- **Multiple file types**: Supports text, markdown, PDF, JSON, YAML, XML, and CSV files
- **Warnings**: Alerts you to unsupported file types in the folder
- **Recursive scanning**: Processes files in subdirectories

**Use cases:**

- Additional reference materials
- Troubleshooting guides and PDFs
- Code examples that don't fit into structured topics
- Configuration files and schemas (JSON, YAML)
- Legacy documentation
- Community contributions
- Personal notes and annotations
- Data samples and reference tables (CSV)

### Available Tools

- `get-library-id`: Resolves a general library name into a local library ID (the directory name) by searching `manifest.json` files within your `LOCAL_DOCS_PATH`. Now returns enhanced metadata including difficulties, use cases, semantic groups, and learning paths.

  - `libraryName` (required): The name of the library to search for.

- `get-library-docs`: Fetches documentation for a library from your local file system. When requesting a specific topic, automatically includes context from prerequisites, related topics, and next steps.

  - `localLibraryID` (required): The exact local library ID (directory name, e.g., "my-awesome-lib") obtained from `get-library-id`.
  - `topic` (optional): Focuses the documentation on a specific topic, semantic group name, or learning path name defined in the library's `manifest.json`. If omitted, uses `default_doc` from the manifest.
  - `tokens` (optional, default: `DEFAULT_MAX_TOKENS` environment variable or 5000): Maximum number of characters to return. Content exceeding this limit will be truncated.

- **NEW** `get-semantic-docs`: Performs semantic search across all indexed documentation to find the most relevant content for your query. Uses vector embeddings to find conceptually similar content, even if exact keywords don't match. **Searches across both regular libraries AND the `_semantic_only` folder.**

  - `query` (required): Natural language query describing what you're looking for (e.g., "how to handle bulk data operations in Apex").
  - `limit` (optional, default: 10): Maximum number of relevant chunks to return.
  - `library_filter` (optional): Filter to search only within a specific library ID (use `"_semantic_only"` to search only the special folder).
  - `difficulty_filter` (optional): Filter by difficulty level ("beginner", "intermediate", "advanced").

- **NEW** `get-library-topics`: Lists all topics within a specific library with their metadata (difficulty, use cases, prerequisites, leads_to). Useful for exploring what's available in a library before fetching specific documentation.

  - `localLibraryID` (required): Exact local library ID retrieved from 'get-library-id'.
  - `difficulty` (optional): Filter topics by difficulty level.
  - `use_case_keyword` (optional): Filter topics that include this keyword in their use_cases.

- **NEW** `get-topic-details`: Gets detailed metadata for a specific topic without fetching its full documentation content. Useful for understanding a topic's context, difficulty, prerequisites, and relationships.
  - `localLibraryID` (required): Exact local library ID retrieved from 'get-library-id'.
  - `topicName` (required): Name of the topic to get details for.

## Development

Clone the project and install dependencies:

```bash
npm i
```

Build (assuming `main.ts` is in the root and `tsconfig.json` is configured for `outDir: "./dist"` and `rootDir: "./"`):

```bash
npm run build
```

This will compile `main.ts` (and files in `lib/` and `indexer/`) to `dist/main.js` and `dist/indexer/cli.js`.

### Local Configuration Example (for development)

To run your local development version with an MCP client like Cursor:

```json
{
  "mcpServers": {
    "seta_dev": {
      "command": "npx",
      "args": ["tsx", "/path/to/your/project/dist/main.js"],
      "env": {
        "LOCAL_DOCS_PATH": "/absolute/path/to/your/test_documentation_root", // Essential for testing
        "DEFAULT_MAX_TOKENS": "5000" // Optional
      }
    }
  }
}
```

### Testing with MCP Inspector

Ensure `LOCAL_DOCS_PATH` is set in your environment.

```bash
# For published version
# export LOCAL_DOCS_PATH="/path/to/your/docs"
npx -y @modelcontextprotocol/inspector npx @techformist/seta-mcp@latest
```

## Disclaimer

This project relies on the documentation you provide. The quality, accuracy, and completeness of the generated context are directly dependent on your local documentation files. Use at your own discretion and risk.

## License

MIT
