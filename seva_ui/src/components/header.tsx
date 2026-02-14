"use client";

import Link from "next/link";
import { Bell, Menu, User, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { useLanguage } from "@/context/language-context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SodeLogo } from "./sode-logo";
import { VoiceAssistant } from "./voice-assistant";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    const handleNotification = () => {
        toast.info("Notifications feature coming soon!");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-premium-maroon text-cream-50 shadow-premium">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group transition-premium">
                        <SodeLogo className="w-14 h-14 group-hover:scale-105 transition-all" />
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors">
                                Sri Sode Vadiraja Matha
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-bold">Udupi | Rajata Peetha</span>
                        </div>
                    </Link>
                    <div className="text-saffron-700 text-xs font-sans tracking-widest uppercase">{t.location || "Udupi"}</div>
                </div>

                {/* Right Swamiji (Placeholder) */}
                <div className="hidden md:block w-14 h-14 rounded-full bg-saffron-100 border-2 border-saffron-600 overflow-hidden relative shadow-premium group">
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] text-center text-saffron-900 font-black leading-tight uppercase p-1">
                        Sri Vishwavallabha<br />Theertha
                    </div>
                </div>

                {/* Mobile Menu Button - Shown only on small screens */}
                <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="h-6 w-6 text-white" />
                </button>
            </div>

            {/* Navigation Bar */}
            <div className={cn("bg-maroon-900/50 backdrop-blur-md text-white transition-all duration-300 ease-in-out border-y border-gold-500/20", isMenuOpen ? "block" : "hidden md:block")}>
                <div className="container mx-auto px-4">
                    <nav className="flex flex-col md:flex-row items-center justify-center gap-8 py-3 md:py-4 text-sm font-bold relative">
                        <Link href="/sevas" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{t.nav.home}</Link>
                        <Link href="/panchanga" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{language === 'kn' ? 'ಪಂಚಾಂಗ' : language === 'sa' ? 'पञ्चाङ्गम्' : 'Panchanga'}</Link>
                        <Link href="/history" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{t.nav.history}</Link>
                        <Link href="/sevas" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{t.nav.sevas}</Link>
                        {user && (
                            <Link href="/bookings" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{language === 'kn' ? 'ನನ್ನ ಬುಕಿಂಗ್' : 'My Bookings'}</Link>
                        )}
                        <Link href="/gallery" className="hover:text-gold-400 transition-colors uppercase tracking-[0.1em]">{t.nav.gallery}</Link>
                        <Link href="/contact" className="hover:text-gold-400 transition-colors hidden md:block uppercase tracking-[0.1em]">{t.nav.contact}</Link>

                        <div className="flex items-center gap-4 md:absolute md:right-0 py-2 md:py-0 justify-center">
                            <VoiceAssistant />
                            {/* Language Switcher */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-gold-400">
                                        <Globe className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-maroon-900 border-gold-500/50 text-white">
                                    <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-white/10 text-gold-400 font-bold" : "hover:bg-white/10"}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage("kn")} className={language === "kn" ? "bg-white/10 text-gold-400 font-bold" : "hover:bg-white/10"}>ಕನ್ನಡ</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage("sa")} className={language === "sa" ? "bg-white/10 text-gold-400 font-bold" : "hover:bg-white/10"}>संस्कृतम्</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10 hover:text-gold-400"
                                onClick={handleNotification}
                            >
                                <Bell className="h-5 w-5" />
                            </Button>

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gold-400 hidden md:inline">Namaste, {user.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/10 hover:text-gold-400"
                                        onClick={logout}
                                        title={t.nav.logout}
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white border border-white/20 hover:bg-white/10 hover:text-gold-400 flex gap-2 font-bold"
                                    >
                                        <User className="h-5 w-5" />
                                        <span className="md:hidden">{t.nav.login}</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
