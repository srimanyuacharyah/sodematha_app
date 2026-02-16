"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { format } from "date-fns";

// ── Types ──────────────────────────────────────────────────────────────
interface PanchangaData {
    date: string;
    samvatsara: string;
    rutu: string;
    masa: string;
    paksha: string;
    titi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    occasion: string;
}

// ── Translations ──────────────────────────────────────────────────────
const labels: any = {
    en: {
        title: "Tithi Nirnaya Panchanga",
        subtitle: "Traditional Brahmin Calendar",
        samvatsara: "Samvatsara",
        rutu: "Rutu (Season)",
        masa: "Masa (Month)",
        paksha: "Paksha",
        titi: "Tithi",
        nakshatra: "Nakshatra",
        yoga: "Yoga",
        karana: "Karana",
        occasion: "Special Occasion",
        today: "Go to Today",
    },
    kn: {
        title: "ತಿಥಿ ನಿರ್ಣಯ ಪಂಚಾಂಗ",
        subtitle: "ಸಾಂಪ್ರದಾಯಿಕ ಬ್ರಾಹ್ಮಣ ಪಂಚಾಂಗ",
        samvatsara: "ಸಂವತ್ಸರ",
        rutu: "ಋತು",
        masa: "ಮಾಸ",
        paksha: "ಪಕ್ಷ",
        titi: "ತಿಥಿ",
        nakshatra: "ನಕ್ಷತ್ರ",
        yoga: "ಯೋಗ",
        karana: "ಕರಣ",
        occasion: "ವಿಶೇಷ ದಿನ",
        today: "ಇಂದಿನ ದಿನ",
    },
    sa: {
        title: "तिथि निर्णय पञ्चाङ्गम्",
        subtitle: "पारम्परिकं ब्राह्मण पञ्चाङ्गम्",
        samvatsara: "संवत्सरः",
        rutu: "ऋतुः",
        masa: "मासः",
        paksha: "पक्षः",
        titi: "तिथिः",
        nakshatra: "नक्षत्रम्",
        yoga: "योगः",
        karana: "करणम्",
        occasion: "विशेष अवसरः",
        today: "अद्यतन दिनम्",
    },
};

