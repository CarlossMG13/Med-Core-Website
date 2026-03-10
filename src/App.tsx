import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/shared/Navbar";
import { Footer } from "./components/ui/shared/Footer";

// Components
import { HeroSection } from "./components/home/HeroSection";
import { IaDemoSection } from "./components/home/IADemoSection";
import { IntegracionesSection } from "./components/home/IntegracionesSection";
import { FeaturesSecition } from "./components/home/FeaturesSection";
import { AppFeaturesSection } from "./components/home/AppFeaturesSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/pricing" element={<div />} />
        </Routes>
        <HeroSection />
        <IaDemoSection />
        <IntegracionesSection />
        <FeaturesSecition />
        <AppFeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
