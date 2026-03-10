import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/ui/shared/Navbar";
import { Footer } from "./components/ui/shared/Footer";

import { HeroSection } from "./components/home/HeroSection";
import { IaDemoSection } from "./components/home/IADemoSection";
import { IntegracionesSection } from "./components/home/IntegracionesSection";
import { FeaturesSecition } from "./components/home/FeaturesSection";
import { AppFeaturesSection } from "./components/home/AppFeaturesSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";
import { PricingPage } from "./pages/PricingPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="bg-black min-h-screen pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <IaDemoSection />
                <IntegracionesSection />
                <FeaturesSecition />
                <AppFeaturesSection />
                <TestimonialsSection />
              </>
            }
          />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
