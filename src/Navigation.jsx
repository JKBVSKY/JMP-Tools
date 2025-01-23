import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import ScoreCounter from "./ScoreCounter"; // Import your ScoreCounter component
import HomePage from "./HomePage";

const Navigation = ({ setCurrentPage }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage menu visibility
  const [isLangMenuVisible, setIsLangMenuVisible] = useState(false); // State to manage menu visibility
  const [currentPage, setPage] = useState("home"); // State to track the current page
  
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLanguageButton = () => {
    setIsLangMenuVisible(prevState => !prevState); // Toggle the visibility of the language menu
  };

  const handleLinkClick = (page) => {
    setPage(page);
    setIsMenuVisible(false);   // Close the menu
  };

  const onCloseMenu = () => {
    setIsMenuVisible(false);
    setIsLangMenuVisible(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "calculator":
        return <ScoreCounter />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Update the document title based on the current page
    document.title =
      currentPage === "home"
        ? "JMP Tools - Home"
        : "JMP Tools - Score Calculator";
  }, [currentPage]);

  return (
    <div>
      <nav className="navbar">
        <a
          href="#home"
          onClick={() => setIsMenuVisible(false)}
          className="logo"
        >
          JMP-TOOLS [0.2.0]
        </a>        <hr className="red-short"/>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuVisible ? "Close" : "Menu"}
        </button>
        <div className={`nav-links ${isMenuVisible ? "show" : "hide"}`}>
        <a href="#home" onClick={() => handleLinkClick("home")}>Home</a>
        <a href="#calculator" onClick={() => handleLinkClick("calculator")}>Calculator App</a>
        {/* <a href="#scorehistory" onClick={() => handleLinkClick("scorehistory")}>Score History</a> */}
        <a href="#language" onClick={handleLanguageButton}>Language</a>
      </div>
      <hr className="red-short"/>
        {/* Conditionally render the language menu */}
        {isLangMenuVisible && <LanguageSwitcher onCloseMenu={onCloseMenu} />}
      </nav>
      <main>
        {renderContent()} {/* Render the current page content */}
      </main>
    </div>
  );
};

export default Navigation;
