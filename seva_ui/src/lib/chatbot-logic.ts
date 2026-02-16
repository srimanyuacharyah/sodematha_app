export interface ChatResponse {
    text: string;
    links?: { label: string; href: string }[];
    command?: string; // Internal command for voice assistant to trigger actions
}

export const SEVAS = [
    { n: "One Day Sampurna Seva", k: "ಒಂದು ದಿನದ ಸಂಪೂರ್ಣ ಸೇವೆ", a: 5001, d: "Complete seva for one full day including Annadana.", dk: "ಅನ್ನದಾನ ಸೇರಿದಂತೆ ಒಂದು ಪೂರ್ಣ ದಿನದ ಸಂಪೂರ್ಣ ಸೇವೆ." },
    { n: "Maha Sarvaseva", k: "ಮಹಾ ಸರ್ವಸೇವೆ", a: 1500, d: "Special pooja and offering to the deity.", dk: "ದೇವರಿಗೆ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ನೈವೇದ್ಯ." },
    { n: "Nanda Deepa (One Year)", k: "ನಂದಾ ದೀಪ (ಒಂದು ವರ್ಷ)", a: 1200, d: "Eternal lamp for one year in your name.", dk: "ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ನಂದಾದೀಪ." },
    { n: "Alankara Pooja", k: "ಅಲಂಕಾರ ಪೂಜೆ", a: 501, d: "Decoration of the deity with flowers.", dk: "ಹೂವುಗಳಿಂದ ದೇವರ ಅಲಂಕಾರ." },
    { n: "Panchamrutha Abhisheka", k: "ಪಂಚಾಮೃತ ಅಭಿಷೇಕ", a: 1001, d: "Abhisheka with five sacred liquids.", dk: "ಐದು ಪವಿತ್ರ ದ್ರವಗಳಿಂದ ಅಭಿಷೇಕ." },
    { n: "General Kanike", k: "ಸಾಮಾನ್ಯ ಕಾಣಿಕೆ", a: 100, d: "General contribution to the Matha.", dk: "ಮಠಕ್ಕೆ ಸಾಮಾನ್ಯ ಕಾಣಿಕೆ." },
];

export function isKn(t: string) { return /[\u0C80-\u0CFF]/.test(t); }

