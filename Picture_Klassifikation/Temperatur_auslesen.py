import os
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import re

# Pfad zu Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_number_from_image_section(image_path, crop_box):
    """
    Extrahiert eine einstellige oder zweistellige Zahl aus einem Bildabschnitt.
    
    :param image_path: Pfad zum Bild
    :param crop_box: Tuple (left, upper, right, lower) - Bereich des auszuschneidenden Bildes
    :return: Gefundene Zahl oder None
    """
    img = Image.open(image_path).crop(crop_box)
    img = img.convert('L')
    img = img.filter(ImageFilter.SHARPEN)
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2)
    
    text = pytesseract.image_to_string(img, config='--psm 8', lang='eng')
    print(f"Erkannter Text im Abschnitt: {text.strip()}")
    
    match = re.search(r'\b\d{1,2}\b', text)
    if match:
        return match.group()
    return None

def append_number_to_filename(image_path, number):
    """
    Fügt die erkannte Zahl an den Dateinamen an.
    
    :param image_path: Pfad zum Bild
    :param number: Die erkannte Zahl
    :return: Neuer Dateiname
    """
    directory, filename = os.path.split(image_path)
    name, ext = os.path.splitext(filename)
    new_filename = f"{name}_{number}C{ext}"
    new_file_path = os.path.join(directory, new_filename)
    os.rename(image_path, new_file_path)
    print(f"{filename} umbenannt in {new_filename}")

def process_images_in_folder(source_folder, crop_box):
    """
    Verarbeitet alle Bilder im Quellordner, die mit 'screen-right' beginnen,
    extrahiert Zahlen aus dem Bildabschnitt und fügt sie an den Dateinamen an.
    
    :param source_folder: Quellordner mit Bildern
    :param crop_box: Tuple (left, upper, right, lower) - Bereich des auszuschneidenden Bildes
    """
    for filename in os.listdir(source_folder):
        if not filename.lower().startswith('screen-right'):
            continue  # Überspringt Dateien, die nicht mit 'screen-right' beginnen

        file_path = os.path.join(source_folder, filename)
        if os.path.isfile(file_path) and file_path.lower().endswith(('png', 'jpg', 'jpeg', 'bmp')):
            number = extract_number_from_image_section(file_path, crop_box)
            if number:
                append_number_to_filename(file_path, number)

if __name__ == "__main__":
    source_folder = "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai"
    crop_box = (109, 43, 144, 64)  # Bereich des Bildes (left, upper, right, lower)
    
    process_images_in_folder(source_folder, crop_box)
