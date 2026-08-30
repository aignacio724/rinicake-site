import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FullPortfolio from "./pages/FullPortfolio.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<FullPortfolio />} />
      </Routes>
    </div>
  );
}
