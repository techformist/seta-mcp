// Type definitions for the seta-indexer

export interface FileState {
  filePath: string; // Relative path from the docs root
  hash: string; // SHA256 hash of the file content
  lastModified: number; // Timestamp of last modification
}

export interface IndexState {
  [filePath: string]: FileState;
}

export interface DocumentChunk {
  id: string; // Unique identifier for the chunk
  libraryId: string; // Library/directory name
  topicName?: string; // Topic name if available from manifest
  originalFilePath: string; // Relative path to the original file
  text: string; // The actual chunk text content
  order: number; // Order of this chunk within the document (0-based)
  metadata?: {
    difficulty?: string;
    use_cases?: string[];
    code_patterns?: string[];
    tags?: string[];
  };
}

export interface EmbeddedChunk extends DocumentChunk {
  embedding: number[]; // Vector embedding of the chunk text
}

export interface ProcessingStats {
  totalFiles: number;
  newFiles: number;
  changedFiles: number;
  unchangedFiles: number;
  deletedFiles: number;
  totalChunks: number;
  processingTimeMs: number;
}

export interface DocumentFile {
  filePath: string; // Full path to the document file
  libraryId: string; // Library/directory name
  topicName?: string; // Topic name if available from manifest
  relativePath: string; // Path relative to the docs root
}
