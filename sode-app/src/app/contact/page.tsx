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

                    <div className="h-full min-h-[500px] glass-card rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1136.5413349694464!2d74.75549069501533!3d13.339243450942008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca4a595555555%3A0xe5f9b4f0b26b48a0!2sSri%20Sode%20Vadiraja%20Matha!5e0!3m2!1sen!2sin!4v1707810000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1) brightness(0.9)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-maroon-950/20 shadow-inner"></div>
                        <div className="absolute top-6 right-6 pointer-events-none">
                            <div className="bg-maroon-950/80 backdrop-blur-md border border-gold-500/30 p-4 rounded-xl shadow-2xl animate-fade-in">
                                <p className="text-gold-500 font-black uppercase tracking-[0.2em] text-[10px] mb-1 text-center">Location Identified</p>
                                <p className="text-white font-serif font-bold text-sm text-center">Sri Sode Matha, Udupi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
