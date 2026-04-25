// ─────────────────────────────────────────────
// Email Service — uses Resend (free: 3,000/month)
// Falls back to console.log if RESEND_API_KEY is not set
// ─────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "DoctorSewa <noreply@doctorsewa.com>";
const APP_URL = process.env.APP_URL || "http://localhost:3000";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(payload: EmailPayload): Promise<boolean> {
  // Development fallback — log to console
  if (!RESEND_API_KEY || RESEND_API_KEY === "re_placeholder") {
    console.log("\n📧 ─── EMAIL (dev mode) ───────────────────");
    console.log(`To:      ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body:    ${payload.html.replace(/<[^>]*>/g, "")}`);
    console.log("──────────────────────────────────────────\n");
    return true;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[EMAIL_ERROR]", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[EMAIL_ERROR]", error);
    return false;
  }
}

// ─────────────────────────────────────────────
// Email Templates
// ─────────────────────────────────────────────

export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: "Verify your DoctorSewa account",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #1a6b4a; border-radius: 12px; margin-bottom: 16px;">
            <span style="color: white; font-weight: bold; font-size: 18px;">DS</span>
          </div>
          <h1 style="color: #1a1916; font-size: 24px; margin: 0;">Verify your email</h1>
        </div>
        <p style="color: #5a5850; font-size: 14px; line-height: 1.6;">
          Welcome to DoctorSewa! Use the code below to verify your email address.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <div style="display: inline-block; padding: 16px 32px; background: #e8f4ef; border-radius: 12px; font-size: 32px; font-weight: 600; letter-spacing: 8px; color: #1a6b4a;">
            ${code}
          </div>
        </div>
        <p style="color: #8a8680; font-size: 12px; text-align: center;">
          This code expires in 10 minutes. If you didn't create an account, you can ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<boolean> {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Reset your DoctorSewa password",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #1a6b4a; border-radius: 12px; margin-bottom: 16px;">
            <span style="color: white; font-weight: bold; font-size: 18px;">DS</span>
          </div>
          <h1 style="color: #1a1916; font-size: 24px; margin: 0;">Reset your password</h1>
        </div>
        <p style="color: #5a5850; font-size: 14px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: #1a6b4a; color: white; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">
            Reset Password
          </a>
        </div>
        <p style="color: #8a8680; font-size: 12px; text-align: center;">
          This link expires in 1 hour. If you didn't request a password reset, you can ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendAppointmentConfirmation(
  email: string,
  details: {
    doctorName: string;
    date: string;
    time: string;
    appointmentId: string;
  }
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: `Appointment confirmed with ${details.doctorName}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #1a6b4a; border-radius: 12px; margin-bottom: 16px;">
            <span style="color: white; font-weight: bold; font-size: 18px;">DS</span>
          </div>
          <h1 style="color: #1a1916; font-size: 24px; margin: 0;">Appointment Confirmed! ✓</h1>
        </div>
        <div style="background: #f9f8f6; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="color: #5a5850; font-size: 14px; margin: 0 0 8px;"><strong>Doctor:</strong> ${details.doctorName}</p>
          <p style="color: #5a5850; font-size: 14px; margin: 0 0 8px;"><strong>Date:</strong> ${details.date}</p>
          <p style="color: #5a5850; font-size: 14px; margin: 0 0 8px;"><strong>Time:</strong> ${details.time}</p>
          <p style="color: #5a5850; font-size: 14px; margin: 0;"><strong>ID:</strong> #${details.appointmentId}</p>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${APP_URL}/patient/appointments/${details.appointmentId}" style="display: inline-block; padding: 14px 32px; background: #1a6b4a; color: white; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">
            View Appointment
          </a>
        </div>
      </div>
    `,
  });
}
