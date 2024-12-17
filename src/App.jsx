import { useState, } from 'react'
import ScoreCounter from './ScoreCounter.jsx'
import Footer from './Footer.jsx';
import './index.css'
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';



function App() {
    const { t } = useTranslation();
    return (
        <>
            <div className="main-container">
                <div className="App">
                    <header className="App-header">
                        <h1>{t('App.welcome')}</h1><br/>
                        <LanguageSwitcher/>
                        <br/>
                    </header>
                </div>
                <div className="display">
                    <ScoreCounter/>
                </div>

            </div>
            <br/>
            <Footer/>
        </>
      );
    };

export default App