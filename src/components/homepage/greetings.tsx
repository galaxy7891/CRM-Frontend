"use client";

import { FC, useEffect, useState } from 'react';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Selamat Pagi';
  } else if (hour >= 12 && hour < 15) {
    return 'Selamat Siang';
  } else if (hour >= 15 && hour < 18) {
    return 'Selamat Sore';
  } else {
    return 'Selamat Malam';
  }
};

const Greeting: FC<{ username: string }> = ({ username }) => {
  const [greetingMessage, setGreetingMessage] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingMessage(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-custom font-bold lg:text-2xl text-base text-font-black dark:text-font-white">
      {greetingMessage}, <span className="text-light-gold text-base font-bold font-custom">{username}</span>
    </h1>
  );
};

export default Greeting;
