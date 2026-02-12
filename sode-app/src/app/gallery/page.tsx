"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

const galleryImages = [
    { id: 1, type: "utsava", alt: "Grand Utsava" },
    { id: 2, type: "pooja", alt: "Deepa Pooja" },
    { id: 3, type: "matha", alt: "Matha Exteriors" },
    { id: 4, type: "rathotsava", alt: "Brahmarathotsava" },
    { id: 5, type: "goshala", alt: "Goshala" },
    { id: 6, type: "pathashala", alt: "Veda Pathashala" },
];

export default function GalleryPage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 bg-wallpaper">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-[0.2em]">
                        {t?.nav?.gallery || "Photo Gallery"}
                        <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {galleryImages.map((img) => (
                        <div key={img.id} className="rounded-2xl overflow-hidden glass-card hover:bg-white/5 transition-all duration-500 border-gold-500/10 group cursor-pointer shadow-2xl">
                            <div className={cn(
                                "w-full h-72 flex items-center justify-center relative overflow-hidden",
                                img.type === "utsava" && "bg-gradient-to-br from-maroon-900 to-maroon-950",
                                img.type === "pooja" && "bg-gradient-to-br from-maroon-800 to-maroon-950",
                                img.type === "matha" && "bg-gradient-to-br from-maroon-900 to-maroon-950",
                                img.type === "rathotsava" && "bg-gradient-to-br from-maroon-800 to-maroon-950",
                                img.type === "goshala" && "bg-gradient-to-br from-maroon-900 to-maroon-950",
                                img.type === "pathashala" && "bg-gradient-to-br from-maroon-800 to-maroon-950"
                            )}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-gold-500)_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
                                <span className="text-white font-serif font-bold text-2xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] uppercase tracking-widest text-center px-4 z-10">{img.alt}</span>
                                <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="p-6 bg-maroon-950/80 text-gold-500 text-center font-serif font-bold uppercase tracking-[0.2em] text-xs border-t border-gold-500/10">
                                View Full Exhibit
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
