# Verteilte und Intelligente Systeme - IM-Master SoSe 2023

Repository für die REST-Schnittstelle im Rahmen der Veranstaltung "Verteilte und Intelligente Systeme" inkl. entsprechenden Daten.

## Endpoints:

## v1 "/..."

Version 1 wird nicht länger unterstützt und sollte nicht mehr aufgerufen werden.

## v2 "v2/..."

### Products:

**GET .../products** - Rückgabe aller Produkte im JSON-Format</br>
**GET .../products/:id** - Rückgabe des zur Id zugehörigen Produktes im JSON-Format</br>
**PUT .../products/create** - Erstellen eines neuen Produktes

Content-Type: application/json

        name: String (required),
        brand: String,
        color: String,
        size: String,
        weight: Number,
        description: String,
        category: String,
        prices: Array
            {
                validFrom: String,
                validTo: String,
                price: Number
            },
        discounted: Boolean,
        discountAmount: Number,
        stock: Number,
        packagingSize: String,
        packagingWeight: String,
        discounted: Boolean

Note: Die Modellnummer wird durch das System beim Erstellen eines Produktes generiert, um das Erstellen von Produkten im Rahmen der Veranstaltung zu vereinfachen.

</br>

**PUT .../products/update/:id** - Update eines bestehende Produkts anhand der Id

Content-Type: application/json

        name: String (required),
        brand: String,
        color: String,
        size: String,
        weight: Number,
        description: String,
        category: String,
        prices: Array
            {
                validFrom: String,
                validTo: String,
                price: Number
            },
        discounted: Boolean,
        discountAmount: Number,
        stock: Number,
        packagingSize: String,
        packagingWeight: String,
        discounted: Boolean

**POST .../products/create/post** - Erstellen eines neuen Produkts anhand der Id mittels POST request

Content-Type: application/json

        name: String (required),
        brand: String,
        color: String,
        size: String,
        weight: Number,
        description: String,
        category: String,
        prices: Array
            {
                validFrom: String,
                validTo: String,
                price: Number
            },
        discounted: Boolean,
        discountAmount: Number,
        stock: Number,
        packagingSize: String,
        packagingWeight: String,
        discounted: Boolean

### Services:

**GET .../services** - Rückgabe aller Services im JSON-Format</br>
**GET .../services/:id** - Rückgabe des zur Id zugehörigen Service im JSON-Format</br>
**PUT .../services/create** - Erstellen eines neuen Services

Content-Type: application/json

        name: String (required),
        description: String,
        prices: Array
                        {
                validFrom: String,
                validTo: String,
                price: Number
            },
        availability: Boolean,
        category: String,
        contractPeriodInDays: Number,
        discount: Boolean,
        discountAmount: Number

Note: Die Servicenummer wird durch das System beim Erstellen eines Services generiert, um das Erstellen von Produkten im Rahmen der Veranstaltung zu vereinfachen.

</br>

**PUT .../services/update/:id** - Update eines bestehenden Service auf Basis der Id

Content-Type: application/json

        name: String (required),
        description: String,
        prices: Array
                        {
                validFrom: String,
                validTo: String,
                price: Number
            },
        availability: Boolean,
        category: String,
        contractPeriodInDays: Number,
        discount: Boolean,
        discountAmount: Number

**POST .../services/create/post** - Erstellen eines neuen Services anhand der Id mittels POST request

Content-Type: application/json

        name: String (required),
        description: String,
        prices: Array
                        {
                validFrom: String,
                validTo: String,
                price: Number
            },
        availability: Boolean,
        category: String,
        contractPeriodInDays: Number,
        discount: Boolean,
        discountAmount: Number
