function _selectArr(set, weights, rand) {
  if (typeof rand !== 'function') {
    rand = Math.random
  }

  var key = rand()
    , index = 0

  for (;index < weights.length; index++) {
    key -= weights[index]

    if (key < 0) {
      return set[index]
    }
  }

  throw new Error('All weights do not add up to >= 1 as expected.')
}

function _selectObj(obj, rand) {
  var keys = Object.keys(obj)
    , values = keys.map(function (key) {
        return obj[key]
      })

  return _selectArr(keys, values, rand)
}

function select(set, weights, rand) {
  if (Array.isArray(set)) {
    if (Array.isArray(weights)) {
      if (set.length === weights.length) {
        return _selectArr(set, weights, rand)
      }

      throw new Error('Set and Weights are different sizes.')
    }

    throw new Error('Set is an Array, and Weights is not.')
  }

  if (typeof set === 'object') {
    return _selectObj(set, weights || rand)
  }

  throw new Error('Set is not an Object, nor is it an Array.')
}

module.exports = select
module.exports.select = select
