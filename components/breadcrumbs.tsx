'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { href, title };
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
        <Link href="/">
          <Home className="h-3 w-3" />
        </Link>
      </Button>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center space-x-1">
          <ChevronRight className="h-3 w-3" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-foreground">{breadcrumb.title}</span>
          ) : (
            <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
              <Link href={breadcrumb.href} className="hover:text-foreground transition-colors">
                {breadcrumb.title}
              </Link>
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
}