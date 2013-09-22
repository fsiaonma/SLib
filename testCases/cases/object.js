var assert = chai.assert
, expect = chai.expect
, should = chai.should

describe("sl.object()", function() {
  describe("#equalsTo", function() {
    it("判断相等", function() {
      assert.equal(true, sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).equalsTo({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }));

      assert.equal(false, sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).equalsTo({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "objfalse"}
      }));
    })
  })
});
