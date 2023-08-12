import time, requests, json
from goprocam import GoProCamera
from roboflow import Roboflow

goproCamera = GoProCamera.GoPro()
model = Roboflow(api_key = "lQmUqij8BtbnlJ8kP0WG").workspace("just-hobbies").project("hotwheel-2").version(3).model
imagePath = "parkinglot.jpg"

while True:
	freeSpaces = 13
	occupiedSpaces = 0

	goproCamera.take_photo(0)
	goproCamera.downloadLastMedia(custom_filename = imagePath)
	predict = model.predict(imagePath, confidence = 60, overlap = 30)
	for i in range(len(predict.json()["predictions"])):
		occupiedSpaces += 1

	freeSpaces = freeSpaces - occupiedSpaces
	requests.patch("https://e-parking-2407-default-rtdb.firebaseio.com/.json", data = json.dumps({ "vagas": freeSpaces }))
	print(f"total de vagas: 13 \nespaços ocupados: {occupiedSpaces} \nespaços vazios: {freeSpaces}")
	time.sleep(1)
