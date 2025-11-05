import { Resend } from "resend";
import { getRandomResendKey } from "./storage";

export interface EmailPayload {
  to: string;
  subject: string;
  content: string;
}

let resendClient: Resend | null = null;

export function initializeResendService(): Resend | null {
  const key = getRandomResendKey();

  if (!key) {
    console.warn(
      "No Resend API keys configured. Email service will not work until keys are added.",
    );
    return null;
  }

  try {
    resendClient = new Resend(key.key);
    return resendClient;
  } catch (error) {
    console.error("Failed to initialize Resend service:", error);
    return null;
  }
}

export async function sendEmailWithResend(
  payload: EmailPayload,
): Promise<boolean> {
  const client = initializeResendService();

  if (!client) {
    console.error("Resend service not initialized. No API keys configured.");
    return false;
  }

  try {
    const key = getRandomResendKey();
    if (!key) {
      console.error("No Resend API keys available");
      return false;
    }

    const result = await client.emails.send({
      from: "noreply@emailflow.app",
      to: payload.to,
      subject: payload.subject,
      html: payload.content.replace(/\n/g, "<br />"),
      text: payload.content,
    });

    if (result.error) {
      console.error("Failed to send email with Resend:", result.error);
      return false;
    }

    console.log("Email sent successfully via Resend:", result.data?.id);
    return true;
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    return false;
  }
}

export async function verifyResendConfiguration(): Promise<boolean> {
  const key = getRandomResendKey();
  if (!key) {
    return false;
  }

  try {
    const client = new Resend(key.key);
    // Try to get account info to verify key works
    const result = await client.emails.send({
      from: "onboarding@resend.dev",
      to: "delivered@resend.dev",
      subject: "Test",
      html: "Test",
    });

    return !result.error;
  } catch (error) {
    console.error("Resend configuration is invalid:", error);
    return false;
  }
}

export function getResendKeyInfo() {
  const key = getRandomResendKey();
  if (!key) {
    return null;
  }
  return {
    id: key.id,
    name: key.name,
    masked: `re_${key.key.slice(-8)}`,
  };
}
