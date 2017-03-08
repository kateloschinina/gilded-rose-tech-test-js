describe("Gilded Rose", function() {

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

  it("“Aged Brie” actually increases in Quality the older it gets", function() {
    var gilgedRose = new Shop([ new Item("Aged Brie", 0, 0) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("The Quality of an item is never negative", function() {
    var gilgedRose = new Shop([ new Item("Aged Brie", 0, 50) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  describe("“Sulfuras, Hand of Ragnaros”, being a legendary item", function () {
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
});
