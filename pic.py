import os
import json

# Funktion, um das Datum aus dem Dateinamen zu extrahieren
def extract_date(filename):
    return filename[12:22]

# Funktion, um die Uhrzeit aus dem Dateinamen zu extrahieren und zu formatieren
def extract_time(filename):
    time_str = filename[23:28].replace('-', '')  # Entferne alle Bindestriche
    formatted_time = f"{time_str[:2]}:{time_str[2:4]}"
    return formatted_time

# Ordnerpfad mit den Bildern
folder_path = '1_screens_left_map'

# Liste für die Bildinformationen
image_data = []

# Alle Dateien im Ordner durchlaufen
for filename in os.listdir(folder_path):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
        date = extract_date(filename)
        time = extract_time(filename)
        image_path = os.path.join(folder_path, filename)
        image_data.append({'filename': filename, 'date': date, 'time': time, 'path': image_path})

# Ergebnisse in einer JSON-Datei speichern
with open('image_data.json', 'w') as json_file:
    json.dump(image_data, json_file, indent=4)

print("Daten erfolgreich extrahiert und gespeichert.")
