import { useState, useRef, useEffect } from "react";
import Button from "./Button";

import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const timerControl = useRef<number | null>(null);
  const newStartTime = useRef<HTMLInputElement | null>(null);

  const handleOnStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLeft(Number(e.target.value));
  };

  const handleOnReset = () => {
    setIsActive(false);
    const reftoNum = Number(newStartTime.current?.value);
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
    <div className="countdown-timer-wrapper">
      <h1>The Final Countdown (timer)</h1>
      <section>
        <h2>{timeLeft != 0 ? `${timeLeft} seconds left` : "Time's up!"} </h2>
        <div>
          <Button
            action={handleOnStart}
            disabled={isActive ? true : false}
            label="Start"
          />
          <Button
            action={handleOnStop}
            disabled={!isActive ? true : false}
            label="Pause"
          />

          <Button
            action={handleOnReset}
            disabled={isActive || timeLeft === 60 ? true : false}
            label="Reset"
          />
        </div>
        <input
          disabled={isActive ? true : false}
          ref={newStartTime}
          type="number"
          placeholder="Set start time"
          onChange={handleOnStartTime}
        />
      </section>
    </div>
  );
};

export default CountdownTimer;
