import { useState, useRef, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(6);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const timerControl = useRef<number | null>(null);

  const handleOnReset = () => {
    setIsActive(false);
    setTimeLeft(60);
  };

  const handleOnStart = () => {
    setIsActive(true);
  };

  const handleOnStop = () => {
    setIsActive(false);
    if (timerControl.current) {
      clearInterval(timerControl.current);
      timerControl.current = null;
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerControl.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => {
      if (timerControl.current) {
        clearInterval(timerControl.current);
        timerControl.current = null;
      }
    };
  }, [isActive]);

  return (
    <>
      <h1>CountdownTimer</h1>
      <h2>{timeLeft} seconds left</h2>
      <button onClick={handleOnStart} disabled={isActive ? true : false}>
        Start
      </button>
      <button onClick={handleOnStop} disabled={!isActive ? true : false}>
        Pause
      </button>
      <button
        onClick={handleOnReset}
        disabled={isActive || timeLeft === 60 ? true : false}
      >
        Reset
      </button>
    </>
  );
};

export default CountdownTimer;
