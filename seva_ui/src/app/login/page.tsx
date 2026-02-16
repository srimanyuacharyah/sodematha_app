"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SodeLogo } from "@/components/sode-logo";

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

        try {
            const res = await fetch("/api/send-otp-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpCode, username: name }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.mocked || data.success) {
                    toast.success("OTP sent to your email!");
                    if (data.mocked) {
                        toast.warning(`Mock Mode: OTP is ${data.otp}. Add SMTP_HOST, SMTP_USER, SMTP_PASS to .env for real emails.`, {
                            duration: 10000,
                        });
                    }
                } else {
                    toast.error("Failed to send OTP. Please check your email.");
                }
                setStep("otp");
            } else {
                toast.error("Failed to send OTP. Please check your email.");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, name || email);
            toast.success("Login successful!");
            router.push("/");
        } catch (error) {
            toast.error("Invalid OTP or login failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4 bg-wallpaper bg-fixed bg-cover">
                <div className="w-full max-w-md animate-slide-up">
                    <Card className="glass-card shadow-[0_0_50px_rgba(0,0,0,0.5)] border-gold-500/20">
                        <CardHeader className="text-center pb-6">
                            <div className="flex justify-center mb-6">
                                <SodeLogo className="w-24 h-24 drop-shadow-lg" />
                            </div>
                            <CardTitle className="text-4xl font-serif font-bold text-white uppercase tracking-wider">Login</CardTitle>
                            <CardDescription className="text-gold-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                                {step === "email" ? "Divine Access Gate" : "Security Verification"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {step === "email" ? (
                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Your Name (Optional)</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Gopalakrishna"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border-white/10 focus:border-gold-500 focus:ring-gold-500 bg-black/20 text-white placeholder:text-white/20 h-14 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="devotee@sodematha.in"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="border-white/10 focus:border-gold-500 focus:ring-gold-500 bg-black/20 text-white placeholder:text-white/20 h-14 rounded-xl"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black py-8 text-xl rounded-xl shadow-lg transition-all hover:scale-[1.02]" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin mr-3" /> : null}
                                        {isLoading ? "AUTHORIZING..." : "SEND OTP"}
                                    </Button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="otp" className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Verification Code</Label>
                                        <Input
                                            id="otp"
                                            placeholder="0000"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            maxLength={4}
                                            className="text-center text-4xl font-black tracking-[1.5em] border-white/10 focus:border-gold-500 focus:ring-gold-500 bg-black/20 text-white placeholder:text-white/10 h-20 rounded-xl"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black py-8 text-xl rounded-xl shadow-lg transition-all hover:scale-[1.02]" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin mr-3" /> : null}
                                        {isLoading ? "VERIFYING..." : "ACCESS GRANTED"}
                                    </Button>
                                    <Button variant="ghost" type="button" className="w-full text-gold-500/60 hover:text-gold-500 font-bold uppercase tracking-widest text-xs" onClick={() => setStep("email")}>
                                        Correction? Back to Email
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
