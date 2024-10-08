// components/Countdown.tsx
import { useEffect, useState } from "react";

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop countdown when time reaches zero

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="text-base font-custom font-medium text-font-black">
      {formatTime(timeLeft)}
    </div>
  );
};

export default Countdown;
