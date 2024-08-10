from flask import Flask, request, jsonify, render_template
import os
import cv2
import pytesseract
from PIL import Image
import numpy as np
from pdf2image import convert_from_path
from werkzeug.utils import secure_filename
import easyocr
from google.cloud import vision

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

# Function to extract text using Tesseract configured for Russian
def ocr_with_tesseract(image):
    # Convert image to PIL format for Tesseract
    pil_image = Image.fromarray(image)

    # Configure Tesseract to use Russian language
    custom_config = r'--oem 3 --psm 6 -l rus'

    # Use Tesseract to extract text
    text = pytesseract.image_to_string(pil_image, config=custom_config)

    return text

# Function to extract text using Google Cloud Vision
def ocr_with_google_vision(image_path):
    client = vision.ImageAnnotatorClient()
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    return texts[0].description if texts else ""

# Function to extract text using EasyOCR
def ocr_with_easyocr(image_path):
    reader = easyocr.Reader(['ru'], gpu=False)
    result = reader.readtext(image_path, detail=0)
    return ' '.join(result)

# Function to convert PDF to images
def convert_pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path)
    return images

# Function that runs OCR using all three models
def ocr_from_image(image_path):
    # Convert PDF to images (if the input is a PDF)
    images = convert_pdf_to_images(image_path) if image_path.lower().endswith('.pdf') else [Image.open(image_path)]

    tesseract_text = ""
    google_text = ""
    easyocr_text = ""

    for image in images:
        # Convert PIL image to OpenCV format
        open_cv_image = np.array(image)
        open_cv_image = open_cv_image[:, :, ::-1].copy()  # Convert RGB to BGR

        # Preprocess the image
        processed_image = preprocess_image(open_cv_image)

        # Perform OCR using Tesseract
        tesseract_text += ocr_with_tesseract(processed_image) + "\n"

        # Perform OCR using Google Cloud Vision
        google_text += ocr_with_google_vision(image_path) + "\n"

        # Perform OCR using EasyOCR
        easyocr_text += ocr_with_easyocr(image_path) + "\n"

    return {
        "tesseract_text": tesseract_text,
        "google_text": google_text,
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
            
            # Return the extracted text from all OCR engines
            return jsonify(ocr_results)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        # Return an error message for unsupported file types
        return jsonify({"error": "Неподдерживаемый тип файла. Пожалуйста, загрузите PDF, JPG или PNG файл."}), 400

if __name__ == '__main__':
    app.run(debug=True)
