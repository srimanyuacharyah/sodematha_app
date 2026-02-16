import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
    console.log("SEND-EMAIL API called");
    try {
        const { to, subject, text, html } = await request.json();

        if (!to || !subject || !text) {
            return NextResponse.json({ error: "Missing parameters (to, subject, text)" }, { status: 400 });
        }

        console.log(`Sending email to: ${to}, Subject: ${subject}`);

        // Use the existing shared email utility
        const result = await sendEmail({
            to,
            subject,
            text,
            html: html || `<div>${text}</div>`
        });

        console.log("Email result:", result);

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("SEND-EMAIL API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
