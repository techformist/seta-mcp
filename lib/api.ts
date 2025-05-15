import fs from "fs/promises";
import path from "path";
import {
  LocalSearchResponse,
  LocalLibraryManifest,
  LocalSearchResultItem,
} from "./types.js";

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
export async function searchLocalLibraries(
  query: string
): Promise<LocalSearchResponse | null> {
  if (!localDocsPath) {
    console.error("LOCAL_DOCS_PATH is not configured.");
    return { results: [] };
  }

  try {
    const Direntsoriginal = await fs.readdir(localDocsPath, {
      withFileTypes: true,
    });
    const directories = Direntsoriginal.filter((dirent) =>
      dirent.isDirectory()
    );
    const results: LocalSearchResultItem[] = [];
    const lowerCaseQuery = query.toLowerCase();

    for (const dir of directories) {
      const manifestPath = path.join(localDocsPath, dir.name, "manifest.json");
      try {
        const manifestContent = await fs.readFile(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestContent);

        let topicMatch = false;
        if (Array.isArray(manifest.topics)) {
          for (const topic of manifest.topics as any[]) {
            if (
              (topic.name &&
                typeof topic.name === "string" &&
                topic.name.toLowerCase().includes(lowerCaseQuery)) ||
              (Array.isArray(topic.tags) &&
                (topic.tags as string[]).some((tag: string) =>
                  tag.toLowerCase().includes(lowerCaseQuery)
                ))
            ) {
              console.log("topicMatch", topic.name, topic.tags);
              topicMatch = true;
              break;
            }
          }
        }

        const nameMatch =
          manifest.name && manifest.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch =
          manifest.description &&
          manifest.description.toLowerCase().includes(lowerCaseQuery);

        if (nameMatch || descriptionMatch || topicMatch) {
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
    const manifest = JSON.parse(manifestContent);

    let docFileName: string | undefined;
    let allContent: string[] = [];

    if (options.topic && Array.isArray(manifest.topics)) {
      const searchTerm = options.topic.toLowerCase();
      // First try exact match
      let mainTopic = manifest.topics.find(
        (t: any) =>
          t.name.toLowerCase() === searchTerm ||
          (Array.isArray(t.tags) &&
            t.tags.some((tag: string) => tag.toLowerCase() === searchTerm))
      );

      // If no exact match, try partial match
      if (!mainTopic) {
        mainTopic = manifest.topics.find(
          (t: any) =>
            t.name.toLowerCase().includes(searchTerm) ||
            (Array.isArray(t.tags) &&
              t.tags.some(
                (tag: string) =>
                  tag.toLowerCase().includes(searchTerm) ||
                  searchTerm.includes(tag.toLowerCase())
              ))
        );
      }

      // First get the main topic content
      if (mainTopic && typeof mainTopic.file === "string") {
        const docFileName = mainTopic.file;
        const mainFilePath = path.join(libPath, docFileName);
        try {
          const mainContent = await fs.readFile(mainFilePath, "utf-8");
          allContent.push(
            `# ${mainTopic.name.toUpperCase()}\n\n${mainContent}`
          );

          // Then get content from related topics
          if (
            Array.isArray(mainTopic.related) &&
            mainTopic.related.length > 0
          ) {
            for (const relatedName of mainTopic.related) {
              const relatedTopic = manifest.topics.find(
                (t: any) => t.name.toLowerCase() === relatedName.toLowerCase()
              );
              if (relatedTopic && typeof relatedTopic.file === "string") {
                const relatedFilePath = path.join(libPath, relatedTopic.file);
                try {
                  const relatedContent = await fs.readFile(
                    relatedFilePath,
                    "utf-8"
                  );
                  allContent.push(
                    `\n\n# RELATED: ${relatedTopic.name.toUpperCase()}\n\n${relatedContent}`
                  );
                } catch (err) {
                  console.warn(
                    `Could not read related topic file: ${relatedTopic.file}`
                  );
                }
              }
            }
          }
        } catch (err) {
          console.warn(`Could not read main topic file: ${docFileName}`);
        }
      }
    }

    // If we found any content (main or related), return it
    if (allContent.length > 0) {
      let combinedContent = allContent.join("\n\n");
      if (options.tokens && combinedContent.length > options.tokens) {
        combinedContent = combinedContent.substring(0, options.tokens);
      }
      return combinedContent;
    }

    // Fallback to default_doc if no topic-specific content was found
    if (!docFileName && manifest.default_doc) {
      docFileName = manifest.default_doc;
    }

    if (!docFileName) {
      // Try to find any .md file as a fallback
      const filesInLib = await fs.readdir(libPath);
      docFileName = filesInLib.find(
        (f: string) => f.endsWith(".md") || f.endsWith(".txt")
      );
      if (!docFileName) {
        console.error(`No documentation file found for library ${libraryId}.`);
        return null;
      }
      console.warn(
        `Using fallback document: ${docFileName} for library ${libraryId}`
      );
    }

    // Read the fallback document if we didn't find topic-specific content
    const docFilePath = path.join(libPath, docFileName);
    let content = await fs.readFile(docFilePath, "utf-8");

    if (options.tokens && content.length > options.tokens) {
      content = content.substring(0, options.tokens);
    }

    return content;
  } catch (error) {
    console.error(
      `Error fetching local documentation for ${libraryId}:`,
      error
    );
    return null;
  }
}
