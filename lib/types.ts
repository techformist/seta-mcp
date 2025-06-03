export interface Topic {
  name: string;
  file: string;
  related?: string[];
  tags?: string[];
  prerequisites?: string[];
  leads_to?: string[];
  difficulty?: string;
  use_cases?: string[];
  code_patterns?: string[];
}

export interface LocalLibraryManifest {
  name: string;
  description?: string;
  version?: string;
  default_doc?: string; // e.g., "readme.md"
  topics: Topic[]; // Now only an array of Topic objects
  stars?: number;
  totalSnippets?: number;
  semantic_groups?: Record<string, string[]>;
  learning_paths?: Record<string, string[]>;
}

export interface LocalSearchResultItem {
  id: string; // Directory name, serves as the library ID
  name: string; // From manifest.name
  description?: string; // From manifest.description
  version?: string;
  stars?: number; // From manifest or default -1
  totalSnippets?: number; // From manifest or default -1
  topic_count?: number;
  available_difficulties?: string[];
  sample_use_cases?: string[];
  available_semantic_groups?: string[];
  available_learning_paths?: string[];
}

export interface LocalSearchResponse {
  results: LocalSearchResultItem[];
}
