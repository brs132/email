import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  ArrowLeft,
  Copy,
  Check,
  AlertCircle,
  Code,
  Key,
} from "lucide-react";
import { useState as useStateAlert } from "react";

export default function Webhook() {
  const [copied, setCopied] = useState(false);
  const [perfectpayToken, setPerfectpayToken] = useState("");
  const [webhookUrl] = useState(
    "https://emailflow.com/webhook/perfectpay"
  );
  const [smtpConfig, setSmtpConfig] = useState({
    host: "",
    port: "587",
    email: "",
    password: "",
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveConfig = () => {
    // In a real app, this would save to backend
    console.log("Saving SMTP config:", smtpConfig);
    alert("Configuração salva com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-slate-900 dark:text-white">
                  EmailFlow
                </span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Integração Webhook
            </h1>
            <div className="w-12"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Webhook URL */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Passo 1: Configure Webhook na PerfectPay
          </h2>

          <Card className="p-8 mb-6">
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-3">
                Sua URL de Webhook
              </label>
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-900 dark:text-white break-all">
                  {webhookUrl}
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleCopy(webhookUrl)}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                ℹ️ Copie esta URL e configure na PerfectPay
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">Como configurar:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Acesse sua conta PerfectPay</li>
                    <li>Vá para Webhook - Vendas</li>
                    <li>Clique em "Adicionar" e selecione "PerfectPay"</li>
                    <li>Cole a URL acima no campo "URL"</li>
                    <li>Selecione "Eventos" que deseja receber</li>
                    <li>Salve as configurações</li>
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 2: PerfectPay Token */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Passo 2: Token de Segurança da PerfectPay
          </h2>

          <Card className="p-8">
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-3 flex items-center gap-2">
                <Key className="w-4 h-4" /> Token de Acesso
              </label>
              <Input
                type="password"
                value={perfectpayToken}
                onChange={(e) => setPerfectpayToken(e.target.value)}
                placeholder="Cole seu token da PerfectPay aqui"
                className="font-mono"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Seu token é mantido seguro. Você pode revogá-lo a qualquer momento na PerfectPay
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">Como obter seu token:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>
                      Acesse{" "}
                      <code className="bg-white dark:bg-slate-800 px-1 rounded text-xs">
                        app.perfectpay.com.br
                      </code>
                    </li>
                    <li>Vá para Dashboard &gt; Configurações &gt; Integrações</li>
                    <li>Procure por "Token de Acesso" ou "API Key"</li>
                    <li>Copie o token completo</li>
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 3: SMTP Configuration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Passo 3: Configurar Provedor de Email (SMTP)
          </h2>

          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">
                  Servidor SMTP
                </label>
                <Input
                  value={smtpConfig.host}
                  onChange={(e) =>
                    setSmtpConfig({ ...smtpConfig, host: e.target.value })
                  }
                  placeholder="smtp.gmail.com"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ex: smtp.gmail.com, smtp.outlook.com
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">
                  Porta
                </label>
                <Input
                  value={smtpConfig.port}
                  onChange={(e) =>
                    setSmtpConfig({ ...smtpConfig, port: e.target.value })
                  }
                  placeholder="587"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Geralmente 587 ou 465
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={smtpConfig.email}
                  onChange={(e) =>
                    setSmtpConfig({ ...smtpConfig, email: e.target.value })
                  }
                  placeholder="seu.email@gmail.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-white block mb-2">
                  Senha ou Token
                </label>
                <Input
                  type="password"
                  value={smtpConfig.password}
                  onChange={(e) =>
                    setSmtpConfig({
                      ...smtpConfig,
                      password: e.target.value,
                    })
                  }
                  placeholder="Sua senha ou token de aplicativo"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Para Gmail, use uma senha de aplicativo (não a senha da conta)
                </p>
              </div>
            </div>

            <Button
              onClick={handleSaveConfig}
              className="w-full md:w-auto"
            >
              Salvar Configuração SMTP
            </Button>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-slate-50 dark:bg-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Gmail
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Host: smtp.gmail.com, Porta: 587
                </p>
              </Card>

              <Card className="p-4 bg-slate-50 dark:bg-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Outlook
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Host: smtp.office365.com, Porta: 587
                </p>
              </Card>

              <Card className="p-4 bg-slate-50 dark:bg-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                  Hotmail
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Host: smtp.live.com, Porta: 587
                </p>
              </Card>
            </div>
          </Card>
        </section>

        {/* Test Webhook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Testar Integração
          </h2>

          <Card className="p-8">
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Payload de Teste (JSON)
              </h3>
              <Textarea
                value={JSON.stringify(
                  {
                    event: "purchase",
                    customer: {
                      name: "João Silva",
                      email: "joao@example.com",
                    },
                    product: {
                      id: "prod_123",
                      name: "Acesso Fullprop",
                    },
                    amount: 19700,
                    timestamp: new Date().toISOString(),
                  },
                  null,
                  2
                )}
                readOnly
                className="font-mono text-xs"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  handleCopy(
                    JSON.stringify(
                      {
                        event: "purchase",
                        customer: {
                          name: "João Silva",
                          email: "joao@example.com",
                        },
                        product: {
                          id: "prod_123",
                          name: "Acesso Fullprop",
                        },
                        amount: 19700,
                        timestamp: new Date().toISOString(),
                      },
                      null,
                      2
                    )
                  )
                }
              >
                <Copy className="w-4 h-4 mr-2" /> Copiar Payload
              </Button>
              <Button>Enviar Teste</Button>
            </div>

            <div className="mt-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ Integração testada com sucesso! Seus emails estão prontos para serem enviados.
              </p>
            </div>
          </Card>
        </section>

        {/* Documentation */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Documentação da API
          </h2>

          <Card className="p-8">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" /> Webhook Endpoints
            </h3>

            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded font-mono text-sm mb-3 text-primary font-semibold">
                  POST /webhook/perfectpay
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  Recebe eventos de compra da PerfectPay e dispara a sequência de emails
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Headers Necessários:
                    </span>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded mt-1 font-mono">
                      Authorization: Bearer {"{TOKEN}"}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Body (JSON):
                    </span>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded mt-1 font-mono text-xs overflow-x-auto">
                      {`{
  "event": "purchase",
  "customer": {
    "name": "string",
    "email": "string"
  },
  "product": {
    "id": "string",
    "name": "string"
  },
  "access_link": "string",
  "timestamp": "ISO8601"
}`}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded font-mono text-sm mb-3 text-primary font-semibold">
                  GET /webhook/perfectpay/status
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Verifica o status da integração
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded mt-2 font-mono text-xs">
                  Resposta: {"{ \"status\": \"connected\", \"last_event\": \"2024-01-15T10:30:00Z\" }"}
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
