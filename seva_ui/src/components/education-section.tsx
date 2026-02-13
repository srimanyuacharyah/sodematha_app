"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ExternalLink } from "lucide-react";

const institutions = [
    {
        name: "SMVITM",
        fullName: "Shri Madhwa Vadiraja Institute of Technology & Management",
        tagline: "Engineering Your Career & Character with Care",
        link: "https://sode-edu.in/smvitm/",
        type: "Engineering"
    },
    {
        name: "Niramaya Nursing",
        fullName: "Niramaya College of Nursing",
        tagline: "Empowering Healthcare Education",
        link: "https://sode-edu.in/ncon/",
        type: "Nursing"
    },
    {
        name: "Niramaya Allied Health",
        fullName: "Niramaya College of Allied Health Science",
        tagline: "Advancing clinical skills for modern healthcare",
        link: "https://sode-edu.in/ncahs/",
        type: "Allied Health"
    },
    {
        name: "SVH PU College",
        fullName: "S.V.H Pre University College",
        tagline: "Quality teaching with holistic growth",
        link: "https://sode-edu.in/svh-pu-college/",
        type: "Secondary"
    },
    {
        name: "SVS English School",
        fullName: "S.V.S English Medium School",
        tagline: "Nurturing character and empowering futures",
        link: "https://sode-english-medium.in/",
        type: "Primary"
    },
    {
        name: "Kadiyali School",
        fullName: "Kadiyali English Medium School",
        tagline: "Nurturing minds for tomorrow",
        link: "https://sode-edu.in/kadiyali-english/",
        type: "Primary"
    }
];

export function EducationSection() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white inline-block relative uppercase tracking-widest">
                    Education Institutions
                    <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                </h2>
                <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm pt-4">Nurturing Knowledge & Spirituality</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {institutions.map((inst, i) => (
                    <a key={i} href={inst.link} target="_blank" rel="noopener noreferrer" className="block group">
                        <Card className="glass-card hover:bg-white/10 transition-premium border-gold-500/10 h-full flex flex-col shadow-2xl group-hover:border-gold-500/30 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-5 h-5 text-gold-500" />
                            </div>
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-maroon-950 transition-all">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="text-[10px] font-black text-gold-500 uppercase tracking-widest mb-2">{inst.type}</div>
                                <CardTitle className="text-2xl text-white font-serif group-hover:text-gold-400 transition-colors">{inst.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-white/60 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors">
                                    {inst.fullName}
                                </p>
                                <div className="italic text-gold-500/80 text-xs border-t border-white/5 pt-4 group-hover:text-gold-400">
                                    "{inst.tagline}"
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </section>
    );
}
