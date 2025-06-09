import { createHash } from "crypto";
import fs from "fs-extra";
import path from "path";
import { IndexState, FileState } from "./types.js";
import { INDEXER_CONFIG } from "./config.js";

/**
 * Calculate SHA256 hash of a file
 */
export async function calculateFileHash(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8");
  return createHash("sha256").update(content).digest("hex");
}

/**
 * Get the last modified timestamp of a file
 */
export async function getFileLastModified(filePath: string): Promise<number> {
  const stats = await fs.stat(filePath);
  return stats.mtime.getTime();
}

/**
 * Load the index state from the database directory
 */
export async function loadIndexState(dbPath: string): Promise<IndexState> {
  const stateFilePath = path.join(dbPath, INDEXER_CONFIG.INDEX_STATE_FILE_NAME);

  try {
    if (await fs.pathExists(stateFilePath)) {
      const content = await fs.readFile(stateFilePath, "utf-8");
      return JSON.parse(content) as IndexState;
    }
  } catch (error) {
    console.warn(
      `Warning: Could not load index state from ${stateFilePath}:`,
      error,
    );
  }

  return {};
}

/**
 * Save the index state to the database directory
 */
export async function saveIndexState(
  dbPath: string,
  state: IndexState,
): Promise<void> {
  // Ensure the database directory exists
  await fs.ensureDir(dbPath);

  const stateFilePath = path.join(dbPath, INDEXER_CONFIG.INDEX_STATE_FILE_NAME);
  await fs.writeFile(stateFilePath, JSON.stringify(state, null, 2), "utf-8");
}

/**
 * Create a FileState object for a given file
 */
export async function createFileState(
  filePath: string,
  relativePath: string,
): Promise<FileState> {
  const [hash, lastModified] = await Promise.all([
    calculateFileHash(filePath),
    getFileLastModified(filePath),
  ]);

  return {
    filePath: relativePath,
    hash,
    lastModified,
  };
}

/**
 * Check if a file has changed compared to its stored state
 */
export function hasFileChanged(
  currentState: FileState,
  previousState?: FileState,
): boolean {
  if (!previousState) {
    return true; // New file
  }

  return (
    currentState.hash !== previousState.hash ||
    currentState.lastModified !== previousState.lastModified
  );
}
