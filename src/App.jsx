import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import ScoreCounter from "./ScoreCounter/ScoreCounter";
import ScoreHistory from "./ScoreHistory";
import Footer from "./Footer";
import "./index.css";
import Settings from "./Settings";

function App() {
    const { i18n } = useTranslation();
    const [dailyCalculations, setDailyCalculations] = useState(() => {
        try {
          const savedData = localStorage.getItem("dailyCalculations");
          return savedData && savedData !== "undefined" ? JSON.parse(savedData) : [];
        } catch (error) {
          console.error("Error parsing dailyCalculations from localStorage:", error);
          return [];
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
    const defaultSettings = {
      darkMode: false,
      notifications: false,
      language: i18n.language || 'en',
    };
    const [settings, setSettings] = useState(() => {
      const saved = localStorage.getItem("settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    });

    useEffect(() => {
      localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);
    
    useEffect(() => {
        const savedCalculations = localStorage.getItem("dailyCalculations");
        if (savedCalculations) {
        try {
            setDailyCalculations(JSON.parse(savedCalculations));
        } catch (error) {
            console.error("Error parsing dailyCalculations from localStorage", error);
            setDailyCalculations([]); 
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

    useEffect(() => {
      document.body.className = settings.darkMode ? "dark-mode" : "light-mode";
    }, [settings.darkMode]);
    
    return (
        <Router>
          <div className={settings.darkMode ? "dark-mode" : "light-mode"}>
            <Navigation settings={settings} setSettings={setSettings} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/calculator"
                element={
                  <ScoreCounter
                    settings={settings}
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
              <Route
                path="/settings"
                element={
                  <Settings settings={settings} setSettings={setSettings} />
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
