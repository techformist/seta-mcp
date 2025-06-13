import fs from "fs-extra";
import path from "path";
import { DocumentFile, DocumentChunk } from "./types.js";
import { LocalLibraryManifest, Topic } from "../lib/types.js";

// Type for semantic-only state tracking
interface SemanticOnlyState {
  [relativePath: string]: {
    mtime: number;
  };
}

/**
 * Load semantic-only state for change detection
 */
async function loadSemanticOnlyState(
  stateFile: string
): Promise<SemanticOnlyState> {
  try {
    if (await fs.pathExists(stateFile)) {
      const content = await fs.readFile(stateFile, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn("Warning: Could not load semantic-only state:", error);
  }
  return {};
}

/**
 * Save semantic-only state for change detection
 */
async function saveSemanticOnlyState(
  stateFile: string,
  state: SemanticOnlyState
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(stateFile));
    await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
  } catch (error) {
    console.warn("Warning: Could not save semantic-only state:", error);
  }
}

/**
 * Process files in the special _semantic_only folder
 */
async function processSemanticOnlyFolder(
  semanticFolderPath: string,
  docsRootPath: string,
  documentFiles: DocumentFile[]
): Promise<void> {
  try {
    // Supported file extensions for semantic-only content
    const supportedExtensions = [
      ".md",
      ".txt",
      ".mdx",
      ".pdf",
      ".json",
      ".yaml",
      ".yml",
      ".xml",
      ".csv",
    ];

    // Recursively find all supported files in the semantic folder
    const files = await findDocumentationFilesRecursively(
      semanticFolderPath,
      supportedExtensions
    );

    // Check for unsupported files and warn
    await checkForUnsupportedFiles(semanticFolderPath, supportedExtensions);

    // Load previous state for change detection
    const stateFile = path.join(
      docsRootPath,
      ".seta_lancedb",
      "semantic_only_state.json"
    );
    const previousState = await loadSemanticOnlyState(stateFile);

    for (const filePath of files) {
      const relativePath = path.relative(docsRootPath, filePath);

      // Check if file has changed since last run
      const stats = await fs.stat(filePath);
      const currentMtime = stats.mtime.getTime();
      const previousMtime = previousState[relativePath]?.mtime || 0;

      if (currentMtime > previousMtime) {
        documentFiles.push({
          filePath,
          libraryId: "_semantic_only", // Special library ID
          topicName: undefined, // No specific topic
          relativePath: relativePath.replace(/\\/g, "/"),
        });

        // Update state
        previousState[relativePath] = { mtime: currentMtime };
      }
    }

    // Save updated state
    await saveSemanticOnlyState(stateFile, previousState);
  } catch (error) {
    console.warn("Warning: Could not process _semantic_only folder:", error);
  }
}

/**
 * Check for unsupported files in the semantic folder and warn
 */
async function checkForUnsupportedFiles(
  dirPath: string,
  supportedExtensions: string[]
): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively check subdirectories
        await checkForUnsupportedFiles(fullPath, supportedExtensions);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext && !supportedExtensions.includes(ext)) {
          console.warn(
            `⚠️  Unsupported file type in _semantic_only: ${path.relative(process.cwd(), fullPath)} (${ext})`
          );
        }
      }
    }
  } catch (error) {
    console.warn(
      `Warning: Could not check for unsupported files in ${dirPath}:`,
      error
    );
  }
}

/**
 * Read and extract text content from various file types
 */
