import React, { useState, useEffect } from "react";

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  // Format as HH:MM:SS
  const pad = (n) => n.toString().padStart(2, "0");
  const timeString = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return <div className="clock">{timeString}</div>;
}

export default Clock;