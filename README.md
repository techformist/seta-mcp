# Seta MCP - Up-to-date Local Code Docs For Any Salesforce Prompt

Assist Salesforce developers to create code and configuration! This is a MCP server that you can run locally or host remotely.

Designed to fetch documentation from your local file system, giving you complete control over the context provided to your AI assistant.

Inspired by context7 - but this application uses local documentation library.

## Why use this?

Seta MCP server consists of two primary components:

- Use open / public, internal or proprietary documentation for Apex, LWC, configuration etc.
- Work entirely offline.
- Have fine-grained control over the exact documentation versions and content.
- Quickly iterate on documentation and have it immediately available to your LLM.

## 💡 How It Works?

This MCP server reads documentation from a local directory structure you define.

1.  **Set `LOCAL_DOCS_PATH`**: You specify a root directory for your documentation via the `LOCAL_DOCS_PATH` environment variable.
2.  **Organize Libraries**: Inside `LOCAL_DOCS_PATH`, each library or documentation set should reside in its own subdirectory.
3.  **`manifest.json`**: Each library subdirectory **must** contain a `manifest.json` file. This file describes the library and tells the MCP server where to find specific documents (e.g., for different topics or a default document).

When you prompt your LLM (e.g., in Cursor) with `use seta`:

- The `resolve-library-id` tool searches the `manifest.json` files in your `LOCAL_DOCS_PATH` to find matching libraries.
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
│   └── topics/
│       └── installation.md
│       └── advanced_usage.txt
└── another-tool/
    ├── manifest.json
    └── quick_start.md
```

### `manifest.json` Format

Each library directory (e.g., `my-awesome-lib/`) **must** contain a `manifest.json` file:

```json
{
  "name": "My Awesome Library",
  "description": "A brief description of what this library does.",
  "version": "2.1.0", // Optional
  "default_doc": "main_guide.md", // File to use if no topic is specified
  "topics": {
    // Optional: map topic names to file paths (relative to this manifest.json)
    "install": "topics/installation.md",
    "advanced": "topics/advanced_usage.txt",
    "intro": "main_guide.md"
  },
  "totalSnippets": 25 // Optional: for display purposes
}
```

- `name` (required): The human-readable name of the library.
- `description` (optional): A short description.
- `version` (optional): Version of the documented library.
- `default_doc` (optional but recommended): The file (relative to `manifest.json`) to load if `get-library-docs` is called without a specific `topic`. If not provided, and no topic matches, the server might try to find a fallback `.md` or `.txt` file.
- `topics` (optional): An object where keys are topic identifiers (e.g., "install", "api-reference") and values are paths to the corresponding documentation files (relative to `manifest.json`).
- `stars`, `totalSnippets` (optional): Mimics the original API for display consistency if desired.

### Install in VS Code

Add this to your VS Code MCP config file. Ensure `LOCAL_DOCS_PATH` is set in the environment VS Code uses to launch the server. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
{
  "servers": {
    "Seta": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@prashanth1k/seta-mcp@latest"],
      "options": {
        // VS Code uses "options.env"
        "env": {
          "LOCAL_DOCS_PATH": "/path/to/your/documentation_root" // <-- IMPORTANT!
        }
      }
    }
  }
}
```

If you want to run everything locally.

```bash
git clone
```

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

**Remember to set the `LOCAL_DOCS_PATH` environment variable where Cursor executes this command.** This might involve setting it globally in your shell profile (e.g., `.zshrc`, `.bashrc`) or configuring it within Cursor's environment settings if available.

```json
{
  "mcpServers": {
    "seta": {
      "command": "npx",
      "args": ["-y", "@prashanth1k/seta-mcp@latest"],
      "env": {
        "LOCAL_DOCS_PATH": "/path/to/your/documentation_root" // <-- IMPORTANT! Set this
        // "DEFAULT_MINIMUM_TOKENS": "1000" // Optional
      }
    }
  }
}
```

### Environment Variables

- `LOCAL_DOCS_PATH` (**Required**): The absolute or relative path to the root directory containing your library documentation subdirectories. Each subdirectory should have a `manifest.json`.
- `DEFAULT_MINIMUM_TOKENS`: Sets the default character limit for documentation retrieval (default: 10000). If the `tokens` parameter in `get-library-docs` is less than this value, this value will be used. This helps ensure a minimum amount of context is fetched unless a higher limit is specified.

Example:
If `LOCAL_DOCS_PATH` is set in your shell's environment (e.g., in `.zshrc` or `.bashrc`), you might not need to set it in each client's config.

```bash
export LOCAL_DOCS_PATH="/Users/me/my_project_docs"
export DEFAULT_MINIMUM_TOKENS="5000"
```

See `docs` folder in this repository for examples.

### Available Tools

- `resolve-library-id`: Resolves a general library name into a local library ID (the directory name) by searching `manifest.json` files within your `LOCAL_DOCS_PATH`.
  - `libraryName` (required): The name of the library to search for.
- `get-library-docs`: Fetches documentation for a library from your local file system.
  - `localLibraryID` (required): The exact local library ID (directory name, e.g., "my-awesome-lib") obtained from `resolve-library-id`.
  - `topic` (optional): Focuses the documentation on a specific topic defined in the library's `manifest.json` (e.g., "install", "api-reference"). If omitted, uses `default_doc` from the manifest.
  - `tokens` (optional, default: `DEFAULT_MINIMUM_TOKENS` environment variable or 10000): Maximum number of characters to return. Content will be truncated if it exceeds this limit.

## Development

Clone the project and install dependencies:

```bash
npm i
```

Build (assuming `main.ts` is in the root and `tsconfig.json` is configured for `outDir: "./dist"` and `rootDir: "./"`):

```bash
npm run build
```

This will compile `main.ts` (and files in `lib/`) to `dist/main.js`.

### Local Configuration Example (for development)

To run your local development version with an MCP client like Cursor:

```json
{
  "mcpServers": {
    "seta_dev": {
      "command": "npx",
      "args": ["tsx", "/path/to/your/project/dist/main.js"],
      "env": {
        "LOCAL_DOCS_PATH": "/absolute/path/to/your/test_documentation_root" // Essential for testing
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
npx -y @modelcontextprotocol/inspector npx @prashanth1k/seta-mcp@latest
```

## Disclaimer

This project relies on the documentation you provide. The quality, accuracy, and completeness of the generated context are directly dependent on your local documentation files. Use at your own discretion and risk.

## License

MIT
