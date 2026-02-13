"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ─── Types ────────────────────────────────────────────────────────── */
interface ChatMessage {
    id: string;
    role: "user" | "bot";
    text: string;
    links?: { label: string; href: string }[];
    timestamp: Date;
}

/* ─── Feature Knowledge ────────────────────────────────────────────── */
const SEVAS_INFO = [
    { name: "One Day Sampurna Seva", nameKn: "ಒಂದು ದಿನದ ಸಂಪೂರ್ಣ ಸೇವೆ", amount: 5001, descEn: "Complete seva for one full day including Annadana.", descKn: "ಅನ್ನದಾನ ಸೇರಿದಂತೆ ಒಂದು ಪೂರ್ಣ ದಿನದ ಸಂಪೂರ್ಣ ಸೇವೆ." },
    { name: "Maha Sarvaseva", nameKn: "ಮಹಾ ಸರ್ವಸೇವೆ", amount: 1500, descEn: "Special pooja and offering to the deity.", descKn: "ದೇವರಿಗೆ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ನೈವೇದ್ಯ." },
    { name: "Nanda Deepa (One Year)", nameKn: "ನಂದಾ ದೀಪ (ಒಂದು ವರ್ಷ)", amount: 1200, descEn: "Eternal lamp lit for one year in your name.", descKn: "ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಒಂದು ಪೂರ್ಣ ವರ್ಷದ ನಂದಾದೀಪ." },
    { name: "Alankara Pooja", nameKn: "ಅಲಂಕಾರ ಪೂಜೆ", amount: 501, descEn: "Decoration of the deity with flowers.", descKn: "ಹೂವುಗಳಿಂದ ದೇವರ ಅಲಂಕಾರ." },
    { name: "Panchamrutha Abhisheka", nameKn: "ಪಂಚಾಮೃತ ಅಭಿಷೇಕ", amount: 1001, descEn: "Abhisheka with five sacred liquids.", descKn: "ಐದು ಪವಿತ್ರ ದ್ರವಗಳಿಂದ ಅಭಿಷೇಕ." },
    { name: "General Kanike", nameKn: "ಸಾಮಾನ್ಯ ಕಾಣಿಕೆ", amount: 100, descEn: "General contribution to the Matha.", descKn: "ಮಠಕ್ಕೆ ಸಾಮಾನ್ಯ ಕಾಣಿಕೆ." },
];

const TIMINGS = {
    sode: { morning: "5:00 AM – 1:00 PM", evening: "4:00 PM – 8:30 PM", prasada: "12:30 PM – 2:00 PM" },
    udupi: { morning: "4:30 AM – 1:30 PM", evening: "4:00 PM – 9:00 PM", prasada: "11:30 AM – 2:00 PM" },
};

/* ─── Language Detect ──────────────────────────────────────────────── */
function isKannada(text: string): boolean {
    return /[\u0C80-\u0CFF]/.test(text);
}

/* ─── Response Engine ──────────────────────────────────────────────── */
interface BotReply { text: string; links?: { label: string; href: string }[] }

