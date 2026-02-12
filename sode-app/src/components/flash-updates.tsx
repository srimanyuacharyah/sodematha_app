"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export function FlashUpdates() {
    return (
        <div className="bg-maroon-700 text-cream-50 overflow-hidden py-2 border-b border-gold-600 flex items-center">
            <div className="container mx-auto flex items-center">
                <div className="flex items-center gap-2 px-4 font-bold text-gold-500 whitespace-nowrap z-10 bg-maroon-700">
                    <Bell className="h-4 w-4 animate-pulse" />
                    <span>UPDATES:</span>
                </div>
                <div className="flex-1 overflow-hidden relative h-6 mask-linear">
                    {/* Simple CSS marquee or framer motion */}
                    <motion.div
                        className="whitespace-nowrap flex gap-12"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        <span>Celebrate Bhavisameera Vaibhavotsava in March 2026!</span>
                        <span>✦</span>
                        <span>New Seva bookings are now open online.</span>
                        <span>✦</span>
                        <span>Darshana Timings: 5:00 AM - 8:30 PM everyday.</span>
                        <span>✦</span>
                        <span>Paryaya Mahotsava preparations are underway.</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
