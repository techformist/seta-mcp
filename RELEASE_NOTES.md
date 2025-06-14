# Release Notes

## Version 0.2.2

**Release Date:** 2025-06-14

### Major Changes

- **Removed all file scanning, chunking, and `_semantic_only` folder logic** (including `processSemanticOnlyFolder` and `documentProcessor`) from the MCP server. This logic is now part of the vector indexer prompt/spec for a separate library.
- **Deleted**: `indexer/documentProcessor.ts`
- The MCP server now only handles documentation lookup and metadata.

### Breaking Changes

- No more file/folder scanning or chunking in this package.
- Only direct documentation lookup and topic metadata tools remain.

## Version 0.2.1 - Corporate Environment Fix 🏢

**Release Date:** 2025-06-13

### 🎯 **What's New**

#### 🔧 **Corporate Environment Compatibility**

- **Breaking Change**: Replaced `pdf-parse` with `pdfjs-dist` for PDF text extraction
- ~~**No Native Dependencies**: Eliminates sharp dependency that requires compilation~~ This is still an issue since I did not end up changing the transformer library.
- ~~**Corporate-Friendly**: Works in protected environments without admin privileges~~ Issue persists in secure environments.
- **Pure JavaScript**: Uses Mozilla's PDF.js library for reliable PDF processing
- **Same Functionality**: Maintains all existing PDF text extraction capabilities

### 🐛 **Bug Fixes**

- Fixed Windows compilation issues in corporate environments
- ~~Resolved sharp dependency conflicts~~ (still an issue)
- Improved PDF processing reliability

### 🚀 **Migration Guide**

#### For Existing Users:

1. **Update to version `0.2.1`**: `npm install -g @techformist/seta-mcp@latest`
2. **Re-run the indexer** to test PDF processing: `npx seta-indexer <docs_path>`
3. **No code changes required** - PDF processing works the same way

---

## Version 0.2.0 - Major Feature Release 🚀

**Release Date:** 2025-06-09

### 🎯 **What's New**

#### 🔧 **Improved Tool Naming Convention**

- **Breaking Change**:
- All tools now follow the clean `get-{what}-{context}` pattern
- Updated all documentation and error messages

#### 📁 **New: `_semantic_only` Special Folder**

- **Game Changer**: Add content for semantic search without cluttering your library structure
- **Multi-format Support**: `.md`, `.txt`, `.pdf`, `.json`, `.yaml`, `.xml`, `.csv`, `.mdx`
- **Smart Change Detection**: Only processes modified files for lightning-fast updates
- **Recursive Scanning**: Automatically finds files in subdirectories
- **Warning System**: Alerts about unsupported file types
- **Perfect for**: Reference materials, PDFs, config files, troubleshooting guides, personal notes

#### 🧠 **Enhanced Semantic Search**

- **PDF Text Extraction**: Automatically extracts searchable text from PDF documents
- **Structured Data**: Index JSON schemas, YAML configs, CSV data tables
- **Improved Performance**: Change detection reduces indexing time by 90%+
- **Better Filtering**: Use `library_filter: "_semantic_only"` to search only additional content

#### 🛠️ **Developer Experience Improvements**

- **Clean Logging**: Fixed MCP JSON protocol interference issues
- **Smart Error Handling**: Fatal errors visible in MCP client, operational logs in files
- **Better Performance**: Optimized file processing and embedding generation
- **Enhanced Documentation**: Comprehensive README with examples and use cases

### 📊 **Performance Improvements**

- **90%+ faster re-indexing** thanks to intelligent change detection
- **Reduced memory usage** with optimized file processing
- **Faster startup** with improved initialization sequence

### 🔧 **Technical Enhancements**

- Added `pdfjs-dist` for PDF text extraction (replaced `pdf-parse` in v0.2.1)
- Implemented file modification time tracking
- Enhanced error handling and recovery
- Improved TypeScript types and documentation
- Better logging system with configurable levels

### 📚 **Documentation Updates**

- Complete `_semantic_only` folder guide with examples
- Updated tool reference with new naming convention
- Enhanced setup instructions for VS Code and Cursor
- Added troubleshooting section
- Performance optimization tips

### 🐛 **Bug Fixes**

- Fixed MCP JSON protocol interference from console logging
- Resolved PDF parsing initialization issues
- Improved error handling for malformed files
- Better handling of empty or corrupted documents

### 🚀 **Migration Guide**

#### For Existing Users:

1. **Update your MCP configuration** to version `0.2.0`
2. **Re-run the indexer** to benefit from new change detection: `npx seta-indexer <docs_path>`
3. **Update prompts** if you reference old tool names directly
4. **Optional**: Create `_semantic_only` folder for additional content

#### New Installation:

```bash
# Install latest version
npm install -g @techformist/seta-mcp@latest

# Or use directly
npx @techformist/seta-mcp@latest
```

## [NEXT]

### Major Changes

- Removed all vector DB, embedding, and semantic search/indexer logic from the project.
- Deleted all indexer-related files and code (LanceDB, @xenova/transformers, embedding, and semantic search tools).
- Cleaned up documentation, types, and utility code to remove all references to semantic search and vector DB.
- The vector DB/indexer functionality is now intended to be implemented as a separate npx library. See `vector-indexer-prompt.md` for a comprehensive implementation prompt/spec.
- All file scanning, chunking, and \_semantic_only folder logic (including processSemanticOnlyFolder and documentProcessor) has been removed from the MCP server and moved to the vector indexer prompt/spec. The file indexer/documentProcessor.ts is deleted.

### Breaking Changes

- No more `seta-indexer` CLI or semantic search (`get-semantic-docs`) in this package.
- Only direct documentation lookup and topic metadata tools remain.
