import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { ThemeToggle } from "@/common/ThemeToggle";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});



export const metadata: Metadata = {
  title: "Lock Chat",
  description: "Helps you to encrypt and decrypt your chat and customize your encryption on your own terms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen gap-16 bg-background text-foreground ">
            {/* Header with Theme Toggle */}
            <header className="w-full flex justify-between items-center p-8 sm:p-6 bg-yellow-400 dark:bg-slate-900">
              <Link className="text-3xl font-bold cursor-pointer" href={'/'}>Lock Chat</Link>
              <div><ThemeToggle /></div>
            </header>

            <main className="flex-1 p-8 sm:p-6">
              {children}
            </main>

            <footer className="text-muted mt-auto border border-t-2 py-2 px-4">
              All Right Reserved to @El-drago11
            </footer>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}
