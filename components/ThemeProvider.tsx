"use client";

import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: "dark";
  language: "en";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  language: "en",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: "dark", language: "en" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
