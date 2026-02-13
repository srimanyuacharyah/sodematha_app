"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Coins } from "lucide-react";
import Link from "next/link";

export function RenovationDashboard() {
    return (
        <section className="container mx-auto px-4 py-24">
            <Card className="glass-card border-gold-500/30 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-12 lg:p-20 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-black uppercase tracking-[0.3em]">
                                <Heart className="w-4 h-4 text-gold-500 animate-pulse" />
                                Preserving Heritage
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
                                Sri Sode Matha <br />
                                <span className="text-premium-gold">Renovation</span>
                            </h2>
                            <p className="text-xl text-white/70 leading-relaxed font-sans max-w-xl">
                                Be a part of the divine mission to restore and preserve the 700-year-old architectural glory of Sode Kshetra for future generations.
                            </p>

                            <div className="flex flex-wrap gap-12 pt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gold-500">
                                        <Coins className="w-6 h-6" />
                                        <span className="text-sm font-black uppercase tracking-widest">Goal</span>
                                    </div>
                                    <div className="text-4xl font-serif font-bold text-white">30 Crores</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gold-500">
                                        <Users className="w-6 h-6" />
                                        <span className="text-sm font-black uppercase tracking-widest">Contributors</span>
                                    </div>
                                    <div className="text-4xl font-serif font-bold text-white">520+</div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gold-400">
                                    <span>Progress</span>
                                    <span>45% Completed</span>
                                </div>
                                <Progress value={45} className="h-4 bg-white/5 border border-white/10" indicatorClassName="bg-gradient-to-r from-gold-600 to-gold-400" />
                            </div>

                            <div className="pt-8">
                                <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black px-12 py-8 rounded-full shadow-premium text-xl transition-all hover:scale-105">
                                    <Link href="/renovation">About Renovation Work</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="bg-maroon-950/50 border-l border-gold-500/10 flex items-center justify-center p-12 lg:p-20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.sodematha.in/images/renovation-bg.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 group-hover:scale-110"></div>
                            <div className="relative z-10 glass-card p-12 border-gold-500/30 text-center space-y-8 max-w-md shadow-2xl">
                                <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto border border-gold-500/20">
                                    <Heart className="w-12 h-12 text-gold-500" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Your Contribution Matters</h3>
                                <p className="text-white/60 font-sans">Every small kanike brings us closer to restoring the divine abode of Sri Vadiraja Teertha.</p>
                                <div className="pt-4">
                                    <Button variant="outline" className="w-full border-2 border-gold-500/30 text-white hover:bg-gold-500 hover:text-maroon-950 font-black py-7 rounded-xl transition-all text-lg uppercase tracking-widest">
                                        Contribute Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
