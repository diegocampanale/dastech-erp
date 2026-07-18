import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, Euro, CalendarCheck, FileText, HeartHandshake, ChevronRight,
  HardHat, Clock, MapPin, Download, Thermometer, Palmtree, AlertCircle,
  Gift, GraduationCap, Bus, Zap, ArrowLeft, CheckCircle2,
} from "lucide-react";
import { useToast } from "../components/ui";

// Utente simulato: operaio con accessi limitati (solo i propri dati)
const io = {
  nome: "Giacomo Campanale",
  ruolo: "Elettricista",
  matricola: "DT-0108",
  assunto: "2019-04-15",
  anzianita: "7 anni e 3 mesi",
  commessa: "Cabina MT/BT centro commerciale Casamassima",
  capoSquadra: "Antonio Campanale",
  oreMese: 120,
  oreStraordinario: 6,
  ferieResidue: 12.5,
  permessiResidui: 32,
};

const bustePaga = [
  { mese: "Giugno 2026", netto: "1.842 €" },
  { mese: "Maggio 2026", netto: "1.795 €" },
  { mese: "Aprile 2026", netto: "1.810 €" },
  { mese: "Marzo 2026", netto: "1.788 €" },
];

const welfare = [
  { icon: Gift, titolo: "Buoni spesa", desc: "Credito welfare residuo: 240 €", cta: "Usa credito" },
  { icon: GraduationCap, titolo: "Formazione", desc: "Corso PLE in scadenza: prenota il rinnovo", cta: "Prenota" },
  { icon: Bus, titolo: "Rimborso trasporti", desc: "Richiedi il rimborso abbonamento mensile", cta: "Richiedi" },
  { icon: HeartHandshake, titolo: "Sanità integrativa", desc: "Polizza attiva — massimale residuo 1.500 €", cta: "Dettagli" },
];

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "paghe", label: "Paghe", icon: Euro },
  { id: "presenze", label: "Presenze", icon: CalendarCheck },
  { id: "richieste", label: "Richieste", icon: FileText },
  { id: "welfare", label: "Welfare", icon: HeartHandshake },
] as const;

