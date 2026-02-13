"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const images = [
    {
        src: "maroon-gradient",
        alt: "Sode Matha Entrance",
        title: "Welcome to Sode Sri Vadiraja Matha",
        subtitle: "A divine destination for peace and devotion"
    },
    {
        src: "gold-pattern",
        alt: "Sri Vadiraja Teertharu",
        title: "Jagadguru Sri Vadiraja Teertharu",
        subtitle: "Celebrating the legacy of the great saint"
    },
    {
        src: "saffron-texture",
        alt: "Vaibhavotsava",
        title: "Bhavisameera Sri Vadiraja Vaibhavotsava",
        subtitle: "Join us for the grand celebration in March 2026"
    }
];

export function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    {/* Background Visual */}
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        images[index].src === "maroon-gradient" && "bg-gradient-to-br from-maroon-900 via-maroon-700 to-maroon-900",
                        images[index].src === "gold-pattern" && "bg-gradient-to-br from-gold-700 via-gold-500 to-gold-700",
                        images[index].src === "saffron-texture" && "bg-gradient-to-br from-saffron-700 via-saffron-500 to-saffron-700"
                    )}>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-white)_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                        >
                            {images[index].title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg md:text-xl font-sans max-w-2xl drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)] font-medium"
                        >
                            {images[index].subtitle}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={prevSlide}>
                <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={nextSlide}>
                <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-gold-500 w-6" : "bg-white/50"}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}
