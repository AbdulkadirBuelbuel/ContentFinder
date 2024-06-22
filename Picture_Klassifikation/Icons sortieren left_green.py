import os
import shutil
from PIL import Image

def check_pixel_colors(image_path, pixel_coords, color1, color2):
    """
    Überprüft die Farben bestimmter Pixel eines Bildes.
    
    :param image_path: Pfad zum Bild
    :param pixel_coords: Liste der Pixelkoordinaten [(x1, y1), (x2, y2), ...]
    :param color1: Die Farbe, nach der im ersten Pixel gesucht wird (z.B. (0, 113, 52, 255))
    :param color2: Die Farbe, die die restlichen Pixel haben sollen (z.B. (60, 145, 63, 255))
    :return: Index des Pixels, der die Farbe1 hat, oder -1 wenn keiner passt
    """
    with Image.open(image_path) as img:
        width, height = img.size
        # Überprüfen, ob alle Koordinaten innerhalb des Bildes liegen
        if all(0 <= x < width and 0 <= y < height for x, y in pixel_coords):
            pixels = [img.getpixel(coord) for coord in pixel_coords]
            
            # Überprüfe, ob ein Pixel die Farbe1 hat und die anderen die Farbe2
            for i, pixel in enumerate(pixels):
                if pixel == color1 and all(p == color2 for j, p in enumerate(pixels) if j != i):
                    return i  # Index des Pixels, der die Farbe1 hat
        return -1  # Keiner der Pixel hat die gesuchte Farbe1 oder Koordinaten außerhalb des Bildes

def move_image_based_on_pixel(source_folder, destination_folders, pixel_coords, color1, color2):
    """
    Verschiebt Bilder basierend auf der Farbe bestimmter Pixel.
    
    :param source_folder: Quellordner mit Bildern
    :param destination_folders: Liste der Zielordner
    :param pixel_coords: Liste der Pixelkoordinaten [(x1, y1), (x2, y2), ...]
    :param color1: Die Farbe, nach der im ersten Pixel gesucht wird (z.B. (0, 113, 52, 255))
    :param color2: Die Farbe, die die restlichen Pixel haben sollen (z.B. (60, 145, 63, 255))
    """
    for folder in destination_folders:
        os.makedirs(folder, exist_ok=True)

    for filename in os.listdir(source_folder):
        file_path = os.path.join(source_folder, filename)
        if os.path.isfile(file_path) and file_path.lower().endswith(('png', 'jpg', 'jpeg', 'bmp')):
            index = check_pixel_colors(file_path, pixel_coords, color1, color2)
            if index != -1:
                destination_folder = destination_folders[index]
                shutil.move(file_path, os.path.join(destination_folder, filename))
                print(f"{filename} wurde nach {destination_folder} verschoben.")
            else:
                print(f"{filename} wurde nicht verschoben, da keine Übereinstimmung gefunden wurde oder Koordinaten außerhalb des Bildbereichs liegen.")

if __name__ == "__main__":
    source_folder = "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai"
    destination_folders = [
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green1",
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green2",
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green3",
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green4",
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green5",
        "C:/Users/fabia/OneDrive/HFU Medieninformatik/4. Semester/Softwaredesign/Klassifizierung/smmiMai/smmiMai/Left_green6"
    ]
    pixel_coords = [
        (300, 1805),  # Pixel 1
        (420, 1805),  # Pixel 2
        (550, 1805),  # Pixel 3
        (680, 1805),  # Pixel 4
        (802, 1805),  # Pixel 5
        (927, 1805)   # Pixel 6
    ]
    color1 = (0, 113, 52, 255)  # Farbe 1
    color2 = (60, 145, 63, 255)  # Farbe 2

    move_image_based_on_pixel(source_folder, destination_folders, pixel_coords, color1, color2)
