import { useState, useEffect } from "react";
const Timer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <h2 className="text-xl md:text-2xl">{time}</h2>;
};

export default Timer;
