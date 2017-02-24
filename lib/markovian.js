'use strict';

var _ = require('lodash');

function toProbabilityArray(target, index, probabilities) {
  var length = _.clamp(probabilities[index] * 100, 0, 100);
  return _.fill(Array(parseInt(length)), index);
}

function createInternalState(state) {
  return _(state.targets)
    .map(_.partial(toProbabilityArray, _, _, state.probabilities))
    .flatten()
    .shuffle()
    .value();
}

function validate(state) {
  if (_.sum(state.probabilities) != 1) throw new Error();
  if (state.probabilities.length != state.targets.length) throw new Error();
}

function Markov(states) {
  states.forEach(validate);

  this.states = states;
  this.currentIndex = 0;
  this.internalStates = states.map(createInternalState);
}

Markov.prototype.tick = function () {
  var current = this.internalStates[this.currentIndex];
  var random = _.random(0, 99, false);
  var index = current[random];
  this.currentIndex = index;
  return this.states[this.currentIndex].value;
};

module.exports.create = function (states) {
  return new Markov(states);
};
