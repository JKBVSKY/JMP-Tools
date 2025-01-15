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
  const [weightedRate, setWeightedRate] = useState(() => {
    return Number(localStorage.getItem("weightedRate")) || 0;
  })
  const [isAddingPause, setIsAddingPause] = useState(() => {
    return (localStorage.getItem("isAddingPause")) === "true";
  });
  const [pausedFor, setPausedFor] = useState(() => {
    return Number(localStorage.getItem("pausedFor")) ||0;
  });
  const [remaining, setRemaining] = useState(() => {
    return Number(localStorage.getItem('remaining')) || 15;
  });
  const [isDebugging, setIsDebugging] = useState(false);
  const [calculations, setCalculations] = useState([]);  // State to store the list of saved calculations
  const [trucks, setTrucks] = useState([]);
  const [activities, setActivities] = useState([]);  // State to store the list of saved activities
  const { t } = useTranslation();

  const startOver = () => {

    // setInitialPallets(0); // REMOVE?
    setTotalPallets(0);
    setStartTime(null);
    setElapsedTime(0);
    // setPalletRate(0);
    setWeightedRate(0);
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
    // localStorage.removeItem('palletRate');
    localStorage.removeItem('weightedRate');
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
    localStorage.setItem("weightedRate", weightedRate);
    }, [weightedRate]);

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

  //START OF TODAY's ACTIVITY FUNCTION
  const saveActivity = () => {
      // Save the current activity as an object
      const newActivities = {
        truckNumber: activities.length + 1,
        inputPallets,
        timestamp: new Date().toLocaleString(), // You can add a timestamp for reference
      };
  
      // Add the new calculation to the list (use the previous state to ensure it's updated correctly)
      setActivities(prevActivities => [newActivities, ...prevActivities]); // Add at the beginning
  };
  //END

  //START OF CALCULATION SAVER FUNCTION
  const saveCalculation = () => {
    const isConfirmed = window.confirm("Are you sure you want to save and stop Your calculation?");
    if(isConfirmed){
      // Save the current calculation as an object
      const newCalculation = {
        palletRate: palletRate.toFixed(2),
        elapsedTime,
        totalPallets,
        pausedFor,
        timestamp: new Date().toLocaleString(), // You can add a timestamp for reference
      };
  
      // Add the new calculation to the list (use the previous state to ensure it's updated correctly)
      setCalculations(prevCalculations => [newCalculation, ...prevCalculations]); // Add at the beginning
      startOver();
    }
  };

  const clearCalculations = () => {
    const isConfirmed = window.confirm("Are you sure you want to clear all calculations?");
    if (isConfirmed) {
      // Reset the calculations state to an empty array
      setCalculations([]);
      setActivities([]);
    }
  };

  const formatElapsedTime = (elapsedTimeInSeconds) => {
    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(elapsedTimeInSeconds % 60);

    // Pad hours, minutes, and seconds to be always 2 digits
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  //END OF CALCULATION SAVER FUNCTION

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
    saveActivity();
    if (newPallets > 0) {
      setTotalPallets((prevTotal) => prevTotal + newPallets); // Use functional update to ensure latest state
      setInputPallets(''); // Clear the input field after submitting
    }
  };

  // START OF DEBUGGING FUNCTIONS
  const toggleDebugging = () => {
    setIsDebugging(prevState => !prevState); // Toggle debugging state
  };

  const handlePauseReset = () => {
    setRemaining(15);
    setMessage("");
    setPausedFor(0);
  }

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
    console.log ("IsDebugging?: ", isDebugging);
    console.log ("Weighted score: ", weightedRate);
    calculations.forEach((calc, index) => {
      console.log(`  palletRate: ${calc.palletRate}`);
      console.log(`  elapsedTime: ${calc.elapsedTime}`);
    });
    console.log ('============================');
  }
  // END OF DEBUGGING FUNCTIONS

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

        if (rate > 0) {
          // Check if there are previous calculations for weighted rate
          if (calculations.length > 0){
            const totalWeightedRate = calculations.reduce(
              (acc, calc) => acc + calc.palletRate * calc.elapsedTime,
              0
            );
            const totalElapsedTime = calculations.reduce(
              (acc, calc) => acc + calc.elapsedTime,
              0
            );

            // Calculate the weighted rate
            const newWeightedRate =
              (totalWeightedRate + rate * currentElapsedTime) /
              (totalElapsedTime + currentElapsedTime);
            console.log(totalWeightedRate, '+', rate, '*', currentElapsedTime, '/', totalElapsedTime, '+', currentElapsedTime);
            // console.log(rate);
            // console.log(currentElapsedTime);
            // console.log(totalElapsedTime);
            // console.log(currentElapsedTime);
            setWeightedRate(newWeightedRate); // Update the weighted rate
          } else {
            setPalletRate(rate); // Update the rate of pallets per hour
          }
        }
      }, 100); // Update every 100ms
      // Cleanup interval when pausing or stopping
      return () => clearInterval(intervalId);
    }
  }, [isCounting, startTime, totalPallets, pausedFor, calculations]);

  return (
    <div className="score-counter">
      <h1 className="calc-title">{t('ScoreCounter.title')}</h1>
      
      {/* Display the current status only if counting has started*/}
      <div className="score-display">
        <hr className="ct"/>
        <div className='statistics'>
          <div className='stat-item'>
            <span>{t('ScoreCounter.palperh')}</span>
            <strong>
              <span>{palletRate.toFixed(2)} pal/h</span>
            </strong>
          </div>
          <div className='stat-item'>
            <span>{t('ScoreCounter.palam')}</span>
            <strong>
              <span>{totalPallets} pal</span>
            </strong>
          </div>
          <div className='stat-item'>
            <span>{t('ScoreCounter.eltim')} </span>
            <strong>
              <span>
                  {Math.floor(elapsedTime / 3600)}h {Math.floor((elapsedTime % 3600) / 60)}m {Math.floor(elapsedTime % 60)}s
              </span>
            </strong>
          </div>
          <div className='stat-item'>
            <span>{t('ScoreCounter.elptim')}</span>
            <strong>
              <span>{Math.floor(pausedFor)} min</span>
            </strong>
          </div>
        </div>
        <hr className='ct'/>
        <div className="statistics">
          <div className="stat-item">
            <span>Weighted score:</span>
            <strong>
              <span> {weightedRate.toFixed(2)} pal/h</span>
            </strong>
          </div>
          <div className="stat-item">
            <span>Total pallets loaded:</span>
            <strong>
              <span> (WIP) pal</span>
            </strong>
          </div>
          <div className="stat-item">
            <span>Current elapsed time:</span>
            <strong>
              <span> (WIP)</span>
            </strong>
          </div>
        </div>
        <hr className='ct'/>
        <p>- Short statistics -</p>
        <p>
          <span>[Score: {palletRate.toFixed(2)}] </span>
          <span>[Pal: {totalPallets}] </span>
          <span>
            [Time: {Math.floor(elapsedTime / 3600)}h {Math.floor((elapsedTime % 3600) / 60)}m {Math.floor(elapsedTime % 60)}s]
          </span>
        </p>
        <hr className="ct"/>
      </div>

      {/* Display the saved score after finishing calculations */}
      <div>
        <p>- Calculation Results -</p>
        <ul>
          {calculations.map((calc, index) => (
            <li key={index}>
              <strong>Calculation #{index + 1} ({calc.timestamp})</strong><br />
              Rate: {calc.palletRate} pallets/hour<br />
              Elapsed time: {formatElapsedTime(calc.elapsedTime)}<br />
              Total pallets: {calc.totalPallets}<br />
              Paused for: {calc.pausedFor} minutes
            </li>
          ))}
        </ul>
        <hr className='ct'/>
      </div>

      {/* Display the array of every truck loaded with amount of pallets and timestamp */}
      <div>
        <p>- Today's activity -</p>
        <ul>
          {activities.map((a, index) => (
            <li key={index}>
              <strong>Truck #{a.truckNumber} ({a.timestamp})</strong><br />
              Pallets loaded: {a.inputPallets}<br />
              Work efficiency: (WIP)
              Loading time: (WIP)<br />
            </li>
          ))}
        </ul>
        <hr className='ct'/>
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
          <button className="debug" onClick={toggleDebugging}>
            {isDebugging ? "Disable Debugging" : "Enable Debugging"}
          </button>
          {isDebugging && (
            <div>
              <button className="debug" onClick={startOver}>DEBUG-RESET</button>
              <button className="debug" onClick={handleDebugClick}>
                Console.log DEBUG
              </button>
              <button className="debug" onClick={clearCalculations}>Clear Calculations</button>
              <button className="debug" onClick={() => setPalletRate(0)}>Clear Rate</button>
            </div>
          )}
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
          {/* ADD PAUSE BUTTON */}
          {message ? (
            <p>{message}</p>
          ) : (
            <>
              {!isAddingPause && isCounting &&remaining > 0 && (
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
          <button onClick={saveCalculation}>Save Calculation</button>
          <button onClick={startOver}>
          {t('ScoreCounter.buttons.startovr')}
          </button>
          {/* DEBUG BUTTON */}
          <button className="debug" onClick={toggleDebugging}>
            {isDebugging ? "Disable Debugging" : "Enable Debugging"}
          </button>
          {isDebugging && (
            <div>
              <button className="debug" onClick={handleDebugClick}>
                Console.log DEBUG
              </button>
              <button className="debug" onClick={handlePauseReset}>
                Reset Pause
              </button>
              <button className="debug" onClick={clearCalculations}>Clear Calculations</button>
            </div>
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
