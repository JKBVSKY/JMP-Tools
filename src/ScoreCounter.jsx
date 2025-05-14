import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import ScoreHistory from "./ScoreHistory";


function ScoreCounter({ dailyCalculations, setDailyCalculations }) {
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
  const [isDebugging, setIsDebugging] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const { t } = useTranslation();
  const totalPalletsLoaded = activities.reduce((total, current) => {
    return total + Number(current.inputPallets);
  }, 0);
  const currentTime = Date.now();  // Current time in milliseconds
  const [sessions, setSessions] = useState([]); // Array to hold all sessions
  const [showAdjustTime, setShowAdjustTime] = useState(false); // Toggle input visibility

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
  const [hasSavedActivity, setHasSavedActivity] = useState(() => {
    return (localStorage.getItem("hasSavedActivity")) === "true";
  })
  const [adjustedTime, setAdjustedTime] = useState(() => {
    return Number(localStorage.getItem('adjustedTime')) || 0;
  });


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
    // setMessage("");
    setAdjustedTime(0);

    // Clear localStorage
    localStorage.removeItem('totalPallets');
    localStorage.removeItem('elapsedTime');
    // localStorage.removeItem('palletRate');
    localStorage.removeItem('weightedRate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('isCounting');
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
    if (startTime !== null) {
      localStorage.setItem("startTime", startTime);
    }
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem('calculations', JSON.stringify(calculations));
  }, [calculations]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('dailyCalculations', JSON.stringify(dailyCalculations));
  }, [dailyCalculations]);

  useEffect(() => {
    localStorage.setItem("hasSavedActivity", hasSavedActivity);
  }, [hasSavedActivity]);

  useEffect(() => {
    localStorage.setItem("adjustedTime", adjustedTime);
  }, [adjustedTime]);

  //START OF SAVE TODAY's ACTIVITY FUNCTION
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
        startTime,
        endTime: Date.now() + (adjustedTime*60000),
        elapsedTime,
        totalPallets,
        timestamp: new Date().toLocaleString(), // You can add a timestamp for reference
      };
  
      // Add the new calculation to the list (use the previous state to ensure it's updated correctly)
      setCalculations(prevCalculations => [newCalculation, ...prevCalculations]); // Add at the beginning
      setHasSavedActivity(true); // Update state when saveActivity is called
      turnOff();
    }
  };

  const saveDailyCalculation = () => {
    const isConfirmed = window.confirm("Have you finished loading for today? (adds entry to a score daily history");
    if(isConfirmed){
      const newDailyCalculation = {
        timestamp: new Date().toISOString(), // More consistent date format
        startTime, //Start time
        endTime: new Date().toLocaleTimeString(), // Readable end time
        elapsedTime, // Total time of loading
        totalPallets, // Total pallets loaded
        palletRate: palletRate.toFixed(2), // Score
      };
  
      setDailyCalculations(prev => [newDailyCalculation, ...prev]);
      startOver();
    }
  };
  //END

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

  const handleDebugClick = () => {
    console.clear();
    console.log ('============================');
    // console.log (initialPallets + ' initialPallets'); // REMOVE?
    console.log (totalPallets + ' totalPallets');
    console.log (totalPalletsLoaded + ' totalPalletsLoaded');
    console.log (elapsedTime + ' elapsedTime');
    console.log (palletRate + ' palletRate');
    console.log (isCounting + ' isCounting');
    console.log (startTime + ' startTime');
    console.log(new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' startTime converted');
    console.log (Date.now() / 1000);
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
        const rate = (totalPallets / (currentElapsedTime)) * 3600;

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
  }, [isCounting, startTime, totalPallets, calculations, adjustedTime]);

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
                {/* Display pallets loaded */}
                <div className='stat-item'>
                  <span>{t('ScoreCounter.palam')}</span>
                  <strong>
                    <span>{totalPallets} pal</span>
                  </strong>
                </div>
                {/* Display elapsed time and adjust time */}
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
                <div>
                  {showAdjustTime && (
                    <div className='stat-item'>
                      <span style={{fontSize: '1em'}}>
                        {t('ScoreCounter.adjtim')}
                      </span>
                      <span>
                        <input
                            className='custom-input'
                            type="number"
                            value={adjustedTime}
                            onChange={handleAdjustTime}
                            placeholder=''
                          />
                      </span>
                    </div>
                  )}
                </div>
                {/* Display start loading time */}
                {startTime != null && (
                  <div>
                    <div className='stat-item'>
                      <span>{t('ScoreCounter.starttime')}</span>
                      <strong>
                        <span>{new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </strong>
                    </div>
                  </div>
                )}
                <hr/>
                {/* Display 47 score at */}
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
                    const hoursToReach47 = totalPalletsLoaded / 48;
                    const additionalTimeMs = hoursToReach47 * 60 * 60 * 1000;
                    const targetTime = new Date(startTime + additionalTimeMs - totalTimeWorked - (adjustedTime * 60 * 1000));

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
                    const hoursToReach47 = totalPalletsLoaded / 47;
                    const targetTime = new Date(startTime + hoursToReach47 * 60 * 60 * 1000 - (adjustedTime * 60 * 1000));

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
                  return null;
                })()}
                {/* Display add pallet element */}
                <div className='stat-item'>
                  <span>{t('ScoreCounter.addpal')}</span>
                  <span>
                  <input
                    className="custom-input"
                    type="number"
                    value={inputPallets}
                    onChange={(e) => {
                      setInputPallets(e.target.value); // Let user type anything
                    }}
                    onBlur={() => {
                      const num = parseFloat(inputPallets);
                      const allowedDecimals = [0, 0.25, 0.5, 0.75];

                      if (!isNaN(num)) {
                        const whole = Math.floor(num);
                        const decimal = +(num - whole).toFixed(2);

                        if (allowedDecimals.includes(decimal)) {
                          setInputPallets(num.toString());
                        } else {
                          // Optionally round to nearest valid value
                          const closest = allowedDecimals.reduce((prev, curr) =>
                            Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev
                          );
                          const corrected = whole + closest;
                          setInputPallets(corrected.toString());
                        }
                      } else {
                        setInputPallets(''); // Reset if invalid
                      }
                    }}
                    placeholder={t('ScoreCounter.addpal-pholder')}
                    min="0"
                    step="0.25"
                    disabled={!isCounting}
                  />
                  </span>

                  {/* <AddIcon 
                      onClick={addPallets} 
                      color="black"
                      size="small"
                      style={{ cursor: 'pointer', fontSize: '36px' }}
                      disabled={Number(inputPallets) <= 0}
                    /> */}

                  <IconButton 
                    onClick={addPallets} 
                    color="black" 
                    size="small" 
                    style={{ cursor: 'pointer', fontSize: '36px' }}
                    className="icon-button"
                    disabled={Number(inputPallets) <= 0}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
                <hr/>
                {!isCounting ? (
                  // OPTIONS BEFORE STARTING COUNTER
                  <div className="opt-box">
                    <div className='stat-item'>
                      <span>{t('ScoreCounter.inittime')}</span>
                      <span>
                        <input
                            className="custom-input"
                            type="time"
                            value={startTimeInput}
                            onChange={(e) => setStartTimeInput(e.target.value)}
                            disabled={isCounting}
                            lang="pl-PL"
                            placeholder="HH:MM"
                        />
                      </span>
                    </div>
                    <div className="sc-button-container">
                      <button onClick={startCounting} disabled={startTimeInput === ''}>
                        {hasSavedActivity
                          ? t('ScoreCounter.buttons.continuect')
                          : t('ScoreCounter.buttons.startct')}
                      </button>
                      {hasSavedActivity && (
                        <div>
                          <button onClick={saveDailyCalculation}>
                          {t('ScoreCounter.buttons.startovr')}
                          </button>
                        </div>
                      )}
                    </div>
                      {/* <button className="debug" onClick={toggleDebugging}>
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
                    )} */}
                  </div>
                ) : (
                  // After starting, show additional options
                  <div className="opt-box">
                    <div className="sc-button-container">
                      <button onClick={saveCalculation}>{t("ScoreCounter.buttons.turnoff")}</button>
                      <button onClick={saveDailyCalculation}>
                        {t('ScoreCounter.buttons.startovr')}
                      </button>
                    </div>
                    {/* DEBUG BUTTON
                    <button className="debug" onClick={toggleDebugging}>
                      {isDebugging ? "Disable Debugging" : "Enable Debugging"}
                    </button>
                    {isDebugging && (
                      <div>
                        <button className="debug" onClick={handleDebugClick}>
                          Console.log DEBUG
                        </button>
                        <button className="debug" onClick={handleSessionCheck}>Session Check</button>
                        <button className="debug" onClick={clearCalculations}>Clear Calculations</button>
                      </div>
                    )} */}
                  </div>
                )}
              </div>
            </div>
        )}
        {activeTab === 2 && (
          <div>
            <ul className='statistics'>
              {activities.length > 0 ? (
                activities.map((a, index) => (
                  <li key={index} className='stat-item' style={{ display: 'block' }}>
                    <strong><p>{t('ScoreCounter.truck')} #{a.truckNumber} - {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></strong>
                    <p>{t('ScoreCounter.palam')} {a.inputPallets}</p>
                    <hr/>
                  </li>
                ))
              ) : (
                <h2 style={{color: 'black'}}>No records found.</h2>
              )}
            </ul>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <ul className='statistics'>
              {calculations.length > 0 ? (
                calculations.map((calc, index) => (
                  <li key={index} className='stat-item' style={{ display: 'block' }}>
                    <strong>{t('ScoreCounter.tab-3')} #{index + 1}</strong><br />
                    {t('ScoreCounter.palperh')}{calc.palletRate} pallets/hour<br />
                    Started loading at: {new Date(calc.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}<br />
                    Turned off at: {new Date(calc.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
                    {t('ScoreCounter.eltim')} {formatElapsedTime(calc.elapsedTime)}<br />
                    {t('ScoreCounter.palam')} {calc.totalPallets}<br />
                    <hr/>
                  </li>
                ))
              ) : (
                <h2 style={{color: 'black'}}>No records found.</h2>
              )}
            </ul>
          </div>
        )}
      </div>
      


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

export default ScoreCounter;
