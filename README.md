# weighted

A dead-simple module for picking an item from a set of items while picking some
more frequently than others. Each item is given a numerical "weight": each
item's likelihood to be selected is directly proportional to its share of the
total weight.

For example, if I have two items, "apple" and "orange", with "apple" having a
weight of 1 and "orange" having a weight of 2, then "orange" is _twice_ as
likely to be chosen as "apple" (2/3 vs 1/3). If we add a third option, "banana",
with a weight of 2, then "banana" and "orange" are each as likely to be picked
as the other, and twice as likely to be picked as "apple" (2/5 vs 1/5).

## Installation

```
npm install weighted
```

## Usage

Weighted returns a Function additionally available as `weighted.select`:

    weighted(set, weights, [options])
    weighted(obj, [options])
    weighted.select(set, weights, [options])
    weighted.select(obj, [options])

Selections can be made based on either a pair of Arrays (one with the items,
and one with their weights) or a single Object (with the items as keys and
their weights as values). In each of the following examples, `'Wake Up'` has a
25% chance of being selected, while `'Snooze Alarm'` has a 75% chance. If we
added more items, the chances would change accordingly as discussed above.

### Array version

    var weighted = require('weighted')

    var items = ['Wake Up', 'Snooze Alarm']
      , weights = [0.25, 0.75]

    console.log('Decision:', weighted.select(items, weights))

### Object version

    var weighted = require('weighted')

    var items = {
    	  'Wake Up': 0.25,
    	  'Snooze Alarm': 0.75
    	}

    console.log('Decision:', weighted.select(items))

## Available options

The third argument, `options`, shapes the way Weighted performs the selection:

| Name | Description |
|------|-------------|
| rand | A function returning a number in `[0, )` to use for selection. Assumed to be (though by no means required) uniformly distributed. See "Overriding rand", below. |
| normal | If truthy all weights are assumed to add up to 1. See "Pre-normalizing for performance", below. |

### Overriding rand

By default Weighted uses `Math.random()` for selection. This can be overridden
by providing a Function as the `rand` option. Like `Math.random()`, it should
require no arguments and return a number between 0 and 1. For example, if you
wanted to override `rand` with the [`mersenne`][mersenne] library:

    var weighted = require('weighted')
      , mersenne = require('mersenne')

    var items = ['Wake Up', 'Snooze Alarm']
      , weights = [0.25, 0.75]

    function rand() {
      return mersenne.rand() / 32768
    }

    console.log('Decision:', weighted.select(items, weights, rand))

## Pre-normalizing

This module is optimized for multiple selections from the same set of items,
and will try to front-load the costs of normalizing any weights you assign them.
but if the set of items or their weights need to change constantly, you can help
Weighted out by normalizing or tallying those weights yourself.

If all the weights add up to 1 (as they have in our examples), you can pass a
truthy value to the `normal` option, and Weighted will assume as much. If all
the weights add up to any other value, you can provide a number as the `total`
option, and Weighted will use that total instead.

From a human perspective, it can be convenient to normalize your weights, as
any weight multiplied by 100 will give you the exact percentage likelihood that
item will be selected. On the other hand, if there is some "voting" mechanism
influencing the weights, for instance, simply using the number of votes as the
weight for each item will work well enough.

Microbenchmarks are available via `npm run bench` if you want examples of the
different patterns and their performance implications.

## Selecting multiple items simultaneously

For now, selecting multiple items in the same call is unsupported. If you want
multiple selections (i.e. duplicates are okay, you just want multiple), then
calling `weighted.select` multiple times is sufficient. If you're hoping to
get multiple _unique_ selections in the same call, you're best off writing a
wrapper to suit your specific use case. [Issue #2][issue-2] has one approach.

## Thanks

This module was originally built for [`bot-factory`][bot-factory], and I'd be
remiss if I didn't thank Red Robot Labs for sponsoring that work, and the AI
team at 38 Studios for teaching me just how "intelligent" random activity can
seem.

[mersenne]: https://www.npmjs.com/package/mersenne
[issue-2]: https://github.com/Schoonology/weighted/issues/2
[bot-factory]: https://www.npmjs.com/package/bot-factory
