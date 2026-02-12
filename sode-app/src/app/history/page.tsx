"use client";

import { useState } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { guruParampara } from "@/data/history";
import { MapPin, Info, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useLanguage } from "@/context/language-context";

export default function HistoryPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 bg-wallpaper">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-[0.2em]">
                        {t.headings.guruParampara}
                        <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {guruParampara.map((guru) => (
                        <Card key={guru.id} className="glass-card flex flex-col hover:bg-white/10 transition-premium border-gold-500/10 overflow-hidden group shadow-2xl">
                            <CardHeader className="p-0 relative">
                                <div className="h-56 bg-maroon-900/50 overflow-hidden flex items-center justify-center border-b border-gold-500/10">
                                    {/* Traditional Mandala/Icon instead of image */}
                                    <div className="w-28 h-28 rounded-full bg-gold-500/5 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-all duration-700">
                                        <Info className="w-14 h-14 opacity-50" />
                                    </div>
                                    <div className="absolute top-6 right-6 bg-gold-500 text-maroon-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        {guru.period}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 flex-1 flex flex-col">
                                <CardTitle className="text-3xl text-white mb-6 font-serif tracking-tight group-hover:text-gold-400 transition-colors uppercase">{guru.name}</CardTitle>
                                <p className="text-base text-white/80 mb-8 line-clamp-4 leading-relaxed font-sans">
                                    {guru.description}
                                </p>

                                <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/10">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="text-gold-400 font-bold px-8 py-6 border-gold-500/30 hover:bg-gold-500 hover:text-maroon-950 transition-all rounded-full shadow-lg text-sm tracking-widest uppercase">
                                                Read More →
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl bg-maroon-950 border-gold-500/20 text-white shadow-[0_0_50px_rgba(0,0,0,1)]">
                                            <DialogHeader>
                                                <DialogTitle className="text-4xl font-serif text-white uppercase tracking-tight">{guru.name}</DialogTitle>
                                                <DialogDescription className="text-gold-500 font-black uppercase tracking-[0.3em] text-xs mt-2">
                                                    Divine Period: {guru.period}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-8 space-y-8 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gold-500/20">
                                                <div className="p-10 bg-white/5 rounded-2xl border border-gold-500/10 text-white leading-relaxed font-sans text-xl italic shadow-inner">
                                                    "{guru.fullBiography}"
                                                </div>
                                                {guru.achievements && (
                                                    <div className="space-y-4">
                                                        <h4 className="font-bold text-gold-400 uppercase tracking-widest text-sm underline decoration-gold-500/30 underline-offset-8">Divine Contributions</h4>
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                                                            {guru.achievements.map((a: string, i: number) => (
                                                                <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                                                    <span className="text-gold-500">◈</span>
                                                                    {a}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <span className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] opacity-50">Legacy</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
