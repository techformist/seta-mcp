[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/techformist-seta-mcp-badge.png)](https://mseep.ai/app/techformist-seta-mcp)

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

This MCP server reads documentation from a local directory structure you define.

1.  **Set `LOCAL_DOCS_PATH`**: You specify a root directory for your documentation via the `LOCAL_DOCS_PATH` environment variable.
2.  **Organize Libraries**: Inside `LOCAL_DOCS_PATH`, each library or documentation set should reside in its own subdirectory.
3.  **Enhanced `manifest.json`**: Each library subdirectory **must** contain a `manifest.json` file with rich metadata including difficulty levels, use cases, learning paths, and semantic groups.
4.  **Optional Semantic Indexing**: Run `seta-indexer` to create a vector database for semantic search capabilities.

When you prompt your LLM (e.g., in VSCode) with `use latest Apex docs`, `use seta` or just reference any of the below tools in the prompt:

- The `get-library-id` tool searches the `manifest.json` files in your `LOCAL_DOCS_PATH` to find matching libraries.
- The `get-library-docs` tool then fetches the content of the specified document file from your local file system.

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
npx -y @modelcontextprotocol/inspector npx seta-mcp@latest
```

## Disclaimer

This project relies on the documentation you provide. The quality, accuracy, and completeness of the generated context are directly dependent on your local documentation files. Use at your own discretion and risk.

## License

MIT
