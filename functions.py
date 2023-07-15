import win32con, win32gui, win32ui, time, requests, json, cv2
from roboflow import Roboflow
from PIL import Image

def screenshot(region = (0, 0, 1920, 1080)):
	left, top, width, height = region
	desktop = win32gui.GetDesktopWindow()
	desktopDC = win32gui.GetWindowDC(desktop)
	capturedDC = win32ui.CreateDCFromHandle(desktopDC)
	imageDC = capturedDC.CreateCompatibleDC()
	bitmap = win32ui.CreateBitmap()
	bitmap.CreateCompatibleBitmap(capturedDC, width, height)
	imageDC.SelectObject(bitmap)
	imageDC.BitBlt((0, 0), (width, height), capturedDC, (left, top), win32con.SRCCOPY)
	image = Image.frombytes("RGB", (width, height), bitmap.GetBitmapBits(True), "raw", "BGRX")
	win32gui.DeleteObject(bitmap.GetHandle())
	capturedDC.DeleteDC()
	imageDC.DeleteDC()
	win32gui.ReleaseDC(desktop, desktopDC)
	return image
