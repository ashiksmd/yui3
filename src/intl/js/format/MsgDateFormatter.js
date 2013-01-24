/**
 * Date formatter
 * @class
 * @extends Formatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted. 
 */
DateFormatter = function(values) {
    DateFormatter.superclass.constructor.call(this, values);
    this.styles = {
        "short":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],
        "medium": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],
        "long":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],
        "full":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]
    };
    this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
}

Y.extend(DateFormatter, Formatter);

DateFormatter.createInstance = function(values) {
    return new DateFormatter(values);
}

/**
 * Get parameters from regex match
 * For internal use only.
 * @method
 * @private
 * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
 * @param matches {Array} Result of regex match over pattern string.
 * @return {Boolean} True if value found, False otherwise
 */
DateFormatter.prototype.getParams = function(params, matches) {
    if(matches) {
        if(matches[1]) {
            params.key = matches[1];
        }
        if(matches[3]) {
            params.style = matches[3];
        }
    }

    if(!params.style) {
        params.style = "medium";
    }			//If no style, default to medium

    if(!this.styles[params.style]) {
        return false;
    }	//Invalid style

    if(params.key && Formatter.prototype.getParams.call(this, params)) {
        return true;
    }

    return false;
}

/**
 * Format all instances in str that can be handled by DateFormatter 
 * @method
 * @private
 * @param str {String} Input string/pattern
 * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting
 * @return {String} Formatted result
 */
DateFormatter.prototype.format = function(str, config) {
    var regex = new RegExp(this.regex, "gm");
    var matches = null;
    while((matches = regex.exec(str))) {
        var params = {};

        if(this.getParams(params, matches)) {
            //Got a match
            var style = this.styles[params.style];
            var result = Y.Date.format(new Date(params.value), {
                timezone: config.timezone || Formatter.getCurrentTimeZone(),
                dateFormat: style[0],
                timeFormat: style[1],
                timezoneFormat: style[2]
            })
            str = str.replace(matches[0], result);
        }

    }

    return str;
}
