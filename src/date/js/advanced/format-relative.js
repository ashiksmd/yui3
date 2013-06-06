/**
 * YRelativeTimeFormat class provides localized formatting of relative time values such as "3 minutes ago".
 * Relative time formats supported are defined by how many units they may include.
 * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages.
 * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used.
 */

/**
 * Class to handle relative time formatting
 * @class __YRelativeTimeFormat
 * @namespace Date
 * @private
 * @constructor
 * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS
 */
Y.Date.__YRelativeTimeFormat = function(style) {
    if(style === null) {
        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else if(Y.Lang.isString(style)) {
        style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }
        
    this.patterns = Y.Intl.get(MODULE_NAME);
    this.style = style;
		
    switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            this.numUnits = 2;
            this.abbr = true;
            break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            this.numUnits = 2;
            this.abbr = false;
            break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            this.numUnits = 1;
            this.abbr = true;
            break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            this.numUnits = 1;
            this.abbr = false;
            break;
        default:
            Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { return new Date(); },

    /**
     * Format Style values to use during format/parse
     * @property RELATIVE_TIME_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    RELATIVE_TIME_FORMATS: {
        ONE_OR_TWO_UNITS_ABBREVIATED: 0,
        ONE_OR_TWO_UNITS_LONG: 1,
        ONE_UNIT_ABBREVIATED: 2,
        ONE_UNIT_LONG: 4
    }
});

/**
 * Add value to result array
 * @method _addResult
 * @private
 * @param type {String} Type of value. eg. day, month, year, etc
 * @param value {Number} Number of elements of type. eg. 3 days, value would be 3
 * @return {Boolean} Whether the value was added to the result array
 */
YRelativeTimeFormat.prototype._addResult = function(type, value) {
    if (value === 0 && this.result.length === 0 && type !== "second") {
                            //First result should not be zero, except if everything before seconds is zero
        return false;
    }

    var text,
        patternPlural = type + "s",
        abbrev = type + "_abbr",
        abbrevPlural = patternPlural + "_abbr";

    if(this.abbr) {
        text = value + " " + (value !== 1 ? this.patterns[abbrevPlural] : this.patterns[abbrev]);
    } else {
        text = value + " " + (value !== 1 ? this.patterns[patternPlural] : this.patterns[type]);
    }

    this.result.push(text);
    return true;
};
	
/**
 * Formats a time value.
 * @method format
 * @for Date.__YRelativeTimeFormat
 * @param {Number} timeValue The time value (seconds since Epoch) to be formatted.
 * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.
          It must be greater than or equal to timeValue
 * @return {String} The formatted string
 */
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    if(relativeTo === null) {
        relativeTo = (new Date()).getTime()/1000;
        if(timeValue > relativeTo) {
            Y.error("timeValue must be in the past");
        }
    } else if(timeValue > relativeTo) {
        Y.error("relativeTo must be greater than or equal to timeValue");
    }

    var date = new Date((relativeTo - timeValue)*1000),
        numUnits = this.numUnits,
        value,
        pattern, i;

    value = [
        ["year", date.getUTCFullYear() - 1970], //Need zero-based index
        ["month", date.getUTCMonth()],
        ["day", date.getUTCDate()-1],           //Need zero-based index
        ["hour", date.getUTCHours()],
        ["minute", date.getUTCMinutes()],
        ["second", date.getUTCSeconds()]
    ];

    this.result = [];
    for (i=0; i<value.length && numUnits > 0; i++) {
        if(this._addResult(value[i][0], value[i][1])) {
            numUnits--;
        }
    }

    pattern = (this.result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    for(i=0; i<this.result.length; i++) {
        pattern = pattern.replace("{" + i + "}", this.result[i]);
    }
    for(i=this.result.length; i<this.numUnits; i++) {
        pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    return pattern;
};
