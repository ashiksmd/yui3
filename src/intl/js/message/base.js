/**
 * This module implements Message formatting similar to the MessageFormat API in ICU
 * @module intl-message-format
 * @requires intl
 */
var MODULE_NAME = "intl-message-format",
    PluralRules, inRange,
    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,
    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;

/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
Y.Intl.MsgBaseFormatter = function(values) {
    this.values = values;
};

Formatter = Y.Intl.MsgBaseFormatter;

Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        if(Y.Lang.isArray(this.values)) {
            key = parseInt(key, 10);
        }
        return this.values[key];
    },

    /**
     * Get value of params.key
     * The value found will be set to params.value
     * @method getParams
     * @param params {Object} Object containing key as in { key: "KEY" }
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params) {
        if(!params || !params.key) {
            return false;
        }

        var value = this.getValue(params.key);
	
        if(value !== undefined) {
            params.value = value;
            return true;
        }

        return false;
    }
});

//For date and time formatters
Y.mix(Formatter, {
    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        if(Y.Date === undefined || Y.Date.Timezone === undefined) { return "GMT"; }
        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);
    }
});
