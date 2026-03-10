import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/shared/Navbar";
import { Footer } from "./components/ui/shared/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/pricing" element={<div />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
