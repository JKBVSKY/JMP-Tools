import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ onCloseMenu }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onCloseMenu(); // Call the function passed from the Navbar to close the menu
  };

  return (
    <div className="language-switcher gradient-bg">
        <h1>{t('LanguageSwitcher.info', 'Default text')}</h1>
        <button onClick={() => changeLanguage('en')}>{t('LanguageSwitcher.en')}</button>
        <button onClick={() => changeLanguage('pl')}>{t('LanguageSwitcher.pl')}</button>
    </div>
  );
};

export default LanguageSwitcher;
