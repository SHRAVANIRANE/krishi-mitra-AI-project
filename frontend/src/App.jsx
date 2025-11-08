import React, { useState } from "react";
import Hero from "./components/Hero";
import Simulator from "./components/Simulator";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar /> {/* ✅ Always visible */}
      {page === "home" && (
        <Hero onStartSimulation={() => setPage("simulator")} />
      )}
      {page === "simulator" && (
        <Simulator onBackToHome={() => setPage("home")} />
      )}
    </>
  );
}

export default App;
