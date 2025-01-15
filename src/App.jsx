import { useState, } from 'react'
import Navigation from './Navigation.jsx';
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
                <Navigation/>
            </div>
            {/* <div>
                <ScoreCounter/>
            </div> */}
            <Footer/>
        </div>
      );
    };

export default App