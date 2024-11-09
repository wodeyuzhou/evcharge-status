"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function EVChargingStation() {
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, occupied: true, time: "00:30 경과" },
    { id: 2, occupied: true, time: "01:08 경과" },
    { id: 3, occupied: false, time: "" },
    { id: 4, occupied: true, time: "00:08 경과" },
  ]);
  const [availableCount, setAvailableCount] = useState(2);
  const [currentTime, setCurrentTime] = useState("");

  // 실시간 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-2xl font-bold">국립한밭대 전기차 충전소 알림 시스템</h1>
        <p className="text-lg mt-2">현재 시간: {currentTime}</p>
      </header>

      <main className="flex flex-col gap-8 items-center">
        <div className="grid grid-cols-4 gap-4">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`w-24 h-40 border-2 rounded flex flex-col items-center justify-center ${
                spot.occupied ? "bg-gray-300 animate-fade-in" : "bg-green-300 animate-blink"
              }`}
            >
              <Image
                src="/charging-icon.svg"
                alt="Charging Icon"
                width={24}
                height={24}
                className={spot.occupied ? "" : "hidden"}
              />
              <p className="mt-2">{spot.occupied ? spot.time : "빈 자리"}</p>
            </div>
          ))}
        </div>
        <p className="text-xl font-semibold">
          실시간 주차 가능 대수: {availableCount} 대
        </p>
      </main>

      <footer className="flex gap-6 items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden="true"
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>

      <style jsx>{`
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s;
        }
        @keyframes blink {
          0%, 100% { background-color: #a0ffa0; }
          50% { background-color: #d3d3d3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}