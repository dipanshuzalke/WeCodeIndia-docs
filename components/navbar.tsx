'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, Menu, Moon, Sun, Search } from 'lucide-react';
import { SearchDialog } from './search-dialog';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Docs Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/docs" className="text-foreground/80 hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/docs/api" className="text-foreground/80 hover:text-foreground transition-colors">
            API Reference
          </Link>
          <Link href="/docs/examples" className="text-foreground/80 hover:text-foreground transition-colors">
            Examples
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex"
          >
            <Search className="h-4 w-4 mr-2" />
            Search...
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="justify-start"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search...
                </Button>
                <Link href="/docs" className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2">
                  Documentation
                </Link>
                <Link href="/docs/api" className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2">
                  API Reference
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
}