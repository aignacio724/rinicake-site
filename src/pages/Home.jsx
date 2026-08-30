import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import WorkGrid from "../components/WorkGrid.jsx";
import Upcoming from "../components/Upcoming.jsx";
import Events from "../components/Events.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { useHashScroll } from "../lib/scrollTo.js";

export default function Home() {
  useHashScroll();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkGrid />
        <Upcoming />
        <Events />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
