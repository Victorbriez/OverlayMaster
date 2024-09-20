import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow flex flex-col justify-center items-center">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="flex items-center gap-1 text-current text-default-600 text-center flex-wrap">
          OverlayMaster Copyright © 2024 - All rights reserved
        </p>
      </footer>
    </div>
  );
}
