import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-switcher gradient-bg">
        <hr/><br/>
        <p>{t('LanguageSwitcher.info', 'Default text')}</p>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('pl')}>Polski</button>
        <hr/>
    </div>
  );
};

export default LanguageSwitcher;
