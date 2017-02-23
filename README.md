# markovian

The simplest way to create a markovian process using [markov chains](https://en.wikipedia.org/wiki/Markov_chain).

## Installation
```
npm i markovian
```

## Usage

```js
var markovian = require('markovian');

// create states
var zero = {
  value: 'zero', // value
  targets: [0, 1, 2], // target indices
  probabilities: [0.25, 0.25, 0.50] // target probabilities
};

var one = {
  value: 'one',
  targets: [0, 2],
  probabilities: [0.25, 0.75]
};

var two = {
  value: 'two',
  targets: [0, 1],
  probabilities: [0.80, 0.20]
};

// create the model
var states = [zero, one, two];
var model = markovian.create(states);

// start generating
setInterval(function(){
  var state = model.tick();
  console.log(state);
}, 500);
```
