'use strict';

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
});
