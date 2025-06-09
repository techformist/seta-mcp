// Configuration constants for the seta-indexer

export const INDEXER_CONFIG = {
  // Embedding model configuration
  EMBEDDING_MODEL: "Xenova/all-MiniLM-L6-v2", // Lightweight, fast model for embeddings

  // LanceDB configuration
  LANCEDB_SUBDIR: ".seta_lancedb", // Directory name within the docs folder
  TABLE_NAME: "document_chunks", // LanceDB table name for storing chunks

  // Index state tracking
  INDEX_STATE_FILE_NAME: "index_state.json", // File to track indexed files and their states

  // Chunking configuration
  DEFAULT_CHUNK_SIZE: 1000, // Default chunk size in characters
  DEFAULT_CHUNK_OVERLAP: 200, // Default overlap between chunks

  // Processing limits
  MAX_CONCURRENT_FILES: 10, // Maximum files to process concurrently
  BATCH_SIZE: 50, // Number of chunks to process in a batch
} as const;

export type IndexerConfig = typeof INDEXER_CONFIG;
