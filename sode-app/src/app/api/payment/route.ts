import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const { email, amount, sevaName, status, username } = await request.json();

        if (!email || !amount || !sevaName || !status) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const isSuccess = status === "success";
        const subject = isSuccess ? "Payment Successful - Sri Sode Vadiraja Matha" : "Payment Failed - Sri Sode Vadiraja Matha";

        const html = `
            <div style="font-family: 'Merriweather', serif; padding: 40px; background-color: ${isSuccess ? '#002D00' : '#2D0000'}; border: 4px solid #D4AF37; border-radius: 20px; color: #FFFFFF; max-width: 600px; margin: auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #FFD700; margin: 0; font-size: 28px; text-transform: uppercase;">Payment ${isSuccess ? 'Successful' : 'Failed'}</h1>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <p>Namaste ${username || 'Devotee'},</p>
                    <p>Your payment of <strong>₹${amount}</strong> for <strong>${sevaName}</strong> has been ${isSuccess ? 'completed successfully' : 'unsuccessful'}.</p>
                    <p style="margin-top: 20px;">Transaction Details:</p>
                    <ul>
                        <li>Amount: ₹${amount}</li>
                        <li>Seva: ${sevaName}</li>
                        <li>Status: ${isSuccess ? 'SUCCESS' : 'FAILURE'}</li>
                    </ul>
                </div>
            </div>
        `;

        await sendEmail({
            to: email,
            subject,
            text: `Payment ${isSuccess ? 'Successful' : 'Failed'} for ${sevaName}. Amount: ₹${amount}`,
            html
        });

        return NextResponse.json({ success: true, status });
    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
