import React from "react";

function Debug({
  calculations,
  setCalculations,
  activities,
  setActivities,
  isDebugging,
  setIsDebugging,
  totalPallets,
  totalPalletsLoaded,
  elapsedTime,
  palletRate,
  isCounting,
  startTime,
  weightedRate,
}) {
  // Function to clear all calculations and activities
  const clearCalculations = () => {
    const isConfirmed = window.confirm("Are you sure you want to clear all calculations?");
    if (isConfirmed) {
      setCalculations([]);
      setActivities([]);
    }
  };

  // Function to toggle debugging state
  const toggleDebugging = () => {
    setIsDebugging(prevState => !prevState);
  };

  // Function to handle debugging click
  const handleDebugClick = () => {
    console.clear();
    console.log ('============================');
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
  };

  // Function to check the current session and display relevant information
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

  return (
    <div>
      <button className="debug" onClick={toggleDebugging}>Toggle Debugging</button>
      <button className="debug" onClick={handleDebugClick}>Console.log DEBUG</button>
      <button className="debug" onClick={handleSessionCheck}>Session Check</button>
      <button className="debug" onClick={clearCalculations}>Clear Calculations</button>
    </div>
    );
}

export default Debug;