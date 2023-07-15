from functions import *

rf = Roboflow(api_key = "lQmUqij8BtbnlJ8kP0WG")
project = rf.workspace("just-hobbies").project("hotwheel-2")
#dataset = project.version(3).download("yolov8")
model = project.version(3).model
dbURL = "https://e-parking-2407-default-rtdb.firebaseio.com/"
imagePath = "images/3carros.jpg"
parkingSpaces = 13
occupiedSpaces = 0

while True:
	predict = model.predict(imagePath, confidence = 50, overlap = 30) # screenshot().save("screenshot.jpg")
	for i in range(len(predict.json()["predictions"])):
		occupiedSpaces += 1

	emptySpaces = parkingSpaces - occupiedSpaces
	requests.patch(f"{dbURL}.json", data = json.dumps({ "vagas": emptySpaces }))
	print(f"total de vagas: {parkingSpaces} \nespaços ocupados: {occupiedSpaces} \nespaços vazios: {emptySpaces}")
	predict.save("prediction.jpg")
	parkingSpaces = 13
	occupiedSpaces = 0
	emptySpaces = parkingSpaces
	time.sleep(1)