async function readFileContent(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  try {
    switch (ext) {
      case ".md":
      case ".mdx":
      case ".txt":
      case ".json":
      case ".yaml":
      case ".yml":
      case ".xml":
      case ".csv":
        // Text-based files - read directly
        return await fs.readFile(filePath, "utf-8");

      case ".pdf":
        // PDF files - extract text using pdfjs-dist (no native dependencies)
        try {
          const { extractPdfText } = await import("./pdfUtils.js");
          return await extractPdfText(filePath);
        } catch (error) {
          console.error(`Error parsing PDF ${filePath}:`, error);
          return `[PDF content could not be extracted from ${path.basename(filePath)}]`;
        }

      default:
        console.warn(
          `Unsupported file extension: ${ext} for file: ${filePath}`
        );
        return "";
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "";
  }
}

/**
 * Recursively find documentation files with specific extensions
 */
async function findDocumentationFilesRecursively(
  dirPath: string,
  extensions: string[]
): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subFiles = await findDocumentationFilesRecursively(
          fullPath,
          extensions
        );
        files.push(...subFiles);
      } else if (entry.isFile()) {
        // Check if file has one of the target extensions
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dirPath}:`, error);
  }

  return files;
}

/**
 * Get all documentation files from the docs root path
 */
export async function getAllDocumentationFiles(
  docsRootPath: string
): Promise<DocumentFile[]> {
  const documentFiles: DocumentFile[] = [];

  try {
    const entries = await fs.readdir(docsRootPath, { withFileTypes: true });
    const directories = entries.filter((entry) => entry.isDirectory());

    for (const dir of directories) {
      const libraryPath = path.join(docsRootPath, dir.name);

      // Handle special _semantic_only folder
      if (dir.name === "_semantic_only") {
        await processSemanticOnlyFolder(
          libraryPath,
          docsRootPath,
          documentFiles
        );
        continue;
      }

      const manifestPath = path.join(libraryPath, "manifest.json");

      try {
        // Check if manifest.json exists
        if (await fs.pathExists(manifestPath)) {
          const manifestContent = await fs.readFile(manifestPath, "utf-8");
          const manifest: LocalLibraryManifest = JSON.parse(manifestContent);

          // Process topics from manifest
          if (Array.isArray(manifest.topics)) {
            for (const topic of manifest.topics) {
              const topicFilePath = path.join(libraryPath, topic.file);

              if (await fs.pathExists(topicFilePath)) {
                const relativePath = path.relative(docsRootPath, topicFilePath);
                documentFiles.push({
                  filePath: topicFilePath,
                  libraryId: dir.name,
                  topicName: topic.name,
                  relativePath: relativePath.replace(/\\/g, "/"), // Normalize path separators
                });
              }
            }
          }

          // Process default document if it exists
          if (manifest.default_doc) {
            const defaultDocPath = path.join(libraryPath, manifest.default_doc);
            if (await fs.pathExists(defaultDocPath)) {
              const relativePath = path.relative(docsRootPath, defaultDocPath);
              documentFiles.push({
                filePath: defaultDocPath,
                libraryId: dir.name,
                topicName: undefined, // Default doc doesn't have a specific topic
                relativePath: relativePath.replace(/\\/g, "/"),
              });
            }
          }
        } else {
          // If no manifest, look for common documentation files
          const commonFiles = ["README.md", "readme.md", "index.md", "docs.md"];
          for (const fileName of commonFiles) {
            const filePath = path.join(libraryPath, fileName);
            if (await fs.pathExists(filePath)) {
              const relativePath = path.relative(docsRootPath, filePath);
              documentFiles.push({
                filePath,
                libraryId: dir.name,
                topicName: undefined,
                relativePath: relativePath.replace(/\\/g, "/"),
              });
              break; // Only take the first found common file
            }
          }
        }
      } catch (error) {
        console.warn(`Warning: Could not process library ${dir.name}:`, error);
      }
    }
  } catch (error) {
    console.error("Error scanning documentation files:", error);
    throw error;
  }

  return documentFiles;
}

/**
 * Simple text splitter for chunking documents
 */
export function splitText(
  text: string,
  chunkSize: number,
  overlap: number
): string[] {
  const chunks: string[] = [];

  if (text.length <= chunkSize) {
    return [text];
  }

  let start = 0;
  while (start < text.length) {
    let end = start + chunkSize;

    // If we're not at the end, try to break at a sentence or paragraph boundary
    if (end < text.length) {
      // Look for sentence endings within the last 200 characters
      const searchStart = Math.max(end - 200, start);
      const searchText = text.substring(searchStart, end);

      // Look for sentence endings (., !, ?) followed by whitespace
      const sentenceEnd = searchText.match(/[.!?]\s+/g);
      if (sentenceEnd) {
        const lastSentenceEnd = searchText.lastIndexOf(
          sentenceEnd[sentenceEnd.length - 1]
        );
        if (lastSentenceEnd > 0) {
          end =
            searchStart +
            lastSentenceEnd +
            sentenceEnd[sentenceEnd.length - 1].length;
        }
      } else {
        // Look for paragraph breaks
        const paragraphEnd = searchText.lastIndexOf("\n\n");
        if (paragraphEnd > 0) {
          end = searchStart + paragraphEnd + 2;
        } else {
          // Look for any line break
          const lineEnd = searchText.lastIndexOf("\n");
          if (lineEnd > 0) {
            end = searchStart + lineEnd + 1;
          }
        }
      }
    }

    const chunk = text.substring(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    // Move start position with overlap
    start = end - overlap;
    if (start >= text.length) break;
  }

  return chunks;
}

/**
 * Chunk a document into smaller pieces
 */
/**
 * Enhanced chunkDocument that can read content from file if not provided
 */
export async function chunkDocument(
  filePath: string,
  content?: string,
  libraryId?: string,
  topicName?: string,
  chunkSize: number = 1000,
  chunkOverlap: number = 200
): Promise<DocumentChunk[]> {
  const chunks: DocumentChunk[] = [];

  // Read content if not provided (for _semantic_only files)
  let documentContent = content;
  if (!documentContent) {
    documentContent = await readFileContent(filePath);
    if (!documentContent.trim()) {
      return []; // Skip empty files
    }
  }

  const textChunks = splitText(documentContent, chunkSize, chunkOverlap);

  // Try to extract metadata from the file if it's part of a manifest
  let metadata: DocumentChunk["metadata"] = undefined;

  if (topicName) {
    try {
      const libraryPath = path.dirname(filePath);
      const manifestPath = path.join(libraryPath, "manifest.json");

      if (await fs.pathExists(manifestPath)) {
        const manifestContent = await fs.readFile(manifestPath, "utf-8");
        const manifest: LocalLibraryManifest = JSON.parse(manifestContent);

        const topic = manifest.topics?.find((t) => t.name === topicName);
        if (topic) {
          metadata = {
            difficulty: topic.difficulty,
            use_cases: topic.use_cases,
            code_patterns: topic.code_patterns,
            tags: topic.tags,
          };
        }
      }
    } catch (error) {
      // Ignore metadata extraction errors
    }
  }

  textChunks.forEach((chunk, index) => {
    const effectiveLibraryId = libraryId || "_semantic_only";
    const chunkId = `${effectiveLibraryId}_${topicName || "default"}_${index}`;
    chunks.push({
      id: chunkId,
      libraryId: effectiveLibraryId,
      topicName,
      originalFilePath: path
        .relative(path.dirname(path.dirname(filePath)), filePath)
        .replace(/\\/g, "/"),
      text: chunk,
      order: index,
      metadata,
    });
  });

  return chunks;
}
