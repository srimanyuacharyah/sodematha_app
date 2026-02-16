"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sevas } from "@/data/sevas";
import Link from "next/link";
import { IndianRupee, Clock, HelpCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function SevasPage() {
    const { t } = useLanguage();
    const [sevasList, setSevasList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSevas();
    }, []);

    const fetchSevas = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/bookings/sevas");
            if (res.ok) {
                const data = await res.json();
                setSevasList(data);
            } else {
                setSevasList(sevas); // Fallback to static data
            }
        } catch (error) {
            // Suppress error to console to keep it clean for user
            setSevasList(sevas);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 bg-wallpaper">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-[0.2em]">
                        {t.headings.sevas}
                        <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
                        <p className="text-gold-500 font-bold uppercase tracking-widest text-sm mt-4">Loading Sevas...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {sevasList.map((seva) => (
                            <Card key={seva.id} className="glass-card hover:bg-white/10 transition-premium border-gold-500/10 group cursor-pointer shadow-2xl overflow-hidden flex flex-col">
                                <CardHeader className="bg-gold-500/5 border-b border-gold-500/10 py-8">
                                    <CardTitle className="text-2xl text-white font-serif group-hover:text-gold-400 transition-colors uppercase tracking-tight">{seva.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 flex-1">
                                    <p className="text-base text-white/80 mb-8 h-12 leading-relaxed font-sans">{seva.description}</p>
                                    <div className="flex items-center text-3xl font-black text-gold-500">
                                        <IndianRupee className="h-7 w-7 mr-2" />
                                        {seva.amount || seva.price}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-10 pt-0">
                                    <Link href={`/sevas/book?sevaId=${seva.id}`} className="w-full">
                                        <Button className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black py-8 rounded-xl text-lg uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02]">
                                            Book Seva
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="mt-24 p-12 glass-card border-gold-500/20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gold-500"></div>
                    <div className="relative z-10">
                        <HelpCircle className="w-12 h-12 text-gold-500 mx-auto mb-6 opacity-50" />
                        <h3 className="text-3xl font-serif font-bold text-white mb-4 uppercase tracking-wide">Can't find the Seva you are looking for?</h3>
                        <p className="mb-10 text-white/70 text-lg max-w-2xl mx-auto">
                            We offer many more traditional rituals and sevas. You can perform a General Donation or contact the Matha office for special requests.
                        </p>
                        <Link href="/sevas/book">
                            <Button variant="outline" className="border-2 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-maroon-950 font-bold px-10 py-8 rounded-full transition-all text-lg uppercase tracking-widest">
                                Book General Seva
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
