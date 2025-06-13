import { readFile } from "fs/promises";

import * as path from "path";

export async function extractPdfText(filePath: string): Promise<string> {
  try {
    // Dynamic import to handle pdfjs-dist properly
    const pdfjsLib = await import("pdfjs-dist");

    // Read PDF file as buffer
    const pdfBuffer = await readFile(filePath);
    const uint8Array = new Uint8Array(pdfBuffer);

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });

    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let fullText = "";

    // Extract text from each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Combine text items with proper spacing
      const pageText = textContent.items
        .map((item: any) => {
          // Handle text items with positioning for better formatting
          return item.str;
        })
        .join(" ")
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();

      if (pageText) {
        fullText += pageText + "\n\n";
      }
    }

    return fullText.trim();
  } catch (error) {
    console.error(`Error extracting text from PDF ${filePath}:`, error);
    throw error;
  }
}
