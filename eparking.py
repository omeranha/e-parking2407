import time, requests, json, cv2
from goprocam import GoProCamera
from roboflow import Roboflow

model = Roboflow(api_key = "lQmUqij8BtbnlJ8kP0WG").workspace("membrillos-etal").project("smart-vehicle-counting-and-parking-system1").version(61).model
print("Roboflow API loaded")
webcam = cv2.VideoCapture(0, cv2.CAP_DSHOW)
webcam.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
webcam.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
imagePath = "parkinglot.jpg"

while True:
	freeSpaces = 13
	occupiedSpaces = 0

	ret, frame = webcam.read()
	cv2.imwrite(imagePath, frame)
	predict = model.predict(imagePath, confidence = 50, overlap = 30)
	for i in range(len(predict.json()["predictions"])):
		occupiedSpaces += 1

	freeSpaces = freeSpaces - occupiedSpaces
	predict.save("predict.jpg")
	requests.patch("https://e-parking-2407-default-rtdb.firebaseio.com/.json", data = json.dumps({ "vagas": freeSpaces }))
	print(f"total de vagas: 13 \nespaços ocupados: {occupiedSpaces} \nespaços vazios: {freeSpaces}")
	time.sleep(1)
