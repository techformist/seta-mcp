import fs from "fs-extra";
import path from "path";
import { FeatureExtractionPipeline } from "@xenova/transformers";
import * as lancedb from "@lancedb/lancedb";

import {
  DocumentFile,
  IndexState,
  ProcessingStats,
  DocumentChunk,
  EmbeddedChunk,
} from "./types.js";
import { INDEXER_CONFIG } from "./config.js";
import {
  createFileState,
  hasFileChanged,
  saveIndexState,
} from "./fileUtils.js";
import { chunkDocument } from "./documentProcessor.js";
import { generateEmbeddingForChunk } from "./embeddingUtils.js";
import { addChunksToTable, deleteChunksBySourceFile } from "./lanceDbUtils.js";

interface ProcessingOptions {
  verbose: boolean;
  chunkSize: number;
  chunkOverlap: number;
}

interface WorkflowParams {
  documentFiles: DocumentFile[];
  existingState: IndexState;
  docsPath: string;
  dbPath: string;
  table: lancedb.Table;
  embeddingPipeline: FeatureExtractionPipeline;
  options: ProcessingOptions;
}

/**
 * Main workflow for processing documentation files
 */
export async function processDocumentationFiles(
  params: WorkflowParams
): Promise<ProcessingStats> {
  const {
    documentFiles,
    existingState,
    docsPath,
    dbPath,
    table,
    embeddingPipeline,
    options,
  } = params;

  const stats: ProcessingStats = {
    totalFiles: documentFiles.length,
    newFiles: 0,
    changedFiles: 0,
    unchangedFiles: 0,
    deletedFiles: 0,
    totalChunks: 0,
    processingTimeMs: 0,
  };

  const startTime = Date.now();
  const newState: IndexState = {};

  // Track which files from the old state are still present
  const normalizePath = (p: string) => p.replace(/\\/g, "/").toLowerCase();
  const currentFilePaths = new Set(
    documentFiles.map((f) => normalizePath(f.relativePath))
  );

  // Debug output for deletion detection
  console.log(
    "Existing state keys:",
    Object.keys(existingState).map(normalizePath)
  );
  console.log("Current file paths:", Array.from(currentFilePaths));

  // Process current files
  for (let i = 0; i < documentFiles.length; i++) {
    const docFile = documentFiles[i];

    if (options.verbose) {
      console.log(
        `\n📄 Processing file ${i + 1}/${documentFiles.length}: ${docFile.relativePath}`
      );
    } else {
      // Show progress for non-verbose mode
      if (
        documentFiles.length > 5 &&
        (i + 1) % Math.ceil(documentFiles.length / 10) === 0
      ) {
        console.log(
          `   Progress: ${i + 1}/${documentFiles.length} files processed`
        );
      }
    }

    try {
      // Create current file state
      const currentFileState = await createFileState(
        docFile.filePath,
        docFile.relativePath
      );

      const previousFileState = existingState[docFile.relativePath];
      const fileHasChanged = hasFileChanged(
        currentFileState,
        previousFileState
      );

      if (fileHasChanged) {
        if (previousFileState) {
          stats.changedFiles++;
          if (options.verbose) {
            console.log(`   🔄 File changed, re-processing...`);
          }
          // Delete existing chunks for this file
          await deleteChunksBySourceFile(table, docFile.relativePath);
        } else {
          stats.newFiles++;
          if (options.verbose) {
            console.log(`   🆕 New file, processing...`);
          }
        }

        // Process the file
        const chunks = await processFile(
          docFile,
          embeddingPipeline,
          options.chunkSize,
          options.chunkOverlap,
          options.verbose
        );

        if (chunks.length > 0) {
          await addChunksToTable(table, chunks);
          stats.totalChunks += chunks.length;
        }
      } else {
        stats.unchangedFiles++;
        if (options.verbose) {
          console.log(`   ✅ File unchanged, skipping...`);
        }
      }

      // Add to new state
      newState[docFile.relativePath] = currentFileState;
    } catch (error) {
      console.error(`❌ Error processing file ${docFile.relativePath}:`, error);
      // Continue with other files
    }
  }

  // Handle deleted files
  for (const oldFilePath of Object.keys(existingState)) {
    if (!currentFilePaths.has(normalizePath(oldFilePath))) {
      stats.deletedFiles++;
      if (options.verbose) {
        console.log(`\n🗑️  File deleted: ${oldFilePath}`);
      }
      try {
        await deleteChunksBySourceFile(table, oldFilePath);
      } catch (error) {
        console.error(`Error deleting chunks for ${oldFilePath}:`, error);
      }
    }
  }

  // Save the new state
  await saveIndexState(dbPath, newState);

  stats.processingTimeMs = Date.now() - startTime;
  return stats;
}

/**
 * Process a single file: read, chunk, embed, and return embedded chunks
 */
