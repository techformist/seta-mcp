export interface LocalLibraryManifest {
  name: string;
  description?: string;
  version?: string;
  default_doc?: string; // e.g., "readme.md"
  topics?: Record<string, string>; // e.g., { "getting-started": "docs/getting-started.md" }
  stars?: number;
  totalSnippets?: number;
}

export interface LocalSearchResultItem {
  id: string; // Directory name, serves as the library ID
  name: string; // From manifest.name
  description?: string; // From manifest.description
  stars?: number; // From manifest or default -1
  totalSnippets?: number; // From manifest or default -1
}

export interface LocalSearchResponse {
  results: LocalSearchResultItem[];
}
