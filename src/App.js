
// import React from "react";
// import "./App.css";
// import logo from "./assets/pi.png";

// function App() {
//   return (
//     <div className="launch-container">
//       <div className="logo-wrapper">
//         <div className="glow-backlight"></div>
//         <img src={logo} alt="AgentPi Logo" className="logo" />
//       </div>
//       <h1>AgentPi</h1>
//       <p className="tagline">We're launching soon. Stay tuned!</p>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import logo from "./assets/pi.png";

function App() {
  return (
    <div className="launch-container">
      <div className="glow-backdrop" />
      <img src={logo} alt="AgentPi Logo" className="logo" />
      <h1>AgentPi</h1>
      <p className="tagline">We're launching soon. Stay tuned!</p>
    </div>
  );
}

export default App;
