import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 bg-wallpaper">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-[0.2em]">
                        Contact Us
                        <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    </h1>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Card className="glass-card border-gold-500/20 shadow-2xl overflow-hidden">
                        <CardContent className="p-12 space-y-10">
                            <h2 className="text-4xl font-serif font-bold text-gold-400 mb-8 uppercase tracking-tight">Sode Sri Vadiraja Matha</h2>

                            <div className="flex items-start gap-6 group">
                                <MapPin className="h-8 w-8 text-gold-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="space-y-2">
                                    <p className="font-black text-gold-500 uppercase tracking-widest text-[10px]">Sacred Address</p>
                                    <p className="text-white text-xl leading-relaxed">Car Street, Udupi<br />Karnataka, India - 576101</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <Phone className="h-8 w-8 text-gold-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="space-y-2">
                                    <p className="font-black text-gold-500 uppercase tracking-widest text-[10px]">Divine Inquiry</p>
                                    <p className="text-white text-xl">+91 820 252 0598</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <Mail className="h-8 w-8 text-gold-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="space-y-2">
                                    <p className="font-black text-gold-500 uppercase tracking-widest text-[10px]">Digital Epistle</p>
                                    <p className="text-white text-lg underline decoration-gold-500/30 hover:text-gold-400 transition-colors">office@sodematha.in</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <Clock className="h-8 w-8 text-gold-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="space-y-2">
                                    <p className="font-black text-gold-500 uppercase tracking-widest text-[10px]">Darshan & Office Hours</p>
                                    <p className="text-white text-lg">9:00 AM - 1:00 PM<br />3:00 PM - 7:00 PM</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="h-full min-h-[400px] glass-card rounded-2xl overflow-hidden border border-gold-500/20 text-center flex flex-col items-center justify-center p-12 bg-maroon-950/50 shadow-inner group">
                        <div className="w-24 h-24 mb-6 rounded-full bg-gold-500/5 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700">
                            <MapPin className="w-12 h-12 opacity-50" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-4">Temple Location Guide</h3>
                        <p className="text-white/60 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Visualize your spiritual journey to Sode Matha. Our location is at the spiritual heart of Udupi.</p>
                        <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-maroon-950 px-8 py-6 rounded-full transition-all uppercase tracking-widest font-bold text-xs">
                            View on Google Maps
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
