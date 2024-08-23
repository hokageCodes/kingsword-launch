// CountdownTimer.tsx
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2024-09-06T00:00:00').getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-6">
        Event Will Start In
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-12 rounded-lg shadow-lg flex flex-col items-center"
          >
            <span className="text-5xl font-extrabold text-blac">{String(value).padStart(2, '0')}</span>
            <span className="mt-2 text-xl font-semibold text-black">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
