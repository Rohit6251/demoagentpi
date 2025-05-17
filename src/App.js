import React, { useState } from "react";
import "./App.css";
import logo from "./assets/pi.png";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";

function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <NeuralNetworkCanvas />

      <div className="launch-container">
        <div
          className={`logo-wrapper ${hovered ? "hovered" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={logo} alt="AgentPi Logo" className="logo" />
        </div>

        <h1>AgentPi</h1>
        <p className="tagline">We're launching soon. Stay tuned!</p>
      </div>
    </>
  );
}

export default App;
