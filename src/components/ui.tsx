import { createContext, useContext, useState, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

// ---------- Toast "demo" ----------
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const show = (m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 2500);
  };
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {msg}
        </div>
      )}
    </ToastCtx.Provider>
  );
}

// ---------- Badge ----------
const badgeStyles: Record<string, string> = {
  ok: "bg-emerald-100 text-emerald-700",
  "in scadenza": "bg-amber-100 text-amber-700",
  scaduto: "bg-red-100 text-red-700",
  "In corso": "bg-petrol-100 text-petrol-700",
  "In avvio": "bg-violet-100 text-violet-700",
  "In chiusura": "bg-slate-200 text-slate-600",
  Operativo: "bg-emerald-100 text-emerald-700",
  "In officina": "bg-amber-100 text-amber-700",
  Dipendente: "bg-slate-200 text-slate-600",
  Interinale: "bg-amber-100 text-amber-700",
  Materiale: "bg-petrol-100 text-petrol-700",
  Attrezzo: "bg-violet-100 text-violet-700",
  Noleggio: "bg-orange-100 text-orange-700",
  Vinta: "bg-emerald-100 text-emerald-700",
  Persa: "bg-red-100 text-red-700",
  Eseguita: "bg-petrol-100 text-petrol-700",
  Carico: "bg-emerald-100 text-emerald-700",
  Scarico: "bg-orange-100 text-orange-700",
};

export function Badge({ value }: { value: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[value] ?? "bg-slate-200 text-slate-600"}`}>
      {value}
    </span>
  );
}

export function AnteprimaBadge() {
  return (
    <span className="inline-block rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-semibold text-white align-middle">
      Anteprima
    </span>
  );
}

// ---------- Card / page chrome ----------
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

export function PageTitle({ title, subtitle, badge, actions }: { title: string; subtitle?: string; badge?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {title} {badge && <span className="ml-2">{badge}</span>}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}>{children}</th>;
}

export function Td({ children, className = "", colSpan }: { children?: ReactNode; className?: string; colSpan?: number }) {
  return <td colSpan={colSpan} className={`px-4 py-3 text-sm ${className}`}>{children}</td>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">{children}</table>
      </div>
    </Card>
  );
}
