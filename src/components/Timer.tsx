import { useState, useEffect } from "react";
const Timer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <h2 className="text-2xl text-white md:text-3xl">{time}</h2>;
};

export default Timer;
