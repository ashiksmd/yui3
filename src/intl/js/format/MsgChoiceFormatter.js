/**
 * Choice formatter. Select ouput based on numerical values
 * @class
 * @extends SelectFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted. 
 */
ChoiceFormatter = function(values) {
    ChoiceFormatter.superclass.constructor.call(this, values);
    this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
}

Y.extend(ChoiceFormatter, SelectFormatter);

ChoiceFormatter.createInstance = function(values) {
    return new ChoiceFormatter(values);
}

/**
 * Parse choices in pattern and get options array.
 * For internal use only.
 * @method
 * @private
 * @param choicesStr {String} Choice string from pattern
 * @return {Array} Array of objects containing value(choice), result, and relation
 */
ChoiceFormatter.prototype.parseOptions = function(choicesStr) {
    var options = [];
    var choicesArray = choicesStr.split("|");
    for (var i=0; i<choicesArray.length; i++) {
        var choice = choicesArray[i];
        var relations = ['#', '<', '\u2264'];
        for (var j=0; j<relations.length; j++) {
            var rel = relations[j];
            if(choice.indexOf(rel) != -1) {
                var mapping = choice.split(rel);
                var ch = {
                    value: mapping[0],
                    result: mapping[1],
                    relation: rel
                };
                options.push(ch);
                break;
            }
        }
    }

    return options;
}

/**
 * Get parameters from regex match
 * For internal use only.
 * @method
 * @private
 * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable
 * @param matches {Array} Result of regex match over pattern string.
 * @return {Boolean} True if value found, False otherwise
 */
ChoiceFormatter.prototype.getParams = function(params, matches) {
    if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
        if(matches[2]) {
            params.choices = this.parseOptions(matches[2]);
            return params.choices === [] ? false: true;
        }
    }

    return false;
}

/**
 * Select output depending on params.value from options in params.choices
 * For internal use
 * @method
 * @private
 * @param params {Object} Object containing value and choices
 * @return {String} selected result
 */
ChoiceFormatter.prototype.select = function(params) {
    for ( var i=0; i<params.choices.length; i++) {
        var choice = params.choices[i];
        var value = choice.value, result = choice.result, relation = choice.relation;
        if( (relation == '#' && value == params.value) || (relation == '<' && value < params.value) || (relation == '\u2264' && value <= params.value)) {
        return result;
        }
    }

    return "";
}

/**
 * Format all instances in str that can be handled by ChoiceFormatter 
 * @method
 * @private
 * @param str {String} Input string/pattern
 * @return {String} Formatted result
 */
ChoiceFormatter.prototype.format = function(str) {
    var regex = new RegExp(this.regex, "gm");
    var matches = null;
    while((matches = regex.exec(str))) {
        var params = {};

        if(this.getParams(params, matches)) {
            var result = this.select(params);
            if(result) {
                str = str.replace(matches[0], result);
            }
        }
    }

    return str;
}
