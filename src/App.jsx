import { useState, } from 'react'
import ScoreCounter from './ScoreCounter.jsx'
import Footer from './Footer.jsx';
import './index.css'
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';



function App() {
    const { t } = useTranslation();
    return (
        <div>
            <div>
                <header>
                    <h1>{t('App.welcome')}</h1>
                </header>
                <LanguageSwitcher/>
            </div>
            <div className="display">
                <ScoreCounter/>
            </div>
            <hr/>
            <Footer/>
        </div>
      );
    };

export default App