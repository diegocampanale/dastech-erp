// Dati fittizi per il prototipo — nessun dato reale.

export type Dipendente = {
  id: string;
  nome: string;
  ruolo: string;
  tipo: "Dipendente" | "Interinale";
  agenzia?: string;
  telefono: string;
  commessaId: string | null;
  oreMese: number;
  costoOrario: number;
};

export const dipendenti: Dipendente[] = [
  { id: "D01", nome: "Stefano Campanale", ruolo: "Capo cantiere", tipo: "Dipendente", telefono: "340 112 2334", commessaId: "C01", oreMese: 168, costoOrario: 28 },
  { id: "D02", nome: "Daniele Campanale", ruolo: "Elettricista specializzato", tipo: "Dipendente", telefono: "347 998 1120", commessaId: "C01", oreMese: 160, costoOrario: 24 },
  { id: "D03", nome: "Gianni Campanale", ruolo: "Elettricista", tipo: "Dipendente", telefono: "329 445 6671", commessaId: "C02", oreMese: 152, costoOrario: 21 },
  { id: "D06", nome: "Nicola Frisina", ruolo: "Aiuto elettricista", tipo: "Interinale", agenzia: "Randstad", telefono: "338 761 0092", commessaId: "C03", oreMese: 136, costoOrario: 19 },
  { id: "D07", nome: "Antonio Campanale", ruolo: "Capo squadra", tipo: "Dipendente", telefono: "345 003 8821", commessaId: "C04", oreMese: 168, costoOrario: 26 },
  { id: "D08", nome: "Giacomo Campanale", ruolo: "Elettricista", tipo: "Dipendente", telefono: "342 887 4410", commessaId: "C05", oreMese: 120, costoOrario: 21 },
];

export type Commessa = {
  id: string;
  nome: string;
  cliente: string;
  luogo: string;
  stato: "In corso" | "In avvio" | "In chiusura";
  inizio: string;
  fine: string;
  avanzamento: number; // %
  budget: number;
  costi: {
    manodopera: number;
    materiali: number;
    mezzi: number;
    noleggi: number;
    trasferte: number;
  };
};

export const commesse: Commessa[] = [
  {
    id: "C01", nome: "Impianto elettrico capannone Modugno", cliente: "Logistica Sud Srl", luogo: "Modugno (BA)",
    stato: "In corso", inizio: "2026-03-02", fine: "2026-09-30", avanzamento: 62, budget: 185000,
    costi: { manodopera: 48200, materiali: 39500, mezzi: 6200, noleggi: 8400, trasferte: 2100 },
  },
  {
    id: "C02", nome: "Rifacimento quadri elettrici stabilimento Bitonto", cliente: "Oleificio Ventura SpA", luogo: "Bitonto (BA)",
    stato: "In corso", inizio: "2026-04-13", fine: "2026-08-28", avanzamento: 48, budget: 96000,
    costi: { manodopera: 21400, materiali: 18900, mezzi: 2600, noleggi: 1500, trasferte: 0 },
  },
  {
    id: "C03", nome: "Impianto fotovoltaico 200 kW Molfetta", cliente: "Frigomar Srl", luogo: "Molfetta (BA)",
    stato: "In corso", inizio: "2026-05-04", fine: "2026-10-15", avanzamento: 35, budget: 240000,
    costi: { manodopera: 26800, materiali: 61200, mezzi: 4900, noleggi: 12600, trasferte: 3400 },
  },
  {
    id: "C04", nome: "Manutenzione illuminazione pubblica Giovinazzo", cliente: "Comune di Giovinazzo", luogo: "Giovinazzo (BA)",
    stato: "In corso", inizio: "2026-01-08", fine: "2026-12-20", avanzamento: 55, budget: 74000,
    costi: { manodopera: 19800, materiali: 8700, mezzi: 5100, noleggi: 0, trasferte: 800 },
  },
  {
    id: "C05", nome: "Cabina MT/BT centro commerciale Casamassima", cliente: "Retail Park Puglia", luogo: "Casamassima (BA)",
    stato: "In avvio", inizio: "2026-07-01", fine: "2026-11-30", avanzamento: 8, budget: 132000,
    costi: { manodopera: 3600, materiali: 12400, mezzi: 900, noleggi: 2200, trasferte: 600 },
  },
];