function getReply(input: string): BotReply {
    const low = input.toLowerCase();
    const kn = isKannada(input);

    // Greetings
    if (/^(hi|hello|hey|namaste|namaskara|ನಮಸ್ಕಾರ|ಹಾಯ್|ಹಲೋ|ನಮಸ್ತೆ)/i.test(low)) {
        return {
            text: kn
                ? "🙏 ನಮಸ್ಕಾರ! ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠದ ಸೇವಾ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ.\nಸೇವೆಗಳು, ಇತಿಹಾಸ, ದರ್ಶನ ಸಮಯ ಬಗ್ಗೆ ಕೇಳಿ!"
                : "🙏 Namaste! Welcome to Sri Sode Vadiraja Matha.\nAsk me about Sevas, history, darshan timings & more!",
            links: [
                { label: kn ? "ಸೇವೆಗಳು" : "View Sevas", href: "/sevas" },
                { label: kn ? "ಇತಿಹಾಸ" : "History", href: "/history" },
            ],
        };
    }

    // Book seva
    if (/book|ಬುಕ್|reserve|how to.*seva/i.test(low)) {
        return {
            text: kn
                ? "ಸೇವೆ ಬುಕ್ ಮಾಡಲು:\n1️⃣ ಸೇವೆಗಳು ಪುಟಕ್ಕೆ ಹೋಗಿ\n2️⃣ ಸೇವೆ ಆಯ್ಕೆ ಮಾಡಿ\n3️⃣ Book Seva ಕ್ಲಿಕ್ ಮಾಡಿ\n4️⃣ ವಿವರ ಭರ್ತಿ ಮಾಡಿ\n5️⃣ ಪಾವತಿ ಮಾಡಿ 👇"
                : "To book a Seva:\n1️⃣ Go to the Sevas page\n2️⃣ Choose the seva you want\n3️⃣ Click 'Book Seva'\n4️⃣ Fill in your details\n5️⃣ Complete payment 👇",
            links: [{ label: kn ? "ಸೇವೆ ಬುಕ್" : "Book Seva", href: "/sevas" }],
        };
    }

    // Seva list / pooja
    if (/seva|pooja|puja|ಸೇವೆ|ಪೂಜೆ|service|ritual|offering/i.test(low)) {
        const list = SEVAS_INFO.map(s => `• ${kn ? s.nameKn : s.name} — ₹${s.amount}\n  ${kn ? s.descKn : s.descEn}`).join("\n\n");
        return {
            text: kn ? `ಲಭ್ಯ ಸೇವೆಗಳು:\n\n${list}` : `Available Sevas:\n\n${list}`,
            links: [{ label: kn ? "ಸೇವೆಗಳು ನೋಡಿ" : "View Sevas", href: "/sevas" }],
        };
    }

    // Timings
    if (/time|timing|darshan|ದರ್ಶನ|ಸಮಯ|when|open|schedule|hour/i.test(low)) {
        return {
            text: kn
                ? `🕐 ದರ್ಶನ ಸಮಯ:\n\n🛕 ಸೋದೆ ಮಠ:\n  ಬೆಳಗ್ಗೆ: ${TIMINGS.sode.morning}\n  ಸಂಜೆ: ${TIMINGS.sode.evening}\n  ಪ್ರಸಾದ: ${TIMINGS.sode.prasada}\n\n🛕 ಉಡುಪಿ ಕೃಷ್ಣ ಮಠ:\n  ಬೆಳಗ್ಗೆ: ${TIMINGS.udupi.morning}\n  ಸಂಜೆ: ${TIMINGS.udupi.evening}\n  ಪ್ರಸಾದ: ${TIMINGS.udupi.prasada}`
                : `🕐 Darshan Timings:\n\n🛕 Sode Matha:\n  Morning: ${TIMINGS.sode.morning}\n  Evening: ${TIMINGS.sode.evening}\n  Prasada: ${TIMINGS.sode.prasada}\n\n🛕 Udupi Krishna Matha:\n  Morning: ${TIMINGS.udupi.morning}\n  Evening: ${TIMINGS.udupi.evening}\n  Prasada: ${TIMINGS.udupi.prasada}`,
        };
    }

    // History
    if (/history|about|ಇತಿಹಾಸ|ಮಠ|matha|vadiraja|ವಾದಿರಾಜ|sode|ಸೋದೆ|tradition/i.test(low)) {
        return {
            text: kn
                ? "🏛️ ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠ ಉಡುಪಿ ಅಷ್ಟಮಠಗಳಲ್ಲಿ ಒಂದು. 700+ ವರ್ಷ ಪರಂಪರೆ. ಶ್ರೀ ವಾದಿರಾಜ ತೀರ್ಥರಿಂದ ಸ್ಥಾಪಿತ. 👇"
                : "🏛️ Sri Sode Vadiraja Matha is one of the Eight Mathas (Ashta Matha) in Udupi. It has 700+ years of tradition, established by Sri Vadiraja Teertha. 👇",
            links: [{ label: kn ? "ಇತಿಹಾಸ" : "View History", href: "/history" }],
        };
    }

    // Donation
    if (/donat|kanike|ಕಾಣಿಕೆ|ದಾನ|contribute|give/i.test(low)) {
        return {
            text: kn
                ? "🙏 ಕಾಣಿಕೆ ₹100 ರಿಂದ ಪ್ರಾರಂಭ. ನಿಮ್ಮ ಕೊಡುಗೆ ಮಠ ನವೀಕರಣ ಮತ್ತು ಅನ್ನದಾನಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. 👇"
                : "🙏 Donations start at ₹100. Your contribution supports temple renovation and Annadana. 👇",
            links: [{ label: kn ? "ಕಾಣಿಕೆ" : "Donate Now", href: "/sevas/book?sevaId=6" }],
        };
    }

    // Gallery
    if (/gallery|photo|image|ಗ್ಯಾಲರಿ|ಫೋಟೋ|ಚಿತ್ರ|pic/i.test(low)) {
        return {
            text: kn ? "📸 ಮಠದ ಫೋಟೋ ಗ್ಯಾಲರಿ ನೋಡಿ 👇" : "📸 Explore our beautiful photo gallery 👇",
            links: [{ label: kn ? "ಗ್ಯಾಲರಿ" : "Gallery", href: "/gallery" }],
        };
    }

    // Contact
    if (/contact|address|location|phone|email|ಸಂಪರ್ಕ|ವಿಳಾಸ|where|reach/i.test(low)) {
        return {
            text: kn
                ? "📍 ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠ, ಉಡುಪಿ, ಕರ್ನಾಟಕ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ 👇"
                : "📍 Sri Sode Vadiraja Matha, Udupi, Karnataka, India. More details 👇",
            links: [{ label: kn ? "ಸಂಪರ್ಕ" : "Contact", href: "/contact" }],
        };
    }

    // Login
    if (/login|account|sign|register|ಲಾಗಿನ್|ಖಾತೆ|otp/i.test(low)) {
        return {
            text: kn
                ? "🔐 ಲಾಗಿನ್: ನಿಮ್ಮ ಇಮೇಲ್ ಬಳಸಿ OTP ಪಡೆಯಿರಿ. 👇"
                : "🔐 Login using your email to receive an OTP. 👇",
            links: [{ label: kn ? "ಲಾಗಿನ್" : "Login", href: "/login" }],
        };
    }

    // Payment
    if (/pay|payment|ಪಾವತಿ|upi|card|money/i.test(low)) {
        return {
            text: kn
                ? "💳 UPI, ಡೆಬಿಟ್/ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್, ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ಪಾವತಿ ಮಾಡಬಹುದು. 👇"
                : "💳 Pay via UPI (GPay, PhonePe), Debit/Credit card, or Net Banking. 👇",
            links: [{ label: kn ? "ಸೇವೆ ಬುಕ್" : "Book Seva", href: "/sevas" }],
        };
    }

    // Features / Help
    if (/feature|what can|ಏನು|ವೈಶಿಷ್ಟ್ಯ|help|ಸಹಾಯ|app/i.test(low)) {
        return {
            text: kn
                ? "✨ ಆಪ್ ವೈಶಿಷ್ಟ್ಯಗಳು:\n🛕 ಆನ್‌ಲೈನ್ ಸೇವೆ ಬುಕಿಂಗ್\n📖 ಮಠದ ಇತಿಹಾಸ\n📸 ಫೋಟೋ ಗ್ಯಾಲರಿ\n🕐 ದರ್ಶನ ಸಮಯ\n📍 ಸಂಪರ್ಕ ಮಾಹಿತಿ\n🔐 OTP ಲಾಗಿನ್\n🙏 ಆನ್‌ಲೈನ್ ಕಾಣಿಕೆ\n🌐 ಕನ್ನಡ, English, ಸಂಸ್ಕೃತ"
                : "✨ App Features:\n🛕 Online Seva Booking\n📖 Matha History\n📸 Photo Gallery\n🕐 Darshan Timings\n📍 Contact Info\n🔐 OTP Login\n🙏 Online Donations\n🌐 Kannada, English, Sanskrit",
            links: [
                { label: kn ? "ಸೇವೆಗಳು" : "Sevas", href: "/sevas" },
                { label: kn ? "ಇತಿಹಾಸ" : "History", href: "/history" },
            ],
        };
    }

    // Price
    if (/price|cost|amount|rate|ಬೆಲೆ|ದರ|how much|eshtu|ಎಷ್ಟು/i.test(low)) {
        const list = SEVAS_INFO.map(s => `• ${kn ? s.nameKn : s.name} — ₹${s.amount}`).join("\n");
        return {
            text: kn ? `💰 ಸೇವೆ ದರ:\n\n${list}` : `💰 Seva Prices:\n\n${list}`,
            links: [{ label: kn ? "ಬುಕ್ ಮಾಡಿ" : "Book Seva", href: "/sevas" }],
        };
    }

    // Thanks
    if (/thank|ಧನ್ಯವಾದ/i.test(low)) {
        return { text: kn ? "🙏 ಧನ್ಯವಾದಗಳು! ಶ್ರೀ ವಾದಿರಾಜರ ಆಶೀರ್ವಾದ ನಿಮಗಿರಲಿ." : "🙏 Thank you! May Sri Vadiraja's blessings be with you." };
    }

    // Renovation
    if (/renovation|temple|ದೇವಸ್ಥಾನ|ನವೀಕರಣ/i.test(low)) {
        return {
            text: kn ? "🏗️ ಮಠ ನವೀಕರಣ ಪ್ರಗತಿಯಲ್ಲಿದೆ. ನಿಮ್ಮ ಸೇವೆ ಮೂಲಕ ಭಾಗವಹಿಸಿ. 👇" : "🏗️ Temple renovation is ongoing. Contribute through Seva! 👇",
            links: [{ label: kn ? "ಮುಖಪುಟ" : "Home", href: "/" }],
        };
    }

    // Fallback
    return {
        text: kn
            ? "🙏 ಕ್ಷಮಿಸಿ, ಅರ್ಥ ಆಗಲಿಲ್ಲ. ಈ ವಿಷಯಗಳು ಕೇಳಿ:\n• ಸೇವೆಗಳು\n• ದರ್ಶನ ಸಮಯ\n• ಇತಿಹಾಸ\n• ಗ್ಯಾಲರಿ\n• ಕಾಣಿಕೆ\n• ಸಂಪರ್ಕ\n• ಲಾಗಿನ್"
            : "🙏 I didn't understand that. Try asking about:\n• Sevas & Poojas\n• Darshan Timings\n• History\n• Gallery\n• Donations\n• Contact\n• Login",
        links: [
            { label: kn ? "ಸೇವೆಗಳು" : "Sevas", href: "/sevas" },
            { label: kn ? "ಸಂಪರ್ಕ" : "Contact", href: "/contact" },
        ],
    };
}

