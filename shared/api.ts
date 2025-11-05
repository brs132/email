/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Email Sequences
export interface EmailSequence {
  id: string;
  subject: string;
  content: string;
  delay: number;
}

export interface SequencesResponse {
  success: boolean;
  data?: EmailSequence[];
  error?: string;
}

export interface CreateSequenceRequest {
  subject: string;
  content: string;
  delay: number;
}

export interface UpdateSequenceRequest {
  subject?: string;
  content?: string;
  delay?: number;
}

// SMTP Configuration
export interface SMTPConfig {
  host: string;
  port: number;
  email: string;
  password: string;
}

export interface UpdateSMTPRequest {
  host: string;
  port: number;
  email: string;
  password: string;
}

export interface ConfigResponse {
  success: boolean;
  data?: {
    sequences: EmailSequence[];
    smtpConfig: Partial<SMTPConfig>;
    perfectpayToken?: string;
  };
  error?: string;
}

// Webhook
export interface PerfectPayWebhookPayload {
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

export interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}
