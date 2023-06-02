from cv2 import imread, matchTemplate, minMaxLoc, cvtColor, TM_CCORR_NORMED, COLOR_RGB2GRAY, IMREAD_GRAYSCALE
from pytesseract import pytesseract, image_to_string
from win32ui import CreateDCFromHandle, CreateBitmap
from win32console import GetConsoleWindow
from pystray import Icon, MenuItem
from PIL import Image
from numpy import array
import win32api, win32con, win32gui, windows_toasts, time, threading, os

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

def matchImage(screenshot, imagepath, region = (0, 0, 1920, 1080)):
	screenshot = cvtColor(array(screenshot), COLOR_RGB2GRAY)

	x, y, width, height = region
	screenshot = screenshot[y:height, x:width]

	_, maxVal, _, maxLoc = minMaxLoc(matchTemplate(screenshot, imread(imagepath, IMREAD_GRAYSCALE), TM_CCORR_NORMED))
	return maxVal, maxLoc