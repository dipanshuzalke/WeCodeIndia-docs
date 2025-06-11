'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Hash, Code, BookOpen, Zap } from 'lucide-react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchResult {
  title: string;
  href: string;
  content: string;
  category: string;
  type: 'page' | 'heading' | 'component' | 'api' | 'code';
  tags?: string[];
  excerpt?: string;
}

// Comprehensive search data including MDX content
const searchData: SearchResult[] = [
  // Getting Started
  {
    title: 'Introduction',
    href: '/docs',
    content: 'Welcome to our comprehensive documentation hub! This guide will help you get started with our platform and make the most of its powerful features. Documentation Hub modern developer-friendly platform creating maintaining documentation effortless APIs guides tutorials',
    category: 'Getting Started',
    type: 'page',
    tags: ['intro', 'welcome', 'overview'],
    excerpt: 'Get started with our comprehensive documentation system'
  },
  {
    title: 'Installation',
    href: '/docs/installation',
    content: 'Get started with Documentation Hub by installing the necessary packages and setting up your development environment. Prerequisites Node.js npm yarn package manager Git version control',
    category: 'Getting Started',
    type: 'page',
    tags: ['install', 'setup', 'npm', 'yarn'],
    excerpt: 'Learn how to install and set up the project'
  },
  {
    title: 'Quick Start',
    href: '/docs/quick-start',
    content: 'Get up and running with Documentation Hub in just a few minutes. Create your first page MDX file navigation components alerts cards badges code highlighting',
    category: 'Getting Started',
    type: 'page',
    tags: ['quickstart', 'tutorial', 'first-steps'],
    excerpt: 'Jump right in with our quick start guide'
  },

  // Components
  {
    title: 'Components Overview',
    href: '/docs/components',
    content: 'Documentation Hub comes with a comprehensive set of pre-built components that you can use in your MDX files to create rich, interactive documentation. Card Alert Badge Button layout typography',
    category: 'Components',
    type: 'page',
    tags: ['components', 'ui', 'mdx'],
    excerpt: 'Explore our comprehensive component library'
  },
  {
    title: 'Card Component',
    href: '/docs/components#cards',
    content: 'Cards are perfect for organizing content into digestible sections. Basic card advanced features title description content area MDX nested components',
    category: 'Components',
    type: 'component',
    tags: ['card', 'container', 'layout'],
    excerpt: 'Container component for organizing content'
  },
  {
    title: 'Alert Component',
    href: '/docs/components#alerts',
    content: 'Use alerts to draw attention to important information. Info alert warning alert success alert type prop children content',
    category: 'Components',
    type: 'component',
    tags: ['alert', 'notification', 'message'],
    excerpt: 'Display important messages and notifications'
  },
  {
    title: 'Badge Component',
    href: '/docs/components#badges',
    content: 'Badges are great for labeling and categorization. Default secondary outline destructive variant prop',
    category: 'Components',
    type: 'component',
    tags: ['badge', 'label', 'tag'],
    excerpt: 'Small labels for categorization and status'
  },
  {
    title: 'Button Component',
    href: '/docs/components#buttons',
    content: 'Interactive buttons for calls-to-action. Primary secondary outline ghost variant size onClick disabled',
    category: 'Components',
    type: 'component',
    tags: ['button', 'interactive', 'action'],
    excerpt: 'Interactive elements for actions and navigation'
  },

  // API Reference
  {
    title: 'API Reference',
    href: '/docs/api',
    content: 'Complete API reference for Documentation Hub. This section covers all available methods, components, and configuration options. DocumentationHub class constructor options methods',
    category: 'API Reference',
    type: 'page',
    tags: ['api', 'reference', 'methods'],
    excerpt: 'Complete API reference and documentation'
  },
  {
    title: 'DocumentationHub Class',
    href: '/docs/api#documentationhub-class',
    content: 'The main class for initializing and configuring your documentation site. Constructor options theme search navigation seo initialize setTheme search methods',
    category: 'API Reference',
    type: 'api',
    tags: ['class', 'constructor', 'methods'],
    excerpt: 'Main class for documentation configuration'
  },
  {
    title: 'Component API',
    href: '/docs/api#component-api',
    content: 'A flexible container component for organizing content. Props title description children className examples',
    category: 'API Reference',
    type: 'api',
    tags: ['component-api', 'props', 'examples'],
    excerpt: 'API reference for components'
  },
  {
    title: 'Configuration API',
    href: '/docs/api#configuration-api',
    content: 'Configure the sidebar navigation structure. NavigationConfig sections items title href icon SearchConfig SEOConfig',
    category: 'API Reference',
    type: 'api',
    tags: ['config', 'navigation', 'search', 'seo'],
    excerpt: 'Configuration options and settings'
  },

  // Examples
  {
    title: 'Examples',
    href: '/docs/examples',
    content: 'Real-world examples and implementation patterns for Documentation Hub. Learn by seeing practical applications of the concepts and components. Basic documentation page advanced layout code examples',
    category: 'Examples',
    type: 'page',
    tags: ['examples', 'patterns', 'implementation'],
    excerpt: 'See real-world usage examples'
  },
  {
    title: 'Basic Documentation Page',
    href: '/docs/examples#basic-documentation-page',
    content: 'Complete example of a well-structured documentation page. User Management API authentication create user status codes',
    category: 'Examples',
    type: 'code',
    tags: ['example', 'documentation', 'structure'],
    excerpt: 'Example of a complete documentation page'
  },
  {
    title: 'Advanced Layout Example',
    href: '/docs/examples#advanced-layout-example',
    content: 'How to create a complex page with multiple sections. Quick start resources grid layout cards badges',
    category: 'Examples',
    type: 'code',
    tags: ['layout', 'advanced', 'grid'],
    excerpt: 'Complex page layouts and structures'
  },
  {
    title: 'Code Examples with Multiple Languages',
    href: '/docs/examples#code-examples-with-multiple-languages',
    content: 'JavaScript Node.js Python cURL syntax highlighting code blocks fetch API requests error handling',
    category: 'Examples',
    type: 'code',
    tags: ['code', 'javascript', 'python', 'curl'],
    excerpt: 'Multi-language code examples'
  },
  {
    title: 'Error Handling Examples',
    href: '/docs/examples#error-handling-examples',
    content: 'Comprehensive error handling APIError class try catch network errors validation errors user exists',
    category: 'Examples',
    type: 'code',
    tags: ['error-handling', 'api', 'validation'],
    excerpt: 'Robust error handling patterns'
  },

  // Code snippets and technical content
  {
    title: 'MDX Components',
    href: '/docs/components#mdx-components',
    content: 'import components from mdx-components export components h1 h2 h3 h4 p ul ol li blockquote code pre table',
    category: 'Components',
    type: 'code',
    tags: ['mdx', 'import', 'export'],
    excerpt: 'MDX component imports and usage'
  },
  {
    title: 'Theme Configuration',
    href: '/docs/api#theme-configuration',
    content: 'theme light dark auto search boolean SearchConfig navigation NavigationConfig seo SEOConfig',
    category: 'API Reference',
    type: 'api',
    tags: ['theme', 'config', 'dark-mode'],
    excerpt: 'Theme and appearance settings'
  },
  {
    title: 'Search Configuration',
    href: '/docs/api#search-configuration',
    content: 'SearchConfig provider local algolia threshold keys maxResults fuzzy search',
    category: 'API Reference',
    type: 'api',
    tags: ['search', 'config', 'algolia'],
    excerpt: 'Search functionality configuration'
  }
];

