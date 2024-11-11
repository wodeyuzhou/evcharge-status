import requests
import time

URL = "https://evcharge-status.vercel.app/api/update-parking-data"  # Next.js 서버 주소

def send_parking_data():
    data = {
        "available_spots": 3,  # 예시 데이터
        "parking_times": ["00:10", "00:05", "", "00:15", "", "", "00:02"]
    }
    response = requests.post(URL, json=data)
    if response.status_code == 200:
        print("Data sent successfully")
    else:
        print("Failed to send data")

while True:
    send_parking_data()
    time.sleep(5)  # 5초마다 데이터 전송