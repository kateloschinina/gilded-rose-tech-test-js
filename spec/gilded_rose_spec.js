describe("Gilded Rose", function() {
  it("If the sell by date has passed, Quality degrades by 1 every day", function() {
    var gilgedRose = new Shop([ new Item("foo", 6, 10) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].sellIn).toEqual(5);
    expect(items[0].quality).toEqual(9);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    var gilgedRose = new Shop([ new Item("foo", 0, 10) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("The Quality of an item is never negative", function() {
    var gilgedRose = new Shop([ new Item("foo", 0, 0) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  describe("'Aged Brie'", function () {
    it("increases in Quality the older it gets", function() {
      var gilgedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].quality).toEqual(1);
    });

    it("increases two times faster after an expiration date", function() {
      var gilgedRose = new Shop([ new Item("Aged Brie", 0, 0) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].quality).toEqual(2);
    });
  });

  it("The Quality of an item is never more than 50", function() {
    var gilgedRose = new Shop([ new Item("Aged Brie", 0, 50) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  describe("'Sulfuras, Hand of Ragnaros', being a legendary item", function () {
    it("never has to be sold", function() {
      var gilgedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", -1, 50) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
    });

    it("never decreases in Quality", function() {
      var gilgedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
    });
  });

  describe("'Backstage passes' increases in Quality as its SellIn value approaches", function () {
    it("Quality increases by 1 when there are more than 10 days", function () {
      var gilgedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });

    it("Quality increases by 2 when there are 10 days or less", function () {
      var gilgedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(22);
    });

    it("Quality increases by 3 when there are 5 days or less", function () {
      var gilgedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(23);
    });

    it("Quality drops to 0 after the concert", function () {
      var gilgedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20) ]);
      var items = gilgedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });
});
