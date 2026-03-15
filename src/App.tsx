import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollManager from "@/components/ScrollManager";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import useAuthInit from "@/hooks/useAuthInit";

export default function App() {
  useAuthInit();
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
