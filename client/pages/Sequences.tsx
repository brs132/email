import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Plus, Edit2, Trash2, ArrowLeft, Eye, Copy, Loader } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmailSequence } from "@shared/api";

export default function Sequences() {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EmailSequence>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load sequences on mount
  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sequences");
      const result = await response.json();
      if (result.success) {
        setSequences(result.data || []);
      } else {
        toast.error("Erro ao carregar sequências");
      }
    } catch (error) {
      console.error("Error fetching sequences:", error);
      toast.error("Erro ao carregar sequências");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (email: EmailSequence) => {
    setEditingId(email.id);
    setFormData(email);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (!formData.subject || !formData.content) {
        toast.error("Assunto e conteúdo são obrigatórios");
        return;
      }

      if (editingId) {
        // Update existing
        const response = await fetch(`/api/sequences/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
          setSequences(
            sequences.map((seq) => (seq.id === editingId ? result.data : seq))
          );
          toast.success("Sequência atualizada com sucesso");
        } else {
          toast.error("Erro ao atualizar sequência");
        }
      } else {
        // Create new
        const response = await fetch("/api/sequences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
          setSequences([...sequences, result.data]);
          toast.success("Sequência criada com sucesso");
        } else {
          toast.error("Erro ao criar sequência");
        }
      }

      setEditingId(null);
      setFormData({});
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving sequence:", error);
      toast.error("Erro ao salvar sequência");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) return;

    try {
      const response = await fetch(`/api/sequences/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setSequences(sequences.filter((seq) => seq.id !== id));
        toast.success("Sequência deletada com sucesso");
      } else {
        toast.error("Erro ao deletar sequência");
      }
    } catch (error) {
      console.error("Error deleting sequence:", error);
      toast.error("Erro ao deletar sequência");
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ subject: "", content: "", delay: 0 });
    setIsDialogOpen(true);
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
              Sequências de Email
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" /> Nova Sequência
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Editar Email" : "Novo Email"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure o assunto, conteúdo e delay do email
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      Assunto
                    </label>
                    <Input
                      value={formData.subject || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Assunto do email"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      Conteúdo
                    </label>
                    <Textarea
                      value={formData.content || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Conteúdo do email"
                      className="mt-1 min-h-32"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Use [LINK_DE_ACESSO] para inserir o link de acesso
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-white">
                      Delay (dias após compra)
                    </label>
                    <Input
                      type="number"
                      value={formData.delay || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          delay: parseInt(e.target.value),
                        })
                      }
                      placeholder="0"
                      className="mt-1"
                      min="0"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>Salvar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Sua sequência de emails
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Estes emails serão enviados automaticamente quando um cliente comprar através do webhook da PerfectPay
          </p>
        </div>

        {sequences.length === 0 ? (
          <Card className="p-12 text-center">
            <Mail className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Nenhuma sequência ainda
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Crie sua primeira sequência de emails para começar
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" /> Criar Primeira Sequência
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        ) : (
          <div className="space-y-4">
            {sequences.map((email) => (
              <Card
                key={email.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-primary">
                          +{email.delay} dias
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                        {email.subject}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                      {email.content}
                    </p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <button className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Visualizar
                      </button>
                      <button className="text-sm text-slate-500 dark:text-slate-400 hover:underline flex items-center gap-1">
                        <Copy className="w-4 h-4" /> Copiar
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(email)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(email.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Setup Instructions */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            ℹ️ Como configurar a automação
          </h3>
          <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside">
            <li>
              Copie sua URL de webhook:{" "}
              <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded font-mono text-xs">
                https://emailflow.com/webhook/perfectpay
              </code>
            </li>
            <li>Acesse suas configurações na PerfectPay</li>
            <li>Vá para "Webhook - Vendas" e clique em "Adicionar"</li>
            <li>Cole a URL acima e salve as configurações</li>
            <li>Quando um cliente comprar, os emails serão disparados automaticamente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
