from functions import *

while True:
	screen = screenshot()
	comparacao = matchImage(screen, "images/temp.png")
	if comparacao[0] > 0.9:
		print("vaga livre")
	else:
		print("vaga ocupada")
	time.sleep(1)
