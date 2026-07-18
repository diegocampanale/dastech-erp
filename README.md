# Dastech Implant — Prototipo gestionale

Prototipo **solo front-end** (nessun backend, dati mock in memoria) di un gestionale per un'impresa di impianti elettrici. Serve come demo cliccabile per il cliente.

## Avvio

```bash
npm install
npm run dev
```

Poi apri l'indirizzo indicato (di solito http://localhost:5173).

## Rotte principali

- `/` — Landing page istituzionale (sito vetrina, fittizio)
- `/app` — Area gestionale:
  - Dashboard direzione
  - Commesse (lista + dettaglio con tab e consuntivo)
  - Risorse umane
  - Magazzino & attrezzi (giacenze + movimenti)
  - Richieste materiale da validare (scheda cartacea / vocale)
  - Scadenzario documenti
  - **Fase 2 (badge "Anteprima")**: Libreria gare, Analisi sprechi
  - **Fase 3 — Visione AI (badge "Anteprima")**:
    - Canale WhatsApp + OCR (foto delle schede materiale scritte a mano → lettura automatica → richiesta da validare)
    - Previsioni & analisi AI (proiezione costo a fine commessa, rischio sforamento budget, fabbisogno materiali)
    - Assistente AI (chatbot che risponde sui dati del gestionale, con domande suggerite)
    - Mappa magazzino (pianta fisica interattiva: scaffali, livelli e collocazione dei materiali)

## Note

- Stack: React + Vite + TypeScript, Tailwind CSS, React Router, lucide-react, recharts.
- Tutti i dati sono finti e vivono in `src/mock/data.ts`.
- I pulsanti d'azione mostrano un toast "demo": nessuna modifica viene salvata.
- Il selettore Ufficio/Cantiere nella top bar è dimostrativo.
