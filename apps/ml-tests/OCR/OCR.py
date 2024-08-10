import cv2
import pytesseract
from PIL import Image
import numpy as np
from pdf2image import convert_from_path
import os
# Function to preprocess the image
def preprocess_image(image):
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply adaptive thresholding to handle varying lighting conditions
    adaptive_thresh = cv2.adaptiveThreshold(
        gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )

    # Remove noise using a median blur
    processed_image = cv2.medianBlur(adaptive_thresh, 3)

    return processed_image

# Function to segment the image to text regions
def segment_text_regions(processed_image):
    # Find contours of the text regions
    contours, _ = cv2.findContours(processed_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Create a mask to draw the text regions
    mask = np.zeros_like(processed_image)

    # Filter and draw the contours based on area size (optional)
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 100:  # Adjust this threshold based on your image's text size
            x, y, w, h = cv2.boundingRect(cnt)
            mask[y:y+h, x:x+w] = processed_image[y:y+h, x:x+w]

    return mask

# Function to extract text using Tesseract configured for Russian
def extract_text(image):
    # Convert image to PIL format for Tesseract
    pil_image = Image.fromarray(image)

    # Configure Tesseract to use Russian language
    custom_config = r'--oem 3 --psm 6 -l rus'

    # Use Tesseract to extract text
    text = pytesseract.image_to_string(pil_image, config=custom_config)

    return text

# Function to convert PDF to images
def convert_pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path)
    return images

# Function that combines preprocessing, segmentation, and OCR
def ocr_from_image(image_path):
    # Convert PDF to images (if the input is a PDF)
    images = convert_pdf_to_images(image_path)

    all_text = ""
    
    for image in images:
        # Convert PIL image to OpenCV format
        open_cv_image = np.array(image)
        open_cv_image = open_cv_image[:, :, ::-1].copy()  # Convert RGB to BGR

        # Preprocess the image
        processed_image = preprocess_image(open_cv_image)

        # Segment the text regions
        segmented_image = segment_text_regions(processed_image)

        # Extract text from the segmented image
        text = extract_text(segmented_image)

        all_text += text + "\n"

    return all_text

# Main script
if __name__ == "__main__":
    # Replace this with the path to your PDF
    image_path = "~/Downloads/Telegram Desktop/Doctor signup.pdf"
    image_path = os.path.expanduser(image_path)
    
    # Check if the file exists
    if not os.path.isfile(image_path):
        raise FileNotFoundError(f"Couldn't open file '{image_path}': No such file or directory.")
    
    # Perform OCR on the PDF
    text = ocr_from_image(image_path)
    
    # Print the extracted text
    print("Extracted Text:")
    print(text)
