import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage menu visibility
  const { t } = useTranslation();

  const handleLanguageButton = () => {
    setIsMenuVisible(prevState => !prevState); // Toggle the visibility of the language menu
  };

  return (
    <nav className="navbar">
            <a href="#" className="logo">
            {t('App.welcome')}
            </a>
      <hr/>
      <div className={"nav-links"}>
        {/* <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a> */}
        <a href="#language" onClick={handleLanguageButton}>Language</a>
      </div>
      <hr/>

      {/* Conditionally render the language menu */}
      {isMenuVisible && (
        <LanguageSwitcher/>
      )}
    </nav>
  );
};

export default Navigation;