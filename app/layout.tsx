import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShikshaSparsh ? AI Agent for Primary Teachers",
  description:
    "Generate unique creative content, visual stories, and kids ebooks tailored for Indian primary classrooms.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
          <nav className="container-max flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                SS
              </span>
              <span className="font-semibold text-slate-900">
                ShikshaSparsh
              </span>
              <span className="ml-2 badge">For Primary Teachers</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link className="btn-ghost px-3 py-2" href="/creative">
                Creative Content
              </Link>
              <Link className="btn-ghost px-3 py-2" href="/visual-stories">
                Visual Stories
              </Link>
              <Link className="btn-primary px-3 py-2" href="/ebook">
                Kids Ebook
              </Link>
            </div>
          </nav>
        </header>
        <main className="container-max py-8">{children}</main>
        <footer className="mt-20 border-t border-slate-200 bg-white/70">
          <div className="container-max py-8 text-sm text-slate-600">
            Built for Indian classrooms ? supports English and Hindi.
          </div>
        </footer>
      </body>
    </html>
  );
}

