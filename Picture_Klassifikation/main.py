import subprocess

def run_script(script_name):
    """
    Führt ein Python-Skript als separaten Prozess aus.
    
    :param script_name: Name des Python-Skripts
    """
    result = subprocess.run(["python", script_name], capture_output=True, text=True)
    if result.returncode == 0:
        print(f"{script_name} erfolgreich ausgeführt.")
    else:
        print(f"Fehler beim Ausführen von {script_name}:\n{result.stderr}")

if __name__ == "__main__":
    scripts = [
        "Temperatur_auslesen.py",
        "Wetterlage_überprüfen.py",
        "Icons sortieren left_green.py",
        "Icons sortieren left_red.py",
        "Icons sortieren right_green.py",
        "Icons sortieren right_red.py"
    ]
    
    for script in scripts:
        run_script(script)
