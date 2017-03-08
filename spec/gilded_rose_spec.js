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
});
