import { RequestHandler } from "express";
import { getSequences, getPerfectPayToken } from "../utils/storage";
import { sendEmail } from "../utils/email-service";

interface PerfectPayWebhookPayload {
  event: string;
  customer?: {
    name: string;
    email: string;
  };
  product?: {
    id: string;
    name: string;
  };
  access_link?: string;
  amount?: number;
  timestamp?: string;
}

export const handlePerfectPayWebhook: RequestHandler = async (req, res) => {
  try {
    const payload = req.body as PerfectPayWebhookPayload;
    const authToken = req.headers.authorization?.replace("Bearer ", "");
    const storedToken = getPerfectPayToken();

    // Validate token
    if (authToken && storedToken && authToken !== storedToken) {
      res.status(401).json({ success: false, error: "Unauthorized" });
      return;
    }

    // Handle purchase event
    if (payload.event === "purchase" && payload.customer && payload.product) {
      const { customer, product, access_link } = payload;

      console.log(
        `Processing purchase from ${customer.email} for ${product.name}`,
      );

      // Get all sequences
      const sequences = getSequences();

      // Schedule emails
      for (const sequence of sequences) {
        // Calculate when to send
        const delayMs = sequence.delay * 24 * 60 * 60 * 1000;

        setTimeout(async () => {
          const emailContent = sequence.content.replace(
            "[LINK_DE_ACESSO]",
            access_link || "https://example.com/access",
          );

          const success = await sendEmail({
            to: customer.email,
            subject: sequence.subject,
            content: emailContent,
          });

          if (success) {
            console.log(`Email sent to ${customer.email}: ${sequence.subject}`);
          } else {
            console.error(
              `Failed to send email to ${customer.email}: ${sequence.subject}`,
            );
          }
        }, delayMs);
      }

      res.json({
        success: true,
        message: `Purchase event received. ${sequences.length} emails will be sent.`,
      });
    } else if (payload.event === "refund") {
      console.log("Refund event received");
      res.json({
        success: true,
        message: "Refund event processed",
      });
    } else {
      res.json({
        success: true,
        message: "Event received but not processed",
      });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process webhook",
    });
  }
};

export const getWebhookStatus: RequestHandler = (req, res) => {
  try {
    const token = getPerfectPayToken();
    res.json({
      success: true,
      data: {
        status: token ? "connected" : "not_configured",
        last_event: null,
        events_processed: 0,
      },
    });
  } catch (error) {
    console.error("Error getting webhook status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get webhook status",
    });
  }
};