async function processFile(
  docFile: DocumentFile,
  embeddingPipeline: FeatureExtractionPipeline,
  chunkSize: number,
  chunkOverlap: number,
  verbose: boolean
): Promise<EmbeddedChunk[]> {
  try {
    // For _semantic_only files, let chunkDocument handle content reading
    // For regular library files, read content as before
    let content: string | undefined;

    if (docFile.libraryId === "_semantic_only") {
      // Let chunkDocument read and process the file content
      const chunks = await chunkDocument(
        docFile.filePath,
        undefined, // No content provided - will be read by chunkDocument
        docFile.libraryId,
        docFile.topicName,
        chunkSize,
        chunkOverlap
      );

      if (chunks.length === 0) {
        if (verbose) {
          console.log(`   ⚠️  No chunks generated, skipping...`);
        }
        return [];
      }

      if (verbose) {
        console.log(`   📝 Generated ${chunks.length} chunks`);
      }

      // Generate embeddings for chunks
      const embeddedChunks: EmbeddedChunk[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        try {
          const embedding = await generateEmbeddingForChunk(
            chunk.text,
            embeddingPipeline
          );

          embeddedChunks.push({
            ...chunk,
            embedding,
          });

          if (verbose && chunks.length > 5 && (i + 1) % 5 === 0) {
            console.log(
              `     Generated embeddings for ${i + 1}/${chunks.length} chunks`
            );
          }
        } catch (error) {
          console.error(
            `   ❌ Failed to generate embedding for chunk ${i}:`,
            error
          );
          // Skip this chunk rather than failing the entire file
        }
      }

      if (verbose) {
        console.log(`   ✅ Generated ${embeddedChunks.length} embedded chunks`);
      }

      return embeddedChunks;
    } else {
      // Regular library file processing
      content = await fs.readFile(docFile.filePath, "utf-8");

      if (content.trim().length === 0) {
        if (verbose) {
          console.log(`   ⚠️  File is empty, skipping...`);
        }
        return [];
      }

      // Chunk the document
      const chunks = await chunkDocument(
        docFile.filePath,
        content,
        docFile.libraryId,
        docFile.topicName,
        chunkSize,
        chunkOverlap
      );

      if (chunks.length === 0) {
        if (verbose) {
          console.log(`   ⚠️  No chunks generated, skipping...`);
        }
        return [];
      }

      if (verbose) {
        console.log(`   📝 Generated ${chunks.length} chunks`);
      }

      // Generate embeddings for chunks
      const embeddedChunks: EmbeddedChunk[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        try {
          const embedding = await generateEmbeddingForChunk(
            chunk.text,
            embeddingPipeline
          );

          embeddedChunks.push({
            ...chunk,
            embedding,
          });

          if (verbose && chunks.length > 5 && (i + 1) % 5 === 0) {
            console.log(
              `     Generated embeddings for ${i + 1}/${chunks.length} chunks`
            );
          }
        } catch (error) {
          console.error(
            `   ❌ Failed to generate embedding for chunk ${i}:`,
            error
          );
          // Skip this chunk rather than failing the entire file
        }
      }

      if (verbose) {
        console.log(`   ✅ Generated ${embeddedChunks.length} embedded chunks`);
      }

      return embeddedChunks;
    }
  } catch (error) {
    console.error(`Error processing file ${docFile.relativePath}:`, error);
    return [];
  }
}

/**
 * Process files in batches to manage memory usage
 */
export async function processFilesInBatches(
  params: WorkflowParams
): Promise<ProcessingStats> {
  const { documentFiles, options } = params;
  const batchSize = INDEXER_CONFIG.MAX_CONCURRENT_FILES;

  if (documentFiles.length <= batchSize) {
    return processDocumentationFiles(params);
  }

  console.log(
    `📦 Processing ${documentFiles.length} files in batches of ${batchSize}`
  );

  const stats: ProcessingStats = {
    totalFiles: documentFiles.length,
    newFiles: 0,
    changedFiles: 0,
    unchangedFiles: 0,
    deletedFiles: 0,
    totalChunks: 0,
    processingTimeMs: 0,
  };

  const startTime = Date.now();

  for (let i = 0; i < documentFiles.length; i += batchSize) {
    const batch = documentFiles.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(documentFiles.length / batchSize);

    console.log(
      `\n📦 Processing batch ${batchNum}/${totalBatches} (${batch.length} files)`
    );

    const batchParams = {
      ...params,
      documentFiles: batch,
    };

    const batchStats = await processDocumentationFiles(batchParams);

    // Aggregate stats
    stats.newFiles += batchStats.newFiles;
    stats.changedFiles += batchStats.changedFiles;
    stats.unchangedFiles += batchStats.unchangedFiles;
    stats.totalChunks += batchStats.totalChunks;
  }

  // Handle deleted files (only need to do this once)
  const currentFilePaths = new Set(documentFiles.map((f) => f.relativePath));
  for (const oldFilePath of Object.keys(params.existingState)) {
    if (!currentFilePaths.has(oldFilePath)) {
      stats.deletedFiles++;
      try {
        await deleteChunksBySourceFile(params.table, oldFilePath);
      } catch (error) {
        console.error(`Error deleting chunks for ${oldFilePath}:`, error);
      }
    }
  }

  stats.processingTimeMs = Date.now() - startTime;
  return stats;
}
