'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.min(scrollPx / winHeightPx * 100, 100);
      
      setScrollProgress(scrolled);
      setShowBackToTop(scrollPx > 400);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Back to top</span>
        </Button>
      )}
    </>
  );
}