export type Mezzo = {
  id: string;
  nome: string;
  targa: string;
  tipo: string;
  commessaId: string | null;
  assegnatario: string;
  stato: "Operativo" | "In officina";
};

export const mezzi: Mezzo[] = [
  { id: "M01", nome: "Fiat Ducato furgone attrezzato", targa: "GF 342 KL", tipo: "Furgone", commessaId: "C01", assegnatario: "Stefano Campanale", stato: "Operativo" },
  { id: "M02", nome: "Iveco Daily con gru", targa: "FT 889 CV", tipo: "Autocarro", commessaId: "C03", assegnatario: "Antonio Campanale", stato: "Operativo" },
  { id: "M03", nome: "Piaggio Porter", targa: "EX 120 RA", tipo: "Motocarro", commessaId: "C04", assegnatario: "Gianni Campanale", stato: "Operativo" },
  { id: "M04", nome: "Fiat Panda Van", targa: "GH 771 PS", tipo: "Auto di servizio", commessaId: null, assegnatario: "Sede", stato: "Operativo" },
  { id: "M05", nome: "Piattaforma aerea 18 m", targa: "FC 456 TT", tipo: "PLE", commessaId: "C04", assegnatario: "Antonio Campanale", stato: "In officina" },
  { id: "M06", nome: "Renault Trafic", targa: "GK 903 BD", tipo: "Furgone", commessaId: "C02", assegnatario: "Daniele Campanale", stato: "Operativo" },
];

export type Articolo = {
  id: string;
  nome: string;
  categoria: "Materiale" | "Attrezzo" | "Noleggio";
  giacenza: number;
  unita: string;
  posizione: string;
  assegnatario?: string;
  fornitore?: string;
  costoUnitario: number;
};