// Enhanced Fuse.js configuration for better search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'content', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

const fuse = new Fuse(searchData, fuseOptions);

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Enhanced search with better filtering and sorting
  const searchResults = useMemo(() => {
    if (query.length === 0) return [];
    
    const fuseResults = fuse.search(query);
    
    // Sort by relevance score and type priority
    return fuseResults
      .map(result => ({
        ...result.item,
        score: result.score || 0,
        matches: result.matches || []
      }))
      .sort((a, b) => {
        // Prioritize exact title matches
        if (a.title.toLowerCase().includes(query.toLowerCase()) && !b.title.toLowerCase().includes(query.toLowerCase())) {
          return -1;
        }
        if (!a.title.toLowerCase().includes(query.toLowerCase()) && b.title.toLowerCase().includes(query.toLowerCase())) {
          return 1;
        }
        
        // Then sort by type priority
        const typePriority = { page: 0, component: 1, api: 2, code: 3, heading: 4 };
        const aPriority = typePriority[a.type] || 5;
        const bPriority = typePriority[b.type] || 5;
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        // Finally sort by score
        return a.score - b.score;
      })
      .slice(0, 8); // Limit to top 8 results
  }, [query]);

  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  const handleResultClick = () => {
    onOpenChange(false);
    setQuery('');
    setResults([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <BookOpen className="h-4 w-4" />;
      case 'component':
        return <Code className="h-4 w-4" />;
      case 'api':
        return <Zap className="h-4 w-4" />;
      case 'code':
        return <FileText className="h-4 w-4" />;
      case 'heading':
        return <Hash className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'component':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'api':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'code':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'heading':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-medium">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-primary" />
            Search Documentation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for guides, components, API references, code examples..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 text-base h-12 border-2 focus:border-primary"
              autoFocus
            />
          </div>
          
          {results.length > 0 && (
            <ScrollArea className="max-h-96">
              <div className="space-y-2">
                {results.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 text-left hover:bg-muted/50 transition-colors"
                    asChild
                    onClick={handleResultClick}
                  >
                    <Link href={result.href}>
                      <div className="flex items-start gap-3 w-full">
                        <div className="text-muted-foreground mt-1 flex-shrink-0">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="font-semibold text-foreground">
                              {highlightMatch(result.title, query)}
                            </div>
                            <Badge variant="secondary" className={`text-xs ${getTypeColor(result.type)}`}>
                              {result.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {result.excerpt || result.content.slice(0, 120) + '...'}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {result.category}
                            </span>
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex gap-1">
                                {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
          
          {query.length > 0 && results.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div className="text-lg font-medium mb-2">No results found</div>
              <div className="text-sm">
                Try searching for "components", "api", "examples", or "installation"
              </div>
            </div>
          )}
          
          {query.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div className="text-lg font-medium mb-2">Search the documentation</div>
              <div className="text-sm">
                Find guides, components, API references, and code examples
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['components', 'api', 'examples', 'installation'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}