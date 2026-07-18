import { Link } from "react-router-dom";
import {
  Zap, Factory, Home, Wrench, Sun, ShieldCheck, ArrowRight, Phone, Mail, MapPin, LayoutDashboard,
} from "lucide-react";
import { useToast } from "../components/ui";

const servizi = [
  { icon: Factory, titolo: "Impianti industriali", testo: "Forza motrice, quadri elettrici, cabine MT/BT e distribuzione per capannoni e stabilimenti produttivi." },
  { icon: Home, titolo: "Impianti civili", testo: "Impianti elettrici per residenziale e terziario, domotica e sistemi di illuminazione a norma." },
  { icon: Sun, titolo: "Fotovoltaico", testo: "Progettazione e installazione di impianti fotovoltaici industriali e commerciali, con pratiche incluse." },
  { icon: Wrench, titolo: "Manutenzione", testo: "Contratti di manutenzione programmata e pronto intervento su impianti e illuminazione pubblica." },
  { icon: ShieldCheck, titolo: "Verifiche e certificazioni", testo: "Verifiche periodiche, dichiarazioni di conformità e adeguamento normativo degli impianti esistenti." },
  { icon: Zap, titolo: "Cabine e media tensione", testo: "Realizzazione e manutenzione di cabine di trasformazione MT/BT per utenze industriali e GDO." },
];

const referenze = ["Logistica Sud", "Oleificio Ventura", "Frigomar", "Comune di Giovinazzo", "Retail Park Puglia", "Caseificio Murgia"];

const team = [
  { foto: "img/team3.jpg", nome: "Michele Abbate", ruolo: "Titolare e direttore lavori", nota: "Fondatore, 30 anni di cantieri alle spalle." },
  { foto: "img/team1.jpg", nome: "Paolo Ranieri", ruolo: "Direttore tecnico", nota: "Progettazione impianti e sicurezza." },
  { foto: "img/team2.jpg", nome: "Angela Fiore", ruolo: "Amministrazione", nota: "Commesse, acquisti e fornitori." },
  { foto: "img/team4.jpg", nome: "Dario Colangelo", ruolo: "Responsabile commesse", nota: "Pianificazione squadre e mezzi." },
];

const cantieriFoto = [
  { src: "img/cantiere1.jpg", didascalia: "Posa cavidotti — capannone logistico" },
  { src: "img/cantiere2.jpg", didascalia: "Coordinamento squadre in cantiere" },
  { src: "img/cantiere3.jpg", didascalia: "Progettazione e verifica schemi" },
];

