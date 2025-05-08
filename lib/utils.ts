import { LocalSearchResponse, LocalSearchResultItem } from "./types.js";

/**
 * Formats a local search result item into a human-readable string representation.
 * Only shows code snippet count and GitHub stars when available (not equal to -1 or undefined).
 *
 * @param result The LocalSearchResultItem object to format
 * @returns A formatted string with library information
 */
export function formatSearchResult(result: LocalSearchResultItem): string {
  const formattedResult = [
    `- Name: ${result.name}`, // Changed from Title to Name
    `- Local Library ID: ${result.id}`, // Clarified ID type
    `- Description: ${result.description || "N/A"}`,
  ];

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
export function formatSearchResults(searchResponse: LocalSearchResponse): string {
  if (!searchResponse.results || searchResponse.results.length === 0) {
    return "No local documentation libraries found matching your query.";
  }

  const formattedResults = searchResponse.results.map(formatSearchResult);
  return formattedResults.join("\n---\n");
}