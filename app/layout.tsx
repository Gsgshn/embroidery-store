import Header from '@/components/layout/header/page';
import Footer from '@/components/layout/footer/page'

import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className='scrollbar-overlay-auto w-screen'>
      
      <body className='flex flex-col '>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
