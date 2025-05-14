import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import ScoreCounter from "./ScoreCounter";
import ScoreHistory from "./ScoreHistory";
import Footer from "./Footer";
import "./index.css";

function App() {
    const [dailyCalculations, setDailyCalculations] = useState(() => {
        try {
          const savedData = localStorage.getItem("dailyCalculations");
          return savedData && savedData !== "undefined" ? JSON.parse(savedData) : [];
        } catch (error) {
          console.error("Error parsing dailyCalculations from localStorage:", error);
          return []; // Return empty array if parsing fails
        }
      });

    useEffect(() => {
        const savedCalculations = localStorage.getItem("dailyCalculations");
        if (savedCalculations) {
        try {
            setDailyCalculations(JSON.parse(savedCalculations));
        } catch (error) {
            console.error("Error parsing dailyCalculations from localStorage", error);
            setDailyCalculations([]); // Reset to empty array on error
        }
        }
    }, []);
    return (
        <Router>
          <div>
            <Navigation />
            <Routes>
              <Route path="JMP-Tools/" element={<HomePage />} />
              <Route
                path="JMP-Tools/calculator"
                element={
                  <ScoreCounter
                    dailyCalculations={dailyCalculations}
                    setDailyCalculations={setDailyCalculations}
                  />
                }
              />
              <Route
                path="JMP-Tools/scorehistory"
                element={
                  <ScoreHistory
                    dailyCalculations={dailyCalculations}
                    setDailyCalculations={setDailyCalculations}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      );
}

export default App;
