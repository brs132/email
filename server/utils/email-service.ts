import nodemailer from "nodemailer";
import { getSMTPConfig } from "./storage";

export interface EmailPayload {
  to: string;
  subject: string;
  content: string;
}

let transporter: nodemailer.Transporter | null = null;

export function initializeEmailService() {
  const smtpConfig = getSMTPConfig();

  if (!smtpConfig.host || !smtpConfig.email || !smtpConfig.password) {
    console.warn(
      "SMTP configuration is incomplete. Email service will not work until configured.",
    );
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.port === 465,
      auth: {
        user: smtpConfig.email,
        pass: smtpConfig.password,
      },
    });

    return transporter;
  } catch (error) {
    console.error("Failed to initialize email service:", error);
    return null;
  }
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!transporter) {
    transporter = initializeEmailService();
  }

  if (!transporter) {
    console.error("Email service not initialized. SMTP config is missing.");
    return false;
  }

  try {
    const smtpConfig = getSMTPConfig();

    const result = await transporter.sendMail({
      from: `"EmailFlow" <${smtpConfig.email}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.content.replace(/\n/g, "<br />"),
      text: payload.content,
    });

    console.log("Email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export async function verifyEmailConfiguration(): Promise<boolean> {
  if (!transporter) {
    transporter = initializeEmailService();
  }

  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP configuration is valid");
    return true;
  } catch (error) {
    console.error("SMTP configuration is invalid:", error);
    return false;
  }
}
