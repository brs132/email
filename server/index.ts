import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getSequencesHandler,
  createSequenceHandler,
  updateSequenceHandler,
  deleteSequenceHandler,
} from "./routes/sequences";
import { handlePerfectPayWebhook, getWebhookStatus } from "./routes/webhook";
import {
  getConfigHandler,
  updateSMTPConfigHandler,
  updatePerfectPayTokenHandler,
  testEmailConfigHandler,
  getSMTPStatusHandler,
} from "./routes/config";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Email Sequences Routes
  app.get("/api/sequences", getSequencesHandler);
  app.post("/api/sequences", createSequenceHandler);
  app.put("/api/sequences/:id", updateSequenceHandler);
  app.delete("/api/sequences/:id", deleteSequenceHandler);

  // Webhook Routes
  app.post("/api/webhook/perfectpay", handlePerfectPayWebhook);
  app.get("/api/webhook/status", getWebhookStatus);

  // Configuration Routes
  app.get("/api/config", getConfigHandler);
  app.post("/api/config/smtp", updateSMTPConfigHandler);
  app.post("/api/config/perfectpay-token", updatePerfectPayTokenHandler);
  app.post("/api/config/test-email", testEmailConfigHandler);
  app.get("/api/config/smtp-status", getSMTPStatusHandler);

  return app;
}
