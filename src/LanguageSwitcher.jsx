import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-switcher gradient-bg">
        <h1>{t('LanguageSwitcher.info', 'Default text')}</h1>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('pl')}>Polski</button>
        <hr/>
    </div>
  );
};

export default LanguageSwitcher;
