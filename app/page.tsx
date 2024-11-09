"use client";

import { useEffect, useState } from "react";

export default function EVChargingStation() {
  const [parkingData, setParkingData] = useState({ availableSpots: 0, parkingTimes: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/update-parking-data');
      const data = await response.json();
      setParkingData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>실시간 주차 가능 대수: {parkingData.availableSpots}</h1>
      <div>
        {parkingData.parkingTimes.map((time, index) => (
          <div key={index}>
            <p>주차 자리 {index + 1}: {time || "빈 자리"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}