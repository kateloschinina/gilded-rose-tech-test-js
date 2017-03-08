describe("Gilded Rose", function() {

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    var gilgedRose = new Shop([ new Item("foo", 0, 10) ]);
    var items = gilgedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

});
