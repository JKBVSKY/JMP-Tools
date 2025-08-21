import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { useLocation } from "react-router-dom";
import pkg from '/package.json';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Navigation = ({ settings, setSettings }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('side-nav-overlay')) {
      setIsMenuOpen(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsMenuOpen(false),   // Close on swipe left
    onSwipedRight: () => setIsMenuOpen(true),   // Open on swipe right (optional)
    trackMouse: true, // allows mouse swipes for testing
  });

  const location = useLocation();

  const [theme, setTheme] = useState("light"); // or get from context

  const handleThemeToggle = () => {
    setSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  return (
    <div {...handlers}>
      {/* Hamburger button */}
      <button
        className={`hamburger-btn${isMenuOpen ? ' hidden' : ''}`}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Side navigation overlay */}
      <div
        className={`side-nav-overlay${isMenuOpen ? " open" : ""}`}
        onClick={handleOverlayClick}
      >
        <nav className={`side-nav${isMenuOpen ? " open" : ""}`}>
          <div className="side-nav-header">
            <span className="logo">
              JMP-TOOLS [v{pkg.version}]
            </span>
            <button
              className="close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon />
            </button>
          </div>
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}>
                <HomeIcon /> {t('Navigation.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/calculator" 
                className={location.pathname === "/calculator" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}>
                <CalculateIcon /> {t('Navigation.calculator')}
              </Link>
            </li>
            <li>
              <Link 
                to="/scorehistory" 
                className={location.pathname === "/scorehistory" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}>
                <AnalyticsIcon /> {t('Navigation.scorehistory')}
              </Link>
            </li>
            <li>
              <Link 
                to="/settings"
                className={location.pathname === "/settings" ? "active" : ""}
                onClick={() => setIsMenuOpen(false)}>
                <SettingsIcon /> {t('Navigation.settings')}
              </Link>
            </li>
          </ul>
          <div className="theme-switcher-container">
            <button
              className={`theme-switcher-toggle${settings.darkMode ? " dark" : ""}`}
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              <span className="icon">
                {/* Sun SVG */}
                <svg
                  className="sun"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffeb3b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" fill="#ffeb3b"/>
                  <g stroke="#ffeb3b">
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </g>
                </svg>
                {/* Moon SVG */}
                <svg
                  className="moon"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fafafa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                    fill="#fafafa"
                  />
                </svg>
              </span>
              <span className="theme-label">
                {settings.darkMode ? "Dark" : "Light"}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;