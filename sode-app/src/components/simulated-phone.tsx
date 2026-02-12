"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SimulatedPhoneProps {
    message: string;
    sender?: string;
    onClose: () => void;
    isOpen: boolean;
}

export function SimulatedPhone({ message, sender = "VK-SODEMATHA", onClose, isOpen }: SimulatedPhoneProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 6000); // Auto close after 6 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 right-4 z-[100] w-72 md:w-80 font-sans"
                >
                    {/* Phone Frame */}
                    <div className="bg-black rounded-[2rem] p-3 shadow-2xl border-4 border-gray-800 relative overflow-hidden">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20"></div>

                        {/* Screen Content */}
                        <div className="bg-wallpaper bg-cover bg-center h-[500px] w-full rounded-[1.5rem] relative overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
                            {/* Status Bar */}
                            <div className="flex justify-between px-4 pt-2 text-[10px] text-white font-medium">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <span>5G</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            {/* Lock Screen Clock */}
                            <div className="mt-12 text-center text-white/90">
                                <div className="text-5xl font-thin tracking-tight">09:41</div>
                                <div className="text-sm mt-1">Wednesday, February 12</div>
                            </div>

                            {/* Notification */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 mx-2 bg-white/20 backdrop-blur-md rounded-xl p-3 text-white shadow-lg border border-white/10"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
                                            <MessageSquare className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wide">{sender}</span>
                                    </div>
                                    <span className="text-[10px] text-white/60">now</span>
                                </div>
                                <p className="text-sm leading-snug">{message}</p>
                            </motion.div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/50 rounded-full"></div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-gray-800 hover:bg-gray-100"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
