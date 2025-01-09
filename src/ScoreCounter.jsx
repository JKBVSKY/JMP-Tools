import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
  // const [initialPallets, setInitialPallets] = useState(0); // REMOVE?
  const [inputPallets, setInputPallets] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [isCounting, setIsCounting] = useState(() => {
    return localStorage.getItem("isCounting") === "true";
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
  const [isAddingPause, setIsAddingPause] = useState(() => {
    return (localStorage.getItem("isAddingPause")) === "true";
  });
  const [pausedFor, setPausedFor] = useState(() => {
    return Number(localStorage.getItem("pausedFor")) ||0;
  });
  const [remaining, setRemaining] = useState(() => {
    return Number(localStorage.getItem('remaining')) || 15;
  });



  const { t } = useTranslation();

  const startOver = () => {

    // setInitialPallets(0); // REMOVE?
    setTotalPallets(0);
    setStartTime(null);
    setElapsedTime(0);
    setPalletRate(0);
    setInputPallets('');
    setIsCounting(false);
    setStartTimeInput('');
    setIsAddingPause(false);
    setPausedFor(0);
    setRemaining(15);
    setMessage("");

    // Clear localStorage
    localStorage.removeItem('totalPallets');
    localStorage.removeItem('elapsedTime');
    localStorage.removeItem('palletRate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('isCounting');
    localStorage.removeItem('isAddingPause');
    localStorage.removeItem('remaining')
    localStorage.removeItem('pausedFor')
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
      localStorage.setItem("isAddingPause", isAddingPause);
    }, [isAddingPause]);
  
    useEffect(() => {
      if (startTime !== null) {
        localStorage.setItem("startTime", startTime);
      }
    }, [startTime]);

    useEffect(() => {
      localStorage.setItem("pausedFor", pausedFor);
    }, [pausedFor]);

    useEffect(() => {
      localStorage.setItem("remaining", remaining);
    }, [remaining]);
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

  // Function to add additional pallets
  const addPallets = () => {
    const newPallets = Number(inputPallets);
    if (newPallets > 0) {
      setTotalPallets((prevTotal) => prevTotal + newPallets); // Use functional update to ensure latest state
      setInputPallets(''); // Clear the input field after submitting
    }
  };

  // HERE SUBSTITUTE THIS FOR NEW PAUSE FUNCTION
  // useEffect(() => {

  //   if (paused) {
  //     // Save the time when the pause starts
  //     if (!pauseStartRef.current) {
  //       pauseStartRef.current = Date.now();
  //     }

  //     // Start the interval to update pauseTimer every second
  //     interval = setInterval(() => {
  //       const elapsed = Math.floor((Date.now() - pauseStartRef.current) / 1000); // Elapsed time in seconds
  //       setPauseTimer((prevTimer) => prevTimer + 1); // Increment by 1 each second
  //       pauseStartRef.current += 1000; // Update pauseStartRef to avoid cumulative additions
  //     }, 1000);
  //   } else {
  //     // Add the final elapsed time when unpausing
  //     if (pauseStartRef.current) {
  //       const elapsed = Math.floor((Date.now() - pauseStartRef.current) / 1000); // Total elapsed time
  //       setPauseTimer((prevTimer) => prevTimer + elapsed); // Add elapsed time once
  //       pauseStartRef.current = null; // Reset pauseStartRef
  //     }

  //     // Clear the interval
  //     clearInterval(interval);
  //   }

  // }, [paused]);


  // Button for debugging purposes
  const handleDebugClick = () => {
    console.clear();
    console.log ('============================');
    // console.log (initialPallets + ' initialPallets'); // REMOVE?
    console.log (totalPallets + ' totalPallets');
    console.log (elapsedTime + ' elapsedTime');
    console.log (palletRate + ' palletRate');
    console.log (isCounting + ' isCounting');
    console.log (isAddingPause + ' isAddingPause');
    console.log (startTime + ' startTime');
    console.log ("Paused for:", pausedFor);
    console.log (Date.now() / 1000);
    console.log ("Remaining: ", remaining);
    console.log ('============================');
  }

  // START OF PAUSE FUNCTIONS
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= remaining) {
      setInputValue(value);
    } else {
      setInputValue(""); // Reset if out of range
    }
  };

  const handlePauseClick = () => {
    setIsAddingPause(true); // Show the form
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "" && inputValue <= remaining) {
      const chosenNumber = parseInt(inputValue, 10);
      setPausedFor((prev) => prev + chosenNumber);
      setRemaining((prev) => prev - chosenNumber);
      setInputValue(""); // Reset input
      setIsAddingPause(false); // Hide the form
      if (pausedFor + chosenNumber === 15) {
        setMessage("You've used 15 minutes of Your break already.");
      }
    }
  };
  //END OF PAUSE FUNCTIONS
  
  // Update elapsed time and pallet rate every second
  useEffect(() => {
    if (isCounting && startTime !== null) {
      const intervalId = setInterval(() => {
        const currentElapsedTime = (Date.now() - startTime) / 1000; // Total time since start
        setElapsedTime(currentElapsedTime); // Set elapsed time

        // Calculate pallets per hour
        const rate = (totalPallets / (currentElapsedTime - (pausedFor * 60))) * 3600;
        setPalletRate(rate); // Update the rate of pallets per hour
      }, 100); // Update every 100ms
  
      // Cleanup interval when pausing or stopping
      return () => clearInterval(intervalId);
    }
  }, [isCounting, startTime, totalPallets, pausedFor]);

  return (
    <div className="score-counter">
      <h1 className="calc-title">{t('ScoreCounter.title')}</h1>
      
      {/* Display the current status only if counting has started*/}
      <div className="score-display">
        <hr className="ct"/>
        <h2>{t('ScoreCounter.palam')}{totalPallets}</h2>
        <h3>{t('ScoreCounter.palperh')}{palletRate.toFixed(2)}</h3>
        <p>
          {t('ScoreCounter.eltim')} {Math.floor(elapsedTime / 3600)}h {Math.floor((elapsedTime % 3600) / 60)}m {Math.floor(elapsedTime % 60)}s
        </p>
        <p>
          {t('ScoreCounter.elptim')}
          {Math.floor(pausedFor)}min
        </p>
        <hr className="ct"/>
        </div>
      

      {!isCounting ? (
        // Input for the start time
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
          {/* Show the Pause/Resume button only if counting has started
          {isCounting && (
            <button 
              onClick={handlePauseClick} // Toggle paused state
              disabled={pausedFor === 15}
            >
              START THE PAUSE
            </button>
          )} */}
          {/* DEBUG BUTTON */}
          {isCounting && (
            <button onClick={handleDebugClick}>
              Console.log DEBUG
            </button>
          )}
        </div>
      )}

      {/* ADD PAUSE BUTTON */}
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          {!isAddingPause && remaining > 0 && (
                <button onClick={handlePauseClick}>Add Pause</button>
              )}
              {isAddingPause && (
                <form onSubmit={handleSubmit}>
                  <label>
                    Choose a number (1-{remaining}):
                    <input
                      type="number"
                      min="1"
                      max={remaining}
                      value={inputValue}
                      onChange={handleInputChange}
                      disabled={remaining === 0}
                    />
                  </label>
                  <button type="submit" disabled={remaining === 0}>
                    Submit
                  </button>
                </form>
              )}
        </>
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
