export type Language = "en" | "kn" | "sa";

export interface Translations {
    location: string;
    nav: {
        home: string;
        history: string;
        sevas: string;
        gallery: string;
        contact: string;
        login: string;
        logout: string;
    };
    hero: {
        welcome: string;
        subtitle: string;
    };
    headings: {
        news: string;
        timings: string;
        guruParampara: string;
        sevas: string;
        bookSeva: string;
    };
    buttons: {
        viewAll: string;
        readMore: string;
        bookSeva: string;
        login: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        location: "Udupi",
        nav: {
            home: "Home",
            history: "Guru Parampara",
            sevas: "Online Sevas",
            gallery: "Gallery",
            contact: "Contact",
            login: "Login",
            logout: "Logout",
        },
        hero: {
            welcome: "Sri Sode Vadiraja Matha",
            subtitle: "Divine wisdom and devotional legacy of Sri Vadiraja Teertharu",
        },
        headings: {
            news: "Latest News & Events",
            timings: "Darshana Timings",
            guruParampara: "Guru Parampara",
            sevas: "Sacred Sevas",
            bookSeva: "Offer a Seva",
        },
        buttons: {
            viewAll: "Explore All",
            readMore: "Learn More",
            bookSeva: "Book Seva",
            login: "Login",
        }
    },
    kn: {
        location: "ಉಡುಪಿ",
        nav: {
            home: "ಮುಖಪುಟ",
            history: "ಗುರು ಪರಂಪರೆ",
            sevas: "ಸೇವೆಗಳು",
            gallery: "ಗ್ಯಾಲರಿ",
            contact: "ಸಂಪರ್ಕಿಸಿ",
            login: "ಲಾಗಿನ್",
            logout: "ಲಾಗ್ ಔಟ್",
        },
        hero: {
            welcome: "ಸೋದೆ ಶ್ರೀ ವಾದಿರಾಜ ಮಠ",
            subtitle: "ಶ್ರೀ ವಾದಿರಾಜ ತೀರ್ಥರ ದಿವ್ಯ ಜ್ಞಾನ ಮತ್ತು ಭಕ್ತಿ ಪರಂಪರೆ",
        },
        headings: {
            news: "ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು",
            timings: "ದರ್ಶನ ಸಮಯ",
            guruParampara: "ಗುರು ಪರಂಪರೆ",
            sevas: "ಆನ್ಲೈನ್ ಸೇವೆಗಳು",
            bookSeva: "ಸೇವೆ ಬುಕ್ ಮಾಡಿ",
        },
        buttons: {
            viewAll: "ವೀಕ್ಷಿಸಿ",
            readMore: "ಮತ್ತಷ್ಟು ಓದಿ",
            bookSeva: "ಸೇವೆ ಬುಕ್ ಮಾಡಿ",
            login: "ಲಾಗಿನ್",
        }
    },
    sa: {
        location: "उडुपी",
        nav: {
            home: "गृहम्",
            history: "गुरुपरम्परा",
            sevas: "सेवाः",
            gallery: "चित्रवीथी",
            contact: "सम्पर्कः",
            login: "प्रवेशः",
            logout: "निर्गमः",
        },
        hero: {
            welcome: "श्री सोदे वादिराज मठः",
            subtitle: "श्रीवादिराजतीर्थानां दिव्यज्ञानं भक्तिपरम्परा च",
        },
        headings: {
            news: "वार्ताः",
            timings: "दर्शनसमयः",
            guruParampara: "गुरुपरम्परा",
            sevas: "अन्तर्जालसेवाः",
            bookSeva: "सेवां कुरुत",
        },
        buttons: {
            viewAll: "दर्शनम्",
            readMore: "अधिकं पठतु",
            bookSeva: "सेवां पञ्जीकरोतु",
            login: "प्रवेशः",
        }
    },
};
