import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, Users, Package, Inbox, CalendarClock,
  Library, TrendingDown, Zap, Menu, X, ChevronDown, Globe,
  MessageCircle, Brain, Bot, Map, ShieldCheck, Smartphone, QrCode,
  CalendarDays, Receipt, BookUser,
} from "lucide-react";
import { AnteprimaBadge } from "./ui";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/commesse", label: "Commesse", icon: FolderKanban },
  { to: "/app/risorse", label: "Risorse umane", icon: Users },
  { to: "/app/calendario", label: "Risorse & Calendario", icon: CalendarDays },
  { to: "/app/magazzino", label: "Magazzino & attrezzi", icon: Package },
  { to: "/app/fatture", label: "Coda fatture", icon: Receipt, count: 2 },
  { to: "/app/richieste", label: "Richieste materiale", icon: Inbox, count: 4 },
  { to: "/app/anagrafiche", label: "Anagrafiche", icon: BookUser },
  { to: "/app/scadenzario", label: "Scadenzario", icon: CalendarClock, alert: 2 },
];

const navFase2 = [
  { to: "/app/libreria", label: "Libreria gare", icon: Library },
  { to: "/app/sprechi", label: "Analisi sprechi", icon: TrendingDown },
];

const navFase3 = [
  { to: "/app/whatsapp", label: "WhatsApp + OCR", icon: MessageCircle },
  { to: "/app/previsioni", label: "Previsioni AI", icon: Brain },
  { to: "/app/assistente", label: "Assistente AI", icon: Bot },
  { to: "/app/mappa-magazzino", label: "Mappa magazzino", icon: Map },
  { to: "/app/qr", label: "Magazzino QR", icon: QrCode },
  { to: "/app/admin", label: "Ruoli & permessi", icon: ShieldCheck },
];

function NavItem({ item, onClick }: { item: (typeof nav)[number] & { alert?: number }; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? "bg-petrol-600 text-white" : "text-slate-300 hover:bg-petrol-800 hover:text-white"
        }`
      }
    >
      <Icon size={18} />
      <span className="flex-1">{item.label}</span>
      {item.count && <span className="rounded-full bg-petrol-500 px-2 py-0.5 text-xs text-white">{item.count}</span>}
      {item.alert && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{item.alert}</span>}
    </NavLink>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [ruolo, setRuolo] = useState<"Ufficio" | "Cantiere">("Ufficio");
  const close = () => setOpen(false);

  const sidebar = (
    <div className="flex h-full flex-col bg-petrol-900 text-white">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-petrol-600">
          <Zap size={20} />
        </div>
        <div>
          <div className="text-sm font-bold leading-tight">Dastech Implant</div>
          <div className="text-xs text-petrol-300">Gestionale cantieri</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {nav.map((i) => <NavItem key={i.to} item={i} onClick={close} />)}
        <div className="pt-4 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-petrol-400">
          Fase 2 — in arrivo
        </div>
        {navFase2.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            onClick={close}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-petrol-600 text-white" : "text-slate-300 hover:bg-petrol-800 hover:text-white"
              }`
            }
          >
            <i.icon size={18} />
            <span className="flex-1">{i.label}</span>
            <span className="rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] font-semibold">Anteprima</span>
          </NavLink>
        ))}
        <div className="pt-4 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-petrol-400">
          Fase 3 — Visione AI
        </div>
        {navFase3.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            onClick={close}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-petrol-600 text-white" : "text-slate-300 hover:bg-petrol-800 hover:text-white"
              }`
            }
          >
            <i.icon size={18} />
            <span className="flex-1">{i.label}</span>
            <span className="rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] font-semibold">Anteprima</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-petrol-800 px-3 py-3">
        <Link to="/dipendente" onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-petrol-800 hover:text-white">
          <Smartphone size={18} /> Portale dipendente
        </Link>
        <Link to="/" onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-petrol-800 hover:text-white">
          <Globe size={18} /> Sito istituzionale
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* sidebar desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed h-full w-64">{sidebar}</div>
      </aside>
      {/* sidebar mobile */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="absolute inset-y-0 left-0 w-64">{sidebar}</div>
          <button onClick={close} className="absolute left-[17rem] top-4 rounded-lg bg-white/10 p-2 text-white">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Apri menu">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <label className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hidden sm:inline">Vista:</span>
            <span className="relative">
              <select
                value={ruolo}
                onChange={(e) => setRuolo(e.target.value as "Ufficio" | "Cantiere")}
                className="appearance-none rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-3 pr-8 text-sm font-medium text-slate-700 focus:border-petrol-600 focus:outline-none"
              >
                <option>Ufficio</option>
                <option>Cantiere</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </span>
          </label>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-petrol-600 text-sm font-semibold text-white">
              AF
            </div>
            <div className="hidden text-sm sm:block">
              <div className="font-medium leading-tight text-slate-800">Angela Fiore</div>
              <div className="text-xs text-slate-500">Amministrazione</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet context={{ ruolo }} />
        </main>
      </div>
    </div>
  );
}
