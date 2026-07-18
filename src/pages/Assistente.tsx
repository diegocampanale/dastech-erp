import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { AnteprimaBadge, Card, PageTitle } from "../components/ui";

type Msg = { da: "utente" | "ai"; testo: string };

const risposte: Record<string, string> = {
  "Quanto abbiamo speso finora sul capannone di Modugno?":
    "Sulla commessa \"Impianto elettrico capannone Modugno\" il consuntivo a oggi è di 104.400 € (56% del budget di 185.000 €): 48.200 € di manodopera, 39.500 € di materiali, 6.200 € di mezzi, 8.400 € di noleggi e 2.100 € di trasferte. L'avanzamento lavori è al 62%, quindi il margine è in linea.",
  "Chi è in cantiere oggi e dove?":
    "Oggi risultano assegnate 7 persone: Vito Lorusso e Nicola Ranieri a Modugno, Marco De Santis e Sabino Carbonara (interinale Adecco) a Bitonto, Giuseppe Larato (interinale Randstad) a Molfetta, Francesco Mastro a Giovinazzo e Luca Petruzzelli a Casamassima. Angela Fiore è in sede.",
  "Ci sono documenti in scadenza questa settimana?":
    "Sì, 2 criticità: la visita medica di Nicola Ranieri è scaduta il 10/07 e la verifica gru dell'Iveco Daily è scaduta il 30/06. Inoltre il corso PES/PAV/PEI di Vito Lorusso scade il 25/07: consiglio di prenotare il rinnovo entro oggi.",
  "Quanti pannelli fotovoltaici restano a Molfetta?":
    "In cantiere a Molfetta risultano 130 pannelli da 450W. C'è però una richiesta di Francesco Mastro per altri 20 pezzi in attesa di validazione, e la previsione di fabbisogno per le prossime 4 settimane è di ~180 pezzi: suggerisco un ordine di 50 pezzi.",
};

const suggerimenti = Object.keys(risposte);

export default function Assistente() {
  const [chat, setChat] = useState<Msg[]>([
    { da: "ai", testo: "Ciao Angela! Sono l'assistente del gestionale. Posso rispondere su commesse, costi, personale, magazzino e scadenze. Prova una delle domande qui sotto." },
  ]);

  const chiedi = (q: string) => {
    setChat((c) => [...c, { da: "utente", testo: q }]);
    window.setTimeout(() => {
      setChat((c) => [...c, { da: "ai", testo: risposte[q] ?? "Nel prototipo rispondo solo alle domande suggerite — nella versione reale potrai chiedermi qualsiasi cosa sui tuoi dati." }]);
    }, 450);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-3xl flex-col">
      <PageTitle
        title="Assistente AI"
        badge={<AnteprimaBadge />}
        subtitle="Chiedi in linguaggio naturale: l'assistente interroga i dati del gestionale"
      />
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {chat.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.da === "utente" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                m.da === "ai" ? "bg-petrol-600 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {m.da === "ai" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.da === "ai" ? "bg-slate-100 text-slate-800" : "bg-petrol-600 text-white"
              }`}>
                {m.testo}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggerimenti.map((s) => (
              <button key={s} onClick={() => chiedi(s)}
                className="flex items-center gap-1.5 rounded-full border border-petrol-200 bg-petrol-50 px-3 py-1.5 text-xs font-medium text-petrol-700 hover:bg-petrol-100">
                <Sparkles size={12} /> {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input disabled placeholder="Scrivi una domanda… (disponibile in Fase 3)"
              className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-400" />
            <button disabled className="rounded-lg bg-slate-200 px-4 text-slate-400"><Send size={16} /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}