export const articoli: Articolo[] = [
  { id: "A01", nome: "Cavo FG16OR16 3x2,5 mmq", categoria: "Materiale", giacenza: 1200, unita: "m", posizione: "Magazzino — scaffale B2", costoUnitario: 1.45 },
  { id: "A02", nome: "Cavo FG16OR16 5x6 mmq", categoria: "Materiale", giacenza: 340, unita: "m", posizione: "Magazzino — scaffale B3", costoUnitario: 4.2 },
  { id: "A03", nome: "Tubo corrugato Ø25", categoria: "Materiale", giacenza: 900, unita: "m", posizione: "Magazzino — area esterna", costoUnitario: 0.55 },
  { id: "A04", nome: "Canala metallica 200x60", categoria: "Materiale", giacenza: 85, unita: "barre", posizione: "Cantiere Modugno", costoUnitario: 18.9 },
  { id: "A05", nome: "Interruttore magnetotermico 16A", categoria: "Materiale", giacenza: 64, unita: "pz", posizione: "Magazzino — scaffale A1", costoUnitario: 12.4 },
  { id: "A06", nome: "Differenziale 40A 0,03A", categoria: "Materiale", giacenza: 22, unita: "pz", posizione: "Magazzino — scaffale A1", costoUnitario: 38.0 },
  { id: "A07", nome: "Quadro da parete 54 moduli", categoria: "Materiale", giacenza: 6, unita: "pz", posizione: "Magazzino — scaffale A4", costoUnitario: 96.0 },
  { id: "A08", nome: "Faretto LED incasso 12W", categoria: "Materiale", giacenza: 210, unita: "pz", posizione: "Magazzino — scaffale C1", costoUnitario: 7.8 },
  { id: "A09", nome: "Plafoniera stagna LED 150 cm", categoria: "Materiale", giacenza: 48, unita: "pz", posizione: "Cantiere Bitonto", costoUnitario: 22.5 },
  { id: "A10", nome: "Pannello fotovoltaico 450W", categoria: "Materiale", giacenza: 130, unita: "pz", posizione: "Cantiere Molfetta", costoUnitario: 148.0 },
  { id: "A11", nome: "Inverter trifase 50 kW", categoria: "Materiale", giacenza: 2, unita: "pz", posizione: "Magazzino — area sicura", costoUnitario: 3900.0 },
  { id: "A12", nome: "Trapano tassellatore Hilti TE 30", categoria: "Attrezzo", giacenza: 3, unita: "pz", posizione: "In uso", assegnatario: "Daniele Campanale", costoUnitario: 0 },
  { id: "A13", nome: "Avvitatore Makita 18V", categoria: "Attrezzo", giacenza: 6, unita: "pz", posizione: "In uso", assegnatario: "Squadra Modugno", costoUnitario: 0 },
  { id: "A14", nome: "Pinza amperometrica Fluke 376", categoria: "Attrezzo", giacenza: 2, unita: "pz", posizione: "In uso", assegnatario: "Stefano Campanale", costoUnitario: 0 },
  { id: "A15", nome: "Strumento verifica impianti Fluke 1664", categoria: "Attrezzo", giacenza: 1, unita: "pz", posizione: "Magazzino — armadio strumenti", costoUnitario: 0 },
  { id: "A16", nome: "Scala telescopica 8 gradini", categoria: "Attrezzo", giacenza: 4, unita: "pz", posizione: "Cantiere Giovinazzo", assegnatario: "Gianni Campanale", costoUnitario: 0 },
  { id: "A17", nome: "Trabattello alluminio h4m", categoria: "Attrezzo", giacenza: 2, unita: "pz", posizione: "Cantiere Bitonto", costoUnitario: 0 },
  { id: "A18", nome: "Piattaforma verticale 10 m", categoria: "Noleggio", giacenza: 1, unita: "pz", posizione: "Cantiere Modugno", fornitore: "Mollo Noleggio", costoUnitario: 95 },
  { id: "A19", nome: "Escavatore mini 2,5 t", categoria: "Noleggio", giacenza: 1, unita: "pz", posizione: "Cantiere Molfetta", fornitore: "Venpa", costoUnitario: 140 },
  { id: "A20", nome: "Gruppo elettrogeno 30 kVA", categoria: "Noleggio", giacenza: 1, unita: "pz", posizione: "Cantiere Casamassima", fornitore: "Mollo Noleggio", costoUnitario: 60 },
];

export type Movimento = {
  id: string;
  data: string;
  tipo: "Carico" | "Scarico";
  articolo: string;
  quantita: string;
  commessa: string;
  operatore: string;
};

export const movimenti: Movimento[] = [
  { id: "MV01", data: "2026-07-17", tipo: "Scarico", articolo: "Cavo FG16OR16 3x2,5 mmq", quantita: "250 m", commessa: "Capannone Modugno", operatore: "Stefano Campanale" },
  { id: "MV02", data: "2026-07-17", tipo: "Scarico", articolo: "Faretto LED incasso 12W", quantita: "40 pz", commessa: "Quadri Bitonto", operatore: "Gianni Campanale" },
  { id: "MV03", data: "2026-07-16", tipo: "Carico", articolo: "Pannello fotovoltaico 450W", quantita: "60 pz", commessa: "Fotovoltaico Molfetta", operatore: "Angela Fiore" },
  { id: "MV04", data: "2026-07-15", tipo: "Scarico", articolo: "Canala metallica 200x60", quantita: "20 barre", commessa: "Capannone Modugno", operatore: "Daniele Campanale" },
  { id: "MV05", data: "2026-07-14", tipo: "Carico", articolo: "Interruttore magnetotermico 16A", quantita: "50 pz", commessa: "Magazzino", operatore: "Angela Fiore" },
  { id: "MV06", data: "2026-07-12", tipo: "Scarico", articolo: "Plafoniera stagna LED 150 cm", quantita: "24 pz", commessa: "Quadri Bitonto", operatore: "Gianni Campanale" },
];

