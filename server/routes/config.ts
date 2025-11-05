import { RequestHandler } from "express";
import {
  getConfig,
  updateSMTPConfig,
  updatePerfectPayToken,
  getSMTPConfig,
  getPerfectPayToken,
} from "../utils/storage";
import { verifyEmailConfiguration } from "../utils/email-service";

export const getConfigHandler: RequestHandler = (req, res) => {
  try {
    const config = getConfig();
    // Don't expose passwords in response
    const safeConfig = {
      ...config,
      smtpConfig: {
        ...config.smtpConfig,
        password: config.smtpConfig.password ? "***" : "",
      },
      perfectpayToken: config.perfectpayToken ? "***" : "",
    };
    res.json({ success: true, data: safeConfig });
  } catch (error) {
    console.error("Error fetching config:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch config" });
  }
};

export const updateSMTPConfigHandler: RequestHandler = async (req, res) => {
  try {
    const { host, port, email, password } = req.body;

    if (!host || !email || !password) {
      res.status(400).json({
        success: false,
        error: "Host, email, and password are required",
      });
      return;
    }

    updateSMTPConfig({
      host,
      port: port || 587,
      email,
      password,
    });

    // Verify the configuration
    const isValid = await verifyEmailConfiguration();

    res.json({
      success: true,
      data: {
        message: "SMTP configuration updated",
        verified: isValid,
      },
    });
  } catch (error) {
    console.error("Error updating SMTP config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update SMTP configuration",
    });
  }
};

export const updatePerfectPayTokenHandler: RequestHandler = (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        success: false,
        error: "Token is required",
      });
      return;
    }

    updatePerfectPayToken(token);

    res.json({
      success: true,
      message: "PerfectPay token updated",
    });
  } catch (error) {
    console.error("Error updating PerfectPay token:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update PerfectPay token",
    });
  }
};

export const testEmailConfigHandler: RequestHandler = async (req, res) => {
  try {
    const isValid = await verifyEmailConfiguration();

    if (!isValid) {
      res.status(400).json({
        success: false,
        error: "SMTP configuration is invalid or missing",
      });
      return;
    }

    res.json({
      success: true,
      message: "SMTP configuration is valid",
    });
  } catch (error) {
    console.error("Error testing email config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to test email configuration",
    });
  }
};

export const getSMTPStatusHandler: RequestHandler = (req, res) => {
  try {
    const smtpConfig = getSMTPConfig();
    res.json({
      success: true,
      data: {
        configured: !!smtpConfig.host && !!smtpConfig.email,
        host: smtpConfig.host || null,
        port: smtpConfig.port,
        email: smtpConfig.email || null,
      },
    });
  } catch (error) {
    console.error("Error getting SMTP status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get SMTP status",
    });
  }
};
