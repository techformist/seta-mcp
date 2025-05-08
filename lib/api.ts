import fs from "fs/promises";
import path from "path";
import { LocalSearchResponse, LocalLibraryManifest, LocalSearchResultItem } from "./types.js";

let localDocsPath: string | undefined = process.env.LOCAL_DOCS_PATH;

// Function to set or update the docs path, e.g., after dotenv.config()
export function initializeLocalApi(docsPath?: string) {
  if (docsPath) {
    localDocsPath = docsPath;
  }
  if (!localDocsPath) {
    console.error(
      "LOCAL_DOCS_PATH environment variable is not set. Local documentation features will not work."
    );
  }
}


/**
 * Searches for local libraries matching the given query.
 * @param query The search query (matches against manifest name and description)
 * @returns Search results or null if the base path is not configured or an error occurs.
 */
export async function searchLocalLibraries(query: string): Promise<LocalSearchResponse | null> {
  if (!localDocsPath) {
    console.error("LOCAL_DOCS_PATH is not configured.");
    return { results: [] };
  }

  try {
    const Direntsoriginal = await fs.readdir(localDocsPath, { withFileTypes: true });
    const directories = Direntsoriginal.filter(dirent => dirent.isDirectory());
    const results: LocalSearchResultItem[] = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const dir of directories) {
      const manifestPath = path.join(localDocsPath, dir.name, "manifest.json");
      try {
        const manifestContent = await fs.readFile(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestContent) as LocalLibraryManifest;

        const nameMatch = manifest.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = manifest.description?.toLowerCase().includes(lowerCaseQuery);

        if (nameMatch || descriptionMatch) {
          results.push({
            id: dir.name, // Use directory name as ID
            name: manifest.name,
            description: manifest.description,
            stars: manifest.stars ?? -1,
            totalSnippets: manifest.totalSnippets ?? -1,
          });
        }
      } catch (err) {
        // Ignore directories without manifest.json or with malformed manifest
        // console.warn(`Skipping directory ${dir.name}: could not read or parse manifest.json`, err);
      }
    }
    return { results };
  } catch (error) {
    console.error("Error searching local libraries:", error);
    return null; // Or return { results: [] } to indicate an error but conform to type
  }
}

/**
 * Fetches documentation content for a specific local library.
 * @param libraryId The library ID (directory name) to fetch documentation for.
 * @param options Options for the request, including topic and character limit.
 * @returns The documentation text (possibly truncated) or null if not found or an error occurs.
 */
export async function fetchLocalLibraryDocumentation(
  libraryId: string,
  options: {
    topic?: string;
    tokens?: number; // Character limit
  } = {}
): Promise<string | null> {
  if (!localDocsPath) {
    console.error("LOCAL_DOCS_PATH is not configured.");
    return null;
  }

  const libPath = path.join(localDocsPath, libraryId);
  const manifestPath = path.join(libPath, "manifest.json");

  try {
    const manifestContent = await fs.readFile(manifestPath, "utf-8");
    const manifest = JSON.parse(manifestContent) as LocalLibraryManifest;

    let docFileName: string | undefined;

    if (options.topic && manifest.topics && manifest.topics[options.topic]) {
      docFileName = manifest.topics[options.topic];
    } else if (manifest.default_doc) {
      docFileName = manifest.default_doc;
    } else {
      console.warn(`No matching topic '${options.topic}' and no default_doc for library ${libraryId}.`);
      // Try to find any .md file as a fallback
      const filesInLib = await fs.readdir(libPath);
      docFileName = filesInLib.find(f => f.endsWith('.md') || f.endsWith('.txt'));
      if (!docFileName) {
        console.error(`No documentation file found for library ${libraryId}.`);
        return null;
      }
      console.warn(`Using fallback document: ${docFileName} for library ${libraryId}`);
    }

    const docFilePath = path.join(libPath, docFileName);
    let content = await fs.readFile(docFilePath, "utf-8");

    if (options.tokens && content.length > options.tokens) {
      content = content.substring(0, options.tokens);
    }

    return content;
  } catch (error) {
    console.error(`Error fetching local documentation for ${libraryId}:`, error);
    return null;
  }
}