"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations } from "@/data/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Load language preference from local storage on mount
    useEffect(() => {
        const storedLang = localStorage.getItem("sode_lang") as Language;
        if (storedLang && (storedLang === "en" || storedLang === "kn" || storedLang === "sa")) {
            setLanguage(storedLang);
        }
    }, []);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("sode_lang", lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
