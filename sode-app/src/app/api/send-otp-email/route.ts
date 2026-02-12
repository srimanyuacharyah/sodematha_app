import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const { email, otp, username } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const result = await sendOTPEmail(email, otp, username);

        if (result.success) {
            return NextResponse.json({
                success: true,
                mocked: result.mocked,
                otp: result.otp
            });
        } else {
            return NextResponse.json({ error: "Failed to send Email" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
