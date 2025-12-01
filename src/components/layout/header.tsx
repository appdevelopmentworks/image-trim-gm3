import React from "react";
import { useTranslation } from "react-i18next";
import { Scissors } from "lucide-react";

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Scissors className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('header.title')}
          </span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {/* Future: Theme toggle or other actions */}
        </div>
      </div>
    </header>
  );
}