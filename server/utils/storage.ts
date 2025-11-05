import fs from "fs";
import path from "path";

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

interface Config {
  perfectpayToken: string;
  smtpConfig: SMTPConfig;
  sequences: EmailSequence[];
}

const defaultConfig: Config = {
  perfectpayToken: "",
  smtpConfig: {
    host: "",
    port: 587,
    email: "",
    password: "",
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
