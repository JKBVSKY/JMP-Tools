import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';


function App() {
  // const [initialPallets, setInitialPallets] = useState(0); // REMOVE?
  const [inputPallets, setInputPallets] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState(1); // Tracks the active tab (1 = Main Calculations, 2 = Trucks Loaded, 3 = Summary)
  const [calculations, setCalculations] = useState(() => {
    const savedCalculations = localStorage.getItem('calculations');
    return savedCalculations ? JSON.parse(savedCalculations) : [];
  })  // State to store the list of saved calculations
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  })  // State to store the list of saved activities
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
  const [hasSavedActivity, setHasSavedActivity] = useState(() => {
    return (localStorage.getItem("hasSavedActivity")) === "true";
  })
  const [adjustedTime, setAdjustedTime] = useState(() => {
    return Number(localStorage.getItem('adjustedTime')) || 0;
  });

  //Vars below doesn't need to be persisted
  const [isDebugging, setIsDebugging] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const { t } = useTranslation();
  const totalPalletsLoaded = activities.reduce((total, current) => {
    return total + Number(current.inputPallets);
  }, 0);
  const currentTime = Date.now();  // Current time in milliseconds
  const [sessions, setSessions] = useState([]); // Array to hold all sessions
  const [showAdjustTime, setShowAdjustTime] = useState(false); // Toggle input visibility



  const startOver = () => {
    const isConfirmed = window.confirm("Are You sure You want to finish Your job and clear the calculations?");
    if(isConfirmed){
      setCalculations([]);
      setActivities([]);
      // setInitialPallets(0); // REMOVE?
      setTotalPallets(0);
      setStartTime(null);
      setElapsedTime(0);
      setPalletRate(0);
      setWeightedRate(0);
      setInputPallets('');
      setIsCounting(false);
      setStartTimeInput('');
      setIsAddingPause(false);
      setPausedFor(0);
      setRemaining(15);
      setMessage("");
      setHasSavedActivity(false);
      setAdjustedTime(0);
  
      // Clear localStorage
      localStorage.removeItem('calculations');
      localStorage.removeItem('activities');
      localStorage.removeItem('totalPallets');
      localStorage.removeItem('elapsedTime');
      localStorage.removeItem('palletRate');
      localStorage.removeItem('weightedRate');
      localStorage.removeItem('startTime');
      localStorage.removeItem('isCounting');
      localStorage.removeItem('isAddingPause');
      localStorage.removeItem('remaining');
      localStorage.removeItem('pausedFor');
      localStorage.removeItem('setMessage');
      localStorage.removeItem('hasSavedActivity');
      localStorage.removeItem('adjustedTime');
    };
  };

  const turnOff = () => {
    // Make function to remember previous total pallets and sum with new amount?
    setTotalPallets(0);
    setStartTime(null);
    // Make function to remember previous elapsed time and sum with new amount?
    setElapsedTime(0);
    // setPalletRate(0); I think we shouldn't change palletRate to 0
    setWeightedRate(0);
    setInputPallets('');
    setIsCounting(false);
    setStartTimeInput('');
    setIsAddingPause(false);
    // setPausedFor(0); Pausing is untouched since it's not end of the shift
    // setRemaining(15);
    // setMessage("");
    setAdjustedTime(0);

    // Clear localStorage
    localStorage.removeItem('totalPallets');
    localStorage.removeItem('elapsedTime');
    // localStorage.removeItem('palletRate');
    localStorage.removeItem('weightedRate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('isCounting');
    localStorage.removeItem('isAddingPause');
    localStorage.removeItem('adjustedTime');
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

  useEffect(() => {
    // Save calculations to localStorage whenever they change
    localStorage.setItem('calculations', JSON.stringify(calculations));
  }, [calculations]);

  useEffect(() => {
    // Save calculations to localStorage whenever they change
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("hasSavedActivity", hasSavedActivity);
  }, [hasSavedActivity]);

  useEffect(() => {
    localStorage.setItem("adjustedTime", adjustedTime);
  }, [adjustedTime]);

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
    const isConfirmed = window.confirm("Have you stopped loading trailers and your score counting stopped?");
    if(isConfirmed){
      // Save the current calculation as an object
      const newCalculation = {
        palletRate: palletRate.toFixed(2),
        elapsedTime,
        startTime,
        endTime: Date.now(),
        totalPallets,
        pausedFor,
        timestamp: new Date().toLocaleString(), // You can add a timestamp for reference
      };
  
      // Add the new calculation to the list (use the previous state to ensure it's updated correctly)
      setCalculations(prevCalculations => [newCalculation, ...prevCalculations]); // Add at the beginning
      setHasSavedActivity(true); // Update state when saveActivity is called
      turnOff();
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

      // Check if the chosen time is in the future (relative to now)
      if (startDate.getTime() > currentTime) {
        // Subtract 24 hours to handle crossing over into the previous day
        startDate.setDate(startDate.getDate() - 1);
      }

      // Get the timestamp and set the state
      const timestamp = startDate.getTime();
      setStartTime(timestamp); // Save the timestamp
      setTotalPallets(Number(inputPallets)); // Set the initial number of pallets loaded
      // setInitialPallets(Number(inputPallets)); // Set the initial pallets in state
      setIsCounting(true); // Start counting
      setInputPallets(""); // Clear the input field after submitting
    } else {
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
    console.log (totalPalletsLoaded + ' totalPalletsLoaded');
    console.log (elapsedTime + ' elapsedTime');
    console.log (palletRate + ' palletRate');
    console.log (isCounting + ' isCounting');
    console.log (isAddingPause + ' isAddingPause');
    console.log (startTime + ' startTime');
    console.log(new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' startTime converted');
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

  const handleSessionCheck = () => {
    console.clear();
    if (calculations.length === 0) {
      console.log('No calculations available.');
      return;
    }
    
    console.log('[0] Start time: ', calculations[0].startTime);
    console.log('[0] End time: ', calculations[0].endTime);
    console.log('Total pallets loaded: ', totalPalletsLoaded);
    console.log('Total pallets: ', totalPallets);
  };


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
  
  //START OF ADJUSTING TIME FUNCTIONS
  // Function to toggle the input field visibility
  const toggleAdjustTime = () => {
    setShowAdjustTime(prev => !prev);
  };

  const handleAdjustTime = (event) => {
    setAdjustedTime(Number(event.target.value)); // Convert input to a number
  };
  //END OF..

  // Update elapsed time and pallet rate every second
  useEffect(() => {
    if (isCounting && startTime !== null) {
      const intervalId = setInterval(() => {
        const currentElapsedTime = (Date.now() - startTime + adjustedTime * 60 * 1000) / 1000; // Total time since start
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
              // console.log('rate: ', rate);
            // Calculate the weighted rate
            const newWeightedRate =
              (totalWeightedRate + rate * currentElapsedTime) /
              (totalElapsedTime + currentElapsedTime);
            // console.log(totalWeightedRate, '+', rate, '*', currentElapsedTime, '/', totalElapsedTime, '+', currentElapsedTime);
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
  }, [isCounting, startTime, totalPallets, pausedFor, calculations, adjustedTime]);

  return (
    <div className="score-counter">
      <h1 className="calc-title">{t('ScoreCounter.title')}</h1>
      {/* Tab Buttons */}
      <div className="tabs">
        <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? "active" : ""}>{t("ScoreCounter.tab-1")}</button>
        <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? "active" : ""}>{t("ScoreCounter.tab-2")}</button>
        <button onClick={() => setActiveTab(3)} className={activeTab === 3 ? "active" : ""}>{t("ScoreCounter.tab-3")}</button>
      </div>
      {/* Tab Content */}
      <div className='tab-content'>
        {activeTab === 1 && (
            <div>
              <div className='statistics'>
                {weightedRate <= 0 && (
                  <div className='stat-item'>
                    <span>{t('ScoreCounter.palperh')}</span>
                    <strong>
                      <span>{palletRate.toFixed(2)} pal/h</span>
                    </strong>
                  </div>
                )}
                {weightedRate > 0 && (
                  <div className="stat-item">
                  <span>{t('ScoreCounter.apalperh')}</span>
                  <strong>
                    <span> {weightedRate.toFixed(2)} pal/h</span>
                  </strong>
                </div>
                )}
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
                    <EditIcon 
                      onClick={toggleAdjustTime} 
                      style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '16px' }} 
                    />
                  </strong>
                </div>
                <div className='stat-item'>
                  {showAdjustTime && (
                    <label>
                      {t('ScoreCounter.adjtim')}
                      <input
                        type="number"
                        value={adjustedTime}
                        onChange={handleAdjustTime}
                      />
                    </label>
                  )}
                </div>
                {pausedFor > 0 && (
                  <div className='stat-item'>
                  <span>{t('ScoreCounter.elptim')}</span>
                  <strong>
                    <span>{Math.floor(pausedFor)} min</span>
                  </strong>
                </div>
                )}
                {startTime != null && (
                  <div><hr />
                    <div className='stat-item'>
                      <span>{t('ScoreCounter.starttime')}</span>
                      <strong>
                        <span>{new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </strong>
                    </div>
                  </div>
                )}
                {(palletRate > 47 || weightedRate > 47) && (() => {
                  if (calculations.length > 0) {
                    // Calculate total pallets loaded
                    const totalPalletsLoaded = activities.reduce((total, current) => {
                      return total + Number(current.inputPallets);
                    }, 0);

                    // Calculate total time worked (in hours)
                    const totalTimeWorked = calculations.reduce((sum, session) => {
                      const sessionDuration = session.endTime - session.startTime;
                      return sum + sessionDuration;
                    }, 0);

                    // Calculate projected time to reach 47 pallets/hour
                    const hoursToReach47 = totalPalletsLoaded / 47; // Hours to achieve 47 pallets/hour
                    const additionalTimeMs = hoursToReach47 * 60 * 60 * 1000; // Convert to milliseconds
                    const targetTime = new Date(startTime + additionalTimeMs - totalTimeWorked - (adjustedTime * 60 * 1000)); // Adjusted target time

                    // ✅ Check if targetTime is still in the future
                    if (targetTime > Date.now()) {
                      return (
                        <div className='stat-item'>
                          <span>{t('ScoreCounter.47at')}</span>
                          <strong>
                            <span>
                              {targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </strong>
                        </div>
                      );
                    }
                  } else if (startTime && totalPalletsLoaded > 0) {
                    const hoursToReach47 = totalPalletsLoaded / 47; // Calculate hours needed
                    const targetTime = new Date(startTime + hoursToReach47 * 60 * 60 * 1000 - (adjustedTime * 60 * 1000)); // Add hours in milliseconds

                    // ✅ Check if targetTime is still in the future
                    if (targetTime > Date.now()) {
                      return (
                        <div className='stat-item'>
                          <span>{t('ScoreCounter.47at')}</span>
                          <strong>
                            <span>
                              {targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </strong>
                        </div>
                      );
                    }
                  }
                  return null; // Return nothing if conditions are not met
                })()}
              </div>
            </div>
        )}
        {activeTab === 2 && (
          <div>
            {/* Display the array of every truck loaded with amount of pallets and timestamp */}
              <ul className='statistics'>
                {activities.map((a, index) => (
                  <li key={index} className='stat-item' style={{ display: 'block' }}>
                    <strong><p>{t('ScoreCounter.truck')} #{a.truckNumber} - {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></strong>
                    <p>{t('ScoreCounter.palam')} {a.inputPallets}</p>
                    <hr/>
                  </li>
                ))}
              </ul>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            {/* Display the saved score after finishing calculations */}
              <ul className='statistics'>
                {calculations.map((calc, index) => (
                  <li key={index} className='stat-item' style={{ display: 'block' }}>
                    <strong>{t('ScoreCounter.tab-3')} #{index + 1}</strong><br />
                    {t('ScoreCounter.palperh')}{calc.palletRate} pallets/hour<br />
                    Started loading at: {new Date(calc.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}<br />
                    Turned off at: {new Date(calc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
                    {t('ScoreCounter.eltim')} {formatElapsedTime(calc.elapsedTime)}<br />
                    {t('ScoreCounter.palam')} {calc.totalPallets}<br />
                    {t('ScoreCounter.elptim')} {calc.pausedFor} minutes
                    <hr/>
                  </li>
                ))}
              </ul>
          </div>
        )}
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
            {hasSavedActivity
              ? t('ScoreCounter.buttons.continuect')
              : t('ScoreCounter.buttons.startct')}
          </button>
          {hasSavedActivity && (
            <div>
              <button onClick={startOver}>
              {t('ScoreCounter.buttons.startovr')}
              </button>
            </div>
          )}
          <button className="debug" onClick={toggleDebugging}>
            {isDebugging ? "Disable Debugging" : "Enable Debugging"}
          </button>
          {isDebugging && (
            <div>
              <button className="debug" onClick={startOver}>DEBUG-RESET</button>
              <button className="debug" onClick={handleDebugClick}>
                Console.log DEBUG
              </button>
              <button className="debug" onClick={handleSessionCheck}>Session Check</button>
              <button className="debug" onClick={clearCalculations}>Clear Calculations</button>
              <button className="debug" onClick={() => setPalletRate(0)}>Clear Rate</button>
            </div>
          )}
        </div>
      ) : (
        // After starting, show additional options
        <div className="opt-box">
          {/* <TextField
            label="Enter value"
            variant="filled"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: '20px' }} // Inline styles
            InputProps={{
              style: { color: 'black', backgroundColor: 'white' }, // Customize the input text
            }}
            InputLabelProps={{
              style: { color: 'gray' }, // Customize the label text
            }}
            fullWidth
          /> */}
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
              {!isAddingPause && isCounting && remaining > 0 && (
                <button 
                  onClick={handlePauseClick} 
                  disabled={elapsedTime < 15 * 60} // Disable if elapsed time is less than 15 minutes
                >
                  {t("ScoreCounter.buttons.addpause")}
                </button>                  
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
          <button onClick={saveCalculation}>{t("ScoreCounter.buttons.turnoff")}</button>
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
              <button className="debug" onClick={handleSessionCheck}>Session Check</button>
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
            <hr className='red'/><br/>
            <h2>{t('ScoreCounter.howto')}</h2>
            <p>
              <br/><br/>
              <span className="highlight">{t('ScoreCounter.startat-label')} </span>{t('ScoreCounter.startat-dsc')}
              <br/><br/>
            </p>
            <br/><hr className='red'/>
          </div>
        ) : (
          // SHOW THESE OPTIONS AFTER COUNTER STARTED WORKING
          <div>
            <hr className='red'/><br/>
            <h2>{t('ScoreCounter.howto')}</h2>
            <br/>
            <p>
                <span className="highlight">{t('ScoreCounter.addpall-label')}</span>{t('ScoreCounter.addpall-dsc')}
                <br/><br/>
                <span className="highlight">{t('ScoreCounter.pause-label')}</span>{t('ScoreCounter.pause-dsc')}
                <br/><br/>
                <span className="highlight">{t('ScoreCounter.turnoff-label')}</span>{t('ScoreCounter.turnoff-dsc')}
                <br/><br/>
                <span className="highlight">{t('ScoreCounter.finishcalc-label')}</span>{t('ScoreCounter.finishcalc-dsc')}
                <br/><br/>
            </p>
            <br/><hr className='red'/>
          </div>
        )}
    </div>
  );
}

export default App;
