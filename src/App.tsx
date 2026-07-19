import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ToastProvider } from "./components/ui";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Commesse from "./pages/Commesse";
import CommessaDettaglio from "./pages/CommessaDettaglio";
import Risorse from "./pages/Risorse";
import Magazzino from "./pages/Magazzino";
import Richieste from "./pages/Richieste";
import Scadenzario from "./pages/Scadenzario";
import Libreria from "./pages/Libreria";
import Sprechi from "./pages/Sprechi";
import WhatsAppOCR from "./pages/WhatsAppOCR";
import Previsioni from "./pages/Previsioni";
import Assistente from "./pages/Assistente";
import MappaMagazzino from "./pages/MappaMagazzino";
import PortaleDipendente from "./pages/PortaleDipendente";
import AdminRuoli from "./pages/AdminRuoli";
import MagazzinoQR from "./pages/MagazzinoQR";

export default function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dipendente" element={<PortaleDipendente />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="commesse" element={<Commesse />} />
            <Route path="commesse/:id" element={<CommessaDettaglio />} />
            <Route path="risorse" element={<Risorse />} />
            <Route path="magazzino" element={<Magazzino />} />
            <Route path="richieste" element={<Richieste />} />
            <Route path="scadenzario" element={<Scadenzario />} />
            <Route path="libreria" element={<Libreria />} />
            <Route path="sprechi" element={<Sprechi />} />
            <Route path="whatsapp" element={<WhatsAppOCR />} />
            <Route path="previsioni" element={<Previsioni />} />
            <Route path="assistente" element={<Assistente />} />
            <Route path="mappa-magazzino" element={<MappaMagazzino />} />
            <Route path="admin" element={<AdminRuoli />} />
            <Route path="qr" element={<MagazzinoQR />} />
          </Route>
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}
