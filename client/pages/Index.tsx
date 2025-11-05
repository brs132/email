import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Send, Zap, Shield, ArrowRight, Mail, Code, Settings } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                EmailFlow
              </span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
              >
                Dashboard
              </Link>
              <a
                href="#sequences"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
              >
                Sequências
              </a>
              <a
                href="#webhook"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
              >
                Webhook
              </a>
              <a
                href="#integrations"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
              >
                Integrações
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Automação de Email Marketing com PerfectPay
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Crie sequências de email automáticas, integre com PerfectPay via webhook e envie acesso de forma segura para seus clientes. Tudo em um único lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/sequences">
                <Button size="lg" className="gap-2">
                  Começar <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/webhook">
                <Button variant="outline" size="lg">
                  Configurar Webhook
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
              <div className="space-y-4">
                <div className="h-3 bg-primary rounded-full w-1/3"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2"></div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full flex-1"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full flex-1"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ferramentas poderosas para gerenciar suas campanhas de email marketing e automações
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Sequências de Email
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Crie e gerencie sequências automáticas de email. Ideal para onboarding e educação de clientes.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Integração Webhook
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Conecte com PerfectPay usando webhooks. Receba notificações de eventos automaticamente.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Acesso Seguro
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Distribua links de acesso com segurança. Rastreie quem abriu seus emails.
            </p>
          </Card>
        </div>
      </section>

      {/* Email Sequences Preview */}
      <section id="sequences" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    Email 1: Bem-vindo
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Enviado imediatamente após compra
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    Email 2: Como funciona
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Enviado 1 dia depois
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    Email 3: Suporte & Reembolso
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Enviado 3 dias depois
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Sequência de 3 Emails
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Uma sequência completa e provada para enviar acesso aos seus clientes:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Email de Boas-vindas</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Apresente seu produto/serviço e forneça o link de acesso
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Guia de Uso</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Explique como usar a plataforma e os primeiros passos
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Suporte & Reembolso</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Ofereça suporte e informações sobre política de reembolso
                  </p>
                </div>
              </div>
            </div>
            <Link to="/sequences" className="mt-8 block">
              <Button className="gap-2">
                Gerenciar Sequências <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Webhook Integration Section */}
      <section id="webhook" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Integração com PerfectPay
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Integre automaticamente com PerfectPay usando webhooks. Quando um cliente compra, a sequência é disparada automaticamente.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Token de Segurança</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Seu token PerfectPay é armazenado com segurança
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Automação Completa</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Eventos são processados e emails disparados automaticamente
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Rastreamento</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Acompanhe o status de cada envio e eventos
                  </p>
                </div>
              </div>
            </div>
            <Link to="/webhook" className="mt-8 block">
              <Button className="gap-2">
                Configurar Webhook <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Webhook URL
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-xs text-slate-700 dark:text-slate-300 font-mono break-all">
                    https://emailflow.com/webhook/perfectpay
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Métodos Suportados
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">POST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">GET</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Segurança
                  </div>
                  <div className="bg-primary/10 rounded p-3">
                    <span className="text-sm font-medium text-primary">HTTPS + Validação de Token</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Providers Section */}
      <section id="integrations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Provedores de Email Suportados
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Envie seus emails através de qualquer provedor SMTP. Gmail, Outlook, ou qualquer outro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Gmail / Google Workspace
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Configure suas credenciais SMTP do Gmail ou Google Workspace para enviar diretamente
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Outlook / Hotmail
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Integre com suas contas Outlook e Hotmail usando SMTP seguro
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
              Serviços SMTP Customizados
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Use qualquer provedor SMTP. Fornecedor próprio ou serviço de email transacional
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Configure sua integração com PerfectPay e comece a enviar sequências de email automáticas
          </p>
          <Link to="/sequences">
            <Button variant="secondary" size="lg" className="gap-2">
              Acessar Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">EmailFlow</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Automação de email marketing com PerfectPay
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
                Produto
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary">Sequências</a></li>
                <li><a href="#" className="hover:text-primary">Webhook</a></li>
                <li><a href="#" className="hover:text-primary">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
                Recursos
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary">Documentação</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
                Empresa
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary">Sobre</a></li>
                <li><a href="#" className="hover:text-primary">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; 2024 EmailFlow. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">Twitter</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
