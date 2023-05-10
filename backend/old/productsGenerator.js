const { Random } = require("random-js");
const random = new Random();
const fs = require('fs');
const { DateTime } = require('luxon');
var uniqid = require('uniqid');

// Liste von Kategorien
const categories = ["Kühlschrank", "Waschmaschine", "Trockner", "Geschirrspüler", "Ofen", "Mikrowelle"];

// Liste von Marken
const brands = ["Samsung", "LG", "Bosch", "Siemens", "Miele", "AEG"];

// Liste von Farben
const colors = ["Weiß", "Schwarz", "Silber", "Rot", "Blau"];

// Funktion zur Generierung einer zufälligen Beschreibung
function generate_description() {
    const descriptions = ["Hohe Energieeffizienz", "Geräuscharm", "Einfache Bedienung", "Viel Platz"];
    const index = random.integer(0, descriptions.length - 1);
    return descriptions[index];
}

// Generieren von 200 Produkten
const products = [];

for (let i = 1; i <= 200; i++) {
    const categoryRng = random.pick(categories);
    const product = {
        "id": i,
        "name": categoryRng + " " + i,
        "brand": random.pick(brands),
        "color": random.pick(colors),
        "size": "Größe " + random.integer(1, 10),
        "weight": random.real(1.0, 50.0).toFixed(2),
        "description": generate_description(),
        "category": categoryRng,
        "prices": [
            {
                "validFrom": DateTime.now().minus({ years: 3 }).toFormat("dd.MM.yyyy"),
                "validTo": DateTime.now().minus({ years: 2 }).toFormat("dd.MM.yyyy"),
                "price": random.real(200.0, 1500.0).toFixed(2)
            },
            {
                "validFrom": DateTime.now().minus({ years: 2 }).toFormat("dd.MM.yyyy"),
                "validTo": DateTime.now().minus({ years: 1 }).toFormat("dd.MM.yyyy"),
                "price": random.real(100.0, 1000.0).toFixed(2)
            }
        ],
        "discounted": random.pick([true, false]),
        "discountAmount": random.pick([10, 20, 30]),
        "stock": random.integer(0, 1000),
        "packagingSize": "Größe " + random.integer(1, 5),
        "packagingWeight": "Gewicht " + random.integer(1, 10),
        "discontinued": random.pick([true, false]),
        "modelnumber" : uniqid()
         
    }
    products.push(product);
}

// Konvertieren von JSON-Objekten in Zeichenketten
const json_data = JSON.stringify(products, null, 4);

// Schreiben der JSON-Daten in eine Datei
fs.writeFileSync("products.json", json_data, "utf-8");

console.log("200 JSON-Objekte wurden in die Datei products.json geschrieben.");
