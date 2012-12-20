# weighted

A dead-simple module for picking a random item from a set, with weights. Extremely useful for bot scripting.

## Installation

It's on NPM:

    npm install weighted

## Usage

### Selection Function

Weighted returns a Function additionally available as `weighted.select`:

    weighted.select(set, weights, [rand])
    weighted.select(obj, [rand])

Selections can be made based on either a pair of Arrays or a single Object, like so:

#### Array Version

    var weighted = require('weighted')

    var options = ['Wake Up', 'Snooze Alarm']
      , weights = [0.25, 0.75]

    console.log('Decision:', weighted.select(options, weights))

#### Object Version

    var weighted = require('weighted')

    var options = {
    	  'Wake Up': 0.25,
    	  'Snooze Alarm': 0.75
    	}

    console.log('Decision:', weighted.select(options))

### Overriding Rand

By default, `weighted.select` uses Math.random() for selection. This can be overridden by providing a Function as the third, `rand`, parameter:

    var weighted = require('weighted')
      , mersenne = require('mersenne')

    var options = ['Wake Up', 'Snooze Alarm']
      , weights = [0.25, 0.75]

    function rand() {
      return mersenne.rand() / 32768
    }

    console.log('Decision:', weighted.select(options, weights, rand))

## A Note on Weights

Version 0.1 required that all weights add up to exactly 1. As of version 0.2 this is no longer required, simply recommended.

## A Note on Performance

Weighted is optimized for selection, especially repeated selection over the same Arrays of actions and weights. See the output and source of `npm run-script bench` for details.

## Thanks

 * The AI folks at 38 Studios for teaching me just how "intelligent" random activity can seem.

## License

    Copyright (C) 2012 Michael Schoonmaker (michael.r.schoonmaker@gmail.com)

    This project is free software released under the MIT/X11 license:

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
