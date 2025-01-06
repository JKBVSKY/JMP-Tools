import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
  // const [initialPallets, setInitialPallets] = useState(0); // REMOVE?
  const [inputPallets, setInputPallets] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [isCounting, setIsCounting] = useState(() => {
    return localStorage.getItem("isCounting") === "true";
  });
  const [paused, setPaused] = useState(() => {
    return localStorage.getItem("paused") === "true";
  });
  const [totalPallets, setTotalPallets] = useState(() => {
    return Number(localStorage.getItem("totalPallets")) || 0;
  });
  const [startTime, setStartTime] = useState(() => {
    return Number(localStorage.getItem("startTime")) || null;
  });
  const [elapsedTime, setElapsedTime] = useState(() => {
    return Number(localStorage.getItem("elapsedTime")) || 0;
  });
  const [palletRate, setPalletRate] = useState(() => {
    return Number(localStorage.getItem("palletRate")) || 0;
  });
  const [elapsedTimeWhenPaused, setElapsedTimeWhenPaused] = useState(() => {
    return Number(localStorage.getItem("elapsedTimeWhenPaused")) || 0;
  });
  const [pauseTimer, setPauseTimer] = useState(() => {
    return Number(localStorage.getItem("pauseTimer")) ||0;
  });
  const [pauseInterval, setPauseInterval] = useState(() => {
    return Number(localStorage.getItem("pauseInterval")) || null;
  });
  const [frozenRate, setFrozenRate] = useState(() => {
    return Number(localStorage.getItem('frozenRate')) || null;
  });
  
  const pauseTimerRef = useRef(pauseTimer);
  const [TimeoutStartTime, setTimeoutStartTime] = useState(0);
  let pauseTimeoutId;
  const { t } = useTranslation();

  const startOver = () => {
      // Clear the interval if it exists
  if (pauseInterval) {
    clearInterval(pauseInterval); // Stop the interval
    setPauseInterval(null); // Clear interval reference
  }
    // setInitialPallets(0); // REMOVE?
    setTotalPallets(0);
    setStartTime(null);
    setElapsedTime(0);
    setPalletRate(0);
    setInputPallets('');
    setIsCounting(false);
    setStartTimeInput('');
    setPaused(false); // Ensure paused state is reset
    setElapsedTimeWhenPaused(0);
    setPauseTimer(0);
    setPauseInterval(null);
    setFrozenRate(0);

    // Clear localStorage
    localStorage.removeItem('totalPallets');
    localStorage.removeItem('elapsedTime');
    localStorage.removeItem('palletRate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('isCounting');
    localStorage.removeItem('paused');
    localStorage.removeItem('elapsedTimeWhenPaused');
    localStorage.removeItem('pauseTimer');
    localStorage.removeItem('pauseInterval');
    localStorage.removeItem('frozenRate');
  };

    // Persist states in localStorage
    useEffect(() => {
      localStorage.setItem("totalPallets", totalPallets);
    }, [totalPallets]);
  
    useEffect(() => {
      localStorage.setItem("elapsedTime", elapsedTime);
    }, [elapsedTime]);
  
    useEffect(() => {
      localStorage.setItem("palletRate", palletRate);
    }, [palletRate]);
  
    useEffect(() => {
      localStorage.setItem("isCounting", isCounting);
    }, [isCounting]);
  
    useEffect(() => {
      localStorage.setItem("paused", paused);
    }, [paused]);
  
    useEffect(() => {
      localStorage.setItem("elapsedTimeWhenPaused", elapsedTimeWhenPaused);
    }, [elapsedTimeWhenPaused]);
  
    useEffect(() => {
      if (startTime !== null) {
        localStorage.setItem("startTime", startTime);
      }
    }, [startTime]);
    
    useEffect(() => {
      localStorage.setItem("pauseTimer", pauseTimer);
    }, [pauseTimer]);
  
    useEffect(() => {
      localStorage.setItem("pauseInterval", pauseInterval);
    }, [pauseInterval]);

    useEffect(() => {
      localStorage.setItem("frozenRate", frozenRate);
    }, [frozenRate]);

  // Start counting function (sets the start time and initializes the pallets)
  const startCounting = () => {

  if (!startTime) { // Allow setting `startTime` only once
      const [hours, minutes] = startTimeInput.split(":").map((num) => parseInt(num, 10));
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0); // Set to the user-provided time
      
      const timestamp = startDate.getTime();
      setStartTime(timestamp); // Save the timestamp
      setTotalPallets(Number(inputPallets)); // Set the initial number of pallets loaded
      // setInitialPallets(Number(inputPallets)); // Set the initial pallets in state
      setIsCounting(true); // Start counting
      setInputPallets(""); // Clear the input field after submitting
    }
  };

  // Observe if this code is really needed 
  // const formattedStartTime = startTime
  //   ? new Date(startTime).toLocaleString()
  //   : "Not set";

  // Function to add additional pallets
  const addPallets = () => {
    const newPallets = Number(inputPallets);
    if (newPallets > 0) {
      setTotalPallets((prevTotal) => prevTotal + newPallets); // Use functional update to ensure latest state
      setInputPallets(''); // Clear the input field after submitting
    }
  };

  // Reference to pauseTimer, so it can be accessed from another functions
  useEffect(() => {
    pauseTimerRef.current = pauseTimer;
  }, [pauseTimer]);

  // [NEW useEffect] Function to pause and resume the calculations
  useEffect(() => {
    if (paused) {
      setFrozenRate(palletRate); // Freeze the current rate
      setPalletRate(palletRate); // Immediately set palletRate to the frozen

      // Start interval to increment pauseTimer
      const interval = setInterval(() => {
        setPauseTimer((prev) => prev + 1);
      }, 1000);
  
      // Cleanup interval when paused becomes false
      return () => clearInterval(interval);
    }
  }, [paused]);

  //     //WORK ON THIS, LAST THING TO FIX
  //     // Start the timeout with conditional delay based on elapsed time
  //     // const remainingTime = 10000 - elapsedTime; // Calculate remaining time to wait for resumption
  //     // console.log (remainingTime);
  //     // pauseTimeoutId = setTimeout(() => {
  //     //   resumeCounting(); // Auto-resume after the remaining time
  //     //   clearInterval(interval); // Stop the pause timer after resuming
  //     //   setPauseInterval(null); // Clear interval reference
  //     // }, remainingTime); // Start timeout with the remaining time delay
  //     // setTimeoutStartTime(Date.now()); // Store the time when timeout was started
  // };

  // Button for debugging purposes
  const handleDebugClick = () => {
    console.clear();
    console.log ('============================');
    // console.log (initialPallets + ' initialPallets'); // REMOVE?
    console.log (totalPallets + ' totalPallets');
    console.log (elapsedTime + ' elapsedTime');
    console.log (palletRate + ' palletRate');
    console.log (isCounting + ' isCounting');
    console.log (paused + ' paused');
    console.log (startTime + ' startTime');
    console.log ("Pause timer:", pauseTimer);
    console.log ("Pause timer ref:", pauseTimerRef);
    console.log ("Pause interval:", pauseInterval);
    console.log (Date.now() / 1000);
    console.log ("FrozenRate: " + frozenRate);
    console.log ('============================');
  }

  // Update elapsed time and pallet rate every second
  useEffect(() => {
    if (isCounting && startTime !== null) {
      const intervalId = setInterval(() => {
        const currentElapsedTime = (Date.now() - startTime) / 1000; // Total time since start
        setElapsedTime(currentElapsedTime); // Set elapsed time

        // Calculate pallets per hour
        if (!paused) {
          const rate = (totalPallets / (currentElapsedTime - pauseTimerRef.current)) * 3600;
          setPalletRate(rate); // Update the rate of pallets per hour
        }
      }, 100); // Update every 100ms
  
      // Cleanup interval when pausing or stopping
      return () => clearInterval(intervalId);
    }
  }, [isCounting, paused, startTime, elapsedTimeWhenPaused, totalPallets]);

  return (
    <div className="score-counter">
      <h1 className="calc-title">{t('ScoreCounter.title')}</h1>
      
      {/* Display the current status only if counting has started*/}
      <div className="score-display">
        <hr className="ct"/>
        <h2>{t('ScoreCounter.palam')}{totalPallets}</h2>
        <h3>{t('ScoreCounter.palperh')}{paused ? (frozenRate !== null ? frozenRate.toFixed(2) : '--') : palletRate.toFixed(2)}</h3>
        <p>
          {t('ScoreCounter.eltim')} {Math.floor(elapsedTime / 3600)}h {Math.floor((elapsedTime % 3600) / 60)}m {Math.floor(elapsedTime % 60)}s
        </p>
        {(paused || pauseTimer > 0) && <p>{t('ScoreCounter.elptim')}{Math.floor(pauseTimer / 60)}m {pauseTimer % 60}s</p>}
        <hr className="ct"/>
        </div>
      

      {!isCounting && !paused? (
        // Input for the initial number of pallets and start time
        <div className="opt-box">
          <label className="input-desc">
            {t('ScoreCounter.inittime')}
              <input
                className="custom-input"
                type="time"
                value={startTimeInput}
                onChange={(e) => setStartTimeInput(e.target.value)}
                disabled={isCounting}
                lang="pl-PL"
                placeholder="HH:MM"
              />
          </label>
          <br/><br/>
          <button onClick={startCounting} disabled={startTimeInput === ''}>
            {t('ScoreCounter.buttons.startct')}
          </button>
          <button onClick={startOver}>DEBUG-RESET</button>
          {/* DEBUG BUTTON */}
            <button onClick={handleDebugClick}>
              Console.log DEBUG
            </button>
        </div>
      ) : (
        // After starting, show the option to add additional pallets
        <div className="opt-box">
          <label className='input-desc'>
            {t('ScoreCounter.addpal')}
            <br/>
            <input
              className="custom-input"
              type="number"
              value={inputPallets}
              onChange={(e) => setInputPallets(e.target.value)}
              placeholder={t('ScoreCounter.addpal-pholder')}
            />
          </label>
          <br/>
          <button onClick={addPallets}>
          {t('ScoreCounter.buttons.updtscr')}
          </button>
          <button onClick={startOver}>
          {t('ScoreCounter.buttons.startovr')}
          </button>
          {/* Show the Pause/Resume button only if counting has started */}
          {isCounting && (
            <button 
              onClick={() => setPaused((prev) => !prev)} // Toggle paused state
              // disabled={pauseTimer >= 150} // UNCOMMENT WHEN setTimeout is fixed
            >
              {paused ? t('ScoreCounter.buttons.resume') : t('ScoreCounter.buttons.pause')}
            </button>
          )}
          {/* DEBUG BUTTON */}
          {isCounting && (
            <button onClick={handleDebugClick}>
              Console.log DEBUG
            </button>
          )}
        </div>
      )}
        {/*HOW-TO SECTION*/}
        {!isCounting ? (
          <div>
            <hr/><br/>
            <h2>{t('ScoreCounter.howto')}</h2>
            <p>
              <br/><br/>
              <span className="highlight">{t('ScoreCounter.startat-label')} </span>{t('ScoreCounter.startat-dsc')}
              <br/><br/>
            </p>
            <br/><hr/>
          </div>
        ) : (
          // SHOW THESE OPTIONS AFTER COUNTER STARTED WORKING
          <div>
            <hr/><br/>
            <h2>{t('ScoreCounter.howto')}</h2>
            <br/>
            <p>
                <span className="highlight">{t('ScoreCounter.addpall-label')}</span>{t('ScoreCounter.addpall-dsc')}
                <br/><br/>
                <span className="highlight">{t('ScoreCounter.finishcalc-label')}</span>{t('ScoreCounter.finishcalc-dsc')}
                <br/><br/>
                <span className="highlight">{t('ScoreCounter.pauseresume-label')}</span>{t('ScoreCounter.pauseresume-dsc')}
            </p>
            <br/><hr/>
          </div>
        )}
    </div>
  );
}

export default App;
