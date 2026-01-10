import { ReactNode } from "react";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";
import { getTheme } from "@/lib/actions/theme";
import { generateCSSVariables } from "@/lib/theme-utils";

interface PublicLayoutProps {
  children: ReactNode;
}

export async function PublicLayout({ children }: PublicLayoutProps) {
  // Fetch theme from database (Server Component)
  const theme = await getTheme();
  const cssVariables = generateCSSVariables(theme);

  return (
    <div className="min-h-screen flex flex-col" style={{ cssText: cssVariables } as any}>
      <PublicHeader />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}

