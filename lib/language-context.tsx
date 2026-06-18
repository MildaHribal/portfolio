"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Lang,
  LANG_COOKIE,
  isLang,
  messages,
  type Messages,
} from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  t: Messages;
  setLang: (next: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function persistLang(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  try {
    localStorage.setItem(LANG_COOKIE, lang);
  } catch {
    // ignore quota / privacy errors
  }
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Reconcile with explicit user choice stored in localStorage on first mount.
  // Server uses cookie; client may have a more recent explicit choice if the
  // visitor toggled, then revisited with a stale cookie cache.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_COOKIE);
      if (isLang(stored) && stored !== lang) {
        setLangState(stored);
        document.cookie = `${LANG_COOKIE}=${stored}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html lang> in sync after user toggles client-side.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persistLang(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: messages[lang], setLang }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return ctx;
}

export function useT(): Messages {
  return useLanguage().t;
}
