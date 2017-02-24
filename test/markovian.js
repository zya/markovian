'use strict';

var _ = require('lodash');
var assert = require('assert');

var markovian = require('../lib/markovian');

describe('markovian', function () {
  describe('.create', function () {
    it('returns an error if the sum of a state\'s probabilities is larger than 1', function () {
      var state = {
        value: 'test',
        targets: [0, 1],
        probabilities: [0.5, 0.6]
      };

      assert.throws(function () {
        markovian.create([state]);
      });
    });

    it('returns an error if the sum of a state\'s probabilities is smaller than 1', function () {
      var state = {
        value: 'test',
        targets: [0, 1],
        probabilities: [0.1, 0.1]
      };

      assert.throws(function () {
        markovian.create([state]);
      });
    });

    it('returns an error if the length of targets and probabilities do not match', function () {
      var state = {
        value: 'test',
        targets: [0, 1],
        probabilities: [0.5, 0.1, 0.4]
      };

      assert.throws(function () {
        markovian.create([state]);
      });
    });
  });

  describe('tick', function () {
    it('returns values following the specified probabilities', function () {
      var states = [
        {
          value: 'zero',
          targets: [0, 1],
          probabilities: [0.2, 0.8]
        },
        {
          value: 'one',
          targets: [0, 1],
          probabilities: [0.7, 0.3]
        }
      ];

      var markov = markovian.create(states);

      var values = [];
      for (var i = 0; i < 100; i++) {
        markov.currentIndex = 0;
        values.push(markov.tick());
      }

      var results = _.partition(values, function (value) {
        return value === 'zero';
      });

      assert.strictEqual(_.inRange(results[0].length, 10, 30), true);
      assert.strictEqual(_.inRange(results[1].length, 65, 95), true);
    });
  });
});
