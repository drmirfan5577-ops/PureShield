import { useAppStore } from "@/stores/appStore";
import { TRANSLATIONS } from "@/constants";

export function useTranslation() {
  const language = useAppStore((s) => s.config.language);
  const t = TRANSLATIONS[language] ?? TRANSLATIONS.en;
  const isRTL = language === "ur" || language === "ar";
  return { t, language, isRTL };
}
