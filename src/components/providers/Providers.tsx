"use client";

import { ContentProvider } from "@/lib/content-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ContentProvider>{children}</ContentProvider>;
}