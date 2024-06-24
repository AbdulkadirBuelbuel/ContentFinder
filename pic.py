import os
import json

# Funktion, um das Datum aus dem Dateinamen zu extrahieren
def extract_date(filename, is_right):
    if is_right:
        return filename[13:23]
    else:
        return filename[12:22]

# Funktion, um die Uhrzeit aus dem Dateinamen zu extrahieren und zu formatieren
def extract_time(filename, is_right):
    if is_right:
        time_str = filename[24:29].replace('-', '')  # Entferne alle Bindestriche
    else:
        time_str = filename[23:28].replace('-', '')  # Entferne alle Bindestriche
    formatted_time = f"{time_str[:2]}:{time_str[2:4]}"
    return formatted_time

# Funktion, um die Temperatur aus dem Dateinamen zu extrahieren
def extract_temperature(filename):
    return filename[30:33]

# Funktion, um die Wetterbedingungen aus dem Dateinamen zu extrahieren
def extract_weather_conditions(filename):
    return filename[34:]

# Funktion, um die Ordnernummer aus dem Ordnernamen zu extrahieren
def extract_folder_number(folder_path):
    folder_name = os.path.basename(folder_path)
    return folder_name.split('_')[-1]

# Liste der Ordnerpfade für "Right"
right_folder_paths = [
    'Sortierte_Bilder_new/Right_green1',
    'Sortierte_Bilder_new/Right_green2',
    'Sortierte_Bilder_new/Right_green3',
    'Sortierte_Bilder_new/Right_green4',
    'Sortierte_Bilder_new/Right_green5',
    'Sortierte_Bilder_new/Right_red1',
    'Sortierte_Bilder_new/Right_red2',
    'Sortierte_Bilder_new/Right_red3',
    'Sortierte_Bilder_new/Right_red4',
    'Sortierte_Bilder_new/Right_red5'
]

# Liste der Ordnerpfade für "Left"
left_folder_paths = [
    'Sortierte_Bilder_new/Left_green1',
    'Sortierte_Bilder_new/Left_green2',
    'Sortierte_Bilder_new/Left_green3',
    'Sortierte_Bilder_new/Left_green4',
    'Sortierte_Bilder_new/Left_green5',
    'Sortierte_Bilder_new/Left_red1',
    'Sortierte_Bilder_new/Left_red2',
    'Sortierte_Bilder_new/Left_red3',
    'Sortierte_Bilder_new/Left_red4',
    'Sortierte_Bilder_new/Left_red5'
]

# Liste für die gesammelten Bildinformationen
all_image_data = []

# Funktion, um die Ordner zu durchlaufen und die Bildinformationen zu sammeln
def process_folders(folder_paths, is_right):
    for folder_path in folder_paths:
        # Extrahiere die Ordnernummer
        folder_number = extract_folder_number(folder_path)

        # Liste für die Bildinformationen im aktuellen Ordner
        image_data = []

        # Durchlaufe alle Dateien im aktuellen Ordner
        for filename in os.listdir(folder_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
                date = extract_date(filename, is_right)
                time = extract_time(filename, is_right)
                if is_right:
                    temperature = extract_temperature(filename)
                    weather_conditions = extract_weather_conditions(filename)
                else:
                    temperature = None
                    weather_conditions = None
                image_path = os.path.join(folder_path, filename)
                image_data.append({
                    'filename': filename,
                    'date': date,
                    'time': time,
                    'temperature': temperature,
                    'weather_conditions': weather_conditions,
                    'folder_number': folder_number,
                    'path': image_path
                })

        # Füge die Bildinformationen des aktuellen Ordners zur Gesamtliste hinzu
        all_image_data.extend(image_data)

# Verarbeite die "Right"-Ordner
process_folders(right_folder_paths, is_right=True)

# Verarbeite die "Left"-Ordner
process_folders(left_folder_paths, is_right=False)

# Ergebnisse in einer JSON-Datei speichern
with open('all_image_data.json', 'w') as json_file:
    json.dump(all_image_data, json_file, indent=4)

print("Daten erfolgreich extrahiert und gespeichert.")
