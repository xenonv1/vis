const db = require("db-local");
const uniqid = require("uniqid");

const { Schema } = new db({ path: "./databases" });

const Product = Schema("Products", {
  name: { type: String, required: true },
  brand: String,
  color: String,
  size: String,
  weight: Number,
  description: String,
  category: String,
  prices: Array,
  discounted: Boolean,
  discountAmount: Number,
  stock: Number,
  packagingSize: String,
  packagingWeight: String,
  discontinued: Boolean,
  modelnumber: String,
});

const Service = Schema("Services", {
  name: { type: String, required: true },
  description: String,
  prices: Array,
  availability: Boolean,
  category: String,
  contractPeriodInDays: Number,
  discount: Boolean,
  discountAmount: Number,
  servicenumber: String,
});

function querySingleItem(itemType, itemId) {
    let item;
    if(itemType === "product") {
        item = Product.findOne({_id: `${itemId}`});
    }
    else if(itemType === "service") {
         item = Service.findOne({_id: `${itemId}`});
    }
    else {
        throw new Error(`The item-type specified was ${itemType}. Vaild types are 'product' or 'service'.`);
    }

    return JSON.stringify(item);
}

function querySingleItemByName(itemType, name) {
    let item;
    if(itemType === "product") {
        item = Product.findOne({name: name});
    }
    else if(itemType === "service") {
        item = Service.findOne({name: name});
    }
    else {
        throw new Error(`The item-type specified was ${itemType}. Valid types are 'product' or 'service'.`);
    }

    if(item) {
        return JSON.stringify(item);
    }
    else {
        return null;
    }
}

function queryDataSet(datasetType) {
    let dataset;
    if(datasetType === "products") {
        dataset = Product.find();
    }
    else if(datasetType === "services") {
        dataset = Service.find();
    }
    else {
        throw new Error(`The dataset-type specified was ${datasetType}. Valid types are 'products' or 'services'.`);
    }

    return JSON.stringify(dataset);
}

function updateExistingEntry(itemType, itemData) {
    if(itemType === "product") {

        const product = querySingleItemByName("product", itemData.name);

        if(product) {
        Product.update({
                name: itemData.name,
                brand: itemData.brand,
                color: itemData.color,
                size: itemData.size,
                weight: itemData.weight,
                description: itemData.description,
                category: itemData.category,
                prices: itemData.prices,
                discounted: itemData.discounted,
                discountAmount: itemData.discountAmount,
                stock: itemData.stock,
                packagingSize: itemData.packagingSize,
                packagingWeight: itemData.packagingWeight,
                discontinued: itemData.discontinued,
            }).save();
        
            return 200;
        }
        else {
            return 404;
        }
    }
    else if(itemType === "service") {

    }
    else {
        throw new Error(`The type specified was ${itemType}. Valid types are 'products' or 'service'.`);
    }
}

module.exports = {querySingleItem, querySingleItemByName, queryDataSet, updateExistingEntry};

