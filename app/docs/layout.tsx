import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 max-w-4xl py-8">
            <Breadcrumbs />
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}