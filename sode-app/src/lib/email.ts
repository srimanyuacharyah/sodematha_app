import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendOTPEmail(email: string, otp: string, username?: string) {
    const displayName = username || 'Devotee';

    if (!resend) {
        console.warn("RESEND_API_KEY not found. Falling back to console log.");
        console.log(`[REAL EMAIL MOCK] To: ${email} | Name: ${displayName} | OTP: ${otp}`);
        return { success: true, mocked: true, otp, username: displayName };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Sode Matha App <onboarding@resend.dev>',
            to: [email],
            subject: `Namaste ${displayName}, Your OTP for Sode Matha App`,
            html: `
        <div style="font-family: 'Merriweather', serif; padding: 40px; background-color: #2D0000; border: 4px solid #D4AF37; border-radius: 20px; color: #FFFFFF; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FFD700; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Sri Sode Vadiraja Matha</h1>
            <div style="height: 2px; background: linear-gradient(to right, transparent, #FFD700, transparent); margin-top: 10px;"></div>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212, 175, 55, 0.2);">
            <p style="font-size: 18px; margin-bottom: 20px;">Namaste <strong>${displayName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">Your One-Time Password (OTP) for secure access to the Sode Matha App is:</p>
            
            <div style="text-align: center; margin: 40px 0;">
              <div style="display: inline-block; padding: 20px 40px; background: #FFD700; color: #2D0000; font-size: 42px; font-weight: 900; border-radius: 10px; letter-spacing: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                ${otp}
              </div>
            </div>
            
            <p style="font-size: 14px; text-align: center; color: #D4AF37; margin-top: 20px;">This code will expire in 10 minutes.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: rgba(255,255,255,0.6); font-size: 14px;">
            <p>May Lord Sri Hayagreeva and Sri Vadiraja Teertha bless you.</p>
            <div style="margin-top: 20px; font-size: 10px; opacity: 0.5;">
              This is an automated spiritual communication. Please do not reply.
            </div>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error };
        }

        return { success: true, id: data?.id };
    } catch (err) {
        console.error("Email Dispatch Error:", err);
        return { success: false, error: err };
    }
}