/* ─── Quick Action Buttons ─────────────────────────────────────────── */
const QUICK_EN = [
    { label: "🛕 Sevas", q: "What sevas are available?" },
    { label: "🕐 Timings", q: "Darshan timings" },
    { label: "📖 History", q: "About Matha" },
    { label: "✨ Features", q: "App features" },
    { label: "💰 Prices", q: "Seva prices" },
    { label: "🙏 Donate", q: "Donate" },
];
const QUICK_KN = [
    { label: "🛕 ಸೇವೆ", q: "ಸೇವೆಗಳು" },
    { label: "🕐 ಸಮಯ", q: "ದರ್ಶನ ಸಮಯ" },
    { label: "📖 ಇತಿಹಾಸ", q: "ಮಠದ ಇತಿಹಾಸ" },
    { label: "✨ ವೈಶಿಷ್ಟ್ಯ", q: "ಆಪ್ ವೈಶಿಷ್ಟ್ಯ" },
    { label: "💰 ದರ", q: "ಸೇವೆ ಬೆಲೆ ಎಷ್ಟು" },
    { label: "🙏 ಕಾಣಿಕೆ", q: "ಕಾಣಿಕೆ" },
];

/* ─── Styles (all inline for guaranteed rendering) ─────────────────── */
const GOLD = "#D4AF37";
const MAROON_DARK = "#1A0000";
const MAROON = "#2D0000";

