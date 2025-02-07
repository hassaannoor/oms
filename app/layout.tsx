'use client'

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'
// import { Inter } from 'next/font/google';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { LoadingProvider, useLoading } from '../context/LoadingContext'; // Adjust path if necessary
// import LoadingOverlay from '../components/LoadingOverlay'; // Adjust path if necessary

// export const metadata = {
//   title: 'OMS',
//   description: 'Office Management System',
// };
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const router = useRouter();
//   const { startLoading, stopLoading } = useLoading();

//   useEffect(() => {
//     const handleRouteChangeStart = () => startLoading();
//     const handleRouteChangeEnd = () => stopLoading();

//     router.events.on('routeChangeStart', handleRouteChangeStart);
//     router.events.on('routeChangeComplete', handleRouteChangeEnd);
//     router.events.on('routeChangeError', handleRouteChangeEnd);

//     return () => {
//       router.events.off('routeChangeStart', handleRouteChangeStart);
//       router.events.off('routeChangeComplete', handleRouteChangeEnd);
//       router.events.off('routeChangeError', handleRouteChangeEnd);
//     };
//   }, [router, startLoading, stopLoading]);

  return (
    <html lang="en">
      {/* <body className={inter.className + " flex h-screen justify-center items-center flex-col bg-gray-50"}> */}
      <body className={inter.className}>
        {/* <LoadingProvider>
          <LoadingOverlay /> */}
           <Providers>{children}</Providers>
        {/* </LoadingProvider> */}
      </body>
    </html>
  );
}
