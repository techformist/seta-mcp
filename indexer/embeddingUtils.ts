import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";
import { INDEXER_CONFIG } from "./config.js";
import { logger } from "../lib/logger.js";

let embeddingPipeline: FeatureExtractionPipeline | null = null;

/**
 * Initialize the embedding model pipeline
 */
export async function initializeEmbeddingModel(): Promise<FeatureExtractionPipeline> {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  try {
    logger.info(`Loading embedding model: ${INDEXER_CONFIG.EMBEDDING_MODEL}`);
    embeddingPipeline = (await pipeline(
      "feature-extraction",
      INDEXER_CONFIG.EMBEDDING_MODEL,
      {
        // Use local cache to avoid re-downloading
        cache_dir: "./.cache/transformers",
      }
    )) as FeatureExtractionPipeline;

    logger.info("Embedding model loaded successfully");
    return embeddingPipeline;
  } catch (error) {
    console.error("❌ Failed to initialize embedding model:", error);
    throw error;
  }
}

/**
 * Generate embedding for a chunk of text
 */
export async function generateEmbeddingForChunk(
  chunkText: string,
  modelPipeline: FeatureExtractionPipeline
): Promise<number[]> {
  try {
    // Clean and prepare the text
    const cleanText = chunkText.trim().replace(/\s+/g, " ");

    if (cleanText.length === 0) {
      throw new Error("Empty text provided for embedding");
    }

    // Generate embedding
    const result = await modelPipeline(cleanText, {
      pooling: "mean",
      normalize: true,
    });

    // Extract the embedding array
    let embedding: number[];
    if (result && result.data) {
      embedding = Array.from(result.data);
    } else if (Array.isArray(result)) {
      embedding = result;
    } else {
      throw new Error("Unexpected embedding result format");
    }

    if (!embedding || embedding.length === 0) {
      throw new Error("Generated embedding is empty");
    }

    return embedding;
  } catch (error) {
    console.error(
      "Error generating embedding for text:",
      chunkText.substring(0, 100) + "..."
    );
    throw error;
  }
}

/**
 * Generate embeddings for multiple chunks in batch
 */
export async function generateEmbeddingsForChunks(
  chunks: string[],
  modelPipeline: FeatureExtractionPipeline
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < chunks.length; i++) {
    try {
      const embedding = await generateEmbeddingForChunk(
        chunks[i],
        modelPipeline
      );
      embeddings.push(embedding);

      // Note: Progress logging removed to avoid MCP protocol interference
    } catch (error) {
      console.error(`Failed to generate embedding for chunk ${i}:`, error);
      // Use a zero vector as fallback
      const fallbackEmbedding = new Array(384).fill(0); // all-MiniLM-L6-v2 has 384 dimensions
      embeddings.push(fallbackEmbedding);
    }
  }

  return embeddings;
}

/**
 * Get the embedding dimension for the current model
 */
export function getEmbeddingDimension(): number {
  // all-MiniLM-L6-v2 produces 384-dimensional embeddings
  return 384;
}
