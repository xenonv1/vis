const { Random } = require("random-js");
const random = new Random();
const fs = require("fs");
const { DateTime } = require("luxon");
var uniqid = require("uniqid");

// Liste von Kategorien
const categories = [
  "Reparaturservice",
  "Wartungsservice",
  "Beratungsservice",
  "Kundendienst",
  "Installationsservice",
];

// Funktion zur Generierung einer zufälligen Beschreibung
function generate_description(category) {
  const descriptions = {
    Reparaturservice: [
      "Schnelle und zuverlässige Reparatur von Haushaltsgeräten",
      "Fachmännische Reparatur bei Problemen mit Haushaltsgeräten",
      "Reparatur von Haushaltsgeräten aller Art",
    ],
    Wartungsservice: [
      "Regelmäßige Wartung von elektronischen Haushaltsgeräten wie Waschmaschinen, Trocknern, Kühlschränken usw.",
      "Professionelle Wartung für eine lange Lebensdauer Ihrer Haushaltsgeräte",
      "Wartungsservice für eine hohe Energieeffizienz",
    ],
    Beratungsservice: [
      "Kompetente Beratung bei der Auswahl von Haushaltsgeräten",
      "Individuelle Beratung für Ihre Anforderungen und Bedürfnisse",
      "Fachmännische Beratung für eine optimale Nutzung Ihrer Haushaltsgeräte",
    ],
    Kundendienst: [
      "Zuverlässiger Kundenservice bei Fragen und Problemen rund um Ihre Haushaltsgeräte",
      "Schnelle Hilfe bei Problemen mit Ihren Haushaltsgeräten",
      "Kompetenter Service für eine optimale Nutzung Ihrer Haushaltsgeräte",
    ],
    Installationsservice: [
      "Fachmännische Installation von Haushaltsgeräten aller Art",
      "Professionelle Installation für eine sichere und optimale Nutzung Ihrer Haushaltsgeräte",
      "Zuverlässiger Installationsservice für eine einfache Inbetriebnahme",
    ],
  };
  const index = random.integer(0, descriptions[category].length - 1);
  return descriptions[category][index];
}

// Generieren von 10 Services
const services = [];

for (let i = 1; i <= 10; i++) {
  const categoryRng = random.pick(categories);
  const service = {
    "id": i,
    "name": categoryRng + " " + generate_description(categoryRng),
    "description": generate_description(categoryRng),
    "prices": [
      {
        validFrom: DateTime.now().minus({ years: 1 }).toFormat("dd.MM.yyyy"),
        validTo: DateTime.now().plus({ years: 1 }).toFormat("dd.MM.yyyy"),
        price: random.real(50.0, 500.0).toFixed(2),
      },
    ],
    "availability": random.pick([true, false]),
    "category": categoryRng,
    "contractPeriodInDays": random.integer(30, 365),
    "discount": random.pick([true, false]),
    "discountAmount": random.pick([5, 10, 20]),
    "serviceNumber": uniqid(),
  };
  services.push(service);
}

// Konvertieren von JSON-Objekten in Zeichenketten
const json_data = JSON.stringify(services, null, 4);

// Schreiben der JSON-Daten in eine Datei
fs.writeFileSync("services.json", json_data, "utf-8");

console.log("10 JSON-Objekte wurden in die Datei services.json geschrieben.");
