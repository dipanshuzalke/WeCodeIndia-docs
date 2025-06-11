import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MDXData {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  content: string;
  frontmatter: Record<string, any>;
}

const docsDirectory = path.join(process.cwd(), 'app/docs');

export function getAllMDXFiles(dir = docsDirectory): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

export function getMDXData(filePath: string): MDXData {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Get slug from file path
  const relativePath = path.relative(docsDirectory, filePath);
  const slug = path.dirname(relativePath);
  
  return {
    slug: slug === '.' ? '' : slug,
    title: data.title || extractTitleFromContent(content),
    description: data.description,
    date: data.date,
    tags: data.tags,
    content,
    frontmatter: data,
  };
}

function extractTitleFromContent(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

export function getAllMDXData(): MDXData[] {
  const files = getAllMDXFiles();
  const mdxData = files.map(getMDXData);
  
  return mdxData.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
}