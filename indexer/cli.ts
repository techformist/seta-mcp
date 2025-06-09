#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import { INDEXER_CONFIG } from "./config.js";
import { ProcessingStats } from "./types.js";
import { loadIndexState, saveIndexState } from "./fileUtils.js";
import { getAllDocumentationFiles } from "./documentProcessor.js";
import { initializeEmbeddingModel } from "./embeddingUtils.js";
import { connectToLanceDb, openOrCreateTable } from "./lanceDbUtils.js";
import { processDocumentationFiles } from "./indexingWorkflow.js";

const program = new Command();

program
  .name("seta-indexer")
  .description("Index Salesforce documentation for semantic search")
  .version("0.2.0")
  .argument("<folder_name>", "Path to the documentation folder to index")
  .option("-v, --verbose", "Enable verbose logging")
  .option("--force", "Force re-indexing of all files")
  .option(
    "--chunk-size <size>",
    "Chunk size in characters",
    String(INDEXER_CONFIG.DEFAULT_CHUNK_SIZE)
  )
  .option(
    "--chunk-overlap <overlap>",
    "Chunk overlap in characters",
    String(INDEXER_CONFIG.DEFAULT_CHUNK_OVERLAP)
  )
  .action(async (folderName: string, options) => {
    const startTime = Date.now();

    try {
      console.log(`🚀 Starting indexing process for: ${folderName}`);

      // Resolve and validate the documentation folder path
      const docsPath = path.resolve(folderName);
      if (!(await fs.pathExists(docsPath))) {
        console.error(
          `❌ Error: Documentation folder does not exist: ${docsPath}`
        );
        process.exit(1);
      }

      if (options.verbose) {
        console.log(`📁 Documentation path: ${docsPath}`);
      }

      // Determine LanceDB path
      const dbPath = path.join(docsPath, INDEXER_CONFIG.LANCEDB_SUBDIR);
      if (options.verbose) {
        console.log(`🗄️  Database path: ${dbPath}`);
      }

      // Load existing index state
      console.log("📋 Loading existing index state...");
      const existingState = options.force ? {} : await loadIndexState(dbPath);

      // Get all documentation files
      console.log("🔍 Scanning documentation files...");
      const documentFiles = await getAllDocumentationFiles(docsPath);
      console.log(`📄 Found ${documentFiles.length} documentation files`);

      if (documentFiles.length === 0) {
        console.log("ℹ️  No documentation files found. Nothing to index.");
        return;
      }

      // Initialize embedding model
      console.log("🧠 Initializing embedding model...");
      const embeddingPipeline = await initializeEmbeddingModel();

      // Connect to LanceDB
      console.log("🔗 Connecting to LanceDB...");
      const db = await connectToLanceDb(dbPath);
      const table = await openOrCreateTable(db, INDEXER_CONFIG.TABLE_NAME);

      // Process files
      console.log("⚙️  Processing documentation files...");
      const stats = await processDocumentationFiles({
        documentFiles,
        existingState,
        docsPath,
        dbPath,
        table,
        embeddingPipeline,
        options: {
          verbose: options.verbose,
          chunkSize: parseInt(options.chunkSize),
          chunkOverlap: parseInt(options.chunkOverlap),
        },
      });

      // Print summary
      const totalTime = Date.now() - startTime;
      console.log("\n✅ Indexing completed successfully!");
      console.log("📊 Summary:");
      console.log(`   • Total files: ${stats.totalFiles}`);
      console.log(`   • New files: ${stats.newFiles}`);
      console.log(`   • Changed files: ${stats.changedFiles}`);
      console.log(`   • Unchanged files: ${stats.unchangedFiles}`);
      console.log(`   • Deleted files: ${stats.deletedFiles}`);
      console.log(`   • Total chunks: ${stats.totalChunks}`);
      console.log(`   • Processing time: ${(totalTime / 1000).toFixed(2)}s`);
    } catch (error) {
      console.error("❌ Error during indexing:", error);
      process.exit(1);
    }
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Parse command line arguments
program.parse();

export default program;
