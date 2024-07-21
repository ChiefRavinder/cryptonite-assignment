import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptonite",
  description: "Crypto Tracker Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider enableSystem={true} attribute="class">
            {/* <div className="bg-gray-200 dark:bg-[#121212]"> */}
              <Navbar />
              {children}
            {/* </div> */}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