const panchangValues: any = {
    // Samvatsara
    Krodhi: { en: "Krodhi", kn: "ಕ್ರೋಧಿ", sa: "क्रोधी" },

    // Rutus
    Vasanta: { en: "Vasanta", kn: "ವಸಂತ", sa: "ವಸಂತಃ" },
    Grishma: { en: "Grishma", kn: "ಗ್ರೀಷ್ಮ", sa: "ಗ್ರೀಷ್ಮಃ" },
    Varsha: { en: "Varsha", kn: "ವರ್ಷ", sa: "ವರ್ಷ" },
    Sharad: { en: "Sharad", kn: "ಶರದ್", sa: "ಶರದ್" },
    Hemanta: { en: "Hemanta", kn: "ಹೇಮಂತ", sa: "ಹೇಮಂತಃ" },
    Shishira: { en: "Shishira", kn: "ಶಿಶಿರ", sa: "ಶಿಶಿರಃ" },

    // Masas
    Chaitra: { en: "Chaitra", kn: "ಚೈತ್ರ", sa: "ಚೈತ್ರಃ" },
    Vaishakha: { en: "Vaishakha", kn: "ವೈಶಾಖ", sa: "ವೈಶಾಖಃ" },
    Jyeshtha: { en: "Jyeshtha", kn: "ಜ್ಯೇಷ್ಠ", sa: "ಜ್ಯೇಷ್ಠಃ" },
    Ashadha: { en: "Ashadha", kn: "ಆಷಾಢ", sa: "ಆಷಾಢಃ" },
    Shravana: { en: "Shravana", kn: "ಶ್ರಾವಣ", sa: "ಶ್ರಾವಣಃ" },
    Bhadrapada: { en: "Bhadrapada", kn: "ಭಾದ್ರಪದ", sa: "ಭಾದ್ರಪದಃ" },
    Ashwayuja: { en: "Ashwayuja", kn: "ಆಶ್ವಯುಜ", sa: "ಆಶ್ವಯುಜಃ" },
    Kartika: { en: "Kartika", kn: "ಕಾರ್ತಿಕ", sa: "ಕಾರ್ತಿಕಃ" },
    Margashira: { en: "Margashira", kn: "ಮಾರ್ಗಶಿರ", sa: "ಮಾರ್ಗಶಿರಃ" },
    Pushya: { en: "Pushya", kn: "ಪುಷ್ಯ", sa: "ಪುಷ್ಯಃ" },
    Magha: { en: "Magha", kn: "ಮಾಘ", sa: "ಮಾಘಃ" },
    Phalguna: { en: "Phalguna", kn: "ಫಾಲ್ಗುಣ", sa: "ಫಾಲ್ಗುಣಃ" },

    // Paksha
    Shukla: { en: "Shukla", kn: "ಶುಕ್ಲ", sa: "ಶುಕ್ಲ" },
    Krishna: { en: "Krishna", kn: "ಕೃಷ್ಣ", sa: "ಕೃಷ್ಣ" },

    // Tithis
    Prathama: { en: "Prathama", kn: "ಪ್ರಥಮ", sa: "ಪ್ರಥಮಾ" },
    Dwitiya: { en: "Dwitiya", kn: "ದ್ವಿತೀಯ", sa: "ದ್ವಿತೀಯಾ" },
    Tritiya: { en: "Tritiya", kn: "ತೃತೀಯ", sa: "ತೃತೀಯಾ" },
    Chaturthi: { en: "Chaturthi", kn: "ಚತುರ್ಥಿ", sa: "ಚತುರ್ಥಿ" },
    Panchami: { en: "Panchami", kn: "ಪಂಚಮಿ", sa: "ಪಂಚಮಿ" },
    Shashti: { en: "Shashti", kn: "ಷಷ್ಠಿ", sa: "ಷಷ್ಠಿ" },
    Saptami: { en: "Saptami", kn: "ಸಪ್ತಮಿ", sa: "ಸಪ್ತಮಿ" },
    Ashtami: { en: "Ashtami", kn: "ಅಷ್ಟಮಿ", sa: "ಅಷ್ಟಮಿ" },
    Navami: { en: "Navami", kn: "ನವಮಿ", sa: "ನವಮಿ" },
    Dashami: { en: "Dashami", kn: "ದಶಮಿ", sa: "ದಶಮಿ" },
    Ekadashi: { en: "Ekadashi", kn: "ಏಕಾದಶಿ", sa: "ಏಕಾದಶಿ" },
    Dwadashi: { en: "Dwadashi", kn: "ದ್ವಾದಶಿ", sa: "ದ್ವಾದಶಿ" },
    Trayodashi: { en: "Trayodashi", kn: "ತ್ರಯೋದಶಿ", sa: "ತ್ರಯೋದಶಿ" },
    Chaturdashi: { en: "Chaturdashi", kn: "ಚತುರ್ದಶಿ", sa: "ಚತುರ್ದಶಿ" },
    Pournami: { en: "Pournami", kn: "ಪೌರ್ಣಮಿ", sa: "ಪೂರ್ಣಿಮಾ" },
    Amavasya: { en: "Amavasya", kn: "ಅಮಾವಾಸ್ಯೆ", sa: "ಅಮಾವಾಸ್ಯಾ" },

    // Nakshatras (Supporting both variants)
    Ashwini: { en: "Ashwini", kn: "ಅಶ್ವಿನಿ", sa: "ಅಶ್ವಿನಿ" },
    Bharani: { en: "Bharani", kn: "ಭರಣಿ", sa: "ಭರಣಿ" },
    Krittika: { en: "Krittika", kn: "ಕೃತಿಕಾ", sa: "ಕೃತಿಕಾ" },
    Rohini: { en: "Rohini", kn: "ರೋಹಿಣಿ", sa: "ರೋಹಿಣಿ" },
    Mrigashira: { en: "Mrigashira", kn: "ಮೃಗಶಿರ", sa: "ಮೃಗಶಿರ" },
    Ardra: { en: "Ardra", kn: "ಆರ್ದ್ರ", sa: "ಆರ್ದ್ರ" },
    Punarvasu: { en: "Punarvasu", kn: "ಪುನರ್ವಸು", sa: "ಪುನರ್ವಸು" },
    Ashlesha: { en: "Ashlesha", kn: "ಆಶ್ಲೇಷ", sa: "ಆಶ್ಲೇಷ" },
    "Purva Phalguni": { en: "Purva Phalguni", kn: "ಪೂರ್ವ ಫಾಲ್ಗುಣಿ", sa: "ಪೂರ್ವ ಫಾಲ್ಗುಣಿ" },
    "Uttara Phalguni": { en: "Uttara Phalguni", kn: "ಉತ್ತರ ಫಾಲ್ಗುಣಿ", sa: "ಉತ್ತರ ಫಾಲ್ಗುಣಿ" },
    Hasta: { en: "Hasta", kn: "ಹಸ್ತ", sa: "ಹಸ್ತ" },
    Chitra: { en: "Chitra", kn: "ಚಿತ್ರ", sa: "ಚಿತ್ರ" },
    Swati: { en: "Swati", kn: "ಸ್ವಾತಿ", sa: "ಸ್ವಾತಿ" },
    Vishakha: { en: "Vishakha", kn: "ವಿಶಾಖ", sa: "ವಿಶಾಖ" },
    Anuradha: { en: "Anuradha", kn: "ಅನುರಾಧ", sa: "ಅನುರಾಧ" },
    Mula: { en: "Mula", kn: "ಮೂಲ", sa: "ಮೂಲ" },
    "Purva Ashadha": { en: "Purva Ashadha", kn: "ಪೂರ್ವ ಆಷಾಢ", sa: "ಪೂರ್ವ ಆಷಾಢ" },
    "Uttara Ashadha": { en: "Uttara Ashadha", kn: "ಉತ್ತರ ಆಷಾಢ", sa: "ಉತ್ತರ ಆಷಾಢ" },
    Dhanishta: { en: "Dhanishta", kn: "ಧನಿಷ್ಠ", sa: "ಧನಿಷ್ಠ" },
    Shatabhisha: { en: "Shatabhisha", kn: "ಶತಭಿಷ", sa: "ಶತಭಿಷ" },
    "Purva Bhadrapada": { en: "Purva Bhadrapada", kn: "ಪೂರ್ವ ಭಾದ್ರಪದ", sa: "ಪೂರ್ವ ಭಾದ್ರಪದ" },
    "Uttara Bhadrapada": { en: "Uttara Bhadrapada", kn: "ಉತ್ತರ ಭಾದ್ರಪದ", sa: "ಉತ್ತರ ಭಾದ್ರಪದ" },
    Revati: { en: "Revati", kn: "ರೇವತಿ", sa: "ರೇವತಿ" },

    // Karanas
    Bava: { en: "Bava", kn: "ಬವ", sa: "ಬವ" },
    Balava: { en: "Balava", kn: "ಬಾಲವ", sa: "बालव" },
    Kaulava: { en: "Kaulava", kn: "ಕೌಲವ", sa: "कौलव" },
    Taitila: { en: "Taitila", kn: "ತೈತಿಲ", sa: "तैतिल" },
    Gara: { en: "Gara", kn: "ಗರ", sa: "गर" },
    Vanija: { en: "Vanija", kn: "ವಣಿಜ", sa: "ವಣಿಜ" },
    Visti: { en: "Visti", kn: "ವಿಸ್ಟಿ", sa: "विष्टि" },
    Shakuni: { en: "Shakuni", kn: "ಶಕುನಿ", sa: "शकुनि" },
    Chatushpada: { en: "Chatushpada", kn: "ಚತುಷ್ಪಾದ", sa: "चतुष्पाद" },
    Naga: { en: "Naga", kn: "ನಾಗ", sa: "नाग" },
    Kintughna: { en: "Kintughna", kn: "ಕಿಂತುಘ್ನ", sa: "किन्तुघ्न" },

    // Others
    Brahma: { en: "Brahma", kn: "ಬ್ರಹ್ಮ", sa: "ಬ್ರಹ್ಮ" },
    Siddhi: { en: "Siddhi", kn: "ಸಿದ್ಧಿ", sa: "ಸಿದ್ಧಿಃ" },
    Vyatipata: { en: "Vyatipata", kn: "ವ್ಯತೀಪಾತ", sa: "ವ್ಯತೀಪಾತಃ" },
    "Ratha Saptami": { en: "Ratha Saptami", kn: "ರಥ ಸಪ್ತಮಿ", sa: "रथसप्तमी" },
    "Dwadashi Vrata": { en: "Dwadashi Vrata", kn: "ದ್ವಾದಶಿ ವ್ರತ", sa: "ದ್ವಾದಶಿ ವ್ರತ" },
    "Vijaya Ekadashi": { en: "Vijaya Ekadashi", kn: "ವಿಜಯ ಏಕಾದಶಿ", sa: "ವಿಜಯ ಏಕಾದಶಿ" },
    "Amalaki Ekadashi": { en: "Amalaki Ekadashi", kn: "ಆಮಲಕಿ ಏಕಾದಶಿ", sa: "ಆಮಲಕಿ ಏಕಾದಶಿ" },
    "Maha Shivaratri": { en: "Maha Shivaratri", kn: "ಮಹಾ ಶಿವರಾತ್ರಿ", sa: "ಮಹಾ ಶಿವರಾತ್ರಿಃ" },
    "Special Seva Day": { en: "Special Seva Day", kn: "ವಿಶೇಷ ಸೇವಾ ದಿನ", sa: "विशेष सेवा दिनम्" },
    "Matha Festival": { en: "Matha Festival", kn: "ಮಠದ ಉತ್ಸವ", sa: "मठोत्सवः" },
    "Regular Day": { en: "Regular Day", kn: "ಸಾಮಾನ್ಯ ದಿನ", sa: "ಸಾಮಾನ್ಯ ದಿನಮ್" },
};

