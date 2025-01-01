import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { t } = useTranslation();

  return (
    <nav className="navbar">
            <a href="#" className="logo">
            {t('App.welcome')}
            </a>
      <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        <a href="#language">Language</a>
      </div>
      <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
    </nav>
  );
};

export default Navigation;