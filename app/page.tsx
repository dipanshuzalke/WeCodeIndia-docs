import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Search, Zap } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Documentation Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build amazing applications. Comprehensive guides, API references, and tutorials all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs/api">
                API Reference
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Comprehensive Guides</CardTitle>
              <CardDescription>
                Step-by-step tutorials and in-depth guides to help you master every aspect of development.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Powerful Search</CardTitle>
              <CardDescription>
                Find exactly what you need with our advanced search functionality and intelligent suggestions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Quick Reference</CardTitle>
              <CardDescription>
                Fast access to API references, code examples, and commonly used patterns.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-lg border p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Documentation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="ghost" className="h-auto p-4 justify-start" asChild>
              <Link href="/docs/getting-started">
                <div className="text-left">
                  <div className="font-semibold">Getting Started</div>
                  <div className="text-sm text-muted-foreground">Quick setup guide</div>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" className="h-auto p-4 justify-start" asChild>
              <Link href="/docs/components">
                <div className="text-left">
                  <div className="font-semibold">Components</div>
                  <div className="text-sm text-muted-foreground">UI components guide</div>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" className="h-auto p-4 justify-start" asChild>
              <Link href="/docs/api">
                <div className="text-left">
                  <div className="font-semibold">API Reference</div>
                  <div className="text-sm text-muted-foreground">Complete API docs</div>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" className="h-auto p-4 justify-start" asChild>
              <Link href="/docs/examples">
                <div className="text-left">
                  <div className="font-semibold">Examples</div>
                  <div className="text-sm text-muted-foreground">Code examples</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}