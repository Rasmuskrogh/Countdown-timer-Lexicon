import { useState, useRef, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(6);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const timerControl = useRef<number | null>(null);
  const newStartTime = useRef<HTMLInputElement | null>(null);

  const handleOnStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLeft(Number(e.target.value));
  };

  const handleOnReset = () => {
    setIsActive(false);
    console.log(typeof newStartTime.current?.value);
    const reftoNum = Number(newStartTime.current?.value);
    console.log(typeof reftoNum, reftoNum);
    if (reftoNum) {
      setTimeLeft(reftoNum);
    } else {
      setTimeLeft(60);
    }
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
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            setIsActive(false);
            return 0;
          } else {
            return prevTimeLeft - 1;
          }
        });
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
      <h2>{timeLeft != 0 ? `${timeLeft} seconds left` : "Time's up!"} </h2>
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
      <input
        disabled={isActive ? true : false}
        ref={newStartTime}
        type="number"
        placeholder="Set start time"
        onChange={handleOnStartTime}
      />
    </>
  );
};

export default CountdownTimer;
