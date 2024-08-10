from flask import Flask, request, jsonify, render_template
import os
import cv2
import pytesseract
from PIL import Image
import numpy as np
from pdf2image import convert_from_path
from werkzeug.utils import secure_filename
import easyocr

app = Flask(__name__)

# Allowed extensions
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

# Function to detect text regions using contour detection
def detect_text_regions(image):
    # Find contours in the image
    contours, _ = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    text_regions = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 15 and h > 15:  # Filter out small regions
            text_region = image[y:y+h, x:x+w]
            text_regions.append(text_region)

    return text_regions

# Function to extract text using Tesseract configured for Russian
def ocr_with_tesseract(image):
    # Convert image to PIL format for Tesseract
    pil_image = Image.fromarray(image)

    # Configure Tesseract to use Russian language
    custom_config = r'--oem 3 --psm 6 -l rus'

    # Use Tesseract to extract text
    text = pytesseract.image_to_string(pil_image, config=custom_config)

    return text

# Function to extract text using EasyOCR
def ocr_with_easyocr(image):
    reader = easyocr.Reader(['ru'], gpu=False)
    result = reader.readtext(np.array(image), detail=0)
    return ' '.join(result)

# Function to convert PDF to images
def convert_pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path)
    return images

# Function that combines preprocessing, text region detection, and OCR
def ocr_from_image(image_path):
    # Convert PDF to images (if the input is a PDF)
    images = convert_pdf_to_images(image_path) if image_path.lower().endswith('.pdf') else [Image.open(image_path)]

    tesseract_text = ""
    easyocr_text = ""

    for image in images:
        # Convert PIL image to OpenCV format
        open_cv_image = np.array(image)
        open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2BGR)  # Convert RGB to BGR

        # Preprocess the image
        processed_image = preprocess_image(open_cv_image)

        # Detect text regions
        text_regions = detect_text_regions(processed_image)

        for region in text_regions:
            # Perform OCR using Tesseract
            tesseract_text += ocr_with_tesseract(region) + "\n"

            # Perform OCR using EasyOCR
            easyocr_text += ocr_with_easyocr(region) + "\n"

    return {
        "tesseract_text": tesseract_text,
        "easyocr_text": easyocr_text
    }

@app.route('/')
def index():
    return render_template('DragAndDrop.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    
    # Check if the file has one of the allowed extensions
    if file and allowed_file(file.filename):
        # Secure the filename and save it
        filename = secure_filename(file.filename)
        file_path = os.path.join("/tmp", filename)
        file.save(file_path)
        
        try:
            # Perform OCR using your script
            ocr_results = ocr_from_image(file_path)
            
            # Return the extracted text from both OCR engines
            return jsonify(ocr_results)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        # Return an error message for unsupported file types
        return jsonify({"error": "Неподдерживаемый тип файла. Пожалуйста, загрузите PDF, JPG или PNG файл."}), 400

if __name__ == '__main__':
    app.run(debug=True)
