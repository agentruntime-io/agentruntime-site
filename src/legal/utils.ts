import Slugger from "github-slugger";

/**
 * Extract heading anchors from markdown for table of contents.
 * Matches ## and ### style headers. Uses github-slugger to match rehype-slug IDs.
 */
export function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const lines = markdown.split("\n");
  const slugger = new Slugger();

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].replace(/\*\*/g, "").trim();
      const id = slugger.slug(rawText);
      headings.push({ level, text: rawText, id });
    }
  }

  return headings;
}
