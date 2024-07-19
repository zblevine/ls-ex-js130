/* eslint-disable max-len */
let ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    if (!(this.itemValid(itemName, category, quantity))) return false;
    this.items.push({
      skuCode: this.getSKUCode(itemName, category),
      itemName,
      category,
      quantity
    });
    return true;
  },

  update(sku, obj) {
    let myItem = this.getItem(sku);
    Object.assign(myItem, obj);
  },

  delete(sku) {
    let myIdx = this.items.findIndex(item => item.skuCode === sku);
    this.items.splice(myIdx, 1);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category)
      .map(item => item.itemName).join(',');
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0)
      .map(item => item.itemName).join(',');
  },

  itemValid(itemName, category, quantity) {
    let newName = this.removeSpaces(itemName);
    if (newName.length < 5) return false;
    if (category.split(' ').length > 1 || category.length < 5) return false;
    if (typeof quantity !== 'number') return false;
    return true;
  },

  removeSpaces(str) {
    return str.replace(/ /g,'');
  },

  getSKUCode(itemName, category) {
    return `${this.removeSpaces(itemName).slice(0, 3)}${category.slice(0, 2)}`.toUpperCase();
  },

  getItem(sku) {
    return this.items.find(item => item.skuCode === sku);
  }
};

let ReportManager = {
  items: {},
  init(mgr) {
    this.items = mgr;
  },

  reportInStock() {
    console.log(this.items.inStock());
  },

  createReporter(sku) {
    let self = this;
    return {
      itemInfo() {
        let myItem = self.items.getItem(sku);
        Object.keys(myItem).forEach(key => console.log(`${key}: ${myItem[key]}`));
      }
    };
  }
};

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// returns list with the 4 valid items
console.log(ItemManager.items);

ReportManager.init(ItemManager);
// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// football,kitchen pot

// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.itemsInCategory('sports');

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
console.log(ItemManager.items);
let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10