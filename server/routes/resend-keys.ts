import { RequestHandler } from "express";
import {
  getResendKeys,
  addResendKey,
  deleteResendKey,
} from "../utils/storage";

export const getResendKeysHandler: RequestHandler = (req, res) => {
  try {
    const keys = getResendKeys();
    // Don't expose full keys in response
    const safeKeys = keys.map((k) => ({
      id: k.id,
      name: k.name,
      masked: `re_${k.key.slice(-8)}`,
      createdAt: k.createdAt,
    }));
    res.json({ success: true, data: safeKeys });
  } catch (error) {
    console.error("Error fetching Resend keys:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch Resend keys" });
  }
};

export const addResendKeyHandler: RequestHandler = (req, res) => {
  try {
    const { name, key } = req.body;

    if (!name || !key) {
      res
        .status(400)
        .json({
          success: false,
          error: "Name and key are required",
        });
      return;
    }

    if (!key.startsWith("re_")) {
      res
        .status(400)
        .json({
          success: false,
          error: "Invalid Resend key format. Must start with 're_'",
        });
      return;
    }

    const newKey = addResendKey(name, key);

    // Return masked key
    res.status(201).json({
      success: true,
      data: {
        id: newKey.id,
        name: newKey.name,
        masked: `re_${newKey.key.slice(-8)}`,
        createdAt: newKey.createdAt,
      },
    });
  } catch (error) {
    console.error("Error adding Resend key:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add Resend key" });
  }
};

export const deleteResendKeyHandler: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ success: false, error: "Key ID is required" });
      return;
    }

    const deleted = deleteResendKey(id);

    if (!deleted) {
      res
        .status(404)
        .json({ success: false, error: "Key not found" });
      return;
    }

    res.json({ success: true, message: "Key deleted successfully" });
  } catch (error) {
    console.error("Error deleting Resend key:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete Resend key" });
  }
};
