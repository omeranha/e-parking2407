from functions import *
from numpy import array

def matchImage(screenshot, image, region = (0, 0, 1920, 1080)):
	#screenshot = cvtColor(array(screenshot), COLOR_RGB2GRAY)

	#x, y, width, height = region
	#screenshot = screenshot[y:height, x:width]
	#cv2.imread(imagepath, cv2.IMREAD_GRAYSCALE)
	_, maxVal, _, maxLoc = cv2.minMaxLoc(cv2.matchTemplate(screenshot, image, cv2.TM_CCORR_NORMED))
	return maxVal, maxLoc

parkingSpaces = 0
desktopImage = cv2.cvtColor(array(screenshot()), cv2.COLOR_RGB2GRAY)
image = cv2.imread("images/fotogrande.jpg", cv2.IMREAD_UNCHANGED)
emptySpace = cv2.imread("images/vagavazia.jpg", cv2.IMREAD_UNCHANGED)
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
