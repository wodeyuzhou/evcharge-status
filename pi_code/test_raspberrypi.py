from ultralytics import YOLO
import cv2
import math 
from ultralytics import solutions
# start webcam (라즈베리파이인 경우 수정)
from picamera2 import Picamera2
picam2 = Picamera2()
picam2.preview_configuration.main.size = (1280, 720)
picam2.preview_configuration.main.format = "RGB888"
picam2.preview_configuration.align()
picam2.configure("preview")
picam2.start()



json_file = "bounding_boxes.json" # 주차장 좌표값을 저장한 json파일 경로
# model
#model = YOLO("yolov8n.pt")
parking_manager = solutions.ParkingManagement(model_path="yolov8n.pt") # 사용하고자 하는 모델 경로 입력 




import time

test_list = [0, 0, 0, 0, 0, 0, 0] # 초기 상태 리스트 (주차공간이 비어 있음)
a =  test_list 
vehicle_times = [0] * len(test_list)  # 각 주차 공간에서 차량이 머문 시간 (초 단위)
total_vehicle_time = 0  # 전체 주차 공간에서 차량이 머문 총 시간
last_inference_time = time.time()
inference_interval = 1 # 추론 간격 (초)
vehicle_entry_times = [None] * len(test_list)  # 각 주차 공간의 차량 진입 시간
miss_count =  [0] * len(test_list) # 차량이 없을 때 기록(추론 간격만큼 카운트) ex) 추론간격 1초 일때 1초마다 카운트 1 증가



while True:

    frame = picam2.capture_array()
    jss_data = parking_manager.parking_regions_extraction(json_file)
    current_time = time.time()

    if current_time - last_inference_time >= inference_interval:
        result = parking_manager.model.track(frame, persist=True, show=False)

        if result[0].boxes.id is not None:
            boxes = result[0].boxes.xyxy.cpu().tolist()
            clss = result[0].boxes.cls.cpu().tolist()
            a = parking_manager.process_data(jss_data, frame, boxes, clss)
        print("------------",a,"-------------")
        for idx in range(len(a)):
            # 차량이 새로 들어온 경우
            if test_list[idx] == 0 and a[idx] == 1:
                vehicle_entry_times[idx] = time.time()  # 진입 시간 기록


            elif a[idx] == 0:
                miss_count[idx] += 1
                if miss_count[idx] > 2:  #몆초동안 없을때 나갔다고 판단하는 조건
                    miss_count[idx] = 0
                    vehicle_entry_times[idx] = None  # 진입 시간 초기화
                    vehicle_times[idx] = 0  # 머문 시간 초기화

            # 차량이 주차 공간에 있는 경우 시간 계산
            elif a[idx] == 1:
                vehicle_times[idx] = int(time.time() - vehicle_entry_times[idx])  # 머문 시간 계산
                miss_count[idx] = 0


            # 실시간으로 머문 시간 출력
            #if a[idx] == 1:
            print(f"주차공간 {idx + 1}: {vehicle_times[idx]}초째 머물러 있습니다.")

            # `test_list` 업데이트
        test_list = a

        last_inference_time = current_time

    # 항상 프레임을 표시
    parking_manager.display_frames(frame)

    if cv2.waitKey(1) == ord('q'):
        break