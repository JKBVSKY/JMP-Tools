import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import pkg from '/package.json'; // adjust the path if needed
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';



const Navigation = () => {
  const { t } = useTranslation();
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={() => setIsMenuVisible(false)}>
          JMP-TOOLS [v{pkg.version}]
        </Link>

        <div className={`nav-links show"`}>
          <Link to="/" onClick={() => setIsMenuVisible(false)}>
            <HomeIcon />          
            {t('Navigation.home')}
          </Link>
          <Link to="/calculator" onClick={() => setIsMenuVisible(false)}>
            <CalculateIcon />
            {t('Navigation.calculator')}
          </Link>
          <Link to="/scorehistory" onClick={() => setIsMenuVisible(false)}>
            <AnalyticsIcon />
            {t('Navigation.scorehistory')}
          </Link>
          <Link to="/settings" onClick={() => setIsMenuVisible(false)}>
            <SettingsIcon />
            {t('Navigation.settings')}
          </Link>
        </div>


      </nav>
    </div>
  );
};

export default Navigation;
