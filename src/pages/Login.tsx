import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ChevronDown, LogIn } from "lucide-react";

export default function Login() {
  const nav = useNavigate();
  const [ruolo, setRuolo] = useState("Ufficio");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-petrol-950 to-petrol-800 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-petrol-600 text-white">
            <Zap size={28} />
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900">Dastech Implant</div>
            <div className="text-sm text-slate-500">Gestionale cantieri</div>
          </div>
        </div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Accedi come</label>
        <div className="relative mb-4">
          <select value={ruolo} onChange={(e) => setRuolo(e.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium focus:border-petrol-600 focus:outline-none">
            <option>Ufficio</option>
            <option>Cantiere</option>
            <option>Dipendente (portale personale)</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button
          onClick={() => nav(ruolo.startsWith("Dipendente") ? "/dipendente" : "/app")}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-petrol-600 py-3 text-sm font-semibold text-white hover:bg-petrol-700">
          <LogIn size={16} /> Entra
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">Demo — nessuna autenticazione reale</p>
      </div>
    </div>
  );
}
