import { useState } from 'react'
import ScoreCounter from './ScoreCounter.jsx'
import Footer from './Footer.jsx';
import './index.css'

function App() {

    return (
        <>
            <div className="main-container">
                <div className="App">
                    <header className="App-header">
                        <h1>Welcome to my JMP-Tools app (WIP)</h1><br/>

                        <br/>
                    </header>
                </div>
            
                <div className="display">
                    <ScoreCounter/>
                </div>

                <div>
                    <h2>How to use:</h2>
                        <p>
                            <br/>
                            <span className="highlight">Init-Pal: </span>Sets the amount of pallets to start counting with.
                            <br/><br/>
                            <span className="highlight">Start-At: </span>Sets the hour and minute at which your score began counting down.
                            <br/><br/>
                            <span className="highlight">Add-Pallets: </span>Adds the next pallets You've loaded to update the score calculation.
                            <br/><br/>
                            <span className="highlight">Start over: </span>Resets the calculation of Your score.
                            <br/><br/>
                            <span className="highlight">Pause/Resume: </span>Pauses/Resumes the calculation of Your score (useful when You go on Your break).
                        </p>
                </div>
            </div>
            <br/>
            <Footer/>
        </>
      );
    };

export default App