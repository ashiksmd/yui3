/**
 * String formatter
 * @class
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted. 
 */
StringFormatter = function(values) {
    StringFormatter.superclass.constructor.call(this, values);
    this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
}

Y.extend(StringFormatter, Formatter);

StringFormatter.createInstance = function(values) {
    return new StringFormatter(values);
}

/**
 * Get parameters from regex match
 * For internal use only.
 * @method
 * @private
 * @param params {Object} Object to receive value. Function will store key and value in this variable
 * @param matches {Array} Result of regex match over pattern string.
 * @return {Boolean} True if value found, False otherwise
 */
StringFormatter.prototype.getParams = function(params, matches) {
    if(matches && matches[1]) {
        params.key = matches[1];
        if(Formatter.prototype.getParams.call(this, params)) {
            return true;
        }
    }
	
    return false;
}

/* Format all instances in str that can be handled by StringFormatter 
 * @method
 * @private
 * @param str {String} Input string/pattern
 * @return {String} Formatted result
 */
StringFormatter.prototype.format = function(str) {
    var regex = new RegExp(this.regex, "gm");
    var matches = null;
    while((matches = regex.exec(str))) {
        var params = {};

        if(this.getParams(params, matches)) {
            //Got a match
            str = str.replace(matches[0], params.value);
        }

    }

    return str;
}
