import os
from PIL import Image

def check_pixel_for_black(image_path, pixel_coords):
    """
    Überprüft bestimmte Pixel eines Bildes, ob sie eine bestimmte Farbe haben.
    
    :param image_path: Pfad zum Bild
    :param pixel_coords: Liste der Pixelkoordinaten [(x1, y1), (x2, y2), ...]
    :return: Index des ersten Pixels mit der bestimmten Farbe oder -1 wenn keiner diese Farbe hat
    """
    with Image.open(image_path) as img:
        for i, coord in enumerate(pixel_coords):
            pixel = img.getpixel(coord)
            if pixel == (36, 44, 53) or pixel == (36, 44, 53, 255):
                return i
    return -1

def append_condition_to_filename(image_path, condition):
    """
    Fügt eine Bedingung an den Dateinamen an.
    
    :param image_path: Pfad zum Bild
    :param condition: Bedingung, die angefügt wird (z.B., 'rainy', 'cloudy')
    :return: Neuer Dateiname
    """
    directory, filename = os.path.split(image_path)
    name, ext = os.path.splitext(filename)
    new_filename = f"{name}_{condition}{ext}"
    new_file_path = os.path.join(directory, new_filename)
    os.rename(image_path, new_file_path)
    print(f"{filename} umbenannt in {new_filename}")

def process_images_in_folder(source_folder, pixel_coords, conditions):
    """
    Verarbeitet alle Bilder im Quellordner, deren Dateinamen mit 'screen-right' beginnen,
    überprüft bestimmte Pixel auf die festgelegte Farbe und fügt je nach gefundenem Pixel eine Bedingung an den Dateinamen an.
    
    :param source_folder: Quellordner mit Bildern
    :param pixel_coords: Liste der Pixelkoordinaten [(x1, y1), (x2, y2), ...]
    :param conditions: Liste der Bedingungen ['rainy', 'cloudy', ...]
    """
    for filename in os.listdir(source_folder):
        if not filename.lower().startswith('screen-right'):
            continue  # Überspringt Dateien, die nicht mit 'screen-right' beginnen

        file_path = os.path.join(source_folder, filename)
        if os.path.isfile(file_path) and file_path.lower().endswith(('png', 'jpg', 'jpeg', 'bmp')):
            index = check_pixel_for_black(file_path, pixel_coords)
            if index != -1:
                append_condition_to_filename(file_path, conditions[index])
            else:
                print(f"{filename} enthält keinen Pixel mit der Farbe (36, 44, 53) an den gegebenen Positionen.")

if __name__ == "__main__":
    source_folder = "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai"
    pixel_coords = [
        (83, 88),  # Pixel 1 - rainy
        (103, 59),  # Pixel 2 - cloudy
        (63, 87),  # Pixel 3 - sunny
        (43, 72),  # Pixel 4 - night
        (87, 33)   # Pixel 5 - evening
    ]
    conditions = ['rainy', 'cloudy', 'sunny', 'night', 'evening']
    
    process_images_in_folder(source_folder, pixel_coords, conditions)
