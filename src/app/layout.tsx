import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

import { PageTransition } from '@/components/layout/page-transition';

export const metadata: Metadata = {
  title: 'VentureScout | Enterprise VC Intelligence',
  description: 'Proactive scout layer for strategic asset discovery. Powered by deep-domain AI synthesis.',
  keywords: ['Venture Capital', 'AI Scouting', 'Deal Sourcing', 'Intelligence Layer', 'Investment Analytics'],
  authors: [{ name: 'VentureScout Intelligence Hub' }],
};

import { ResponsiveLayout } from '@/components/layout/responsive-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <ResponsiveLayout>
          <PageTransition>
            {children}
          </PageTransition>
        </ResponsiveLayout>
        <Toaster position="top-right" closeButton theme="light" richColors />
      </body>
    </html>
  );
}
