import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/sms";

export async function POST(request: Request) {
    try {
        const { to, message } = await request.json();

        if (!to || !message) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const result = await sendSMS(to, message);

        if (result.success) {
            return NextResponse.json({ success: true, result });
        } else {
            return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
