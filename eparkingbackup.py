from functions import *

parkingSpaces = 0
desktopImage = cv2.cvtColor(array(screenshot()), cv2.COLOR_RGB2GRAY)
image = cv2.imread("images/fotogrande.jpg", cv2.IMREAD_UNCHANGED)
emptySpace = cv2.imread("images/vagavaziaa.jpg", cv2.IMREAD_UNCHANGED)
dbURL = "https://e-parking-2407-default-rtdb.firebaseio.com/"

while True:
	result = matchImage(image, emptySpace)
	print(result)
	if result[0] < 0.89:
		print("vaga ocupada")
	else:
		print("vaga livre")
		#parkingSpaces += 1
		object = { "vagas": parkingSpaces }
		patch = requests.patch(f"{dbURL}.json", data = json.dumps(object))
		print(patch.text)

	cv2.namedWindow("image", cv2.WINDOW_NORMAL)
	cv2.imshow("image", image)
	cv2.waitKey(0)
	cv2.destroyAllWindows()
	#print(parkingSpaces)
	time.sleep(1)
