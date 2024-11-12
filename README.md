## 웹사이트 주소
**- https://evcharge-status.vercel.app**

## 팀 구성
|[김장환](https://github.com/wodeyuzhou)|[신은호](https://github.com/neungho1)|[이유진](https://github.com/runth)|[진경은](https://github.com/JinKyungEun000)|
|:---:|:---:|:---:|:--:|
|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|
|팀장 / 웹서버|객체 인식 모델|프론트엔드|데이터셋 구축|

</br>

# 🚗 엣지 디바이스 기반 실시간 전기차 충전소 자리 인식 시스템

<img src="https://github.com/user-attachments/assets/a5052757-e58b-44fa-b2de-80460d5c2fcd" width="550px" height="295px"/> <img src="https://github.com/user-attachments/assets/2ef72042-4ba9-400d-bd90-39c452696ce3" width="550px" height="295px"/>

이 시스템은 라즈베리파이를 활용한 On-device 객체 인식 기술을 통해 전기차 충전소의 주차 자리 현황과 충전 상태를 실시간으로 모니터링하여 사용자에게 제공하는 것을 목표로 합니다.</br>
또한 이 시스템은 기존의 CCTV나 다양한 에지 디바이스와의 통합을 통해 전기차 주차 자리를 실시간으로 모니터링할 수 있도록 확장 가능합니다.

## 🖥️ 시스템 구성도
<img width="1076" alt="스크린샷 2024-11-11 21 26 24" src="https://github.com/user-attachments/assets/7f47bfb0-2243-4116-896e-1011e0a8d799">

1. **주차 자리 실시간 감지**: 라즈베리파이는 카메라로부터 실시간 영상을 받아 YOLOv8n 모델을 통해 차량과 빈 자리를 구분합니다.
2. **데이터 전송 및 실시간 업데이트**: 라즈베리파이가 인식한 주차 자리 현황과 주차 시간을 Next.js API 서버로 전송합니다.
3. **실시간 웹 페이지 업데이트**: Vercel에서 Next.js 애플리케이션을 호스팅하여 실시간으로 업데이트되는 주차 자리 정보를 웹 페이지를 통해 확인할 수 있습니다.

## 📂 프로젝트 구조
```
evcharge-status/
├── app/
│   └── page.tsx  # 웹페이지 구성 파일
├── pages/
│   └── api/
│       └── update-parking-data.ts    # Next.js API 엔드포인트, 주차 데이터 수신 및 제공
└── pi_code/
    │── best.pt                       # YOLOv8n 사전학습 모델
    │── bounding_boxes.json           # 주차 자리 정보
    │── test_parking_management.py    # 모델 로드 / 주차구역 json파일 로드 / 주차 여부 판단
    └── test_raspberrypi.py           # 주차 여부 확인해서 주차 시간 체크 및 초기화 / 시각화
```

## 🚀 기술 스택
- **Hardware**: 라즈베리파이4, 라즈베리파이 카메라 모듈
- **객체 인식 라이브러리**: OpenCV, Ultralytics YOLO
- **프론트엔드**: Next.js, React
- **백엔드**: Next.js API Routes, Vercel


## 🔧 향후 개선 사항
- 데이터베이스 사용: 데이터베이스를 연결하여 주차된 차량 정보 저장
- 주차 시간 계산: 주차 시작 시간을 기록하여 주차된 시간이 일정 시간 이상일 경우 알림을 제공하는 기능 추가.
- IoT 기기 연결 지원: 여러 IoT 장비들을 연결하여 일반적인 전기차 충전소에서도 사용 가능한 시스템으로 확장.
