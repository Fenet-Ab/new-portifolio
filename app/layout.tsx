import Navbar from '@/components/layout/Navbar';
import './globals.css';
import type { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Fenet Abilu — Software Engineer',
  description: 'Portfolio of Fenet Abilu — Software Engineering student and full-stack developer'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

