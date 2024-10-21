import { useState, useEffect } from 'react';

export const useOtpCountdown = (initialCountdown: number = 60) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const storedCountdown = localStorage.getItem('otpCountdown');
    if (storedCountdown) {
      const endTime = parseInt(storedCountdown, 10);
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );
      if (remainingTime > 0) {
        setCountdown(remainingTime); // Set remaining time if countdown is still valid
      }
    }
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      localStorage.removeItem('otpCountdown'); // Remove countdown from localStorage when finished
      return;
    }
    if (countdown === null) return;

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown && prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer);
          localStorage.removeItem('otpCountdown'); // Clear localStorage when countdown finishes
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const startCountdown = () => {
    const endTime = Date.now() + initialCountdown * 1000; // Calculate countdown end time
    localStorage.setItem('otpCountdown', endTime.toString()); // Save end time in localStorage
    setCountdown(initialCountdown); // Start countdown
  };

  return { countdown, startCountdown };
};