/* ─── Component ────────────────────────────────────────────────────── */
export function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [lang, setLang] = useState<"en" | "kn">("en");
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scroll = useCallback(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), []);
    useEffect(() => { scroll(); }, [msgs, scroll]);
    useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

    // Welcome on first open
    useEffect(() => {
        if (open && msgs.length === 0) {
            setMsgs([{
                id: "w",
                role: "bot",
                text: lang === "kn"
                    ? "🙏 ನಮಸ್ಕಾರ! ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠದ ಸೇವಾ ಸಹಾಯಕ.\n\nಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಕನ್ನಡ/English ಟೈಪ್ ಮಾಡಿ!"
                    : "🙏 Namaste! Sri Sode Vadiraja Matha – Seva Sahayak.\n\nTap a button below or type in English / ಕನ್ನಡ!",
                timestamp: new Date(),
            }]);
        }
    }, [open, msgs.length, lang]);

    const send = useCallback((text?: string) => {
        const msg = text || input.trim();
        if (!msg) return;
        const detected = isKannada(msg) ? "kn" : "en";
        setLang(detected);
        setMsgs(p => [...p, { id: Date.now().toString(), role: "user", text: msg, timestamp: new Date() }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            const r = getReply(msg);
            setMsgs(p => [...p, { id: (Date.now() + 1).toString(), role: "bot", text: r.text, links: r.links, timestamp: new Date() }]);
            setTyping(false);
        }, 500 + Math.random() * 500);
    }, [input]);

    const quicks = lang === "kn" ? QUICK_KN : QUICK_EN;

    return (
        <>
            {/* ── FAB Button ── */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open Chatbot"
                style={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 99999,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: open ? MAROON : `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                    boxShadow: `0 8px 32px rgba(212,175,55,0.5)`,
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
                {open ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={MAROON_DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                )}
            </button>

            {/* ── Chat Window ── */}
            {open && (
                <div style={{
                    position: "fixed",
                    bottom: 100,
                    right: 24,
                    zIndex: 99998,
                    width: 380,
                    maxWidth: "calc(100vw - 2rem)",
                    height: 540,
                    maxHeight: "calc(100vh - 8rem)",
                    borderRadius: 20,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    background: `linear-gradient(180deg, ${MAROON_DARK} 0%, #0a0000 100%)`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.2)`,
                    animation: "chatFadeIn 0.3s ease-out",
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "16px 20px",
                        borderBottom: `1px solid rgba(212,175,55,0.2)`,
                        background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: "50%",
                            background: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MAROON_DARK} strokeWidth="2"><path d="M12 8V4H8" /><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="6" y="14" width="12" height="8" rx="2" /><path d="M12 10v4" /><path d="M2 22l4-4" /><path d="M22 22l-4-4" /></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "serif" }}>Seva Sahayak</div>
                            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
                                {lang === "kn" ? "ಸೇವಾ ಸಹಾಯಕ • ಆನ್‌ಲೈನ್" : "Online • Ask me anything"}
                            </div>
                        </div>
                        <button
                            onClick={() => setLang(lang === "en" ? "kn" : "en")}
                            style={{
                                padding: "6px 12px", fontSize: 11, fontWeight: 700,
                                borderRadius: 20, border: `1px solid rgba(212,175,55,0.3)`,
                                color: GOLD, background: "transparent", cursor: "pointer",
                            }}
                        >
                            {lang === "en" ? "ಕನ್ನಡ" : "EN"}
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1, overflowY: "auto", padding: 16, display: "flex",
                        flexDirection: "column", gap: 14,
                    }}>
                        {msgs.map(m => (
                            <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                                <div style={{ maxWidth: "85%" }}>
                                    {m.role === "bot" && (
                                        <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, marginBottom: 4, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
                                            ✨ Seva Sahayak
                                        </div>
                                    )}
                                    <div style={{
                                        borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                        padding: "12px 16px", fontSize: 13, lineHeight: 1.6,
                                        whiteSpace: "pre-line" as const,
                                        ...(m.role === "user"
                                            ? { background: GOLD, color: MAROON_DARK, fontWeight: 600 }
                                            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.1)" }
                                        ),
                                    }}>
                                        {m.text}
                                    </div>
                                    {m.links && m.links.length > 0 && (
                                        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 8 }}>
                                            {m.links.map((l, i) => (
                                                <Link key={i} href={l.href} style={{
                                                    display: "inline-flex", alignItems: "center", gap: 4,
                                                    padding: "6px 12px", fontSize: 11, fontWeight: 700,
                                                    color: GOLD, background: "rgba(212,175,55,0.1)",
                                                    border: `1px solid rgba(212,175,55,0.2)`,
                                                    borderRadius: 20, textDecoration: "none",
                                                    transition: "all 0.2s",
                                                }}>
                                                    {l.label} →
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing dots */}
                        {typing && (
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <div style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "16px 16px 16px 4px",
                                    padding: "12px 16px",
                                    display: "flex", gap: 6,
                                }}>
                                    {[0, 1, 2].map(i => (
                                        <span key={i} style={{
                                            width: 8, height: 8, borderRadius: "50%", background: GOLD,
                                            animation: `dotBounce 1.4s infinite ${i * 160}ms`,
                                            display: "inline-block",
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick Actions */}
                    {msgs.length <= 1 && (
                        <div style={{ padding: "0 16px 8px", display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                            {quicks.map((a, i) => (
                                <button key={i} onClick={() => send(a.q)} style={{
                                    padding: "6px 12px", fontSize: 11, fontWeight: 700,
                                    color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
                                    cursor: "pointer", transition: "all 0.2s",
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = GOLD;
                                        e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                                        e.currentTarget.style.background = "rgba(212,175,55,0.1)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    }}
                                >
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: "12px 16px",
                        borderTop: `1px solid rgba(212,175,55,0.2)`,
                        background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                    }}>
                        <form onSubmit={e => { e.preventDefault(); send(); }} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={lang === "kn" ? "ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." : "Type your message..."}
                                style={{
                                    flex: 1, background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 24, padding: "10px 16px", fontSize: 13,
                                    color: "#fff", outline: "none",
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"}
                                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                            />
                            <button type="submit" disabled={!input.trim()} style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: input.trim() ? GOLD : "rgba(212,175,55,0.3)",
                                border: "none", cursor: input.trim() ? "pointer" : "default",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.2s",
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MAROON_DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style>{`
        @keyframes chatFadeIn {
          from { opacity:0; transform:translateY(20px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform:scale(0); }
          40% { transform:scale(1); }
        }
      `}</style>
        </>
    );
}