export type Scadenza = {
  id: string;
  soggetto: string;
  tipoSoggetto: "Persona" | "Mezzo";
  documento: string;
  scadenza: string;
  stato: "ok" | "in scadenza" | "scaduto";
};

export const scadenze: Scadenza[] = [
  { id: "S01", soggetto: "Stefano Campanale", tipoSoggetto: "Persona", documento: "Corso PES/PAV/PEI", scadenza: "2026-07-25", stato: "in scadenza" },
  { id: "S02", soggetto: "Daniele Campanale", tipoSoggetto: "Persona", documento: "Visita medica idoneità", scadenza: "2026-07-10", stato: "scaduto" },
  { id: "S03", soggetto: "Gianni Campanale", tipoSoggetto: "Persona", documento: "Corso lavori in quota", scadenza: "2026-09-18", stato: "ok" },
  { id: "S04", soggetto: "Nicola Frisina", tipoSoggetto: "Persona", documento: "Formazione base sicurezza", scadenza: "2026-08-02", stato: "in scadenza" },
  { id: "S05", soggetto: "Antonio Campanale", tipoSoggetto: "Persona", documento: "Patentino PLE", scadenza: "2027-01-12", stato: "ok" },
  { id: "S06", soggetto: "Fiat Ducato — GF 342 KL", tipoSoggetto: "Mezzo", documento: "Revisione", scadenza: "2026-08-05", stato: "in scadenza" },
  { id: "S07", soggetto: "Iveco Daily — FT 889 CV", tipoSoggetto: "Mezzo", documento: "Verifica gru (D.Lgs 81)", scadenza: "2026-06-30", stato: "scaduto" },
  { id: "S08", soggetto: "Piattaforma aerea — FC 456 TT", tipoSoggetto: "Mezzo", documento: "Verifica periodica INAIL", scadenza: "2026-10-22", stato: "ok" },
  { id: "S09", soggetto: "Renault Trafic — GK 903 BD", tipoSoggetto: "Mezzo", documento: "Assicurazione", scadenza: "2026-09-01", stato: "ok" },
];

export type Trasferta = {
  id: string;
  dipendente: string;
  commessaId: string;
  destinazione: string;
  dal: string;
  al: string;
  costo: number;
};

export const trasferte: Trasferta[] = [
  { id: "T01", dipendente: "Antonio Campanale", commessaId: "C03", destinazione: "Molfetta (BA)", dal: "2026-07-06", al: "2026-07-10", costo: 620 },
  { id: "T02", dipendente: "Nicola Frisina", commessaId: "C03", destinazione: "Molfetta (BA)", dal: "2026-07-06", al: "2026-07-10", costo: 540 },
  { id: "T03", dipendente: "Stefano Campanale", commessaId: "C01", destinazione: "Modugno (BA)", dal: "2026-06-22", al: "2026-06-26", costo: 480 },
  { id: "T04", dipendente: "Giacomo Campanale", commessaId: "C05", destinazione: "Casamassima (BA)", dal: "2026-07-13", al: "2026-07-15", costo: 310 },
];

export type RichiestaMateriale = {
  id: string;
  canale: "Scheda cartacea" | "Messaggio vocale";
  richiedente: string;
  commessaId: string;
  data: string;
  righe: { articolo: string; quantita: string }[];
  trascrizione?: string;
  affidabilita: number; // % confidenza lettura
};

