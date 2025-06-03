import { LocalSearchResponse, LocalSearchResultItem } from "./types.js";

/**
 * Formats a local search result item into a human-readable string representation.
 * Shows comprehensive metadata including new fields for difficulties, use cases, semantic groups, and learning paths.
 *
 * @param result The LocalSearchResultItem object to format
 * @returns A formatted string with library information
 */
export function formatSearchResult(result: LocalSearchResultItem): string {
  const formattedResult = [
    `- Name: ${result.name}${result.version ? ` (Version: ${result.version})` : ""}`,
    `- Local Library ID: ${result.id}`,
    `- Description: ${result.description || "N/A"}`,
    `- Topics: ${result.topic_count || 0}`,
  ];

  if (result.available_difficulties?.length) {
    formattedResult.push(
      `- Available Difficulties: ${result.available_difficulties.join(", ")}`,
    );
  }

  if (result.sample_use_cases?.length) {
    formattedResult.push(
      `- Sample Use Cases: ${result.sample_use_cases.slice(0, 3).join("; ")}`,
    );
  }

  if (result.available_semantic_groups?.length) {
    formattedResult.push(
      `- Semantic Groups: ${result.available_semantic_groups.join(", ")}`,
    );
  }

  if (result.available_learning_paths?.length) {
    formattedResult.push(
      `- Learning Paths: ${result.available_learning_paths.join(", ")}`,
    );
  }

  if (result.totalSnippets !== -1 && result.totalSnippets !== undefined) {
    formattedResult.push(`- Code Snippets: ${result.totalSnippets}`);
  }

  if (result.stars !== -1 && result.stars !== undefined) {
    formattedResult.push(`- GitHub Stars: ${result.stars}`);
  }

  return formattedResult.join("\n");
}

/**
 * Formats a local search response into a human-readable string representation.
 * Each result is formatted using formatSearchResult.
 *
 * @param searchResponse The LocalSearchResponse object to format
 * @returns A formatted string with search results
 */
export function formatSearchResults(
  searchResponse: LocalSearchResponse,
): string {
  if (!searchResponse.results || searchResponse.results.length === 0) {
    return "No local documentation libraries found matching your query.";
  }

  const formattedResults = searchResponse.results.map(formatSearchResult);
  return formattedResults.join("\n---\n");
}
