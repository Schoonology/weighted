var weighted = require('../')
  , optionsArr = ['Wake Up', 'Snooze']
  , weightsArr = [0.25, 0.75]
  , optionsObj = {
      'Wake Up': 0.25
    , 'Snooze': 0.75
    }

console.log(weighted.select(optionsArr, weightsArr))
console.log(weighted.select(optionsObj))
