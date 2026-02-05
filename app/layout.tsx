'use client'
import Header from '@/components/layout/header/page';
import Footer from '@/components/layout/footer/page'
import { SessionProvider } from 'next-auth/react';

import "./globals.css";
import { CartProvider } from '@/components/providers/CartProvider';




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className='scrollbar-overlay-auto w-screen'>
      <SessionProvider>
        <CartProvider>
      <body className='flex flex-col min-h-screen'>
        
        <Header/>
        <main className='flex-grow'>
          {children} 
          
        </main>
        <Footer/>
        
      </body>
      </CartProvider>
      </SessionProvider>
    </html>
  );
}
