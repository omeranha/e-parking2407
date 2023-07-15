from functions import *
from ultralytics import YOLO

dbURL = "https://e-parking-2407-default-rtdb.firebaseio.com/"
model = YOLO('yolov8s.pt')
image = cv2.imread("images/fotocarros.png")
parkingSpaces = 13
freeSpaces = parkingSpaces

results = model(image, conf = 0.1)
result = results[0]
for i in range(len(result.boxes)):
	freeSpaces -= 1

if freeSpaces <= 0:
	print("estacionamento cheio")

print(f"total de vagas: {parkingSpaces}")
print(f"espaços ocupados: {parkingSpaces - freeSpaces}")
print(f"espaços vazios: {freeSpaces}")
object = { "vagas": freeSpaces }
patch = requests.patch(f"{dbURL}.json", data = json.dumps(object))
