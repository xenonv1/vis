import random
import json
from datetime import datetime, timedelta

# Liste von Kategorien
categories = ["Kühlschrank", "Waschmaschine", "Trockner", "Geschirrspüler", "Ofen", "Mikrowelle"]

# Liste von Marken
brands = ["Samsung", "LG", "Bosch", "Siemens", "Miele", "AEG"]

# Liste von Farben
colors = ["Weiß", "Schwarz", "Silber", "Rot", "Blau"]

# Funktion zur Generierung einer zufälligen Beschreibung
def generate_description():
    descriptions = ["Hohe Energieeffizienz", "Geräuscharm", "Einfache Bedienung", "Viel Platz"]
    return random.choice(descriptions)

# Generieren von 200 Produkten
products = []

for i in range(1, 201):
    product = {
        "id": i,
        "name": random.choice(categories)+ " " + str(i),
        "brand": random.choice(brands),
        "color": random.choice(colors),
        "size": "Größe " + str(random.randint(1, 10)),
        "weight": round(random.uniform(1.0, 50.0), 2),
        "description": generate_description(),
        "category": random.choice(categories),
        "prices": [
            {
                "validFrom": (datetime.now() - timedelta(days=365*3)).strftime("%d.%m.%Y"),
                "validTo": (datetime.now() - timedelta(days=365*2)).strftime("%d.%m.%Y"),
                "price": round(random.uniform(200.0, 1500.0), 2)
            },
            {
                "validFrom": (datetime.now() - timedelta(days=365*2)).strftime("%d.%m.%Y"),
                "validTo": (datetime.now() - timedelta(days=365)).strftime("%d.%m.%Y"),
                "price": round(random.uniform(100.0, 1000.0), 2)
            }
        ],
        "discounted": random.choice([True, False]),
        "discountAmount": random.choice([10, 20, 30]),
        "stock": random.randint(0, 1000),
        "packagingSize": "Größe " + str(random.randint(1, 5)),
        "packagingWeight": "Gewicht " + str(random.randint(1, 10)),
        "discontinued": random.choice([True, False])
    }
    products.append(product)

# Konvertieren von JSON-Objekten in Zeichenketten
json_data = json.dumps(products, ensure_ascii=False, indent=4)

# Schreiben der JSON-Daten in eine Datei
with open("products.json", "w", encoding="utf-8") as f:
    f.write(json_data)

print("200 JSON-Objekte wurden in die Datei products.json geschrieben.")