'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Overview', href: '/docs/components' }
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/docs/api' }
    ],
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(['Getting Started']);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <ScrollArea className="h-[calc(100vh-8rem)] px-3">
          <div className="space-y-2">
            {navigation.map((section) => (
              <Collapsible
                key={section.title}
                open={openSections.includes(section.title)}
                onOpenChange={() => toggleSection(section.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto p-2 font-semibold text-sm"
                  >
                    {section.title}
                    {openSections.includes(section.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {section.items?.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        'w-full justify-start h-auto p-2 pl-6 font-normal text-sm',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      asChild
                    >
                      <Link href={item.href || '#'}>
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}