export function reply(input: string): ChatResponse {
    const lo = input.toLowerCase();
    const kn = isKn(input);

    if (/^(hi|hello|hey|namaste|namaskara|ನಮಸ್ಕಾರ|ಹಾಯ್|ಹಲೋ|ನಮಸ್ತೆ)/i.test(lo))
        return {
            text: kn ? "🙏 ನಮಸ್ಕಾರ! ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠದ ಸೇವಾ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ.\nಸೇವೆಗಳು, ಇತಿಹಾಸ, ದರ್ಶನ ಸಮಯ ಬಗ್ಗೆ ಕೇಳಿ!"
                : "🙏 Namaste! Welcome to Sri Sode Vadiraja Matha.\nAsk me about Sevas, history, darshan timings & more!",
            links: [{ label: kn ? "ಸೇವೆಗಳು" : "View Sevas", href: "/sevas" }, { label: kn ? "ಇತಿಹಾಸ" : "History", href: "/history" }]
        };

    if (/book|bukk|reserve|how to.*seva|ಸೇವೆ.*ಬುಕ್/i.test(lo))
        return {
            text: kn ? "ಸೇವೆ ಬುಕ್ ಮಾಡಲು:\n1️⃣ ಸೇವೆಗಳು ಪುಟಕ್ಕೆ ಹೋಗಿ\n2️⃣ ಸೇವೆ ಆಯ್ಕೆ ಮಾಡಿ\n3️⃣ Book Seva ಕ್ಲಿಕ್ ಮಾಡಿ"
                : "To book section opening...\nPlease select a seva to proceed.",
            links: [{ label: kn ? "ಸೇವೆ ಬುಕ್" : "Book Seva", href: "/sevas" }],
            command: "NAV_SEVAS"
        };

    if (/room|stay|accommodation|guest house|lodge|ವಸತಿ|ರೂಮ್|hotel|place to stay|booking|book room|room booking/i.test(lo))
        return {
            text: kn ? "ವಸತಿ ಸೌಲಭ್ಯಗಳು ಲಭ್ಯವಿದೆ. ಬುಕ್ ಮಾಡಲು ರೂಮ್ಸ್ ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ."
                : "Accommodation facilities are available. Taking you to the Rooms booking page.",
            links: [{ label: kn ? "ರೂಮ್ಸ್" : "Book Rooms", href: "/rooms" }],
            command: "NAV_ROOMS"
        };


    if (/seva|pooja|puja|ಸೇವೆ|ಪೂಜೆ|service|ritual|offering/i.test(lo)) {
        const l = SEVAS.map(s => "• " + (kn ? s.k : s.n) + " — ₹" + s.a).join("\n");
        return {
            text: (kn ? "ಲಭ್ಯ ಸೇವೆಗಳು:\n\n" : "Available Sevas:\n\n") + l,
            links: [{ label: kn ? "ಸೇವೆಗಳು" : "View Sevas", href: "/sevas" }],
            command: "NAV_SEVAS"
        };
    }

    if (/time|timing|darshan|ದರ್ಶನ|ಸಮಯ|when|open|schedule/i.test(lo))
        return {
            text: kn ? "🕐 ದರ್ಶನ ಸಮಯ:\n\n🛕 ಸೋದೆ ಮಠ:\n  ಬೆಳಗ್ಗೆ: 5:00 AM – 1:00 PM\n  ಸಂಜೆ: 4:00 PM – 8:30 PM\n\n🛕 ಉಡುಪಿ ಕೃಷ್ಣ ಮಠ:\n  ಬೆಳಗ್ಗೆ: 4:30 AM – 1:30 PM\n  ಸಂಜೆ: 4:00 PM – 9:00 PM"
                : "🕐 Darshan Timings:\n\n🛕 Sode Matha:\n  Morning: 5:00 AM – 1:00 PM\n  Evening: 4:00 PM – 8:30 PM\n\n🛕 Udupi Krishna Matha:\n  Morning: 4:30 AM – 1:30 PM\n  Evening: 4:00 PM – 9:00 PM"
        };

    // Panchanga
    if (/panchanga|almanac|calendar|date/i.test(lo))
        return {
            text: kn ? "ಪಂಚಾಂಗ ಪುಟಕ್ಕೆ ಹೋಗೋಣ." : "Opening Panchanga.",
            links: [{ label: kn ? "ಪಂಚಾಂಗ" : "Panchanga", href: "/panchanga" }],
            command: "NAV_PANCHANGA"
        };

    // Parampara / History
    if (/parampara|lineage|guru|history|about|ಇತಿಹಾಸ|ಮಠ|matha|vadiraja|ವಾದಿರಾಜ|sode|ಸೋದೆ/i.test(lo))
        return {
            text: kn ? "ಶ್ರೀ ಮಠದ ಗುರು ಪರಂಪರೆ ಮತ್ತು ಇತಿಹಾಸ."
                : "Sri Sode Vadiraja Matha's history and Guru Parampara.",
            links: [{ label: kn ? "ಇತಿಹಾಸ" : "History", href: "/history" }],
            command: "NAV_HISTORY"
        };

    // Contribute / Donate
    if (/donat|kanike|ಕಾಣಿಕೆ|ದಾನ|contribute/i.test(lo))
        return {
            text: kn ? "🙏 ₹100 ರಿಂದ ಕಾಣಿಕೆ ಕೊಡಿ." : "🙏 Contribute to the Matha. Donate starting at ₹100.",
            links: [{ label: kn ? "ಕಾಣಿಕೆ" : "Contribute", href: "/sevas/book?sevaId=6" }], // Assuming Seva ID 6 is General Donation
            command: "NAV_DONATE"
        };

    if (/gallery|photo|ಗ್ಯಾಲರಿ|ಫೋಟೋ|pic/i.test(lo))
        return {
            text: kn ? "📸 ಗ್ಯಾಲರಿ ನೋಡಿ" : "📸 Explore our gallery",
            links: [{ label: kn ? "ಗ್ಯಾಲರಿ" : "Gallery", href: "/gallery" }],
            command: "NAV_GALLERY"

        };

    if (/contact|address|ಸಂಪರ್ಕ|ವಿಳಾಸ|where|phone|call|location|contact us/i.test(lo))
        return {
            text: kn ? "📍 ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠ, ಉಡುಪಿ, ಕರ್ನಾಟಕ" : "📍 Sri Sode Vadiraja Matha, Udupi, Karnataka",
            links: [{ label: kn ? "ಸಂಪರ್ಕ" : "Contact", href: "/contact" }],
            command: "NAV_CONTACT"
        };

    if (/login|account|sign|ಲಾಗಿನ್|ಖಾತೆ|otp/i.test(lo))
        return {
            text: kn ? "🔐 ಇಮೇಲ್ ಬಳಸಿ OTP ಲಾಗಿನ್ ಮಾಡಿ." : "🔐 Login using email OTP.",
            links: [{ label: kn ? "ಲಾಗಿನ್" : "Login", href: "/login" }],
            command: "NAV_LOGIN"
        };

    if (/price|cost|amount|ಬೆಲೆ|ದರ|how much|ಎಷ್ಟು/i.test(lo)) {
        const l = SEVAS.map(s => "• " + (kn ? s.k : s.n) + " — ₹" + s.a).join("\n");
        return {
            text: (kn ? "💰 ಸೇವೆ ದರ:\n\n" : "💰 Prices:\n\n") + l,
            links: [{ label: kn ? "ಬುಕ್" : "Book Seva", href: "/sevas" }],
            command: "NAV_SEVAS"
        };
    }

    if (/dashboard|bookings|my booking|my bookings|status|check booking/i.test(lo))
        return {
            text: kn ? "ನಿಮ್ಮ ಬುಕಿಂಗ್‌ಗಳನ್ನು ನೋಡೋಣ." : "Taking you to My Bookings dashboard.",
            links: [{ label: kn ? "ನನ್ನ ಬುಕಿಂಗ್" : "My Bookings", href: "/bookings" }],
            command: "NAV_BOOKINGS"
        };

    if (/home|main|start|ಮುಖಪುಟ/i.test(lo))
        return {
            text: kn ? "ಮುಖಪುಟಕ್ಕೆ ಹೋಗೋಣ." : "Taking you to the Home page.",
            links: [{ label: kn ? "ಮುಖಪುಟ" : "Home", href: "/" }],
            command: "NAV_HOME"
        };

    // Default Fallback
    return {
        text: kn ? "🙏 ಕ್ಷಮಿಸಿ. ಸೇವೆಗಳು, ರೂಮ್ಸ್, ಸಮಯ, ಇತಿಹಾಸ, ಕಾಣಿಕೆ ಬಗ್ಗೆ ಕೇಳಿ."
            : "🙏 Try asking about: Sevas, Rooms, Timings, History, Gallery, Donate, Contact, Login",
        links: [{ label: kn ? "ಸೇವೆಗಳು" : "Sevas", href: "/sevas" }]
    };
}
