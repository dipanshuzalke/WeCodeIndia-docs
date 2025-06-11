import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Mail, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold">Documentation</h3>
            <div className="space-y-2">
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Getting Started
              </Link>
              <Link href="/docs/components" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Components
              </Link>
              <Link href="/docs/api" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2">
              <Link href="/docs/examples" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
              <Link href="/docs/guides" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Guides
              </Link>
              <Link href="/docs/tutorials" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tutorials
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Community</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" asChild>
                <Link href="https://github.com">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" asChild>
                <Link href="mailto:contact@example.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" asChild>
                <Link href="/privacy">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </Button>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Documentation Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}