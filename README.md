# Seta MCP - Up-to-date Local Docs for Coding

Assist Salesforce developers to create code and configuration! This is a MCP server that you can run locally or host remotely.

Designed to fetch documentation from your local file system, giving you complete control over the context provided to your AI assistant.

Inspired by context7 - but this application uses local documentation library.

## Why use this?

Seta MCP server consists of two primary components:

- MCP server code (this repository)
- Open / public, internal or proprietary documentation for Apex, LWC, configuration etc.

Seta MCP helps you to -

- Work entirely offline.
- Have fine-grained control over the exact documentation versions and content.
- Quickly iterate on documentation and have it immediately available to your LLM.

## 💡 How It Works?

This MCP server reads documentation from a local directory structure you define.

1.  **Set `LOCAL_DOCS_PATH`**: You specify a root directory for your documentation via the `LOCAL_DOCS_PATH` environment variable.
2.  **Organize Libraries**: Inside `LOCAL_DOCS_PATH`, each library or documentation set should reside in its own subdirectory.
3.  **`manifest.json`**: Each library subdirectory **must** contain a `manifest.json` file. This file describes the library and tells the MCP server where to find specific documents (e.g., for different topics or a default document).

When you prompt your LLM (e.g., in VSCode) with `use latest Apex docs`, `use seta` or just reference any of the below tools in the prompt:

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
│       └── report.md
│       └── advanced_reports.txt
└── another-tool/
    ├── manifest.json
    └── quick_start.md
```

### `manifest.json` Format

Each library directory (e.g., `my-awesome-lib/`) **must** contain a `manifest.json` file in the following format:

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
      "related": []
    },
    {
      "name": "advanced",
      "file": "topics/advanced_reports.txt",
      "tags": ["advanced"],
      "related": ["report"]
    }
  ],
  "totalSnippets": 25 // Optional: for display purposes
}
```

- `topics`: An array of topic objects. Each topic must have:
  - `name` (string): The topic identifier (used for lookup and search)
  - `file` (string): Path to the documentation file (relative to `manifest.json`)
  - `tags` (array of strings, optional): Used for search
  - `related` (array of strings, optional): Related topic names

**How topic lookup and file resolution works:**

- When searching, the server matches your query against the library name, description, and each topic's `name` and `tags`.
- When fetching documentation for a topic, the server looks up the topic by `name` and uses the associated `file` path.
- If no topic is specified or found, `default_doc` is used. If that's missing, the server tries to find any `.md` or `.txt` file as a fallback.

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

### Available Tools

- `resolve-library-id`: Resolves a general library name into a local library ID (the directory name) by searching `manifest.json` files within your `LOCAL_DOCS_PATH`.
  - `libraryName` (required): The name of the library to search for.
- `get-library-docs`: Fetches documentation for a library from your local file system.
  - `localLibraryID` (required): The exact local library ID (directory name, e.g., "my-awesome-lib") obtained from `resolve-library-id`.
  - `topic` (optional): Focuses the documentation on a specific topic defined in the library's `manifest.json` (e.g., "install", "api-reference"). If omitted, uses `default_doc` from the manifest.
  - `tokens` (optional, default: `DEFAULT_MAX_TOKENS` environment variable or 5000): Maximum number of characters to return. Content exceeding this limit will be truncated.

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
