import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
  const [initialPallets, setInitialPallets] = useState(0); // Initial pallets loaded at the start
  const [totalPallets, setTotalPallets] = useState(() => {
    return Number(localStorage.getItem("totalPallets")) || 0;
  }); // Total pallets loaded (initial + added)
  const [startTime, setStartTime] = useState(() => {
    return Number(localStorage.getItem("startTime")) || null;
  }); // Start time of the truck loader's work (from user input)
  const [elapsedTime, setElapsedTime] = useState(() => {
    return Number(localStorage.getItem("elapsedTime")) || 0;
  }); // Elapsed time since start (in seconds)
  const [palletRate, setPalletRate] = useState(() => {
    return Number(localStorage.getItem("palletRate")) || 0;
  }); // Pallets loaded per hour (calculated)
  const [inputPallets, setInputPallets] = useState(''); // Input value for new pallets to add
  const [isCounting, setIsCounting] = useState(() => {
    return localStorage.getItem("isCounting") === "true";
  }); // Whether the truck loader has started working
  const [startTimeInput, setStartTimeInput] = useState(''); // User input for start time (HH:MM format)
  const [paused, setPaused] = useState(() => {
    return localStorage.getItem("paused") === "true";
  }); // New state for pausing/resuming
  const [elapsedTimeWhenPaused, setElapsedTimeWhenPaused] = useState(() => {
    return Number(localStorage.getItem("elapsedTimeWhenPaused")) || 0;
  }); // Time recorded at pause
  const [pauseTimer, setPauseTimer] = useState(() => {
    return Number(localStorage.getItem("pauseTimer")) ||0;
  }); // Tracks the paused duration in seconds
  const [pauseInterval, setPauseInterval] = useState(() => {
    return Number(localStorage.getItem("pauseInterval")) || null;
  }); // Stores the timeout for auto-resume
  const { t } = useTranslation();

  const startOver = () => {
      // Clear the interval if it exists
  if (pauseInterval) {
    clearInterval(pauseInterval); // Stop the interval
    setPauseInterval(null); // Clear interval reference
  }
    setInitialPallets(0);
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

  // Start counting function (sets the start time and initializes the pallets)
  const startCounting = () => {

    if (!startTime) { // Allow setting `startTime` only once
      const [hours, minutes] = startTimeInput.split(":").map((num) => parseInt(num, 10));
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0); // Set to the user-provided time
      
      const timestamp = startDate.getTime();
      setStartTime(timestamp); // Save the timestamp
      setTotalPallets(Number(inputPallets)); // Set the initial number of pallets loaded
      setInitialPallets(Number(inputPallets)); // Set the initial pallets in state
      setIsCounting(true); // Start counting
      setInputPallets(""); // Clear the input field after submitting
    }
  };

  const formattedStartTime = startTime
    ? new Date(startTime).toLocaleString()
    : "Not set";

  // Function to add additional pallets
  const addPallets = () => {
    const newPallets = Number(inputPallets);
    if (newPallets > 0) {
      setTotalPallets((prevTotal) => prevTotal + newPallets); // Use functional update to ensure latest state
      setInputPallets(''); // Clear the input field after submitting
    }
  };

  // Function to pause and resume the calculations
  const pauseCounting = () => {
    setPaused(true); // Pause calculations
    setElapsedTimeWhenPaused(elapsedTime); // Save elapsed time at the pause moment
  
      // Clear any previous interval before starting a new one
  if (pauseInterval) {
    clearInterval(pauseInterval);
    setPauseInterval(null);
  }
  
    // Start the paused timer
    setPauseTimer(0); // Reset pause timer
    const interval = setInterval(() => {
      setPauseTimer((prev) => prev + 1);
    }, 1000);
    setPauseInterval(interval);

    setTimeout(() => {
      resumeCounting(); // Auto-resume after 10 seconds
      clearInterval(interval); // Stop the pause timer after resuming
      setPauseInterval(null); // Clear interval reference
    }, 900000);
  };
  
  const resumeCounting = () => {
    setPaused(false); // Resume calculations
    const adjustedStartTime = new Date(Date.now() - elapsedTimeWhenPaused * 1000); // Adjust for paused duration
    setStartTime(Date.now()); // Reset start time to now for resuming
  
    // Clear the paused timer
    if (pauseInterval) {
      clearInterval(pauseInterval); // Stop the interval
      setPauseInterval(null);
    }
  };

  // console.log (totalPallets + ' totalPallets');
  // console.log (elapsedTime + ' elapsedTime');
  // console.log (palletRate + ' palletRate');
  // console.log (isCounting + ' isCounting');
  // console.log (paused + ' paused');
  // console.log (elapsedTimeWhenPaused + ' elapsedTimeWhenPaused');
  // console.log (startTime + ' startTime');
  console.log("Pause timer:", pauseTimer);
  console.log("Pause interval:", pauseInterval);


  useEffect(() => {
    // Retrieve values from localStorage on component mount
    const savedTotalPallets = localStorage.getItem("totalPallets");
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    const savedPalletRate = localStorage.getItem("palletRate");

    if (savedTotalPallets) setTotalPallets(Number(savedTotalPallets));
    if (savedElapsedTime) setElapsedTime(Number(savedElapsedTime));
    if (savedPalletRate) setPalletRate(Number(savedPalletRate));

  }, []);

  
  // useEffect(() => {
  //   if (isCounting && !paused && startTime !== null) {
  //     const intervalId = setInterval(() => {
  //       const currentElapsedTime = (Date.now() - startTime) / 1000; // Time since last start
  //       const totalElapsedTime = elapsedTimeWhenPaused + currentElapsedTime; // Add paused time
  
  //       // Update elapsed time
  //       setElapsedTime(totalElapsedTime);
  
  //       // Update pallet rate
  //       const rate = (totalPallets / totalElapsedTime) * 3600; // Total pallets per hour
  //       setPalletRate(rate);
  //     }, 100); // Update every 100ms
  
  //     // Cleanup interval on unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isCounting, paused, startTime, elapsedTimeWhenPaused, totalPallets]);

  // Update elapsed time and pallet rate every second
  useEffect(() => {
    if (isCounting && !paused && startTime !== null) {
      const intervalId = setInterval(() => {
        const currentElapsedTime = (Date.now() - startTime) / 1000; // Total time since start
        setElapsedTime(elapsedTimeWhenPaused + currentElapsedTime); // Add paused time
      
      // Calculate pallets per hour
        if (elapsedTimeWhenPaused > 0){
          const rate = (totalPallets / (elapsedTimeWhenPaused + currentElapsedTime)) * 3600; // Total pallets per hour
          setPalletRate(rate); // Update the rate of pallets per hour
        }else{
          const rate = (totalPallets / currentElapsedTime) * 3600; // Total pallets per hour
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
      <br/>
      
      {/* Display the current status only if counting has started*/}
      <div>
        <hr className="ct"/>
        <h2>{t('ScoreCounter.palam')}{totalPallets}</h2>
        <h3>{t('ScoreCounter.palperh')}{palletRate.toFixed(2)}</h3>
        <p>
          {t('ScoreCounter.eltim')} {Math.floor(elapsedTime / 3600)}h {Math.floor((elapsedTime % 3600) / 60)}m {Math.floor(elapsedTime % 60)}s
        </p>
        {paused && pauseTimer > 0 && <p>{t('ScoreCounter.elptim')}{Math.floor(pauseTimer / 60)}m {pauseTimer % 60}s</p>}
        <hr className="ct"/>
        </div>
      

      {!isCounting && !paused? (
        // Input for the initial number of pallets and start time
        <div className="opt-box">
          <label className="input-desc">
          Init-Pal&nbsp;
          <input
              className="custom-input"
              type="number"
              value={inputPallets}
              onChange={(e) => setInputPallets(e.target.value)}
              disabled={isCounting}
              placeholder={t('ScoreCounter.addpal-pholder')}
            />
          </label>
          <br />
          <label className="input-desc">
            Start-At&nbsp;
            <input
              type="time"
              value={startTimeInput}
              onChange={(e) => setStartTimeInput(e.target.value)}
              disabled={isCounting}
              lang="pl-PL"
              placeholder="HH:MM"
            />
          </label>
          <br/>
          <button onClick={startCounting} disabled={inputPallets === '' || startTimeInput === ''}>
            {t('ScoreCounter.buttons.startct')}
          </button>
          <button onClick={startOver}>DEBUG-RESET</button>
        </div>
      ) : (
        // After starting, show the option to add additional pallets
        <div className="opt-box">
          <label className='input-desc'>
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
              onClick={paused ? resumeCounting : pauseCounting} 
              disabled={pauseTimer >= 899}
            >
              {paused ? t('ScoreCounter.buttons.resume') : t('ScoreCounter.buttons.pause')}
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
              <br/>
              <span className="highlight">Init-Pal: </span>{t('ScoreCounter.initpal-ht')}
              <br/><br/>
              <span className="highlight">Start-At: </span>{t('ScoreCounter.startat-ht')}
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
