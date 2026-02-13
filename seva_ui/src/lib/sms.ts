import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function sendSMS(to: string, message: string) {
    if (!client || !fromPhone) {
        console.warn("Twilio credentials not found. Falling back to console log.");
        console.log(`[REAL SMS MOCK] To: ${to} | Msg: ${message}`);
        return { success: true, mocked: true };
    }

    try {
        const response = await client.messages.create({
            body: message,
            from: fromPhone,
            to: to.startsWith("+") ? to : `+91${to}`,
        });
        return { success: true, sid: response.sid };
    } catch (error) {
        console.error("SMS Error:", error);
        return { success: false, error };
    }
}
