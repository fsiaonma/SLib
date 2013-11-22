var assert = chai.assert
, expect = chai.expect
, should = chai.should

describe("sl.array()", function() {
  describe("#qRemoveByIndex", function() {
    it("快速移除", function() {
    	expect(sl.array([1, "2", [3], {4: "4"}]).qRemoveByIndex(1)).to.eql([1,{4: "4"},[3]]);
    	expect(sl.array([1, 2, 3, 4]).qRemoveByIndex(1)).to.eql([1, 4, 3]);
    })
  })
});

describe("sl.array()", function() {
  describe("#cRemoveByIndex", function() {
    it("顺序移除", function() {
    	expect(sl.array([1, "2", [3], {4: "4"}]).cRemoveByIndex(1)).to.eql([1, [3], {4: "4"}]);
    	expect(sl.array([1, 2, 3, 4]).cRemoveByIndex(1)).to.eql([1, 3, 4]);
    })
  })
});

describe("sl.array()", function() {
  describe("#random", function() {
    it("随机抽取", function() {
    	expect([1, "2", 3, "4"]).to.include.members([sl.array([1, "2", 3, "4"]).random()]);
    })
  })
});

describe("sl.array()", function() {
  describe("#equalsTo", function() {
    it("判断相等", function() {
      assert.equal(true, sl.array([1, "2", [3], {4: "4"}]).equalsTo([1, "2", [3], {4: "4"}]));
      assert.equal(false, sl.array([1, "2", [3], {4: "4"}]).equalsTo([1, "2", [3], {4: "5"}]));
    })
  })
});

describe("sl.array()", function() {
  describe("#isContain", function() {
    it("判断是否存在", function() {
    	assert.equal(true, sl.array([1, "2", [3], {4: "4"}]).isContain(1));
    	assert.equal(true, sl.array([1, "2", [3], {4: "4"}]).isContain("2"));
    	assert.equal(true, sl.array([1, "2", [3], {4: "4"}]).isContain([3]));
    	assert.equal(true, sl.array([1, "2", [3], {4: "4"}]).isContain({4: "4"}));
    })
  })
});

describe("sl.array()", function() {
  describe("#toString", function() {
    it("数组序列化", function() {
    	expect("[1, 2, [3], {4:4}]").to.have.string(sl.array([1, "2", [3], {4: "4"}]).toString());
    })
  })
});

describe("sl.array()", function() {
  describe("#clone", function() {
    it("克隆数组", function() {
    	expect([1, "2", [3], {4: "4"}]).to.eql(sl.array([1, "2", [3], {4: "4"}]).clone());
    })
  })
});