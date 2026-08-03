import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
// import Gallery from "./components/Gallery.jsx";
// import ShopCTA from "./components/ShopCTA.jsx";
// import Shows from "./components/Shows.jsx";
// import Contact from "./components/Contact.jsx";
// import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Nav />
      <main>
        <Hero />
      </main>
    </div>
  );
}
