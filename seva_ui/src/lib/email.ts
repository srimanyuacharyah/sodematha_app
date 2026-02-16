import nodemailer from 'nodemailer';

const transporter = (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  : null;

if (transporter) {
  console.log("SMTP Transporter initialized for real email delivery.");
}

export async function sendEmail({ to, subject, text, html }: { to: string, subject: string, text: string, html?: string }) {
  if (!transporter) {
    console.warn("SMTP credentials not found. Falling back to console.");
    console.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject} | Text: ${text}`);
    return { success: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Sode Matha App" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Email Sent Successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Email Dispatch Error:", err);
    return { success: false, error: err };
  }
}

export async function sendOTPEmail(email: string, otp: string, username?: string) {
  const displayName = username || 'Devotee';
  const subject = `Namaste ${displayName}, Your OTP for Sode Matha App`;
  const text = `Namaste ${displayName}, Your OTP for Sode Matha App is: ${otp}`;
  const html = `
    <div style="font-family: 'Merriweather', serif; padding: 40px; background-color: #2D0000; border: 4px solid #D4AF37; border-radius: 20px; color: #FFFFFF; max-width: 600px; margin: auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #FFD700; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Sri Sode Vadiraja Matha</h1>
      </div>
      <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212, 175, 55, 0.2);">
        <p style="font-size: 18px; margin-bottom: 20px;">Namaste <strong>${displayName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">Your One-Time Password (OTP) for secure access to the Sode Matha App is:</p>
        <div style="text-align: center; margin: 40px 0;">
          <div style="display: inline-block; padding: 20px 40px; background: #FFD700; color: #2D0000; font-size: 42px; font-weight: 900; border-radius: 10px; letter-spacing: 15px;">
            ${otp}
          </div>
        </div>
        <p style="font-size: 14px; text-align: center; color: #D4AF37; margin-top: 20px;">This code will expire in 10 minutes.</p>
      </div>
    </div>
  `;

  const result = await sendEmail({ to: email, subject, text, html });
  return { ...result, otp };
}
