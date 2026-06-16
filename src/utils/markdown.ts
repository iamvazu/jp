import fs from 'fs';
import path from 'path';

export interface ArticleMetadata {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords?: string[];
  category: string;
  internal_links?: string[];
}

export interface ParsedArticle {
  metadata: ArticleMetadata;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  toc: { text: string; id: string; level: number }[];
}

export function getArticleSlugs(): string[] {
  const articlesDir = path.join(process.cwd(), 'content/articles');
  if (!fs.existsSync(articlesDir)) return [];
  const files = fs.readdirSync(articlesDir);
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
}

export function getArticleBySlug(slug: string): ParsedArticle | null {
  try {
    const articlesDir = path.join(process.cwd(), 'content/articles');
    const filePath = path.join(articlesDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const rawContent = fs.readFileSync(filePath, 'utf8');
    return parseMarkdownArticle(rawContent);
  } catch (e) {
    console.error(`Error reading article ${slug}:`, e);
    return null;
  }
}

export function getAllArticles(): (ArticleMetadata & { summary: string })[] {
  const slugs = getArticleSlugs();
  const articles: (ArticleMetadata & { summary: string })[] = [];

  slugs.forEach(slug => {
    const parsed = getArticleBySlug(slug);
    if (parsed) {
      // Create a short summary from the first paragraph of HTML content
      const summaryMatch = parsed.contentHtml.match(/<p[^>]*>(.*?)<\/p>/);
      const summary = summaryMatch 
        ? summaryMatch[1].replace(/<[^>]*>/g, '').slice(0, 160) + '...'
        : parsed.metadata.meta_description;

      articles.push({
        ...parsed.metadata,
        summary
      });
    }
  });

  return articles;
}

function parseMarkdownArticle(rawContent: string): ParsedArticle {
  const parts = rawContent.split('---');
  if (parts.length < 3) {
    throw new Error('Invalid markdown format. Missing frontmatter dividers.');
  }

  // 1. Parse Frontmatter
  const yamlContent = parts[1];
  const metadata: Partial<ArticleMetadata> = {};
  yamlContent.split('\n').forEach(line => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('#')) return;

    const colonIndex = cleanLine.indexOf(':');
    if (colonIndex === -1) return;

    const key = cleanLine.substring(0, colonIndex).trim();
    let val = cleanLine.substring(colonIndex + 1).trim();

    // Remove surrounding quotes if present
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    if (key === 'internal_links' || key === 'secondary_keywords') {
      // Parse array format e.g. ["/link1", "/link2"]
      try {
        const cleanedVal = val.replace(/'/g, '"');
        (metadata as any)[key] = JSON.parse(cleanedVal);
      } catch (e) {
        // Fallback simple split
        (metadata as any)[key] = val.replace(/[\[\]"]/g, '').split(',').map(s => s.trim());
      }
    } else {
      (metadata as any)[key] = val;
    }
  });

  // 2. Parse Content
  const bodyContent = parts.slice(2).join('---').trim();
  const faqs: { question: string; answer: string }[] = [];
  const toc: { text: string; id: string; level: number }[] = [];

  // Extract FAQs section first
  let mainBody = bodyContent;
  const faqStartIndex = bodyContent.indexOf('### FAQ');
  const faqStartIndexAlt = bodyContent.indexOf('## FAQ');
  const faqIndex = faqStartIndex !== -1 ? faqStartIndex : faqStartIndexAlt;

  if (faqIndex !== -1) {
    mainBody = bodyContent.substring(0, faqIndex).trim();
    const faqSection = bodyContent.substring(faqIndex);
    
    // Parse FAQ Q&A blocks: **Question** followed by Answer
    const faqLines = faqSection.split('\n');
    let currentQ = '';
    let currentA = '';
    
    faqLines.forEach(line => {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('**') && cleanLine.endsWith('**')) {
        if (currentQ && currentA) {
          faqs.push({ question: currentQ, answer: currentA.trim() });
          currentA = '';
        }
        currentQ = cleanLine.slice(2, -2);
      } else if (cleanLine && !cleanLine.startsWith('#') && !cleanLine.startsWith('---')) {
        currentA += ' ' + cleanLine;
      }
    });
    if (currentQ && currentA) {
      faqs.push({ question: currentQ, answer: currentA.trim() });
    }
  }

  // Parse markdown content line-by-line
  const lines = mainBody.split('\n');
  let inList = false;
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let htmlLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();

    // Handle Lists
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        inList = true;
        htmlLines.push('<ul className="space-y-3 my-6 font-sans text-sm text-ink/80">');
      }
      const itemContent = parseInlineMarkdown(trimmed.substring(2));
      htmlLines.push(`  <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-swan-red">${itemContent}</li>`);
      continue;
    } else {
      if (inList) {
        inList = false;
        htmlLines.push('</ul>');
      }
    }

    // Handle Tables
    if (trimmed.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeaders = trimmed.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        // Skip separator line in markdown table
        i++; 
        tableRows = [];
        continue;
      } else {
        const rowCells = trimmed.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (rowCells.length > 0) {
          tableRows.push(rowCells);
        }
        continue;
      }
    } else {
      if (inTable) {
        inTable = false;
        // Output compiled HTML table
        htmlLines.push('<div className="overflow-x-auto border border-ink/10 rounded-xs my-8 bg-white shadow-3xs">');
        htmlLines.push('  <table className="w-full text-left border-collapse text-xs">');
        htmlLines.push('    <thead>');
        htmlLines.push('      <tr className="bg-ink text-paper font-mono uppercase tracking-wider text-[10px] border-b border-ink/15">');
        tableHeaders.forEach(header => {
          htmlLines.push(`        <th className="p-3">${header}</th>`);
        });
        htmlLines.push('      </tr>');
        htmlLines.push('    </thead>');
        htmlLines.push('    <tbody className="divide-y divide-ink/5 font-mono">');
        tableRows.forEach((row, rIdx) => {
          htmlLines.push(`      <tr className="${rIdx % 2 === 1 ? 'bg-paper/50' : 'bg-white'} hover:bg-sky/10 transition-colors">`);
          row.forEach(cell => {
            const parsedCell = parseInlineMarkdown(cell);
            htmlLines.push(`        <td className="p-3">${parsedCell}</td>`);
          });
          htmlLines.push('      </tr>');
        });
        htmlLines.push('    </tbody>');
        htmlLines.push('  </table>');
        htmlLines.push('</div>');
      }
    }

    // Handle Headings & TOC
    if (trimmed.startsWith('# ')) {
      // Root heading (H1) - skip rendering inline since route renders H1 separately, but we parse it just in case
      const text = trimmed.substring(2);
      htmlLines.push(`<h1 className="font-display font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight mb-6 mt-2 border-b border-ink/10 pb-4">${parseInlineMarkdown(text)}</h1>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      const text = trimmed.substring(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ text, id, level: 2 });
      htmlLines.push(`<h2 id="${id}" className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider mt-10 mb-4 border-b border-ink/5 pb-2">${parseInlineMarkdown(text)}</h2>`);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.substring(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ text, id, level: 3 });
      htmlLines.push(`<h3 id="${id}" className="font-display font-bold text-sm uppercase text-ink tracking-wider mt-6 mb-3">${parseInlineMarkdown(text)}</h3>`);
      continue;
    }

    // Handle Paragraphs
    if (trimmed) {
      const parsedPara = parseInlineMarkdown(trimmed);
      htmlLines.push(`<p className="text-sm text-ink/80 leading-relaxed font-sans mb-5">${parsedPara}</p>`);
    } else {
      htmlLines.push('<div className="h-4" />');
    }
  }

  // Cleanup lists/tables at EOF
  if (inList) htmlLines.push('</ul>');
  if (inTable) {
    htmlLines.push('</table></div>');
  }

  return {
    metadata: metadata as ArticleMetadata,
    contentHtml: htmlLines.join('\n'),
    faqs,
    toc
  };
}

function parseInlineMarkdown(text: string): string {
  let result = text;
  
  // Bold: **text**
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-ink">$1</strong>');
  
  // Monospace: `code`
  result = result.replace(/`(.*?)`/g, '<code className="font-mono bg-ink/5 px-1.5 py-0.5 rounded text-[11px] font-bold text-cobalt">$1</code>');
  
  // Links: [text](href)
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-cobalt hover:text-swan-red hover:underline font-mono text-xs uppercase font-bold">$1</a>');

  return result;
}
