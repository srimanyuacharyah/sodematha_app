"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Namaste! You have successfully subscribed to our newsletter.", {
                description: "We will keep you updated with the latest news and events.",
            });
            setEmail("");
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="glass-card border-gold-500/20 p-12 max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center border border-gold-500/20">
                            <Mail className="w-6 h-6 text-gold-500" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Stay Connected</h3>
                    </div>
                    <p className="text-white/60 font-sans leading-relaxed">
                        Subscribe to our newsletter to receive the latest updates on Utsavas, Sevas, and Matha events.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 flex flex-col sm:flex-row gap-4">
                    <Input
                        type="email"
                        placeholder="your-email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-black/40 border-white/10 text-white placeholder:text-white/20 h-14 rounded-xl focus:ring-gold-500 focus:border-gold-500"
                    />
                    <Button
                        disabled={isSubmitting}
                        className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black px-8 h-14 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 group"
                    >
                        {isSubmitting ? "Processing..." : (
                            <>
                                Subscribe <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
