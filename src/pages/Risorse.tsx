import { Phone } from "lucide-react";
import { dipendenti, commesse } from "../mock/data";
import { Badge, PageTitle, TableWrap, Th, Td } from "../components/ui";

export default function Risorse() {
  return (
    <div>
      <PageTitle title="Risorse umane" subtitle="Organico, ruoli e assegnazioni correnti" />
      <TableWrap>
        <thead className="bg-slate-50">
          <tr>
            <Th>Dipendente</Th><Th>Ruolo</Th><Th>Tipo</Th><Th>Commessa attuale</Th><Th className="text-right">Ore mese</Th><Th>Contatto</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {dipendenti.map((d) => {
            const c = commesse.find((x) => x.id === d.commessaId);
            return (
              <tr key={d.id} className="hover:bg-slate-50">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petrol-100 text-xs font-semibold text-petrol-700">
                      {d.nome.split(" ").map((p) => p[0]).join("")}
                    </div>
                    <span className="font-medium text-slate-900">{d.nome}</span>
                  </div>
                </Td>
                <Td>{d.ruolo}</Td>
                <Td><Badge value={d.tipo} />{d.agenzia && <div className="mt-0.5 text-xs text-slate-400">Agenzia {d.agenzia}</div>}</Td>
                <Td>{c ? c.nome : <span className="text-slate-400">In sede</span>}</Td>
                <Td className="text-right font-medium">{d.oreMese}</Td>
                <Td><span className="flex items-center gap-1.5 text-slate-500"><Phone size={13} /> {d.telefono}</span></Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
    </div>
  );
}
