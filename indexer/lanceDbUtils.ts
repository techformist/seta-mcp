import * as lancedb from "@lancedb/lancedb";
import { EmbeddedChunk } from "./types.js";
import { getEmbeddingDimension } from "./embeddingUtils.js";
import { logger } from "../lib/logger.js";

/**
 * Connect to LanceDB
 */
export async function connectToLanceDb(
  dbPath: string
): Promise<lancedb.Connection> {
  try {
    const db = await lancedb.connect(dbPath);
    return db;
  } catch (error) {
    console.error("Failed to connect to LanceDB:", error);
    throw error;
  }
}

/**
 * Define the schema for the document chunks table
 */
function getTableSchema() {
  const embeddingDim = getEmbeddingDimension();

  return {
    id: "string",
    libraryId: "string",
    topicName: "string",
    originalFilePath: "string",
    text: "string",
    order: "int32",
    embedding: `float32[${embeddingDim}]`,
    // Metadata fields
    difficulty: "string",
    use_cases: "string", // JSON string of array
    code_patterns: "string", // JSON string of array
    tags: "string", // JSON string of array
  };
}

/**
 * Open or create a table in LanceDB
 */
export async function openOrCreateTable(
  db: lancedb.Connection,
  tableName: string
): Promise<lancedb.Table> {
  try {
    // Check if table exists
    const tableNames = await db.tableNames();

    if (tableNames.includes(tableName)) {
      logger.info(`Opening existing table: ${tableName}`);
      return await db.openTable(tableName);
    } else {
      logger.info(`Creating new table: ${tableName}`);

      // Create table with initial empty data to establish schema
      const schema = getTableSchema();
      const initialData = [createEmptyRecord()];

      const table = await db.createTable(tableName, initialData);

      // Remove the initial empty record
      await table.delete("id = 'empty_record'");

      return table;
    }
  } catch (error) {
    console.error(`Failed to open/create table ${tableName}:`, error);
    throw error;
  }
}

/**
 * Create an empty record for table initialization
 */
function createEmptyRecord() {
  const embeddingDim = getEmbeddingDimension();
  return {
    id: "empty_record",
    libraryId: "",
    topicName: "",
    originalFilePath: "",
    text: "",
    order: 0,
    embedding: new Array(embeddingDim).fill(0),
    difficulty: "",
    use_cases: "[]",
    code_patterns: "[]",
    tags: "[]",
  };
}

/**
 * Convert EmbeddedChunk to table record format
 */
function chunkToRecord(chunk: EmbeddedChunk) {
  return {
    id: chunk.id,
    libraryId: chunk.libraryId,
    topicName: chunk.topicName || "",
    originalFilePath: chunk.originalFilePath,
    text: chunk.text,
    order: chunk.order,
    embedding: chunk.embedding,
    difficulty: chunk.metadata?.difficulty || "",
    use_cases: JSON.stringify(chunk.metadata?.use_cases || []),
    code_patterns: JSON.stringify(chunk.metadata?.code_patterns || []),
    tags: JSON.stringify(chunk.metadata?.tags || []),
  };
}

/**
 * Add chunks to the table
 */
export async function addChunksToTable(
  table: lancedb.Table,
  chunks: EmbeddedChunk[]
): Promise<void> {
  if (chunks.length === 0) {
    return;
  }

  try {
    const records = chunks.map(chunkToRecord);
    await table.add(records);
    logger.debug(`Added ${chunks.length} chunks to table`);
  } catch (error) {
    console.error("Failed to add chunks to table:", error);
    throw error;
  }
}

/**
 * Delete chunks by source file path
 */
export async function deleteChunksBySourceFile(
  table: lancedb.Table,
  sourceFilePath: string
): Promise<void> {
  try {
    await table.delete(`"originalFilePath" = '${sourceFilePath}'`);
    // Note: Removed console.log to avoid interfering with MCP stdio protocol
  } catch (error) {
    console.error(`Failed to delete chunks for file ${sourceFilePath}:`, error);
    throw error;
  }
}

/**
 * Search for similar chunks using vector similarity
 */
export async function searchSimilarChunks(
  table: lancedb.Table,
  queryEmbedding: number[],
  limit: number = 10,
  filters?: {
    libraryId?: string;
    difficulty?: string;
    topicName?: string;
  }
): Promise<any[]> {
  try {
    let query = table.search(queryEmbedding).limit(limit);

    // Apply filters if provided
    if (filters) {
      const whereConditions: string[] = [];

      if (filters.libraryId) {
        whereConditions.push(`libraryId = '${filters.libraryId}'`);
      }

      if (filters.difficulty) {
        whereConditions.push(`difficulty = '${filters.difficulty}'`);
      }

      if (filters.topicName) {
        whereConditions.push(`topicName = '${filters.topicName}'`);
      }

      if (whereConditions.length > 0) {
        query = query.where(whereConditions.join(" AND "));
      }
    }

    const results = await query.toArray();
    return results;
  } catch (error) {
    console.error("Failed to search similar chunks:", error);
    throw error;
  }
}

/**
 * Get table statistics
 */
export async function getTableStats(table: lancedb.Table): Promise<{
  totalChunks: number;
  uniqueLibraries: number;
  uniqueTopics: number;
}> {
  try {
    const allRecords = await table.search([]).limit(100000).toArray(); // Get all records

    const uniqueLibraries = new Set(allRecords.map((r) => r.libraryId)).size;
    const uniqueTopics = new Set(
      allRecords.map((r) => r.topicName).filter(Boolean)
    ).size;

    return {
      totalChunks: allRecords.length,
      uniqueLibraries,
      uniqueTopics,
    };
  } catch (error) {
    console.error("Failed to get table stats:", error);
    return {
      totalChunks: 0,
      uniqueLibraries: 0,
      uniqueTopics: 0,
    };
  }
}