export const richiesteMateriale: RichiestaMateriale[] = [
  {
    id: "R01", canale: "Scheda cartacea", richiedente: "Stefano Campanale", commessaId: "C01", data: "2026-07-17",
    righe: [
      { articolo: "Cavo FG16OR16 3x2,5 mmq", quantita: "300 m" },
      { articolo: "Canala metallica 200x60", quantita: "15 barre" },
      { articolo: "Interruttore magnetotermico 16A", quantita: "12 pz" },
    ],
    affidabilita: 94,
  },
  {
    id: "R02", canale: "Messaggio vocale", richiedente: "Antonio Campanale", commessaId: "C03", data: "2026-07-17",
    trascrizione: "\"Angela, per Molfetta mi servono altri venti pannelli, due bobine di solare da sei e una cassetta di MC4, se puoi ordinarli per lunedì.\"",
    righe: [
      { articolo: "Pannello fotovoltaico 450W", quantita: "20 pz" },
      { articolo: "Cavo solare 6 mmq (bobina 100 m)", quantita: "2 pz" },
      { articolo: "Connettori MC4 (cassetta)", quantita: "1 pz" },
    ],
    affidabilita: 81,
  },
  {
    id: "R03", canale: "Scheda cartacea", richiedente: "Gianni Campanale", commessaId: "C02", data: "2026-07-16",
    righe: [
      { articolo: "Plafoniera stagna LED 150 cm", quantita: "30 pz" },
      { articolo: "Tubo corrugato Ø25", quantita: "200 m" },
    ],
    affidabilita: 88,
  },
  {
    id: "R04", canale: "Messaggio vocale", richiedente: "Giacomo Campanale", commessaId: "C05", data: "2026-07-16",
    trascrizione: "\"Per la cabina di Casamassima servono i terminali per il 185 e una decina di guanti isolanti taglia nove, grazie.\"",
    righe: [
      { articolo: "Terminali MT per cavo 185 mmq", quantita: "6 pz" },
      { articolo: "Guanti isolanti classe 0 tg. 9", quantita: "10 paia" },
    ],
    affidabilita: 76,
  },
];

export type LavoroPassato = {
  id: string;
  titolo: string;
  anno: number;
  cliente: string;
  importo: number;
  esito: "Vinta" | "Persa" | "Eseguita";
  tag: string[];
};

export const lavoriPassati: LavoroPassato[] = [
  { id: "L01", titolo: "Impianto elettrico capannone logistico 4.000 mq", anno: 2024, cliente: "TrasportiAdriatica", importo: 168000, esito: "Eseguita", tag: ["capannone", "industriale", "forza motrice"] },
  { id: "L02", titolo: "Fotovoltaico 150 kW tetto industriale", anno: 2025, cliente: "Caseificio Murgia", importo: 195000, esito: "Eseguita", tag: ["fotovoltaico", "industriale"] },
  { id: "L03", titolo: "Gara illuminazione pubblica Comune di Ruvo", anno: 2024, cliente: "Comune di Ruvo di Puglia", importo: 88000, esito: "Persa", tag: ["pubblica", "illuminazione", "gara"] },
  { id: "L04", titolo: "Cabina MT/BT supermercato Trani", anno: 2023, cliente: "GDO Retail", importo: 115000, esito: "Eseguita", tag: ["cabina", "media tensione"] },
  { id: "L05", titolo: "Rifacimento impianto uffici direzionali 1.200 mq", anno: 2025, cliente: "Studio Ingegneria B&P", importo: 64000, esito: "Vinta", tag: ["terziario", "uffici", "domotica"] },
  { id: "L06", titolo: "Manutenzione triennale stabilimento alimentare", anno: 2023, cliente: "Oleificio Ventura SpA", importo: 96000, esito: "Eseguita", tag: ["manutenzione", "industriale"] },
];

export type SprecoCommessa = {
  commessa: string;
  preventivato: number;
  consumato: number;
  avanzato: number;
};

export const sprechi: SprecoCommessa[] = [
  { commessa: "Capannone Modugno", preventivato: 52000, consumato: 39500, avanzato: 4200 },
  { commessa: "Quadri Bitonto", preventivato: 24000, consumato: 18900, avanzato: 2900 },
  { commessa: "Fotovoltaico Molfetta", preventivato: 88000, consumato: 61200, avanzato: 1100 },
  { commessa: "Illum. Giovinazzo", preventivato: 12000, consumato: 8700, avanzato: 2400 },
  { commessa: "Cabina Casamassima", preventivato: 46000, consumato: 12400, avanzato: 300 },
];

export const euro = (n: number) =>
  n.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const totaleCommessa = (c: Commessa) =>
  c.costi.manodopera + c.costi.materiali + c.costi.mezzi + c.costi.noleggi + c.costi.trasferte;
