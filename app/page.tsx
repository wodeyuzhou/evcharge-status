"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ParkingData = {
  availableSpots: number;
  parkingTimes: string[];
};

export default function EVChargingStation() {
  const [parkingData, setParkingData] = useState<ParkingData>({
    availableSpots: 0,
    parkingTimes: ["", "", "", ""],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/update-parking-data');
        if (response.ok) {
          const data = await response.json();
          setParkingData(data);
        }
      } catch (error) {
        console.error("Failed to fetch parking data:", error);
      }
    };

    fetchData(); // 초기 데이터를 가져옴
    const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-2xl font-bold">국립한밭대 전기차 충전소 알림 시스템</h1>
        <p className="text-lg mt-2">실시간 주차 가능 대수: {parkingData.availableSpots} 대</p>
      </header>

      <main className="flex flex-col gap-8 items-center">
        <div className="grid grid-cols-4 gap-4">
          {parkingData.parkingTimes.map((time, index) => (
            <div
              key={index}
              className={`w-24 h-40 border-2 rounded flex flex-col items-center justify-center ${
                time ? "bg-gray-300 animate-fade-in" : "bg-green-300 animate-blink"
              }`}
            >
              <Image
                src="/charging-icon.svg"
                alt="Charging Icon"
                width={24}
                height={24}
                className={time ? "" : "hidden"}
              />
              <p className="mt-2">{time || "빈 자리"}</p>
            </div>
          ))}
        </div>
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