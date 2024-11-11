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
    <div className="relative min-h-screen p-4 sm:p-8 font-[var(--font-geist-sans)]">
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
      <header className="bg-white bg-opacity-25 py-8 sm:py-32 px-4 sm:px-12 shadow-lg flex justify-between items-center w-full relative z-20">
        {/* 왼쪽 로고 */}
        <div className="flex items-center mb-4 sm:mb-0 pl-4 sm:pl-8">
          <Image src="/logo.jpg" alt="Logo" width={200} height={40} className="mr-4 sm:mr-8" />
        </div>

        {/* 가운데 텍스트 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-black">국립한밭대학교 실시간 전기차 충전소 자리 인식 시스템</h1>
          <h2 className="text-md sm:text-xl font-semibold text-black mt-2">Hanbat National University EV Charging Station Notification System</h2>
          <p className="text-lg sm:text-2xl mt-8 text-black">{currentTime}</p>
          <div className="flex items-center justify-center gap-1 mt-6">
            <Image src="/local.png" alt="Location" width={70} height={20} />
            <p className="text-lg sm:text-2xl text-black">국제교류관(S0) 주차장</p>
          </div>
        </div>

        {/* 오른쪽 정보 및 GitHub 링크 */}
        <div className="flex flex-col items-center sm:items-end gap-1 text-gray-700 pr-4 sm:pr-8 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 bg-gray-400 p-2 rounded-lg shadow-sm">
            <a href="https://github.com/wodeyuzhou/evcharge-status" target="_blank" rel="noopener noreferrer" className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Image src="/github-logo.png" alt="GitHub" width={70} height={20} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </header>

      {/* 주차 관련 콘텐츠 - 헤더 아래 배치 */}
      <div className="flex flex-wrap justify-center gap-4 mt-12 sm:mt-20 pt-10 sm:pt-16">
        {parkingData.parkingTimes.map((time, index) => (
          <div
            key={index}
            className={`relative w-[160px] h-[200px] sm:w-[250px] sm:h-[400px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden ${
              time ? "bg-gray-200" : "animate-blink-white"
            }`}
          >
            {/* 주차된 자리 이미지 표시 - 주차 시간이 있는 경우 */}
            {time ? (
              <>
                <Image
                  src={spotImages[index]} // 해당 자리의 차 이미지 표시
                  alt={`Parking Spot ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
                {/* 주차 시간 표시 - 깜빡임 애니메이션 추가 */}
                <div className="absolute top-0 w-full bg-red-500 bg-opacity-50 text-white text-center py-2 text-sm sm:text-lg">
                  <span className="animate-blink-red">{time}</span>
                </div>
              </>
            ) : (
              // 빈 자리는 흰색 깜빡임 애니메이션 유지 및 "주차 가능" 표시
              <div className="w-full h-full flex items-center justify-center text-sm sm:text-2xl font-bold text-gray-700">
                주차 가능
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 푸터 - 현재 시간과 주차 가능 대수 */}
      <footer className="bg-white bg-opacity-50 p-6 sm:p-14 shadow-lg rounded-t-lg flex justify-center items-center w-full relative mt-32">
        <div className="text-center">
          <p className="text-lg sm:text-3xl font-semibold text-gray-700 mt-6">소중한 오픈소스 활용 SW경진대회</p>
          <p className="text-lg sm:text-2xl font-semibold text-gray-700 mt-6">김장환, 신은호, 이유진, 진경은</p>
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
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
