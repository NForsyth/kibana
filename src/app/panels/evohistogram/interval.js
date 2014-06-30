define([
  'kbn'
],
function (kbn) {
  'use strict';

  /**
   * manages the interval logic
   * @param {[type]} interval_string  An interval string in the format '1m', '1y', etc
   */
  function Interval(interval_string) {
    this.string = interval_string;

    var info = kbn.describe_number_interval(interval_string);
    this.type = "b";
    this.ms = Math.ceil(info.sec * 1000);

    this.get = this.get_simple;
  }

  Interval.prototype = {
    toString: function () {
      return this.string;
    },
    after: function(current_ms) {
      return this.get(current_ms, 1);
    },
    before: function (current_ms) {
      return this.get(current_ms, -1);
    },
    get_complex: function (current, delta) {
      this.date.setTime(current);
      switch(this.type) {
      case 'M':
        this.date.setUTCMonth(this.date.getUTCMonth() + delta);
        break;
      case 'y':
        this.date.setUTCFullYear(this.date.getUTCFullYear() + delta);
        break;
      }
      return this.date.getTime();
    },
    get_simple: function (current, delta) {
      return current + (delta * this.ms);
    }
  };

  return Interval;

});