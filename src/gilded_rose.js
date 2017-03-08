class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      this._updateItem(item);
    }
    return this.items;
  }

  _updateItem(item) {
    item.sellIn -= this._defineDateChange(item);
    item.quality = this._calculateQuality(item);
  }

  _calculateQuality(item) {
    var delta = this._defineQualityChange(item);
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return item.quality;
    } else {
      return Math.min(Math.max(item.quality - delta, 0), 50);
    }
  }

  _defineDateChange(item){
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return 0;
    } else {
      return 1;
    }
  }

  _defineQualityChange(item) {
    var change;
    switch (item.name) {
      case 'Aged Brie':
        change = -1;
        break;
      case 'Sulfuras, Hand of Ragnaros':
        change = 0;
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        change = this._calculateBackstageChange(item);
        break;
      default:
        change = 1;
    }
    if (item.sellIn < 0) {
      change *= 2;
    }
    return change;
  }

  _calculateBackstageChange(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return 0;
    } else if (item.sellIn < 5) {
      return -3;
    } else if (item.sellIn < 10) {
      return -2;
    } else {
      return -1;
    }
  }
}