export default function PortaleDipendente() {
  const toast = useToast();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("home");
  const [presenzaOggi, setPresenzaOggi] = useState<string | null>(null);

  const segna = (tipo: string) => {
    setPresenzaOggi(tipo);
    toast(`${tipo} registrata per oggi (demo)`);
  };

  return (
    <div className="min-h-screen bg-slate-200 py-0 sm:py-8">
      {/* cornice tipo smartphone su desktop */}
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-50 shadow-2xl sm:min-h-[calc(100vh-4rem)] sm:rounded-3xl sm:overflow-hidden">
        {/* header */}
        <header className="bg-petrol-900 px-5 pb-5 pt-6 text-white">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-petrol-600"><Zap size={16} /></div>
              <span className="text-sm font-semibold">Dastech Implant · Portale dipendente</span>
            </div>
            <Link to="/" className="text-petrol-300 hover:text-white" title="Esci"><ArrowLeft size={18} /></Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-petrol-600 text-lg font-bold">GC</div>
            <div>
              <div className="font-semibold">{io.nome}</div>
              <div className="text-xs text-petrol-300">{io.ruolo} · matricola {io.matricola}</div>
            </div>
          </div>
        </header>

        {/* contenuto */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          {tab === "home" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <HardHat size={16} className="text-petrol-600" /> Oggi lavori su
                </div>
                <div className="font-medium text-slate-900">{io.commessa}</div>
                <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={13} /> Casamassima (BA) · Capo squadra: {io.capoSquadra}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <Clock size={16} className="mb-1.5 text-petrol-600" />
                  <div className="text-2xl font-bold text-slate-900">{io.oreMese}</div>
                  <div className="text-xs text-slate-500">ore questo mese (+{io.oreStraordinario} straord.)</div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <Palmtree size={16} className="mb-1.5 text-emerald-600" />
                  <div className="text-2xl font-bold text-slate-900">{io.ferieResidue}</div>
                  <div className="text-xs text-slate-500">giorni di ferie residui</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 text-sm font-semibold text-slate-800">Il mio profilo</div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-500">In azienda dal</dt><dd className="font-medium">{io.assunto}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Anzianità</dt><dd className="font-medium">{io.anzianita}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Permessi residui</dt><dd className="font-medium">{io.permessiResidui} h</dd></div>
                </dl>
              </div>

              <p className="px-2 text-center text-xs text-slate-400">
                Vedi solo i tuoi dati. Gli accessi sono decisi dall'azienda in base al ruolo.
              </p>
            </div>
          )}

          {tab === "paghe" && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-petrol-900 p-4 text-white shadow-sm">
                <div className="text-xs text-petrol-300">Ultima busta paga — Giugno 2026</div>
                <div className="mt-1 text-3xl font-bold">1.842 €</div>
                <div className="mt-1 text-xs text-petrol-300">netto accreditato il 10/07/2026</div>
              </div>
              {bustePaga.map((b) => (
                <button key={b.mese} onClick={() => toast("Download busta paga (demo)")}
                  className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm hover:bg-slate-50">
                  <div>
                    <div className="font-medium text-slate-900">{b.mese}</div>
                    <div className="text-sm text-slate-500">Netto: {b.netto}</div>
                  </div>
                  <Download size={18} className="text-petrol-600" />
                </button>
              ))}
            </div>
          )}

          {tab === "presenze" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-3 text-sm font-semibold text-slate-800">Oggi — venerdì 18 luglio</div>
                {presenzaOggi ? (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                    <CheckCircle2 size={18} /> {presenzaOggi} registrata
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => segna("Presenza in cantiere")}
                      className="flex items-center justify-center gap-2 rounded-xl bg-petrol-600 py-3 text-sm font-semibold text-white hover:bg-petrol-700">
                      <CalendarCheck size={17} /> Segna presenza
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => segna("Malattia")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Thermometer size={16} /> Malattia
                      </button>
                      <button onClick={() => segna("Richiesta ferie")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Palmtree size={16} /> Ferie
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 text-sm font-semibold text-slate-800">Questa settimana</div>
                <ul className="space-y-1.5 text-sm">
                  {[
                    ["Lun 14", "Cantiere Casamassima — 8 h"],
                    ["Mar 15", "Cantiere Casamassima — 8 h"],
                    ["Mer 16", "Cantiere Casamassima — 9 h (1 straord.)"],
                    ["Gio 17", "Cantiere Casamassima — 8 h"],
                  ].map(([g, d]) => (
                    <li key={g} className="flex justify-between border-b border-slate-100 pb-1.5 last:border-0">
                      <span className="text-slate-500">{g}</span><span className="font-medium text-slate-800">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "richieste" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <AlertCircle size={16} className="text-petrol-600" /> Segnala all'azienda
                </div>
                <p className="mb-3 text-xs text-slate-500">Situazioni particolari, problemi in cantiere, richieste personali: arriva direttamente all'ufficio.</p>
                <form onSubmit={(e) => { e.preventDefault(); toast("Segnalazione inviata all'ufficio (demo)"); }} className="space-y-2.5">
                  <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none">
                    <option>Problema sicurezza in cantiere</option>
                    <option>Attrezzatura guasta o mancante</option>
                    <option>Richiesta cambio turno / squadra</option>
                    <option>Comunicazione personale riservata</option>
                    <option>Altro</option>
                  </select>
                  <textarea rows={4} placeholder="Descrivi la situazione…"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
                  <button type="submit" className="w-full rounded-xl bg-petrol-600 py-3 text-sm font-semibold text-white hover:bg-petrol-700">
                    Invia segnalazione
                  </button>
                </form>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 text-sm font-semibold text-slate-800">Le mie richieste</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-700">Rimborso trasferta 13–15/07</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Approvata</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-700">Ferie 10–21 agosto</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">In attesa</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {tab === "welfare" && (
            <div className="space-y-3">
              {welfare.map((w) => (
                <div key={w.titolo} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="rounded-xl bg-petrol-100 p-2.5 text-petrol-700"><w.icon size={20} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900">{w.titolo}</div>
                    <div className="text-xs text-slate-500">{w.desc}</div>
                  </div>
                  <button onClick={() => toast(`${w.titolo}: funzione demo`)}
                    className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-petrol-600 hover:underline">
                    {w.cta} <ChevronRight size={14} />
                  </button>
                </div>
              ))}
              <p className="px-2 pt-1 text-center text-xs text-slate-400">
                I moduli welfare visibili dipendono dal contratto e dal ruolo.
              </p>
            </div>
          )}
        </main>

        {/* bottom nav stile app */}
        <nav className="sticky bottom-0 grid grid-cols-5 border-t border-slate-200 bg-white">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                tab === t.id ? "text-petrol-600" : "text-slate-400"
              }`}>
              <t.icon size={20} /> {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
