import SmoothScroll from "./components/SmoothScroll.jsx";
import Chrome from "./components/Chrome.jsx";
import Hero from "./components/Hero.jsx";
import Connect from "./components/Connect.jsx";
import Solutions from "./components/Solutions.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Closing from "./components/Closing.jsx";
import Footer from "./components/Footer.jsx";
import Reveal from "./components/Reveal.jsx";
import FloatingCta from "./components/FloatingCta.jsx";

// The page follows the hero film scene by scene; each scene plays by itself when it comes into view.
export default function App() {
  return (
    <SmoothScroll>
      <Chrome />
      <main>
        <Hero />
        <Connect />
        <Solutions />
        <Services />
        <Projects />
        <Closing />
      </main>
      <Footer />
      <FloatingCta />
      <Reveal />
    </SmoothScroll>
  );
}