export default function Landing() {
  const toast = useToast();
  return (
    <div className="bg-white text-slate-800">
      {/* header */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-petrol-600 text-white"><Zap size={20} /></div>
            <span className="text-lg font-bold text-slate-900">Elettra Impianti <span className="font-normal text-slate-400">Srl</span></span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#chi-siamo" className="hover:text-petrol-600">Chi siamo</a>
            <a href="#servizi" className="hover:text-petrol-600">Servizi</a>
            <a href="#team" className="hover:text-petrol-600">Team</a>
            <a href="#referenze" className="hover:text-petrol-600">Referenze</a>
            <a href="#contatti" className="hover:text-petrol-600">Contatti</a>
          </nav>
          <Link to="/app" className="flex items-center gap-1.5 rounded-lg bg-petrol-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            <LayoutDashboard size={16} /> Area gestionale
          </Link>
        </div>
      </header>

      {/* hero */}
      <section
        className="relative bg-petrol-950 bg-cover bg-center text-white"
        style={{ backgroundImage: "url(img/hero.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-petrol-950/95 via-petrol-950/80 to-petrol-900/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-petrol-300">Dal 1998 al servizio delle imprese</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Energia, impianti e manutenzione per l'industria del Sud.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-petrol-100">
            Progettiamo, realizziamo e manteniamo impianti elettrici civili e industriali, fotovoltaico e cabine MT/BT in tutta la Puglia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contatti" className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-petrol-800 hover:bg-petrol-50">
              Richiedi un preventivo <ArrowRight size={16} />
            </a>
            <a href="#servizi" className="rounded-lg border border-petrol-400 px-5 py-3 text-sm font-semibold text-white hover:bg-petrol-700">
              I nostri servizi
            </a>
          </div>
        </div>
      </section>

      {/* chi siamo */}
      <section id="chi-siamo" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Chi siamo</h2>
            <p className="mt-4 text-slate-600">
              Elettra Impianti è un'impresa di installazione elettrica con sede a Bari. Da oltre 25 anni affianchiamo aziende,
              enti pubblici e privati nella realizzazione e manutenzione di impianti sicuri, efficienti e a norma.
            </p>
            <p className="mt-3 text-slate-600">
              Squadre qualificate, mezzi attrezzati e una gestione di cantiere digitalizzata ci permettono di rispettare tempi
              e budget anche sulle commesse più complesse.
            </p>
          </div>
          <div>
            <img src="img/chisiamo.jpg" alt="Tecnica al lavoro su quadri e cablaggi" className="aspect-[3/2] w-full rounded-2xl object-cover shadow-lg" />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[["25+", "anni di attività"], ["120+", "commesse concluse"], ["15", "tecnici e operai"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-5 text-center">
                  <div className="text-3xl font-bold text-petrol-700">{n}</div>
                  <div className="mt-1 text-xs text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* servizi */}
      <section id="servizi" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-slate-900">Servizi</h2>
          <p className="mt-2 text-slate-500">Un unico interlocutore, dall'impianto alla manutenzione.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servizi.map((s) => (
              <div key={s.titolo} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-lg bg-petrol-100 p-2.5 text-petrol-700"><s.icon size={22} /></div>
                <h3 className="font-semibold text-slate-900">{s.titolo}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* i nostri cantieri */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900">I nostri cantieri</h2>
        <p className="mt-2 text-slate-500">Organizzazione, sicurezza e qualità in ogni fase del lavoro.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {cantieriFoto.map((c) => (
            <figure key={c.src} className="group overflow-hidden rounded-2xl">
              <img src={c.src} alt={c.didascalia}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <figcaption className="mt-2 text-sm text-slate-500">{c.didascalia}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* team */}
      <section id="team" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-slate-900">Il nostro team</h2>
          <p className="mt-2 text-slate-500">Persone che conoscono il mestiere, dall'ufficio al cantiere.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.nome} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src={t.foto} alt={t.nome} className="aspect-square w-full object-cover object-top" />
                <div className="p-4">
                  <div className="font-semibold text-slate-900">{t.nome}</div>
                  <div className="text-sm font-medium text-petrol-600">{t.ruolo}</div>
                  <p className="mt-1.5 text-sm text-slate-500">{t.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* referenze */}
      <section id="referenze" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">Si fidano di noi</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {referenze.map((r) => (
            <div key={r} className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 text-center text-sm font-semibold text-slate-400">
              {r}
            </div>
          ))}
        </div>
      </section>

      {/* contatti */}
      <section id="contatti" className="bg-petrol-950 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Contatti</h2>
            <p className="mt-3 text-petrol-200">Raccontaci il tuo progetto: rispondiamo entro 48 ore lavorative.</p>
            <ul className="mt-6 space-y-3 text-sm text-petrol-100">
              <li className="flex items-center gap-3"><MapPin size={17} className="text-petrol-300" /> Via dell'Artigianato 42, Zona Ind.le — 70123 Bari</li>
              <li className="flex items-center gap-3"><Phone size={17} className="text-petrol-300" /> 080 000 0000</li>
              <li className="flex items-center gap-3"><Mail size={17} className="text-petrol-300" /> info@elettraimpianti.example</li>
            </ul>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); toast("Modulo dimostrativo — nessun invio effettuato"); }}
            className="space-y-3 rounded-xl bg-white p-6 text-slate-800 shadow-lg"
          >
            <input placeholder="Nome e cognome" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
            <input placeholder="Azienda" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
            <textarea placeholder="Descrivi il tuo progetto…" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
            <button type="submit" className="w-full rounded-lg bg-petrol-600 py-2.5 text-sm font-semibold text-white hover:bg-petrol-700">
              Invia richiesta
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-petrol-900 bg-petrol-950 py-6 text-center text-xs text-petrol-400">
        © 2026 Elettra Impianti Srl — Azienda fittizia a scopo dimostrativo · P.IVA 00000000000
      </footer>
    </div>
  );
}
