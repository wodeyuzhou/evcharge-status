## 🔧 Vercel CI/CD repository
Vercel 배포용 github

## 웹사이트 주소
    https://evcharge-status.vercel.app


## 📂 프로젝트 구조
```
evcharge-status/
├── app/
│   └── page.tsx                      # 웹페이지 인터페이스 구성 파일
├── pages/
│   └── api/
│       └── update-parking-data.ts    # Next.js API 엔드포인트, 주차 데이터 수신 및 제공
└── pi_code/
    │── yolov8n.pt                    # 테스트용 모델 파일
    │── best.pt                       # 주차장 인식용 모델 파일
    │── bounding_boxes.json           # 주차 구역 좌표 정보 파일
    │── parking_detection.py          # 모델 로드 및 주차 여부 판단 스크립트
    └── parking_time_manager.py       # 주차 시간 관리 및 시각화 스크립트
```
