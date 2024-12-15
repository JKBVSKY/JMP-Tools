import React, { useState, useEffect } from 'react';


function App() {
  const [initialPallets, setInitialPallets] = useState(0); // Initial pallets loaded at the start
  const [totalPallets, setTotalPallets] = useState(0); // Total pallets loaded (initial + added)
  const [startTime, setStartTime] = useState(null); // Start time of the truck loader's work (from user input)
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time since start (in seconds)
  const [palletRate, setPalletRate] = useState(0); // Pallets loaded per hour (calculated)
  const [inputPallets, setInputPallets] = useState(''); // Input value for new pallets to add
  const [isCounting, setIsCounting] = useState(false); // Whether the truck loader has started working
  const [startTimeInput, setStartTimeInput] = useState(''); // User input for start time (HH:MM format)
  const [paused, setPaused] = useState(false); // New state for pausing/resuming
  const [elapsedTimeWhenPaused, setElapsedTimeWhenPaused] = useState(0); // Time recorded at pause


  const startOver = () => {
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
  };

  // Start counting function (sets the start time and initializes the pallets)
  const startCounting = () => {
    // Parse the input start time (HH:MM format)
    const [hours, minutes] = startTimeInput.split(':').map(num => parseInt(num, 10));
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0); // Set the time to the specified start time (e.g., 01:00)
    
    setStartTime(startDate); // Set the start time
    setTotalPallets(Number(inputPallets)); // Set the initial number of pallets loaded
    setInitialPallets(Number(inputPallets)); // Set the initial pallets in state
    setIsCounting(true); // Start counting
  };

  // Function to add additional pallets
  const addPallets = () => {
    const newPallets = Number(inputPallets);
    if (newPallets > 0) {
      setTotalPallets((prevTotal) => prevTotal + newPallets); // Use functional update to ensure latest state
      setInputPallets(''); // Clear the input field after submitting
    }
  };

  // Function to pause and resume the calculations
  const togglePauseResume = () => {
    setPaused(prevPaused => !prevPaused);
    if (paused) {
      // Resume counting (start interval again)
      setIsCounting(true);
    } else {
      // Pause counting (clear interval)
      setIsCounting(false);
    }
  };

  const pauseCounting = () => {
    setPaused(true); // Pause calculations
    setElapsedTimeWhenPaused(elapsedTime); // Save elapsed time at the pause moment
  };
  
  const resumeCounting = () => {
    setPaused(false); // Resume calculations
    const adjustedStartTime = new Date(Date.now() - elapsedTimeWhenPaused * 1000); // Adjust for paused duration
    setStartTime(Date.now()); // Reset start time to now for resuming
  };

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
  
      console.log("Total Pallets:", totalPallets);
      // Cleanup interval when pausing or stopping
      return () => clearInterval(intervalId);
    }
  }, [isCounting, paused, startTime, elapsedTimeWhenPaused, totalPallets]);

  return (
    <div className="score-counter">
      <h1>Truck Loader Pallet Counter (WIP)</h1>

      {!isCounting && !paused? (
        // Input for the initial number of pallets and start time
        <div>
          <label className="input-desc">
            Init-Pal&nbsp;
            <input
              type="number"
              value={inputPallets}
              onChange={(e) => setInputPallets(e.target.value)}
              disabled={isCounting}
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
            />
          </label>
          <br/>
          <button onClick={startCounting} disabled={inputPallets === '' || startTimeInput === ''}>
            Start Counting
          </button>
        </div>
      ) : (
        // After starting, show the option to add additional pallets
        <div>
          <label className='input-desc'>
            Add-Pallets&nbsp;
            <input
              type="number"
              value={inputPallets}
              onChange={(e) => setInputPallets(e.target.value)}
            />
          </label>
          <br/>
          <button onClick={addPallets}>
            Add Pallets
          </button>
          <button onClick={startOver}>
            Start Over
          </button>
        </div>
      )}

      {/* Show the Pause/Resume button only if counting has started */}
        {isCounting && (
          <button onClick={paused ? resumeCounting : pauseCounting}>
            {paused ? "Resume" : "Pause"}
          </button>
      )}
      
      {/* Display the current status */}
      <div>
        <h2>Current Pallets Loaded: {totalPallets}</h2>
        <h3>Pallets per Hour: {palletRate.toFixed(2)}</h3>
      </div>

      {/* Display the elapsed time since the start */}
      {
        <div>
          <p>Elapsed Time: {Math.floor(elapsedTime)} seconds</p>
        </div>
      }
    </div>
  );
}

export default App;
