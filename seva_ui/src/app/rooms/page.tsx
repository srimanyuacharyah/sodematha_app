"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROOMS } from "@/data/rooms";
import { Check, Users, Wifi, Wind } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export default function RoomsPage() {
    const { language } = useLanguage();
    const isKn = language === "kn";

    return (
        <div className="min-h-screen flex flex-col bg-background text-white luminance-guard">
            <Header />

            <main className="flex-1 bg-wallpaper">
                <div className="relative py-20 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/80 to-transparent z-0"></div>
                    <div className="relative z-10 container mx-auto">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
                            {isKn ? "ವಸತಿ ಸೌಲಭ್ಯಗಳು" : "Stay at Sode"}
                        </h1>
                        <p className="text-xl text-gold-400 font-serif italic max-w-2xl mx-auto">
                            {isKn
                                ? "ಶ್ರೀ ಮಠದ ಸನ್ನಿಧಾನದಲ್ಲಿ ಆರಾಮದಾಯಕ ವಾಸ್ತವ್ಯವನ್ನು ಅನುಭವಿಸಿ."
                                : "Experience a serene and comfortable stay within the sacred precincts of the Matha."}
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ROOMS.map((room) => (
                            <Card key={room.id} className="glass-card border-gold-500/20 overflow-hidden group hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] transition-all duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="bg-gold-500 text-maroon-950 text-xs font-black px-3 py-1 rounded-sm uppercase tracking-wider">
                                            {isKn ? "ಲಭ್ಯವಿದೆ" : "Available"}
                                        </div>
                                        <div className="text-2xl font-bold text-white">
                                            ₹{room.price}<span className="text-sm font-normal opacity-70"> / {isKn ? "ದಿನ" : "night"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                                        {room.name}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-6 line-clamp-2">
                                        {room.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <div className="flex items-center gap-1.5 text-xs text-gold-300 bg-gold-500/10 px-2.5 py-1.5 rounded-full border border-gold-500/20">
                                            <Users className="h-3 w-3" />
                                            <span>{room.capacity} {isKn ? "ಜನರು" : "Guests"}</span>
                                        </div>
                                        {room.amenities.slice(0, 2).map((a, i) => (
                                            <div key={i} className="flex items-center gap-1.5 text-xs text-white/80 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/10">
                                                <Check className="h-3 w-3" />
                                                <span>{a}</span>
                                            </div>
                                        ))}
                                        {room.amenities.length > 2 && (
                                            <div className="text-xs text-white/60 px-2 flex items-center">
                                                +{room.amenities.length - 2} more
                                            </div>
                                        )}
                                    </div>

                                    <Link href={`/rooms/book?roomId=${room.id}`}>
                                        <Button className="w-full bg-white/10 hover:bg-gold-500 hover:text-maroon-950 text-white border border-white/20 hover:border-gold-500 transition-all font-bold uppercase tracking-widest py-6">
                                            {isKn ? "ಬುಕ್ ಮಾಡಿ" : "Book Now"}
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
