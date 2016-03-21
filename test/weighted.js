var weighted = require('../')
var expect = require('chai').expect
var td = require('testdouble')
var OPTIONS_ARR_5 = [1, 2, 3, 4, 5]
var WEIGHTS_ARR_5 = [0.2, 0.4, 0.1, 0.2, 0.1]
var WEIGHTS_ARR_4 = [0.2, 0.4, 0.2, 0.2]
var OPTIONS_OBJ = OPTIONS_ARR_5.reduce(function (obj, key, index) {
  obj[key] = WEIGHTS_ARR_5[index]
  return obj
}, {})

describe('Weighted', function () {
  it('should export a Function', function () {
    expect(weighted).to.be.a('function')
  })

  it('should export as .select()', function () {
    expect(weighted.select).to.be.a('function')
    expect(weighted.select).to.equal(weighted)
  })

  describe('Array, Array => Value', function () {
    it('should return a value', function () {
      expect(weighted.select(OPTIONS_ARR_5, WEIGHTS_ARR_5)).to.be.a('number')
    })

    it('should accept Array, Null', function () {
      expect(weighted.select(OPTIONS_ARR_5)).to.be.a('number')
    })

    it('should reject Array[m], Array[n] where m != n', function () {
      expect(function () {
        weighted.select(OPTIONS_ARR_5, WEIGHTS_ARR_4)
      }).to.throw(TypeError)
    })

    it('should reject Array, Object', function () {
      expect(function () {
        weighted.select(OPTIONS_ARR_5, OPTIONS_OBJ)
      }).to.throw(TypeError)
    })

    it('should reject Array, Primitive', function () {
      expect(function () {
        weighted.select(OPTIONS_ARR_5, 42)
      }).to.throw(TypeError)
    })

    it('should call a provided rand function', function () {
      var rand = td.function()
      td.when(rand()).thenReturn(0)

      weighted.select(OPTIONS_ARR_5, WEIGHTS_ARR_5, { rand: rand })

      td.verify(rand())
    })
  })

  describe('Object => Value', function () {
    it('should return a value', function () {
      expect(weighted.select(OPTIONS_OBJ)).to.be.a('string')
    })
  })

  it('should reject other calling forms', function () {
    expect(function () {
      weighted.select(1, 2, 3, 4, 5)
    }).to.throw(TypeError)
  })
})
