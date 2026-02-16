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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROOMS } from "@/data/rooms";
import { Check, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { SimulatedPhone } from "@/components/simulated-phone";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number required"),
    email: z.string().email("Invalid email"),
    checkIn: z.string().min(1, "Check-in date required"),
    checkOut: z.string().min(1, "Check-out date required"),
    guests: z.string().min(1, "Number of guests required"),
    roomId: z.string().min(1, "Select Room"),
});

const inputClasses = "flex h-12 w-full rounded-xl border border-gold-500/20 bg-black/40 px-4 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all font-sans";
const labelClasses = "text-sm font-black uppercase tracking-widest text-gold-400 mb-2 block";

function RoomBookingForm() {
    const searchParams = useSearchParams();
    const defaultRoomId = searchParams.get("roomId") || "";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            checkIn: "",
            checkOut: "",
            guests: "1",
            roomId: defaultRoomId,
        },
    });

    const watchRoomId = form.watch("roomId");
    const selectedRoom = ROOMS.find(r => r.id === watchRoomId);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedRoom) {
            toast.error("Please select a room.");
            return;
        }
        setFormData(values);
        setShowPaymentModal(true);
    }

    const handlePaymentAction = async (status: "success" | "failure") => {
        if (!formData || !selectedRoom) return;

        setIsSubmitting(true);
        setShowPaymentModal(false);

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (status === "success") {
            setIsSuccess(true);
            setShowPhone(true);

            // Save to LocalStorage for "My Bookings" page (Mock persistence)
            const newBooking = {
                id: Date.now(),
                type: "ROOM",
                name: selectedRoom.name,
                price: selectedRoom.price,
                date: formData.checkIn,
                status: "BOOKED",
                transactionId: "TX-R-" + Math.floor(Math.random() * 10000)
            };

            const existing = JSON.parse(localStorage.getItem("room_bookings") || "[]");
            localStorage.setItem("room_bookings", JSON.stringify([newBooking, ...existing]));

            // Send Confirmation Email
            fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: formData.email,
                    subject: `Room Booking Confirmed - ${selectedRoom.name}`,
                    text: `Namaste ${formData.name}, your booking for ${selectedRoom.name} on ${formData.checkIn} is confirmed. Total: ₹${selectedRoom.price}.`,
                    html: `
                        <div style="font-family: serif; color: #330000; padding: 20px; border: 1px solid #D4AF37;">
                            <h1 style="color: #D4AF37;">Booking Confirmed</h1>
                            <p>Namaste <strong>${formData.name}</strong>,</p>
                            <p>We are pleased to confirm your stay at Sri Sode Vadiraja Matha.</p>
                            <ul>
                                <li><strong>Room:</strong> ${selectedRoom.name}</li>
                                <li><strong>Check-in:</strong> ${formData.checkIn}</li>
                                <li><strong>Guests:</strong> ${formData.guests}</li>
                                <li><strong>Amount Paid:</strong> ₹${selectedRoom.price}</li>
                            </ul>
                            <p>Please show this email at the reception.</p>
                            <p><em>Sri Sode Vadiraja Matha</em></p>
                        </div>
                    `
                })
            }).catch(e => console.error("Email send failed", e));
        } else {
            setIsSubmitting(false);
            toast.error("Payment Failed. Please try again.");
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-slide-up">
                <SimulatedPhone
                    isOpen={showPhone}
                    onClose={() => setShowPhone(false)}
                    message={`Room Booking Confirmed! ${selectedRoom?.name} on ${formData?.checkIn}. - Sode Matha`}
                />
                <div className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mb-8 border-2 border-gold-500">
                    <Check className="h-12 w-12 text-gold-500" />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4 text-white">Booking Confirmed!</h2>
                <Button asChild className="bg-gold-500 text-maroon-950 font-black px-12 py-6 rounded-full mt-6">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-card border-gold-500/20">
                    <CardHeader className="bg-gold-500/10 border-b border-gold-500/20">
                        <CardTitle className="text-xl text-gold-400 font-serif uppercase">Guest Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <label className={labelClasses}>Full Name</label>
                            <input {...form.register("name")} className={inputClasses} placeholder="Enter your name" />
                            {form.formState.errors.name && <span className="text-red-400 text-xs">{form.formState.errors.name.message}</span>}
                        </div>
                        <div>
                            <label className={labelClasses}>Phone</label>
                            <input {...form.register("phone")} className={inputClasses} placeholder="9876543210" />
                            {form.formState.errors.phone && <span className="text-red-400 text-xs">{form.formState.errors.phone.message}</span>}
                        </div>
                        <div>
                            <label className={labelClasses}>Email</label>
                            <input {...form.register("email")} className={inputClasses} placeholder="email@example.com" />
                            {form.formState.errors.email && <span className="text-red-400 text-xs">{form.formState.errors.email.message}</span>}
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-gold-500/20">
                    <CardHeader className="bg-gold-500/10 border-b border-gold-500/20">
                        <CardTitle className="text-xl text-gold-400 font-serif uppercase">Stay Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <label className={labelClasses}>Room Type</label>
                            <select {...form.register("roomId")} className={inputClasses}>
                                <option value="" className="bg-maroon-950 text-white/50">Select Room</option>
                                {ROOMS.map(r => (
                                    <option key={r.id} value={r.id} className="bg-maroon-950 text-white">
                                        {r.name} - ₹{r.price}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.roomId && <span className="text-red-400 text-xs">{form.formState.errors.roomId.message}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Check-in</label>
                                <input type="date" {...form.register("checkIn")} className={inputClasses} />
                                {form.formState.errors.checkIn && <span className="text-red-400 text-xs">{form.formState.errors.checkIn.message}</span>}
                            </div>
                            <div>
                                <label className={labelClasses}>Check-out</label>
                                <input type="date" {...form.register("checkOut")} className={inputClasses} />
                                {form.formState.errors.checkOut && <span className="text-red-400 text-xs">{form.formState.errors.checkOut.message}</span>}
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Guests</label>
                            <input type="number" {...form.register("guests")} className={inputClasses} min="1" max="10" />
                            {form.formState.errors.guests && <span className="text-red-400 text-xs">{form.formState.errors.guests.message}</span>}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center pt-4">
                <Button type="submit" size="lg" className="w-full md:w-1/2 bg-gold-500 hover:bg-gold-600 text-maroon-950 font-black py-8 rounded-full text-xl uppercase tracking-widest shadow-lg transition-transform hover:scale-105" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
                </Button>
            </div>

            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="bg-maroon-950 border-gold-500/30 text-white max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center text-gold-400 font-serif uppercase">Complete Booking</DialogTitle>
                        <DialogDescription className="text-center text-gray-400">
                            Pay <strong>₹{selectedRoom?.price}</strong> to confirm.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                        <Button onClick={() => handlePaymentAction("success")} className="bg-green-600 hover:bg-green-700 h-12">Simulate Success</Button>
                        <Button variant="destructive" onClick={() => handlePaymentAction("failure")} className="h-12">Simulate Failure</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}

export default function RoomBookingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-white luminance-guard">
            <Header />
            <main className="flex-1 pb-24 bg-wallpaper">
                <div className="container mx-auto px-4 pt-10">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-center text-white mb-10 uppercase tracking-widest">
                        Room Reservation
                    </h1>
                    <div className="max-w-4xl mx-auto">
                        <Suspense fallback={<div className="text-center text-gold-500">Loading...</div>}>
                            <RoomBookingForm />
                        </Suspense>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
