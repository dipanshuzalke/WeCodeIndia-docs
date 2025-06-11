"use client";

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Info, CheckCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Enhanced code block component with copy functionality
function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const text = typeof children === 'string' ? children : '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={cn(
        "relative overflow-x-auto rounded-xl bg-slate-950 dark:bg-slate-900 p-6 text-sm leading-relaxed",
        "border border-slate-200 dark:border-slate-800",
        "shadow-lg dark:shadow-slate-900/20",
        className
      )}>
        <code className="text-slate-50 font-mono">{children}</code>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </pre>
    </div>
  );
}

const components = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="scroll-m-20 text-5xl font-bold tracking-tight mb-8 pb-6 border-b border-border/40 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6 mt-12 pb-3 border-b border-border/20 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-10 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="scroll-m-20 text-xl font-semibold mb-3 mt-8 text-foreground">
      {children}
    </h4>
  ),
  h5: ({ children }: { children?: ReactNode }) => (
    <h5 className="scroll-m-20 text-lg font-semibold mb-3 mt-6 text-foreground">
      {children}
    </h5>
  ),
  h6: ({ children }: { children?: ReactNode }) => (
    <h6 className="scroll-m-20 text-base font-semibold mb-2 mt-4 text-foreground">
      {children}
    </h6>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="leading-7 mb-6 text-muted-foreground text-base">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-6 ml-6 list-none space-y-3">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-6 ml-6 list-decimal space-y-3 marker:text-primary marker:font-semibold">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-muted-foreground relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold before:text-lg">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-4 border-primary/50 pl-6 py-4 my-6 bg-muted/30 rounded-r-lg italic text-muted-foreground relative">
      <div className="absolute top-2 left-2 text-primary/20 text-4xl font-serif">"</div>
      <div className="relative z-10">{children}</div>
    </blockquote>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="relative rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium text-foreground border border-border/50 shadow-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <CodeBlock className="mb-6">
      {children}
    </CodeBlock>
  ),
  hr: () => (
    <Separator className="my-8 bg-gradient-to-r from-transparent via-border to-transparent" />
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-8 w-full overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-muted/50">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => (
    <tbody className="divide-y divide-border">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="hover:bg-muted/30 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-6 py-4 text-left font-semibold text-foreground border-b border-border">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-6 py-4 text-muted-foreground">
      {children}
    </td>
  ),
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a 
      href={href}
      className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 font-medium"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-foreground">
      {children}
    </em>
  ),
  // Enhanced custom components
  Card: ({ title, description, children }: { title?: string; description?: string; children?: ReactNode }) => (
    <Card className="my-8 shadow-lg border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && (
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-muted-foreground mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </div>
      </CardContent>
    </Card>
  ),
  Alert: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'success'; children?: ReactNode }) => {
    const configs = {
      info: {
        icon: Info,
        className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100"
      },
      warning: {
        icon: AlertTriangle,
        className: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100"
      },
      success: {
        icon: CheckCircle,
        className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30 text-green-900 dark:text-green-100"
      }
    };
    
    const config = configs[type];
    const Icon = config.icon;
    
    return (
      <Alert className={cn("my-6 shadow-sm", config.className)}>
        <Icon className="h-5 w-5" />
        <AlertDescription className="ml-2 font-medium">
          {children}
        </AlertDescription>
      </Alert>
    );
  },
  Badge: ({ children, variant }: { children?: ReactNode; variant?: 'default' | 'secondary' | 'destructive' | 'outline' }) => (
    <Badge variant={variant} className="mx-1 shadow-sm">
      {children}
    </Badge>
  ),
  Button: ({ children, variant, size }: { children?: ReactNode; variant?: string; size?: string }) => (
    <Button variant={variant as any} size={size as any} className="my-2 shadow-sm hover:shadow-md transition-shadow">
      {children}
    </Button>
  ),
};

export { components };