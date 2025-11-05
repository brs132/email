import { RequestHandler } from "express";
import {
  getSequences,
  updateSequence,
  addSequence,
  deleteSequence,
} from "../utils/storage";

export const getSequencesHandler: RequestHandler = (req, res) => {
  try {
    const sequences = getSequences();
    res.json({ success: true, data: sequences });
  } catch (error) {
    console.error("Error fetching sequences:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch sequences" });
  }
};

export const createSequenceHandler: RequestHandler = (req, res) => {
  try {
    const { subject, content, delay } = req.body;

    if (!subject || !content) {
      res.status(400).json({
        success: false,
        error: "Subject and content are required",
      });
      return;
    }

    const newSequence = addSequence({
      subject,
      content,
      delay: delay || 0,
    });

    res.status(201).json({ success: true, data: newSequence });
  } catch (error) {
    console.error("Error creating sequence:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create sequence" });
  }
};

export const updateSequenceHandler: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { subject, content, delay } = req.body;

    const updated = updateSequence(id, {
      subject,
      content,
      delay,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: "Sequence not found" });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating sequence:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update sequence" });
  }
};

export const deleteSequenceHandler: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    deleteSequence(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting sequence:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete sequence" });
  }
};
