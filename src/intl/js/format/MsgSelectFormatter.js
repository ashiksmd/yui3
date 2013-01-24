/**
 * Select formatter. Select ouput based on value of key
 * @class
 * @extends Formatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted. 
 */
SelectFormatter = function(values) {
    SelectFormatter.superclass.constructor.call(this, values);
    this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
}

Y.extend(SelectFormatter, Formatter);

SelectFormatter.createInstance = function(values) {
    return new SelectFormatter(values);
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
SelectFormatter.prototype.getParams = function(params, matches) {
    if(matches) {
        if(matches[1]) {
            params.key = matches[1];
        }
    }

    if(params.key && Formatter.prototype.getParams.call(this, params)) {
        return true;
    }

    return false;
}

/**
 * Parse choices in pattern and get options array.
 * For internal use only.
 * @method
 * @private
 * @param str {String} Pattern string
 * @param start {Number} Position in str to start parsing from
 * @return {Object} Object in the form:
         {
           options: [
                 { key: KEY1, value: VALUE1 },
                 { key: KEY2, value: VALUE2 },
                 ... ],
           next: i  //Index of next character in str that can be parsed
         }
 */
SelectFormatter.prototype.parseOptions = function(str, start) {
    var options = {};
    var key = "", value = "", current = "";
    for(var i=start; i<str.length; i++) {
        var ch = str.charAt(i);
        if (ch == '\\') {
            current += ch + str.charAt(i+1);
            i++;
        } else if (ch == '}') {
            if(current == "") {
                i++;
                break;
            }
            value = current;
            options[key.trim()] = value;
            current = key = value = "";
        } else if (ch == '{') {
            key = current;
            current = "";
        } else {
            current += ch;
        }		
    }

    if(current != "") { 
        return null;
    }

    return {
        options: options, 
        next: i
    };
}

/**
 * Select output depending on params.value from options
 * For internal use
 * @method
 * @private
 * @param options {Array} Array of key,value pairs
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
SelectFormatter.prototype.select = function(options, params) {
    for ( var key in options ) {
        if( key == "other" ) {
            continue;	//Will use this only if everything else fails
        }

        if( key == params.value ) {
            return options[key];
        }
    }

    return options["other"];
}

/**
 * Format all instances in str that can be handled by SelectFormatter 
 * @method
 * @private
 * @param str {String} Input string/pattern
 * @return {String} Formatted result
 */
SelectFormatter.prototype.format = function(str) {
    var regex = new RegExp(this.regex, "gm");
    var matches = null;
    while((matches = regex.exec(str))) {
        var params = {};

        if(this.getParams(params, matches)) {
            //Got a match
            var options = this.parseOptions(str, regex.lastIndex);
            if(!options) {
                continue;
            }

            regex.lastIndex = options.next;
            options = options.options;

            var result = this.select(options, params);
            if(result) {
                var start = str.indexOf(matches[0]);
                str = str.slice(0, start) + result + str.slice(regex.lastIndex);
            }
        }

    }

    return str;
}
