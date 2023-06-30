from win32ui import CreateDCFromHandle, CreateBitmap
from PIL import Image
from numpy import array, where
import win32con, win32gui, time, requests, json, cv2

def screenshot(region = (0, 0, 1920, 1080)):
	left, top, width, height = region
	desktop = win32gui.GetDesktopWindow()
	desktopDC = win32gui.GetWindowDC(desktop)
	capturedDC = CreateDCFromHandle(desktopDC)
	imageDC = capturedDC.CreateCompatibleDC()
	bitmap = CreateBitmap()
	bitmap.CreateCompatibleBitmap(capturedDC, width, height)
	imageDC.SelectObject(bitmap)
	imageDC.BitBlt((0, 0), (width, height), capturedDC, (left, top), win32con.SRCCOPY)
	image = Image.frombytes("RGB", (width, height), bitmap.GetBitmapBits(True), "raw", "BGRX")
	win32gui.DeleteObject(bitmap.GetHandle())
	capturedDC.DeleteDC()
	imageDC.DeleteDC()
	win32gui.ReleaseDC(desktop, desktopDC)
	return image

def matchImage(screenshot, image, region = (0, 0, 1920, 1080)):
	#screenshot = cvtColor(array(screenshot), COLOR_RGB2GRAY)

	#x, y, width, height = region
	#screenshot = screenshot[y:height, x:width]
	#cv2.imread(imagepath, cv2.IMREAD_GRAYSCALE)
	_, maxVal, _, maxLoc = cv2.minMaxLoc(cv2.matchTemplate(screenshot, image, cv2.TM_CCORR_NORMED))
	return maxVal, maxLoc