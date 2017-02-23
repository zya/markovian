'use strict';

var markov = require('./lib/markov');

var zero = {
  value: 'zero',
  targets: [0, 1, 2],
  probabilities: [0.25, 0.25, 0.50]
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

var states = [zero, one, two];
var model = markov.create(states);

setInterval(function(){
  var state = model.tick();
  console.log(state);
}, 500);
