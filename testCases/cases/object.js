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

describe("sl.object()", function() {
  describe("#isContainKey", function() {
    it("判断是否包含指定键值", function() {
      assert.equal(true, sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).isContainKey(1));
      
      assert.equal(false, sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).isContainKey(5));
    })
  })
});

describe("sl.object()", function() {
  describe("#toString", function() {
    it("对象序列化", function() {
      expect("{1:1, 2:2, 3:[1, 2], 4:{obj:obj}}").to.have.string(sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).toString());
    })
  })
});

describe("sl.object()", function() {
  describe("#clone", function() {
    it("克隆对象", function() {
      expect({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).to.eql(sl.object({
        1: 1, 
        2: "2", 
        3: [1, 2], 
        4: {obj: "obj"}
      }).clone());
    })
  })
});