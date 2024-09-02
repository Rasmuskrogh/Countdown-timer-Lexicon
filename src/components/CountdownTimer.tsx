import { useState, useRef, useEffect } from "react";
import Button from "./Button";

import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<Boolean>(false);
  const [startTime, setStartTime] = useState<number>(60);

  const timerControl = useRef<number | null>(null);

  const handleOnStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = Number(e.target.value);
    setStartTime(newStartTime);
    setTimeLeft(newStartTime);
  };

  const handleOnReset = () => {
    setIsActive(false);
    setTimeLeft(startTime);
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
    <div className="countdown-timer-wrapper">
      <h1>The Final Countdown (timer)</h1>
      <section>
        {timeLeft != 0 ? <h2>{timeLeft} seconds left</h2> : <h2>Time's up!</h2>}
        <div>
          <Button
            action={handleOnStart}
            disabled={isActive || timeLeft === 0 ? true : false}
            label="Start"
          />
          <Button
            action={handleOnStop}
            disabled={!isActive ? true : false}
            label="Pause"
          />

          <Button
            action={handleOnReset}
            disabled={timeLeft === startTime ? true : false}
            label="Reset"
          />
        </div>
        <input
          disabled={isActive ? true : false}
          type="number"
          placeholder="Set start time"
          onChange={handleOnStartTime}
        />
      </section>
    </div>
  );
};

export default CountdownTimer;
