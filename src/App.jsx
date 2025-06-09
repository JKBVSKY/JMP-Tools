import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterSW } from 'virtual:pwa-register/react';
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
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const {
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW({
      onRegisteredSW(swUrl, r) {
        console.log('Service Worker registered:', swUrl);
      },
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
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

    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });
    }, []);
  
    const handleInstallClick = async () => {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('Install choice:', choice.outcome);
        setDeferredPrompt(null);
      }
    };

    return (
        <Router>
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/calculator"
                element={
                  <ScoreCounter
                    dailyCalculations={dailyCalculations}
                    setDailyCalculations={setDailyCalculations}
                  />
                }
              />
              <Route
                path="/scorehistory"
                element={
                  <ScoreHistory
                    dailyCalculations={dailyCalculations}
                    setDailyCalculations={setDailyCalculations}
                  />
                }
              />
            </Routes>
            {updateAvailable && (
              <div style={{
                background: '#333',
                color: 'white',
                padding: '1rem',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 9999
              }}>
                🔄 A new version is available.{' '}
                <button onClick={() => updateServiceWorker(true)}>
                  Update Now
                </button>
              </div>
            )}
            {deferredPrompt && (
              <button onClick={handleInstallClick}>
                Install App
              </button>
            )}
            <Footer />
          </div>
        </Router>
      );
}

export default App;
