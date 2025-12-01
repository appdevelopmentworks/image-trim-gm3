"use client";

import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

// Placeholder ThemeProvider.
// The real implementation would use next-themes.
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
