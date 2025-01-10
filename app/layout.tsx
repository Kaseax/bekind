import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "bekind.",
  description: "Be kind to everyone! A simple act of kindness can brighten someone's day and create positivity in our world.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <ModeToggle />
          <a href="https://github.com/kaseax/bekind" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" effect="shine">
              <Github />
              View source
            </Button>
          </a>
        </div>
        <Toaster />
        {children}
      </ThemeProvider>
      <footer className="w-full p-4 absolute bottom-0 left-0 right-0 flex justify-center items-center">
        <p className="text-sm text-muted-foreground opacity-50">
          bekind. © {new Date().getFullYear()} - Made with ♥️ by Fynn Bauer
        </p>
      </footer>
      </body>
      </html>
    </>
  );
}
