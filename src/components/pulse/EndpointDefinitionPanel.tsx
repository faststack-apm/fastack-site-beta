"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Globe,
  GitBranch,
  X,
} from "lucide-react";
import type { EndpointDefinition, EndpointValidationResult } from "@/lib/types/pulse.types";
import { pulseService } from "@/app/service/pulse.service";

// ── Types ────────────────────────────────────────────────────────────────────

interface EndpointFormState {
  name: string;
  description: string;
  type: "single" | "multi_step";
  url: string;
  stepUrls: string[];
}

interface EndpointDefinitionPanelProps {
  sessionId: string;
  maxEndpoints?: number;
  onEndpointsChange: (endpoints: EndpointDefinition[]) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function blankForm(): EndpointFormState {
  return { name: "", description: "", type: "single", url: "", stepUrls: [""] };
}

function generateId() {
  return `ep-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isValidUrl(s: string) {
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return u.hostname.includes(".");
  } catch {
    return false;
  }
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ValidationBadge({
  status,
  statusCode,
  responseTimeMs,
  errorMessage,
}: {
  status: "idle" | "loading" | "success" | "error";
  statusCode?: number;
  responseTimeMs?: number;
  errorMessage?: string;
}) {
  if (status === "idle") return null;
  if (status === "loading")
    return (
      <span className="flex items-center gap-1.5 text-xs text-blue-400">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Checking…
      </span>
    );
  if (status === "success")
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {statusCode} · {responseTimeMs}ms
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-xs text-red-400" title={errorMessage}>
      <XCircle className="w-3.5 h-3.5" />
      {errorMessage ?? "Unreachable"}
    </span>
  );
}

function SavedEndpointRow({
  endpoint,
  onEdit,
  onDelete,
}: {
  endpoint: EndpointDefinition;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="mt-0.5 flex-shrink-0">
        {endpoint.type === "multi_step" ? (
          <GitBranch className="w-4 h-4 text-purple-400" />
        ) : (
          <Globe className="w-4 h-4 text-blue-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-foreground truncate">{endpoint.name}</span>
          {endpoint.validated && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          )}
          {endpoint.type === "multi_step" && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Multi-step
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {endpoint.type === "single"
            ? endpoint.url
            : `${endpoint.stepUrls?.length ?? 0} steps`}
        </p>
        {endpoint.description && (
          <p className="text-xs text-muted-foreground/60 mt-0.5 truncate">{endpoint.description}</p>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={onEdit}>
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-400" onClick={onDelete}>
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function EndpointDefinitionPanel({
  sessionId,
  maxEndpoints = 3,
  onEndpointsChange,
}: EndpointDefinitionPanelProps) {
  const [savedEndpoints, setSavedEndpoints] = useState<EndpointDefinition[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<EndpointFormState>(blankForm());
  const [validateStatus, setValidateStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationResult, setValidationResult] = useState<EndpointValidationResult | null>(null);

  const isAtLimit = savedEndpoints.length >= maxEndpoints;
  const activeUrl = form.type === "single" ? form.url : form.stepUrls[0] ?? "";

  // ── Helpers ────────────────────────────────────────────────────────────────

  function updateEndpoints(updated: EndpointDefinition[]) {
    setSavedEndpoints(updated);
    onEndpointsChange(updated);
  }

  function openAddForm() {
    setEditingId(null);
    setForm(blankForm());
    setValidateStatus("idle");
    setValidationResult(null);
    setShowForm(true);
  }

  function openEditForm(endpoint: EndpointDefinition) {
    setEditingId(endpoint.id);
    setForm({
      name: endpoint.name,
      description: endpoint.description ?? "",
      type: endpoint.type,
      url: endpoint.url,
      stepUrls: endpoint.stepUrls && endpoint.stepUrls.length > 0 ? endpoint.stepUrls : [""],
    });
    setValidateStatus(endpoint.validated ? "success" : "idle");
    setValidationResult(null);
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setValidateStatus("idle");
    setValidationResult(null);
  }

  function deleteEndpoint(id: string) {
    updateEndpoints(savedEndpoints.filter((e) => e.id !== id));
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  async function handleValidate() {
    const urlToValidate = form.type === "single" ? form.url.trim() : form.stepUrls[0]?.trim() ?? "";
    if (!urlToValidate) return;

    setValidateStatus("loading");
    setValidationResult(null);

    try {
      const result = await pulseService.validateEndpoint({
        name: form.name || "Unnamed",
        url: urlToValidate,
        type: form.type,
        stepUrls: form.type === "multi_step" ? form.stepUrls.filter(Boolean) : undefined,
      });
      setValidationResult(result);
      setValidateStatus(result.success ? "success" : "error");
    } catch {
      setValidateStatus("error");
      setValidationResult({ success: false, url: urlToValidate, errorMessage: "Validation request failed." });
    }
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  function handleSave() {
    const urls = form.type === "multi_step"
      ? form.stepUrls.filter(Boolean)
      : [];
    const primaryUrl = form.type === "single"
      ? form.url.trim()
      : (form.stepUrls[0]?.trim() ?? "");

    const definition: EndpointDefinition = {
      id: editingId ?? generateId(),
      name: form.name.trim() || primaryUrl,
      description: form.description.trim() || undefined,
      url: primaryUrl,
      type: form.type,
      stepUrls: form.type === "multi_step" ? urls : undefined,
      validated: validateStatus === "success",
      lastStatusCode: validationResult?.statusCode,
      responseTimeMs: validationResult?.responseTimeMs,
    };

    const updated = editingId
      ? savedEndpoints.map((e) => (e.id === editingId ? definition : e))
      : [...savedEndpoints, definition];

    updateEndpoints(updated);
    cancelForm();
  }

  // ── Step URL helpers (multi-step) ─────────────────────────────────────────

  function updateStepUrl(index: number, value: string) {
    const updated = [...form.stepUrls];
    updated[index] = value;
    setForm((f) => ({ ...f, stepUrls: updated }));
    setValidateStatus("idle");
  }

  function addStepUrl() {
    setForm((f) => ({ ...f, stepUrls: [...f.stepUrls, ""] }));
  }

  function removeStepUrl(index: number) {
    setForm((f) => ({ ...f, stepUrls: f.stepUrls.filter((_, i) => i !== index) }));
  }

  const canValidate =
    form.type === "single"
      ? isValidUrl(form.url)
      : form.stepUrls.some((u) => isValidUrl(u));

  const canSave = (form.name.trim() || activeUrl) && (form.type === "single" ? form.url.trim() : form.stepUrls.some(Boolean));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-3 mt-4">
      {/* Saved endpoint list */}
      {savedEndpoints.length > 0 && (
        <div className="space-y-2">
          {savedEndpoints.map((ep) => (
            <SavedEndpointRow
              key={ep.id}
              endpoint={ep}
              onEdit={() => openEditForm(ep)}
              onDelete={() => deleteEndpoint(ep.id)}
            />
          ))}
        </div>
      )}

      {/* Endpoint count badge */}
      {savedEndpoints.length > 0 && (
        <p className="text-xs text-muted-foreground/60 text-right">
          {savedEndpoints.length} / {maxEndpoints} endpoints defined
        </p>
      )}

      {/* Add form or add button */}
      {showForm ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {editingId ? "Edit Endpoint" : "New Endpoint"}
            </span>
            <button onClick={cancelForm} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Type toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => { setForm((f) => ({ ...f, type: "single" })); setValidateStatus("idle"); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                form.type === "single"
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "bg-transparent border-white/10 text-muted-foreground hover:border-white/20"
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Single URL
            </button>
            <button
              onClick={() => { setForm((f) => ({ ...f, type: "multi_step" })); setValidateStatus("idle"); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                form.type === "multi_step"
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "bg-transparent border-white/10 text-muted-foreground hover:border-white/20"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" /> Multi-step
            </button>
          </div>

          {form.type === "multi_step" && (
            <p className="text-xs text-muted-foreground/70 -mt-1">
              Define a synthetic transaction — steps execute in order. All must return a successful status.
            </p>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={form.type === "single" ? "e.g. Homepage health" : "e.g. Checkout flow"}
              className="bg-white/5 border-white/10 text-sm h-9"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Description <span className="text-muted-foreground/40">(optional)</span>
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of what this monitors…"
              className="bg-white/5 border-white/10 text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Single URL */}
          {form.type === "single" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">URL</label>
              <div className="flex gap-2">
                <Input
                  value={form.url}
                  onChange={(e) => { setForm((f) => ({ ...f, url: e.target.value })); setValidateStatus("idle"); }}
                  placeholder="https://example.com/health"
                  className="bg-white/5 border-white/10 text-sm h-9 flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleValidate}
                  disabled={!canValidate || validateStatus === "loading"}
                  className="h-9 border-white/10 bg-white/5 hover:bg-white/10 text-xs px-3 flex-shrink-0"
                >
                  {validateStatus === "loading" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Validate"
                  )}
                </Button>
              </div>
              <ValidationBadge
                status={validateStatus}
                statusCode={validationResult?.statusCode}
                responseTimeMs={validationResult?.responseTimeMs}
                errorMessage={validationResult?.errorMessage}
              />
            </div>
          )}

          {/* Multi-step URLs */}
          {form.type === "multi_step" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Steps</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleValidate}
                  disabled={!canValidate || validateStatus === "loading"}
                  className="h-7 text-xs px-2 text-blue-400 hover:text-blue-300"
                >
                  {validateStatus === "loading" ? (
                    <><Loader2 className="w-3 h-3 animate-spin mr-1" />Validating…</>
                  ) : (
                    "Validate all"
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                {form.stepUrls.map((url, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground/50 w-5 text-right flex-shrink-0">{i + 1}.</span>
                    <Input
                      value={url}
                      onChange={(e) => { updateStepUrl(i, e.target.value); }}
                      placeholder={
                        i === 0
                          ? "https://shop.example.com/products"
                          : i === 1
                          ? "https://shop.example.com/cart"
                          : "https://shop.example.com/checkout"
                      }
                      className="bg-white/5 border-white/10 text-sm h-8 flex-1"
                    />
                    {form.stepUrls.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground/50 hover:text-red-400 flex-shrink-0"
                        onClick={() => removeStepUrl(i)}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {form.stepUrls.length < 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addStepUrl}
                  className="h-7 text-xs text-muted-foreground/60 hover:text-muted-foreground px-2"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add step
                </Button>
              )}

              {/* Per-step results */}
              {validationResult?.stepResults && validationResult.stepResults.length > 0 && (
                <div className="mt-1 space-y-1">
                  {validationResult.stepResults.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground/40 w-5 text-right">{i + 1}.</span>
                      {step.success ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                      )}
                      <span className={step.success ? "text-emerald-400" : "text-red-400"}>
                        {step.statusCode ?? "—"} {step.responseTimeMs ? `· ${step.responseTimeMs}ms` : ""}
                      </span>
                      {step.errorMessage && (
                        <span className="text-muted-foreground/50 truncate">{step.errorMessage}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleSave}
              disabled={!canSave}
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8"
            >
              {editingId ? "Update" : "Save"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={cancelForm}
              className="text-muted-foreground text-xs h-8"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : !isAtLimit ? (
        <Button
          variant="outline"
          onClick={openAddForm}
          className="w-full border-dashed border-white/20 bg-transparent text-muted-foreground hover:text-foreground hover:border-white/40 text-sm h-10 gap-2"
        >
          <Plus className="w-4 h-4" />
          {savedEndpoints.length === 0 ? "Define your first endpoint" : "Add another endpoint"}
        </Button>
      ) : null}
    </div>
  );
}
