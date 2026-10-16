import type { Locale } from "@/lib/i18n";
import en from "./en";
import pt, { type Dictionary } from "./pt";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
