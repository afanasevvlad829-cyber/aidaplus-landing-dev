(function (global) {
  var ACNext = global.ACNext;

  function initShifts(ctx) {
    var mockShifts = [
      { id: "jun-hit", name: "Июнь HIT", price: 75900, seats: 42 },
      { id: "jul-ai", name: "Июль AI", price: 79900, seats: 61 },
      { id: "aug-pro", name: "Август PRO", price: 82900, seats: 73 }
    ];

    ctx.store.patch({ shifts: mockShifts }, "shifts:init");
    ctx.log("shifts:init -> " + mockShifts.length + " смен");
  }

  ACNext.features.initShifts = initShifts;
})(window);
