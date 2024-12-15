import { useState } from 'react'
import ScoreCounter from './ScoreCounter.jsx'
import './index.css'

function App() {

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to my JMP-Tools app (WIP)</h1>
                    <p className="red-text">
                    Edit <code>App.jsx</code> and save to reload.
                    </p>
                </header>
            </div>
            <div className="Display">
                <ScoreCounter/>
            </div>
        </>
      );
    };

export default App