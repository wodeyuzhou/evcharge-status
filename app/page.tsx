"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ParkingData = {
  availableSpots: number;
  parkingTimes: string[];
};

const spotImages = [
  "/001.png",
  "/002.png",
  "/003.png",
  "/004.png",
  "/005.png",
  "/006.png",
  "/007.png"
];

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
    <div className="relative min-h-screen p-8 font-[var(--font-geist-sans)]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* 상단 헤더 - 전체 폭 차지 */}
      <header className="bg-white bg-opacity-25 py-12 px-12 shadow-lg flex justify-between items-center w-full fixed top-0 left-0 right-0 z-20">
        {/* 왼쪽 로고 */}
        <div className="flex items-center pl-8">
          <Image src="/logo.jpg" alt="Logo" width={170} height={60} className="mr-4" /> {/* 로고 크기 증가 */}
        </div>
        
        {/* 가운데 텍스트 */}
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-gray-700">국립한밭대 전기차 충전소</h1>
          <h2 className="text-lg font-semibold text-gray-700">Hanbat National University EV Charging Station Notification System</h2>
        </div>

        {/* 오른쪽 정보 및 GitHub 링크 */}
        <div className="flex flex-col items-end gap-1 text-gray-700 pr-8">
          <p className="text-base">김장환, 신은호, 이유진, 진경은</p>
          <a href="https://github.com/wodeyuzhou/evcharge-status" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Image src="/github-logo.png" alt="GitHub" width={24} height={24} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </header>

      {/* 주차 관련 콘텐츠 - 헤더 아래 배치 */}
      <div className="flex justify-center gap-4 mt-48 pt-12">
        {parkingData.parkingTimes.map((time, index) => (
          <div
            key={index}
            className={`relative w-[300px] h-[500px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden ${
              time ? "bg-gray-200" : "animate-blink-white"
            }`}
          >
            {/* 주차 시간 표시 - 상단에 위치 */}
            {time && (
              <div className="absolute top-0 w-full bg-red-500 bg-opacity-50 text-white text-center py-2 text-lg animate-blink-red">
                {time}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 푸터 - 현재 시간과 주차 가능 대수 */}
      <footer className="bg-white bg-opacity-75 p-10 shadow-lg rounded-t-lg flex justify-center items-center w-full fixed bottom-0 left-0 right-0 z-20">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">현재 시간: {currentTime}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">실시간 주차 가능 대수: {parkingData.availableSpots} 대</p>
        </div>
      </footer>

      <style jsx>{`
        .animate-blink-white {
          animation: blinkWhite 1s infinite;
        }
        .animate-blink-red {
          animation: blinkRed 1s infinite;
        }
        @keyframes blinkWhite {
          0%, 100% { background-color: #ffffff; }
          50% { background-color: #d3d3d3; }
        }
        @keyframes blinkRed {
          0%, 100% { background-color: rgba(255, 0, 0, 0.5); }
          50% { background-color: rgba(139, 0, 0, 0.7); }
        }
      `}</style>
    </div>

  );
}
