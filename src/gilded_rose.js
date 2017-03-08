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
      this._updateItem(this.items[i]);
    }
    return this.items;
  }

  _updateItem(item) {
    item.sellIn -= this._defineDateChange(item);
    item.quality = this._calculateQuality(item);
  }

  _calculateQuality(item) {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return item.quality;
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (item.sellIn < 0) {
          return 0;
        }
        return this._calculateQualityLimits(item.quality, this._defineQualityChange(item));
      default:
        return this._calculateQualityLimits(item.quality, this._defineQualityChange(item));
    }
  }

  _calculateQualityLimits(quality, delta) {
    return Math.min(Math.max(quality - delta, 0), 50);
  }

  _defineDateChange(item){
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return 0;
    } else {
      return 1;
    }
  }

  _defineQualityChange(item) {
    return this._calculateNameFactor(item) * this._calculateDateAndConjuredFactor(item);
  }

  _calculateNameFactor(item) {
    switch (item.name) {
      case 'Aged Brie':
        return -1;
      case 'Sulfuras, Hand of Ragnaros':
        return 0;
      case 'Backstage passes to a TAFKAL80ETC concert':
        return this._calculateBackstageChange(item);
      default:
        return 1;
    }
  }

  _calculateDateAndConjuredFactor(item) {
    if ((item.sellIn < 0)||(item.name.includes('Conjured'))) {
      return 2;
    } else {
      return 1;
    }
  }

  _calculateBackstageChange(item) {
    if (item.sellIn < 0) {
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
