import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLangMenuVisible, setIsLangMenuVisible] = useState(false);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const handleLanguageButton = () => setIsLangMenuVisible(prev => !prev);
  const onCloseMenu = () => {
    setIsLangMenuVisible(false);
  };
  
  return (
    <div>
      <nav className="navbar">
        <Link to="JMP-Tools/" onClick={() => setIsMenuVisible(false)} className="logo">
          JMP-TOOLS [0.3.0]
        </Link>
        <hr className="red-short" />

        <div className={`nav-links show"`}>
          <Link to="JMP-Tools/" onClick={() => setIsMenuVisible(false)}>Home</Link>
          <Link to="JMP-Tools/calculator" onClick={() => setIsMenuVisible(false)}>Calculator App</Link>
          <Link to="JMP-Tools/scorehistory" onClick={() => setIsMenuVisible(false)}>Score History</Link>
          <button onClick={handleLanguageButton} className="lang-button">Language</button>
        </div>

        <hr className="red-short" />

        {isLangMenuVisible && <LanguageSwitcher onCloseMenu={onCloseMenu} />}
      </nav>
    </div>
  );
};

export default Navigation;
