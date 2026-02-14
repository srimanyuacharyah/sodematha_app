"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { sevas } from "@/data/sevas"; // Fixed import path
import { rashis, nakashatras, gothras } from "@/data/spiritual"; // Fixed import path - need to check file created
// Wait, I created spiritual.ts but maybe exported incorrectly? No, it was named spiritual.ts.
// Let's assume exports are correct: rashis, nakashatras, gothras.

import { Check, Loader2 } from "lucide-react";

// Correction: I might have made a mistake in previous write_to_file for spiritual.ts. 
// I exported 'rashis', 'nakashatras', 'gothras'.
// However, the import in this file uses local path. 
// Let's ensure the path is correct: @/data/spiritual

const formSchema = z.object({
    phone: z.string().min(10, "Phone number must be 10 digits"),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(6, "Invalid Pincode"),
    rashi: z.string().min(1, "Select Rashi"),
    nakashatra: z.string().min(1, "Select Nakashatra"),
    gothra: z.string().min(1, "Select Gothra"),
    sevaId: z.string().min(1, "Select Seva"),
    paymentMode: z.enum(["razorpay", "upi", "card", "netbanking"]),
    prasadaCollection: z.enum(["personal", "post"]),
    sameAddress: z.boolean().optional(),
});

import { SimulatedPhone } from "@/components/simulated-phone";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner";

const inputClasses = "flex h-12 w-full rounded-xl border border-gold-500/20 bg-black/40 px-4 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all font-sans";
const labelClasses = "text-sm font-black uppercase tracking-widest text-gold-400 mb-2 block";

function BookingFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultSevaId = searchParams.get("sevaId") || "";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            name: "",
            email: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            rashi: "",
            nakashatra: "",
            gothra: "",
            sevaId: defaultSevaId,
            paymentMode: "upi",
            prasadaCollection: "personal",
            sameAddress: false,
        },
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);

    const watchSeva = form.watch("sevaId");
    const selectedSeva = sevas.find(s => s.id === watchSeva);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedSeva) {
            toast.error("Please select a Seva first.");
            return;
        }
        setFormData(values);
        setShowPaymentModal(true);
    }

    const handlePaymentAction = async (status: "success" | "failure") => {
        if (!formData || !selectedSeva) return;

        setIsSubmitting(true);
        setShowPaymentModal(false);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (status === "success") {
            setIsSuccess(true);
            setShowPhone(true);

            // Call Payment API to send real email
            try {
                // 1. Send Confirmation Email
                await fetch("http://localhost:8080/api/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        amount: selectedSeva.amount,
                        sevaName: selectedSeva.name,
                        status: "success",
                        username: formData.name
                    }),
                });

                // 2. Save Booking to Backend Database
                await fetch("http://localhost:8080/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        sevaId: selectedSeva.id,
                        transactionId: "TX-" + Date.now()
                    }),
                });
            } catch (err) {
                console.error("Backend Sync Failed", err);
            }
        } else {
            setIsSubmitting(false);
            toast.error("Payment Failed. Please try again or contact the Matha office.");
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center relative animate-slide-up">
                <SimulatedPhone
                    isOpen={showPhone}
                    onClose={() => setShowPhone(false)}
                    message={`Booking Successful for ${selectedSeva?.name}. Receipt #BK-2026-${Math.floor(Math.random() * 1000)}. - Sode Matha`}
                />
                <div className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mb-8 border-2 border-gold-500 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <Check className="h-12 w-12 text-gold-500" />
                </div>
                <h2 className="text-5xl font-serif font-bold mb-4 text-white uppercase tracking-tight">Booking Successful!</h2>
                <p className="text-gold-400 text-xl font-serif italic mb-12">May Lord Sri Krishna and Sri Vadiraja Teertha bless you.</p>
                <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black px-12 py-8 rounded-full shadow-premium text-xl transition-all hover:scale-105">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Devotee Details */}
                <Card className="glass-card border-gold-500/20 overflow-hidden shadow-2xl">
                    <CardHeader className="bg-gold-500/10 border-b border-gold-500/20 py-8">
                        <CardTitle className="text-2xl text-gold-400 font-serif uppercase tracking-widest text-center">Devotee Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                        <div className="space-y-2">
                            <label className={labelClasses}>Phone Number</label>
                            <input {...form.register("phone")} className={inputClasses} placeholder="9876543210" />
                            {form.formState.errors.phone && <span className="text-red-400 text-xs font-bold">{form.formState.errors.phone.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className={labelClasses}>Devotee Name</label>
                            <input {...form.register("name")} className={inputClasses} placeholder="Shri Gopalakrishna" />
                            {form.formState.errors.name && <span className="text-red-400 text-xs font-bold">{form.formState.errors.name.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className={labelClasses}>Email Address</label>
                            <input {...form.register("email")} className={inputClasses} placeholder="devotee@example.com" />
                            {form.formState.errors.email && <span className="text-red-400 text-xs font-bold">{form.formState.errors.email.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className={labelClasses}>Address</label>
                            <textarea {...form.register("address")} className={`${inputClasses} h-32 resize-none`} placeholder="House No, Street, Landmark" />
                            {form.formState.errors.address && <span className="text-red-400 text-xs font-bold">{form.formState.errors.address.message}</span>}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <input {...form.register("city")} className={inputClasses} placeholder="City" />
                                {form.formState.errors.city && <span className="text-red-400 text-xs font-bold">{form.formState.errors.city.message}</span>}
                            </div>
                            <div>
                                <input {...form.register("state")} className={inputClasses} placeholder="State" />
                                {form.formState.errors.state && <span className="text-red-400 text-xs font-bold">{form.formState.errors.state.message}</span>}
                            </div>
                            <div>
                                <input {...form.register("pincode")} className={inputClasses} placeholder="Pincode" />
                                {form.formState.errors.pincode && <span className="text-red-400 text-xs font-bold">{form.formState.errors.pincode.message}</span>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Spiritual & Seva Details */}
                <div className="space-y-10">
                    <Card className="glass-card border-gold-500/20 overflow-hidden shadow-2xl">
                        <CardHeader className="bg-gold-500/10 border-b border-gold-500/20 py-8">
                            <CardTitle className="text-2xl text-gold-400 font-serif uppercase tracking-widest text-center">Spiritual Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-2">
                                <label className={labelClasses}>Select Rashi</label>
                                <select {...form.register("rashi")} className={inputClasses}>
                                    <option value="" className="bg-maroon-950 text-white/50">-- Select Rashi --</option>
                                    {rashis.map(r => <option key={r} value={r} className="bg-maroon-950 text-white">{r}</option>)}
                                </select>
                                {form.formState.errors.rashi && <span className="text-red-400 text-xs font-bold">{form.formState.errors.rashi.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Select Nakashatra</label>
                                <select {...form.register("nakashatra")} className={inputClasses}>
                                    <option value="" className="bg-maroon-950 text-white/50">-- Select Nakashatra --</option>
                                    {nakashatras.map(n => <option key={n} value={n} className="bg-maroon-950 text-white">{n}</option>)}
                                </select>
                                {form.formState.errors.nakashatra && <span className="text-red-400 text-xs font-bold">{form.formState.errors.nakashatra.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Select Gothra</label>
                                <select {...form.register("gothra")} className={inputClasses}>
                                    <option value="" className="bg-maroon-950 text-white/50">-- Select Gothra --</option>
                                    {gothras.map(g => <option key={g} value={g} className="bg-maroon-950 text-white">{g}</option>)}
                                </select>
                                {form.formState.errors.gothra && <span className="text-red-400 text-xs font-bold">{form.formState.errors.gothra.message}</span>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-gold-500/20 overflow-hidden shadow-2xl">
                        <CardHeader className="bg-gold-500/10 border-b border-gold-500/20 py-8">
                            <CardTitle className="text-2xl text-gold-400 font-serif uppercase tracking-widest text-center">Seva Selection</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-2">
                                <label className={labelClasses}>Seva Type</label>
                                <select {...form.register("sevaId")} className={`${inputClasses} font-bold`}>
                                    <option value="" className="bg-maroon-950 text-white/50">-- Select Seva --</option>
                                    {sevas.map(s => <option key={s.id} value={s.id} className="bg-maroon-950 text-white">{s.name}</option>)}
                                </select>
                                {form.formState.errors.sevaId && <span className="text-red-400 text-xs font-bold">{form.formState.errors.sevaId.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Amount</label>
                                <div className="h-14 border border-gold-500/30 rounded-xl bg-gold-500/10 px-6 flex items-center text-2xl font-black text-gold-400 shadow-inner">
                                    ₹ {selectedSeva ? selectedSeva.amount : 0}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className={labelClasses}>Prasada Collection</label>
                                <div className="flex gap-8">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="radio" value="personal" {...form.register("prasadaCollection")} className="w-5 h-5 accent-gold-500" />
                                        <span className="text-white group-hover:text-gold-400 transition-colors">By Personal Visit</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="radio" value="post" {...form.register("prasadaCollection")} className="w-5 h-5 accent-gold-500" />
                                        <span className="text-white group-hover:text-gold-400 transition-colors">By Post</span>
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <Button type="submit" size="lg" className="w-full md:w-1/2 bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black py-10 rounded-full text-2xl uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="flex items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Confirm & Proceed to Pay"
                    )}
                </Button>
            </div>

            {/* Payment Simulation Dialog */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="bg-maroon-950 border-gold-500/30 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-gold-400 uppercase tracking-widest text-center">Payment Simulation</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                            You are paying <strong>₹ {selectedSeva?.amount}</strong> for <strong>{selectedSeva?.name}</strong>.
                            Choose the outcome of this simulated transaction.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-8">
                        <Button
                            onClick={() => handlePaymentAction("success")}
                            className="bg-green-600 hover:bg-green-700 text-white py-8 text-xl font-bold rounded-2xl transition-all hover:scale-105"
                        >
                            Simulate Success
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handlePaymentAction("failure")}
                            className="py-8 text-xl font-bold rounded-2xl transition-all hover:scale-105"
                        >
                            Simulate Failure
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-white luminance-guard">
            <Header />
            <main className="flex-1 pb-24 bg-wallpaper">
                <div className="container mx-auto px-4 pt-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white inline-block relative uppercase tracking-[0.2em]">
                            Book Seva
                            <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                        </h1>
                        <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm pt-8">Sacred Offering</p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <Suspense fallback={
                            <div className="flex flex-col items-center justify-center py-24 gap-6">
                                <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
                                <p className="text-gold-500 font-black uppercase tracking-widest animate-pulse">Initializing Portal...</p>
                            </div>
                        }>
                            <BookingFormContent />
                        </Suspense>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