export default function PanchangaPage() {
    const { language } = useLanguage();
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState<PanchangaData | null>(null);
    const [loading, setLoading] = useState(true);

    const t = labels[language] || labels.en;

    useEffect(() => {
        fetchPanchanga();
    }, [date]);

    const getFallbackData = (targetDate: Date): PanchangaData => {
        const formattedDate = format(targetDate, "yyyy-MM-dd");
        const ref = new Date("2026-01-25"); // Ratha Saptami
        const diffTime = targetDate.getTime() - ref.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const tithis = [
            "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
            "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Pournami",
            "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
            "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
        ];

        const tithiIdx = (6 + diffDays) % 30;
        const safeTithiIdx = tithiIdx < 0 ? tithiIdx + 30 : tithiIdx;

        return {
            date: formattedDate,
            samvatsara: "Krodhi",
            rutu: diffDays < 40 ? "Shishira" : "Vasanta",
            masa: diffDays < 15 ? "Magha" : "Phalguna",
            paksha: safeTithiIdx < 15 ? "Shukla" : "Krishna",
            titi: tithis[safeTithiIdx],
            nakshatra: "Bharani", // Simplification
            yoga: "Siddhi",
            karana: "Bava",
            occasion: formattedDate === "2026-01-25" ? "Ratha Saptami" : "Regular Day",
        };
    };

    const fetchPanchanga = async () => {
        setLoading(true);
        try {
            const formattedDate = format(date, "yyyy-MM-dd");
            const res = await fetch(`http://localhost:8080/api/panchanga?date=${formattedDate}`);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                console.warn("Backend returned error, using fallback");
                setData(getFallbackData(date));
            }
        } catch (error) {
            console.error("Failed to fetch panchanga, using fallback", error);
            setData(getFallbackData(date));
        } finally {
            setLoading(false);
        }
    };

    const translateValue = (val: string) => {
        return panchangValues[val]?.[language] || val;
    };

    const changeDate = (days: number) => {
        const next = new Date(date);
        next.setDate(date.getDate() + days);
        setDate(next);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-white font-sans">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12 bg-wallpaper">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 uppercase tracking-wider">
                        {t.title}
                    </h1>
                    <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm">
                        {t.subtitle}
                    </p>
                    <div className="h-1 w-24 bg-gold-500 mx-auto mt-6"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Date Selector */}
                    <div className="flex items-center justify-between mb-8 glass-card p-4 border-gold-500/20">
                        <Button variant="ghost" onClick={() => changeDate(-1)} className="text-gold-500 hover:bg-gold-500/10">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-5 w-5 text-gold-500" />
                            <span className="text-xl font-bold tracking-tight">
                                {format(date, "PPPP")}
                            </span>
                        </div>

                        <Button variant="ghost" onClick={() => changeDate(1)} className="text-gold-500 hover:bg-gold-500/10">
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Panchanga Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-card border-gold-500/10 hover:border-gold-500/30 transition-premium shadow-2xl">
                            <CardHeader className="border-b border-gold-500/10 bg-gold-500/5">
                                <CardTitle className="text-xl font-serif text-gold-500 flex items-center gap-2">
                                    <Info className="h-5 w-5" />
                                    Daily Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {[
                                    { label: t.samvatsara, value: data?.samvatsara },
                                    { label: t.rutu, value: data?.rutu },
                                    { label: t.masa, value: data?.masa },
                                    { label: t.paksha, value: data?.paksha },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">{item.label}</span>
                                        <span className="text-lg font-bold text-white">{translateValue(item.value || "")}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-gold-500/10 hover:border-gold-500/30 transition-premium shadow-2xl">
                            <CardHeader className="border-b border-gold-500/10 bg-gold-500/5">
                                <CardTitle className="text-xl font-serif text-gold-500 flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5" />
                                    Astro Markers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {[
                                    { label: t.titi, value: data?.titi },
                                    { label: t.nakshatra, value: data?.nakshatra },
                                    { label: t.yoga, value: data?.yoga },
                                    { label: t.karana, value: data?.karana },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">{item.label}</span>
                                        <span className="text-lg font-bold text-gold-400">{translateValue(item.value || "")}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Special Occasion */}
                    {data?.occasion && (
                        <div className="mt-8 p-8 glass-card border-gold-500/30 bg-gold-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
                            <div className="flex flex-col items-center text-center">
                                <div className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{t.occasion}</div>
                                <h2 className="text-3xl font-serif font-black text-white uppercase tracking-widest group-hover:text-gold-400 transition-colors">
                                    {translateValue(data.occasion)}
                                </h2>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Button
                            onClick={() => setDate(new Date())}
                            className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black px-10 py-6 rounded-full text-sm uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            {t.today}
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
