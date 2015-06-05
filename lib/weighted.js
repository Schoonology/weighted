function getTotal(weights) {
  var total = weights.__weighted_total

  if (total != null) {
    return total
  }

  function wrap(arr, fn) {
    return function () {
      arr.__weighted_total = null
      fn.apply(arr, arguments)
    }
  }

  if (total === undefined) {
    ;['pop', 'push', 'shift', 'unshift', 'splice'].forEach(function (key) {
      weights[key] = wrap(weights, weights[key])
    })
  }

  total = weights.__weighted_total = weights.reduce(function (prev, curr) {
    return prev + curr
  }, 0)

  return total
}

function _selectArr(set, weights, options) {
  if (typeof options.rand !== 'function') {
    options.rand = Math.random
  }

  if (set.length !== weights.length) {
    throw new TypeError('Different number of options & weights.')
  }

  var total = options.total || (options.normal ? 1 : getTotal(weights))
    , key = options.rand() * total
    , index = 0

  for (;index < weights.length; index++) {
    key -= weights[index]

    if (key < 0) {
      return set[index]
    }
  }

  throw new RangeError('All weights do not add up to >= 1 as expected.')
}

function _selectObj(obj, options) {
  var keys = Object.keys(obj)
    , values = keys.map(function (key) {
        return obj[key]
      })

  return _selectArr(keys, values, options)
}

function select(set, weights, options) {
  if (typeof options === 'function') {
    options = {
      rand: options
    }
  }

  if (options == null) {
    options = {}
  }

  if (Array.isArray(set)) {
    if (weights == null) {
      weights = set.map(function () {
        return 1
      })
    }

    if (Array.isArray(weights)) {
      if (set.length === weights.length) {
        return _selectArr(set, weights, options)
      }

      throw new TypeError('Set and Weights are different sizes.')
    }

    throw new TypeError('Set is an Array, and Weights is not.')
  }

  if (typeof set === 'object') {
    return _selectObj(set, weights || options)
  }

  throw new TypeError('Set is not an Object, nor is it an Array.')
}

module.exports = select
module.exports.select = select
