import cv2
import numpy as np
import argparse
import os
import sys


# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="absolute path to the image")
ap.add_argument('-l', "--lower", required=False,
	help="lower canny threshold")
ap.add_argument('-u', "--upper", required=False,
	help="upper canny threshold")
arg = vars(ap.parse_args())

imgPath = arg['image']
img = cv2.imread(imgPath, 0)

def autoCanny(image, sigma=0.33):
	# compute the median of the single channel pixel intensities
	v = np.median(image)

	# apply automatic Canny edge detection using the computed median
	lower = int(max(0, (1.0 - sigma) * v))
	upper = int(min(255, (1.0 + sigma) * v))
	edged = cv2.Canny(image, lower, upper)
	return edged

def edgedImage(image, sigma=0.33):

    # compute the median of the single channel pixel intensities
	# image is already converted to grayscale in nodejs
	# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY
	blurred = cv2.GaussianBlur(image, (3, 3), 0)
	lower = arg['lower']
	upper = arg['upper']
	if (lower and upper):
		# if custom thresholds are availabe, use them
		canny = cv2.Canny(blurred, int(lower), int(upper))
	else:
		# if no thresholds are provided, use apply Canny edge detection
		# using the automatically determined threshold
		canny = autoCanny(blurred)

	# # apply Canny edge detection using the automatically determined threshold
	# auto = autoCanny(blurred)
	path = imgPath+'.edged.png'
	cv2.imwrite(path, canny)
	return path

print(edgedImage(img))
sys.stdout.flush()
