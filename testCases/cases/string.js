var assert = chai.assert
, expect = chai.expect
, should = chai.should

describe("sl.string()", function() {
  describe("#initialsToUpper", function() {
    it("首字母大写", function() {
    	expect(sl.string("slib").initialsToUpper()).to.eql("Slib");
    })
  })
});

describe("sl.string()", function() {
  describe("#isContain", function() {
    it("判断是否包含某指定字符", function() {
		assert.equal(false, sl.string("Slib").isContain("s"));
		assert.equal(true, sl.string("Slib").isContain("S"));
		assert.equal(false, sl.string("Slib").isContain(""));
    })
  })
});