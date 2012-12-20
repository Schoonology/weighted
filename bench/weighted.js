var weighted = require('../')
  , fixtures = {}

function generateOptions(n) {
  var options = []

  for (;n--;) {
    options.push(Math.random().toString().slice(2))
  }

  return options
}

function generateWeights(n) {
  var weights = []

  for (;n--;) {
    weights.push(1)
  }

  return weights
}

module.exports = [2, 8, 512].reduce(function (exports, n) {
  fixtures[n] = {
    optionsArr: generateOptions(n)
  , weightsArr: generateWeights(n)
  , optionsObj: generateOptions(n).reduce(function (obj, key) {
      obj[key] = 1

      return obj
    }, {})
  , newOptionsArr: generateOptions(n)
  , newWeightsArr: generateWeights(n)
  , newOptionsObj: generateOptions(n).reduce(function (obj, key) {
      obj[key] = 1

      return obj
    }, {})
  }

  function reset(arr) {
    delete arr.__weighted_total
  }

  exports['selecting between ' + n + ' options in new Arrays'] = function () {
    reset(fixtures[n].newOptionsArr)
    reset(fixtures[n].newWeightsArr)

    weighted.select(fixtures[n].newOptionsArr, fixtures[n].newWeightsArr)
  }
  exports['selecting between ' + n + ' options in a new Object'] = function () {
    reset(fixtures[n].newOptionsObj)

    weighted.select(fixtures[n].newOptionsObj)
  }
  exports['selecting between ' + n + ' options in old Arrays'] = function () {
    weighted.select(fixtures[n].optionsArr, fixtures[n].weightsArr)
  }
  exports['selecting between ' + n + ' options in an old Object'] = function () {
    weighted.select(fixtures[n].optionsObj)
  }
  exports['selecting between ' + n + ' options in new Arrays, given total'] = function () {
    reset(fixtures[n].newOptionsArr)
    reset(fixtures[n].newWeightsArr)

    weighted.select(fixtures[n].newOptionsArr, fixtures[n].newWeightsArr, {
      total: n
    })
  }
  exports['selecting between ' + n + ' options in a new Object, given total'] = function () {
    reset(fixtures[n].newOptionsObj)

    weighted.select(fixtures[n].newOptionsObj, {
      total: n
    })
  }
  exports['selecting between ' + n + ' options in old Arrays, given total'] = function () {
    weighted.select(fixtures[n].optionsArr, fixtures[n].weightsArr, {
      total: n
    })
  }
  exports['selecting between ' + n + ' options in an old Object, given total'] = function () {
    weighted.select(fixtures[n].optionsObj, {
      total: n
    })
  }

  return exports
}, {})
