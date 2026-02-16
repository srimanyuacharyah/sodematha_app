"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { toast } from "sonner";
import { format } from "date-fns";
import { Receipt, History, RefreshCcw, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";

interface Booking {
    id: number;
    userEmail: string;
    seva: {
        id: number;
        name: string;
        description: string;
        price: number;
    };
    bookingDate: string;
    status: "BOOKED" | "CANCELLED" | "REFUND_PENDING" | "REFUNDED";
    transactionId: string;
}

export default function BookingsPage() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            // 1. Fetch Seva Bookings from API (if backend is running)
            let apiBookings: Booking[] = [];
            try {
                const res = await fetch(`http://localhost:8080/api/bookings?email=${user?.email}`);
                if (res.ok) {
                    apiBookings = await res.json();
                }
            } catch (e) {
                console.warn("Backend not reachable, using local data only.");
            }

            // 2. Fetch Room Bookings from LocalStorage (Mock)
            const localRooms = JSON.parse(localStorage.getItem("room_bookings") || "[]").map((r: any) => ({
                id: r.id,
                userEmail: user?.email || "",
                seva: {
                    id: 0, // Mock ID for room
                    name: r.name,
                    description: `Room Booking for ${r.date}`,
                    price: r.price
                },
                bookingDate: r.date, // Note: API uses ISO string, this might be YYYY-MM-DD
                status: r.status,
                transactionId: r.transactionId
            }));

            // Combine
            setBookings([...localRooms, ...apiBookings]);

        } catch (error) {
            // console.error("Failed to fetch bookings", error);
            toast.error("Could not load bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRefundRequest = async (id: number) => {
        try {
            // Check if it's a local room booking
            const localRooms = JSON.parse(localStorage.getItem("room_bookings") || "[]");
            const roomIndex = localRooms.findIndex((r: any) => r.id === id);

            if (roomIndex !== -1) {
                // It's a room booking
                const room = localRooms[roomIndex];

                // Update status locally
                localRooms[roomIndex].status = "REFUND_PENDING";
                localStorage.setItem("room_bookings", JSON.stringify(localRooms));

                // Refresh list
                fetchBookings();
                toast.success("Refund request submitted for Room Booking!");

                // Send Refund Email
                fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        to: user?.email,
                        subject: `Refund Requested - ${room.name}`,
                        text: `Namaste, refund request for ${room.name} (Transaction: ${room.transactionId}) has been received.`,
                        html: `
                            <div style="font-family: serif; color: #330000; padding: 20px; border: 1px solid #D4AF37;">
                                <h1 style="color: #D4AF37;">Refund Requested</h1>
                                <p>We have received your refund request for <strong>${room.name}</strong>.</p>
                                <p>Transaction ID: ${room.transactionId}</p>
                                <p>Status: <strong>Processing</strong></p>
                            </div>
                        `
                    })
                }).catch(e => console.error("Email send failed", e));
                return;
            }

            // Fallback to API for Seva bookings
            const res = await fetch(`http://localhost:8080/api/bookings/${id}/refund`, {
                method: "POST",
            });
            if (res.ok) {
                toast.success("Refund request submitted successfully!");
                fetchBookings();

                // Send Refund Email for Seva
                const sevaBooking = bookings.find(b => b.id === id);
                if (sevaBooking) {
                    fetch("/api/send-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            to: user?.email,
                            subject: `Seva Refund Requested - ${sevaBooking.seva.name}`,
                            text: `Namaste, your refund request for ${sevaBooking.seva.name} has been received and is being processed.`,
                            html: `
                                <div style="font-family: serif; color: #330000; padding: 20px; border: 1px solid #D4AF37;">
                                    <h1 style="color: #D4AF37;">Seva Refund Requested</h1>
                                    <p>Namaste,</p>
                                    <p>We have received your refund request for the seva: <strong>${sevaBooking.seva.name}</strong>.</p>
                                    <p>Our team will review your request shortly.</p>
                                    <p><em>Sri Sode Vadiraja Matha</em></p>
                                </div>
                            `
                        })
                    }).catch(e => console.error("Seva Refund Email failed", e));
                }
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to submit refund request.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "BOOKED": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "REFUND_PENDING": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "REFUNDED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "BOOKED": return <CheckCircle2 className="h-4 w-4" />;
            case "REFUND_PENDING": return <Clock className="h-4 w-4" />;
            case "REFUNDED": return <RefreshCcw className="h-4 w-4" />;
            case "CANCELLED": return <XCircle className="h-4 w-4" />;
            default: return null;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-background text-white">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold mb-4">Please login to view your bookings</h1>
                    <Link href="/login">
                        <Button className="bg-gold-500 text-maroon-950 font-bold px-8 py-6 rounded-full uppercase tracking-widest transition-transform hover:scale-105">
                            Go to Login
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 bg-wallpaper">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 uppercase tracking-wider relative inline-block">
                        {language === 'kn' ? 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು' : 'My Bookings'}
                        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gold-500 mx-auto"></div>
                    </h1>
                    <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm mt-8">
                        Manage your Seva reservations and refunds
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <RefreshCcw className="h-12 w-12 text-gold-500 animate-spin" />
                            <p className="text-gold-500 font-bold uppercase tracking-widest text-sm">Fetching your history...</p>
                        </div>
                    ) : bookings.length === 0 ? (
                        <Card className="glass-card border-gold-500/20 p-20 text-center">
                            <History className="h-20 w-20 text-gold-500/20 mx-auto mb-6" />
                            <h2 className="text-3xl font-serif text-white mb-4 uppercase">No Bookings Found</h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">You haven't made any Seva bookings yet. Explore our services to participate in Matha activities.</p>
                            <Link href="/sevas">
                                <Button className="bg-gold-500 text-maroon-950 font-black px-10 py-6 rounded-full text-sm uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95">
                                    Book a Seva
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking) => (
                                <Card key={booking.id} className="glass-card border-gold-500/10 hover:border-gold-500/30 transition-premium overflow-hidden group">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-1/4 bg-gold-500/5 p-8 flex flex-col items-center justify-center border-r border-gold-500/10">
                                            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 mb-4 group-hover:scale-110 transition-transform">
                                                <Receipt className="h-8 w-8" />
                                            </div>
                                            <div className="text-[10px] font-black text-gold-500 uppercase tracking-widest opacity-50">Trans. ID</div>
                                            <div className="text-xs font-mono text-white/60 truncate max-w-full">{booking.transactionId || "N/A"}</div>
                                        </div>

                                        <div className="flex-1 p-8">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-serif text-white uppercase tracking-tight group-hover:text-gold-400 transition-colors">
                                                        {booking.seva?.name || "Premium Offering"}
                                                    </h3>
                                                    <div className="text-sm text-gold-500 font-bold mt-1">
                                                        {booking.bookingDate ? (
                                                            (() => {
                                                                try {
                                                                    return format(new Date(booking.bookingDate), "PPP p");
                                                                } catch (e) {
                                                                    return booking.bookingDate;
                                                                }
                                                            })()
                                                        ) : "Date Not Specified"}
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${getStatusStyle(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    {booking.status}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                                <div className="text-white/70 text-sm leading-relaxed italic">
                                                    "{booking.seva?.description || "A sacred contribution to the matha's activities."}"
                                                </div>
                                                <div className="flex flex-col items-end gap-3">
                                                    <div className="text-3xl font-serif text-white">
                                                        ₹{(booking.seva?.price || 0).toLocaleString()}
                                                    </div>
                                                    {booking.status === "BOOKED" && (
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => handleRefundRequest(booking.id)}
                                                            className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-full px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
                                                        >
                                                            Request Refund
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
