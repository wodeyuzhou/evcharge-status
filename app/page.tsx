"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ParkingData = {
  availableSpots: number;
  parkingTimes: string[];
};

const spotImages = [
  "/blue.png",
  "/darkblue.png",
  "/gray.png",
  "/green.png",
  "/lightblue.png",
  "/blue1.png",
  "/gray1.png"
];

const emptySpotImage = "/basic.png";

export default function EVChargingStation() {
  const [parkingData, setParkingData] = useState<ParkingData>({
    availableSpots: 7,
    parkingTimes: Array(7).fill(""), // 주차 가능 자리 7개
  });
  const [currentTime, setCurrentTime] = useState("");

  // 주차 데이터 업데이트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/update-parking-data');
        if (response.ok) {
          const data = await response.json();
          setParkingData(data);

          // 빈 자리 개수를 계산하여 availableSpots 업데이트
          const emptySpots = data.parkingTimes.filter((time: string) => time === "").length;
          setParkingData((prevData) => ({ ...prevData, availableSpots: emptySpots }));
        }
      } catch (error) {
        console.error("Failed to fetch parking data:", error);
      }
    };

    fetchData(); // 초기 데이터를 가져옴
    const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

  // 실시간 시간 업데이트
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <header className="text-center z-10">
        <h1 className="text-2xl font-bold text-black">국립한밭대 전기차 충전소 알림 시스템</h1>
        <h2 className="text-xl font-semibold mt-1 text-black">Hanbat National University EV Charging Station Notification System</h2>
        <p className="text-lg mt-2 text-black">현재 시간: {currentTime}</p>
        <p className="text-lg mt-2 text-black">실시간 주차 가능 대수: {parkingData.availableSpots} 대</p>
      </header>

      <main className="flex justify-center gap-8 z-10">
        {parkingData.parkingTimes.map((time, index) => (
          <div
            key={index}
            className="relative w-[230px] h-[400px] flex items-center justify-center bg-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={time ? spotImages[index] : emptySpotImage} // 주차 여부에 따른 이미지 표시
              alt={`Parking Spot ${index + 1}`}
              className="w-full h-full object-cover" // 이미지가 틀을 꽉 채우도록 설정
            />
            {/* 주차 시간 표시 */}
            {time && (
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                {time}
              </div>
            )}
          </div>
        ))}
      </main>

      <footer className="flex gap-6 items-center justify-center z-10">
        <a className="text-black">김장환, 신은호, 이유진, 진경은</a>
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
          to { opacity: 1;
        }
      `}</style>
    </div>
  );
}
