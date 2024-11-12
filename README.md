## 웹사이트 주소
**- https://evcharge-status.vercel.app**

## 팀 구성
|[김장환](https://github.com/wodeyuzhou)|[신은호](https://github.com/neungho1)|[이유진](https://github.com/runth)|[진경은](https://github.com/JinKyungEun000)|
|:---:|:---:|:---:|:--:|
|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|<img src="https://github.com/user-attachments/assets/2aa22ddc-f059-43be-b66e-7215e9068d59" width="100px" height="100px"/>|
|팀장 / 웹서버|객체 인식 모델|프론트엔드|데이터셋 구축|

</br>

# 🚗 엣지 디바이스 기반 실시간 전기차 충전소 자리 인식 시스템
<img width="1454" alt="스크린샷 2024-11-12 20 19 06" src="https://github.com/user-attachments/assets/d84fa839-7372-4460-b9b9-2b5c6dc1842d">

## 🔍 개발 필요성 및 목적
<img width="1301" alt="스크린샷 2024-11-12 20 16 03" src="https://github.com/user-attachments/assets/a6b56bb4-6338-4666-b835-ae0963a54aaa">

## 🖥️ 시스템 구성도
<img width="1087" alt="스크린샷 2024-11-12 18 49 07" src="https://github.com/user-attachments/assets/5b248dd9-bef2-46d7-9a57-89e1e1688216">

1. **주차 자리 실시간 감지**: 라즈베리파이는 카메라로부터 실시간 영상을 받아 YOLOv8n 모델을 통해 차량과 빈 자리를 구분
2. **데이터 전송 및 실시간 업데이트**: 라즈베리파이가 인식한 주차 자리 현황과 주차 시간을 Next.js API 서버로 전송
3. **실시간 웹 페이지 업데이트**: Vercel에서 Next.js 애플리케이션을 호스팅하여 실시간으로 업데이트되는 주차 자리 정보를 웹 페이지를 통해 확인


## 🔧 적용 기술
<img width="1377" alt="스크린샷 2024-11-12 20 21 01" src="https://github.com/user-attachments/assets/315f4358-cd1a-4b2a-99a6-c8b93a1adfee">

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

## 🚀 향후 개선 사항
- 데이터베이스 연동: 주차된 차량 정보를 저장할 데이터베이스를 추가하여, 주차 이력 관리 및 분석에 활용.
- IoT 기기 연결 지원: 여러 IoT 기기와 연결하여 다른 전기차 충전소에서도 사용 가능한 시스템으로 확장 가능.

## 📚 References

- ### 개발 필요성 및 목적
    https://www.khan.co.kr/economy/auto/article/202405261450001 </br>
    https://www.hankyung.com/article/202312083584g

- ### Ultralytics YOLOv8
    https://docs.ultralytics.com/ </br>
    https://github.com/ultralytics/ultralytics

- ### Next.js / Vercel / OpenCV
    [Next.js API Routes Guide](https://nextjs.org/docs/api-routes/introduction) </br>
    [Vercel Documentation](https://vercel.com/docs) </br>
    [OpenCV Documentation](https://docs.opencv.org/4.10.0/)
    
