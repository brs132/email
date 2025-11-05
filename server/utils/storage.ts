import fs from "fs";
import path from "path";
import bcryptjs from "bcryptjs";

const dataDir = path.join(process.cwd(), "data");
const configFile = path.join(dataDir, "config.json");

interface EmailSequence {
  id: string;
  subject: string;
  content: string;
  delay: number;
}

interface SMTPConfig {
  host: string;
  port: number;
  email: string;
  password: string;
}

interface ResendKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
}

interface AdminUser {
  username: string;
  passwordHash: string;
}

interface Config {
  perfectpayToken: string;
  smtpConfig: SMTPConfig;
  resendKeys: ResendKey[];
  adminUser: AdminUser;
  sequences: EmailSequence[];
}

// Default admin credentials (will be hashed on first run)
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "admin123456";

const defaultConfig: Config = {
  perfectpayToken: "",
  smtpConfig: {
    host: "",
    port: 587,
    email: "",
    password: "",
  },
  resendKeys: [],
  adminUser: {
    username: DEFAULT_ADMIN_USERNAME,
    passwordHash: bcryptjs.hashSync(DEFAULT_ADMIN_PASSWORD, 10),
  },
  sequences: [
    {
      id: "1",
      subject: "Bem-vindo! Seu acesso já está pronto",
      content:
        "Obrigado pela sua compra! Seu acesso foi ativado. Clique no link abaixo para começar:\n\n[LINK_DE_ACESSO]\n\nQualquer dúvida, estamos aqui para ajudar!",
      delay: 0,
    },
    {
      id: "2",
      subject: "Como funciona e próximos passos",
      content:
        "Agora que você tem acesso, deixa eu mostrar como tudo funciona:\n\n1. Faça login na plataforma\n2. Confira os primeiros passos\n3. Comece a usar\n\nAssista nosso tutorial de 5 minutos.",
      delay: 1,
    },
    {
      id: "3",
      subject: "Dúvidas? Temos a resposta - e também sobre reembolso",
      content:
        "Se você tiver qualquer dúvida ou não estiver satisfeito, podemos ajudar.\n\nNossa política de reembolso oferece 7 dias de garantia completa.\n\nEntre em contato conosco em support@email.com",
      delay: 3,
    },
  ],
};

export function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function loadConfig(): Config {
  ensureDataDir();

  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }

  try {
    const data = fs.readFileSync(configFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return defaultConfig;
  }
}

export function saveConfig(config: Config) {
  ensureDataDir();
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

export function getConfig(): Config {
  return loadConfig();
}

export function updatePerfectPayToken(token: string) {
  const config = loadConfig();
  config.perfectpayToken = token;
  saveConfig(config);
}

export function updateSMTPConfig(smtpConfig: SMTPConfig) {
  const config = loadConfig();
  config.smtpConfig = smtpConfig;
  saveConfig(config);
}

export function getSequences(): EmailSequence[] {
  const config = loadConfig();
  return config.sequences;
}

export function updateSequence(id: string, sequence: Partial<EmailSequence>) {
  const config = loadConfig();
  const index = config.sequences.findIndex((s) => s.id === id);
  if (index !== -1) {
    config.sequences[index] = { ...config.sequences[index], ...sequence };
    saveConfig(config);
    return config.sequences[index];
  }
  return null;
}

export function addSequence(sequence: Omit<EmailSequence, "id">) {
  const config = loadConfig();
  const newSequence: EmailSequence = {
    ...sequence,
    id: Date.now().toString(),
  };
  config.sequences.push(newSequence);
  saveConfig(config);
  return newSequence;
}

export function deleteSequence(id: string) {
  const config = loadConfig();
  config.sequences = config.sequences.filter((s) => s.id !== id);
  saveConfig(config);
}

export function getSMTPConfig(): SMTPConfig {
  const config = loadConfig();
  return config.smtpConfig;
}

export function getPerfectPayToken(): string {
  const config = loadConfig();
  return config.perfectpayToken;
}

export function getResendKeys(): ResendKey[] {
  const config = loadConfig();
  return config.resendKeys;
}

export function addResendKey(name: string, key: string): ResendKey {
  const config = loadConfig();
  const newKey: ResendKey = {
    id: Date.now().toString(),
    key,
    name,
    createdAt: new Date().toISOString(),
  };
  config.resendKeys.push(newKey);
  saveConfig(config);
  return newKey;
}

export function deleteResendKey(id: string): boolean {
  const config = loadConfig();
  const initialLength = config.resendKeys.length;
  config.resendKeys = config.resendKeys.filter((k) => k.id !== id);
  if (config.resendKeys.length < initialLength) {
    saveConfig(config);
    return true;
  }
  return false;
}

export function getRandomResendKey(): ResendKey | null {
  const keys = getResendKeys();
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
}

export function getAdminUser(): AdminUser {
  const config = loadConfig();
  return config.adminUser;
}

export function updateAdminPassword(
  username: string,
  password: string,
): boolean {
  const config = loadConfig();
  if (config.adminUser.username === username) {
    config.adminUser.passwordHash = bcryptjs.hashSync(password, 10);
    saveConfig(config);
    return true;
  }
  return false;
}

export function verifyAdminPassword(
  username: string,
  password: string,
): boolean {
  const config = loadConfig();
  if (config.adminUser.username !== username) {
    return false;
  }
  return bcryptjs.compareSync(password, config.adminUser.passwordHash);
}
