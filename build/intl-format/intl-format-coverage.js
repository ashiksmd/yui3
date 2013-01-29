if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/intl-format/intl-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/intl-format/intl-format.js",
    code: []
};
_yuitest_coverage["build/intl-format/intl-format.js"].code=["YUI.add('intl-format', function (Y, NAME) {","","var Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, PluralFormatter, ChoiceFormatter, formatters;","","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],","        \"medium\": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],","        \"long\":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],","        \"full\":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"medium\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"long\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],","        \"full\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": Y.Number.STYLES.NUMBER_STYLE,","        \"percent\": Y.Number.STYLES.PERCENT_STYLE,","        \"currency\": Y.Number.STYLES.CURRENCY_STYLE","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var result = options.other;","    if(params.value === 0 && options.zero) {","        result = options.zero;","    }","    if(params.value === 1 && options.one) {","        result = options.one;","    }","    if(params.value === 2 && options.two) {","        result = options.two;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {\"requires\": [\"datatype-date-advanced-format\", \"datatype-number-advanced-format\", \"intl\"]});"];
_yuitest_coverage["build/intl-format/intl-format.js"].lines = {"1":0,"3":0,"13":0,"14":0,"17":0,"19":0,"27":0,"28":0,"30":0,"41":0,"42":0,"45":0,"47":0,"48":0,"49":0,"52":0,"60":0,"65":0,"74":0,"83":0,"84":0,"96":0,"97":0,"98":0,"101":0,"102":0,"110":0,"111":0,"114":0,"123":0,"124":0,"125":0,"126":0,"130":0,"140":0,"143":0,"144":0,"146":0,"148":0,"153":0,"164":0,"165":0,"166":0,"172":0,"175":0,"176":0,"184":0,"185":0,"188":0,"197":0,"198":0,"199":0,"201":0,"202":0,"206":0,"207":0,"210":0,"211":0,"214":0,"215":0,"218":0,"229":0,"232":0,"233":0,"235":0,"237":0,"238":0,"244":0,"249":0,"260":0,"261":0,"262":0,"268":0,"271":0,"272":0,"280":0,"281":0,"292":0,"293":0,"294":0,"299":0,"302":0,"303":0,"311":0,"312":0,"315":0,"324":0,"325":0,"326":0,"328":0,"329":0,"333":0,"334":0,"335":0,"338":0,"339":0,"342":0,"343":0,"346":0,"356":0,"359":0,"360":0,"362":0,"364":0,"367":0,"368":0,"370":0,"374":0,"385":0,"386":0,"387":0,"390":0,"391":0,"399":0,"400":0,"403":0,"412":0,"413":0,"414":0,"418":0,"419":0,"422":0,"440":0,"443":0,"444":0,"445":0,"446":0,"447":0,"448":0,"449":0,"450":0,"451":0,"453":0,"454":0,"455":0,"456":0,"457":0,"458":0,"460":0,"464":0,"465":0,"468":0,"482":0,"483":0,"484":0,"487":0,"488":0,"492":0,"502":0,"505":0,"506":0,"508":0,"510":0,"511":0,"512":0,"515":0,"516":0,"518":0,"519":0,"520":0,"521":0,"526":0,"537":0,"538":0,"539":0,"542":0,"543":0,"551":0,"552":0,"562":0,"563":0,"564":0,"565":0,"567":0,"568":0,"570":0,"571":0,"574":0,"576":0,"587":0,"588":0,"589":0,"592":0,"593":0,"601":0,"602":0,"605":0,"613":0,"616":0,"617":0,"618":0,"619":0,"620":0,"621":0,"622":0,"623":0,"628":0,"629":0,"634":0,"645":0,"646":0,"647":0,"648":0,"652":0,"662":0,"663":0,"664":0,"665":0,"667":0,"669":0,"673":0,"683":0,"686":0,"687":0,"689":0,"690":0,"691":0,"692":0,"697":0,"709":0,"711":0,"753":0,"754":0,"755":0,"756":0,"757":0,"759":0};
_yuitest_coverage["build/intl-format/intl-format.js"].functions = {"MsgBaseFormatter:13":0,"getValue:26":0,"getParams:40":0,"format:59":0,"createInstance:72":0,"getCurrentTimeZone:82":0,"StringFormatter:96":0,"createInstance:110":0,"getParams:122":0,"format:139":0,"DateFormatter:164":0,"createInstance:184":0,"getParams:196":0,"format:228":0,"TimeFormatter:260":0,"createInstance:280":0,"NumberFormatter:292":0,"createInstance:311":0,"getParams:323":0,"format:355":0,"SelectFormatter:385":0,"createInstance:399":0,"getParams:411":0,"parseOptions:439":0,"select:481":0,"format:501":0,"PluralFormatter:537":0,"createInstance:551":0,"select:562":0,"ChoiceFormatter:587":0,"createInstance:601":0,"parseOptions:612":0,"getParams:644":0,"select:661":0,"format:682":0,"formatMessage:752":0,"(anonymous 1):1":0};
_yuitest_coverage["build/intl-format/intl-format.js"].coveredLines = 227;
_yuitest_coverage["build/intl-format/intl-format.js"].coveredFunctions = 37;
_yuitest_coverline("build/intl-format/intl-format.js", 1);
YUI.add('intl-format', function (Y, NAME) {

_yuitest_coverfunc("build/intl-format/intl-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/intl-format/intl-format.js", 3);
var Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter, PluralFormatter, ChoiceFormatter, formatters;

/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 13);
Y.Intl.MsgBaseFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "MsgBaseFormatter", 13);
_yuitest_coverline("build/intl-format/intl-format.js", 14);
this.values = values;
};

_yuitest_coverline("build/intl-format/intl-format.js", 17);
Formatter = Y.Intl.MsgBaseFormatter;

_yuitest_coverline("build/intl-format/intl-format.js", 19);
Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getValue", 26);
_yuitest_coverline("build/intl-format/intl-format.js", 27);
if(Y.Lang.isArray(this.values)) {
            _yuitest_coverline("build/intl-format/intl-format.js", 28);
key = parseInt(key, 10);
        }
        _yuitest_coverline("build/intl-format/intl-format.js", 30);
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
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 40);
_yuitest_coverline("build/intl-format/intl-format.js", 41);
if(!params || !params.key) {
            _yuitest_coverline("build/intl-format/intl-format.js", 42);
return false;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 45);
var value = this.getValue(params.key);
	
        _yuitest_coverline("build/intl-format/intl-format.js", 47);
if(value !== undefined) {
            _yuitest_coverline("build/intl-format/intl-format.js", 48);
params.value = value;
            _yuitest_coverline("build/intl-format/intl-format.js", 49);
return true;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 52);
return false;
    },

    /**
     * Format string. Will be overridden in descendants
     * @method format
     */
    format: function(/*str, config*/) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 59);
_yuitest_coverline("build/intl-format/intl-format.js", 60);
Y.error('Not implemented');	//Must override in descendants
    }
});

//For date and time formatters
_yuitest_coverline("build/intl-format/intl-format.js", 65);
Y.mix(Formatter, {
    /**
     * Create an instance of the formatter
     * @method createInstance
     * @static
     * //param values {Array|Object} The data to be processed and inserted.
     */
    createInstance: function(/*values*/) {
        //return new Formatter(values);
        _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 72);
_yuitest_coverline("build/intl-format/intl-format.js", 74);
Y.error('Not implemented');	//Must override in descendants
    },

    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getCurrentTimeZone", 82);
_yuitest_coverline("build/intl-format/intl-format.js", 83);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/intl-format/intl-format.js", 84);
return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);
    }
});
/**
 * String formatter
 * @class StringFormatter
 * @namespace Intl
 * @extends MsgBaseFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 96);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "StringFormatter", 96);
_yuitest_coverline("build/intl-format/intl-format.js", 97);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 98);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/intl-format/intl-format.js", 101);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 102);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 110);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 110);
_yuitest_coverline("build/intl-format/intl-format.js", 111);
return new StringFormatter(values);
};

_yuitest_coverline("build/intl-format/intl-format.js", 114);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 122);
_yuitest_coverline("build/intl-format/intl-format.js", 123);
if(matches && matches[1]) {
            _yuitest_coverline("build/intl-format/intl-format.js", 124);
params.key = matches[1];
            _yuitest_coverline("build/intl-format/intl-format.js", 125);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/intl-format/intl-format.js", 126);
return true;
            }
        }
	
        _yuitest_coverline("build/intl-format/intl-format.js", 130);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 139);
_yuitest_coverline("build/intl-format/intl-format.js", 140);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/intl-format/intl-format.js", 143);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/intl-format/intl-format.js", 144);
params = {};

            _yuitest_coverline("build/intl-format/intl-format.js", 146);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/intl-format/intl-format.js", 148);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/intl-format/intl-format.js", 153);
return str;
    }
}, true);/**
 * Date formatter
 * @class DateFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 164);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "DateFormatter", 164);
_yuitest_coverline("build/intl-format/intl-format.js", 165);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 166);
this.styles = {
        "short":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],
        "medium": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],
        "long":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],
        "full":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]
    };
    _yuitest_coverline("build/intl-format/intl-format.js", 172);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/intl-format/intl-format.js", 175);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 176);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 184);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 184);
_yuitest_coverline("build/intl-format/intl-format.js", 185);
return new DateFormatter(values);
};

_yuitest_coverline("build/intl-format/intl-format.js", 188);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 196);
_yuitest_coverline("build/intl-format/intl-format.js", 197);
if(matches) {
            _yuitest_coverline("build/intl-format/intl-format.js", 198);
if(matches[1]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 199);
params.key = matches[1];
            }
            _yuitest_coverline("build/intl-format/intl-format.js", 201);
if(matches[3]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 202);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 206);
if(!params.style) {
            _yuitest_coverline("build/intl-format/intl-format.js", 207);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/intl-format/intl-format.js", 210);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/intl-format/intl-format.js", 211);
return false;
        }	//Invalid style

        _yuitest_coverline("build/intl-format/intl-format.js", 214);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/intl-format/intl-format.js", 215);
return true;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 218);
return false;
    },

    /**
     * Format all instances in str that can be handled by DateFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting
     * @return {String} Formatted result
     */
    format: function(str, config) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 228);
_yuitest_coverline("build/intl-format/intl-format.js", 229);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/intl-format/intl-format.js", 232);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/intl-format/intl-format.js", 233);
params = {};

            _yuitest_coverline("build/intl-format/intl-format.js", 235);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/intl-format/intl-format.js", 237);
style = this.styles[params.style];
                _yuitest_coverline("build/intl-format/intl-format.js", 238);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/intl-format/intl-format.js", 244);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/intl-format/intl-format.js", 249);
return str;
    }
}, true);/**
 * Time formatter
 * @class TimeFormatter
 * @extends DateFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 260);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "TimeFormatter", 260);
_yuitest_coverline("build/intl-format/intl-format.js", 261);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 262);
this.styles = {
        "short": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],
        "medium": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],
        "long": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],
        "full": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]
    };
    _yuitest_coverline("build/intl-format/intl-format.js", 268);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/intl-format/intl-format.js", 271);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 272);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 280);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 280);
_yuitest_coverline("build/intl-format/intl-format.js", 281);
return new TimeFormatter(values);
};
/**
 * Number formatter
 * @class NumberFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 292);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "NumberFormatter", 292);
_yuitest_coverline("build/intl-format/intl-format.js", 293);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 294);
this.styles = {
        "integer": Y.Number.STYLES.NUMBER_STYLE,
        "percent": Y.Number.STYLES.PERCENT_STYLE,
        "currency": Y.Number.STYLES.CURRENCY_STYLE
    };
    _yuitest_coverline("build/intl-format/intl-format.js", 299);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/intl-format/intl-format.js", 302);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 303);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 311);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 311);
_yuitest_coverline("build/intl-format/intl-format.js", 312);
return new NumberFormatter(values);
};

_yuitest_coverline("build/intl-format/intl-format.js", 315);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 323);
_yuitest_coverline("build/intl-format/intl-format.js", 324);
if(matches) {
            _yuitest_coverline("build/intl-format/intl-format.js", 325);
if(matches[1]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 326);
params.key = matches[1];
            }
            _yuitest_coverline("build/intl-format/intl-format.js", 328);
if(matches[3]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 329);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 333);
if(!params.style) {
            _yuitest_coverline("build/intl-format/intl-format.js", 334);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/intl-format/intl-format.js", 335);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 338);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/intl-format/intl-format.js", 339);
return false;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 342);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/intl-format/intl-format.js", 343);
return true;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 346);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 355);
_yuitest_coverline("build/intl-format/intl-format.js", 356);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/intl-format/intl-format.js", 359);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/intl-format/intl-format.js", 360);
params = {};

            _yuitest_coverline("build/intl-format/intl-format.js", 362);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/intl-format/intl-format.js", 364);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/intl-format/intl-format.js", 367);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/intl-format/intl-format.js", 368);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/intl-format/intl-format.js", 370);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 374);
return str;
    }
}, true);/**
 * Select formatter. Select ouput based on value of key
 * @class SelectFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 385);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "SelectFormatter", 385);
_yuitest_coverline("build/intl-format/intl-format.js", 386);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 387);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/intl-format/intl-format.js", 390);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 391);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 399);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 399);
_yuitest_coverline("build/intl-format/intl-format.js", 400);
return new SelectFormatter(values);
};

_yuitest_coverline("build/intl-format/intl-format.js", 403);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 411);
_yuitest_coverline("build/intl-format/intl-format.js", 412);
if(matches) {
            _yuitest_coverline("build/intl-format/intl-format.js", 413);
if(matches[1]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 414);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 418);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/intl-format/intl-format.js", 419);
return true;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 422);
return false;
    },

    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
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
    parseOptions: function(str, start) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "parseOptions", 439);
_yuitest_coverline("build/intl-format/intl-format.js", 440);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/intl-format/intl-format.js", 443);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/intl-format/intl-format.js", 444);
ch = str.charAt(i);
            _yuitest_coverline("build/intl-format/intl-format.js", 445);
if (ch === '\\') {
                _yuitest_coverline("build/intl-format/intl-format.js", 446);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/intl-format/intl-format.js", 447);
i++;
            } else {_yuitest_coverline("build/intl-format/intl-format.js", 448);
if (ch === '}') {
                _yuitest_coverline("build/intl-format/intl-format.js", 449);
if(current === "") {
                    _yuitest_coverline("build/intl-format/intl-format.js", 450);
i++;
                    _yuitest_coverline("build/intl-format/intl-format.js", 451);
break;
                }
                _yuitest_coverline("build/intl-format/intl-format.js", 453);
value = current;
                _yuitest_coverline("build/intl-format/intl-format.js", 454);
options[key.trim()] = value;
                _yuitest_coverline("build/intl-format/intl-format.js", 455);
current = key = value = "";
            } else {_yuitest_coverline("build/intl-format/intl-format.js", 456);
if (ch === '{') {
                _yuitest_coverline("build/intl-format/intl-format.js", 457);
key = current;
                _yuitest_coverline("build/intl-format/intl-format.js", 458);
current = "";
            } else {
                _yuitest_coverline("build/intl-format/intl-format.js", 460);
current += ch;
            }}}
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 464);
if(current !== "") {
            _yuitest_coverline("build/intl-format/intl-format.js", 465);
return null;
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 468);
return {
            options: options,
            next: i
        };
    },

    /**
     * Select output depending on params.value from options
     * @method select
     * @param options {Array} Array of key,value pairs
     * @param params {Object} Object containing value
     * @return {String} selected result
     */
    select: function(options, params) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "select", 481);
_yuitest_coverline("build/intl-format/intl-format.js", 482);
for ( var key in options ) {
            _yuitest_coverline("build/intl-format/intl-format.js", 483);
if( key === "other" ) {
                _yuitest_coverline("build/intl-format/intl-format.js", 484);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/intl-format/intl-format.js", 487);
if( key === params.value ) {
                _yuitest_coverline("build/intl-format/intl-format.js", 488);
return options[key];
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 492);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 501);
_yuitest_coverline("build/intl-format/intl-format.js", 502);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/intl-format/intl-format.js", 505);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/intl-format/intl-format.js", 506);
params = {};

            _yuitest_coverline("build/intl-format/intl-format.js", 508);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/intl-format/intl-format.js", 510);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/intl-format/intl-format.js", 511);
if(!options) {
                    _yuitest_coverline("build/intl-format/intl-format.js", 512);
continue;
                }

                _yuitest_coverline("build/intl-format/intl-format.js", 515);
regex.lastIndex = options.next;
                _yuitest_coverline("build/intl-format/intl-format.js", 516);
options = options.options;

                _yuitest_coverline("build/intl-format/intl-format.js", 518);
result = this.select(options, params);
                _yuitest_coverline("build/intl-format/intl-format.js", 519);
if(result) {
                    _yuitest_coverline("build/intl-format/intl-format.js", 520);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/intl-format/intl-format.js", 521);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 526);
return str;
    }
}, true);/**
 * Plural formatter. Select ouput based on whether value of key is singular/plural
 * @class PluralFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 537);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "PluralFormatter", 537);
_yuitest_coverline("build/intl-format/intl-format.js", 538);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 539);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
};

_yuitest_coverline("build/intl-format/intl-format.js", 542);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 543);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 551);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 551);
_yuitest_coverline("build/intl-format/intl-format.js", 552);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/intl-format/intl-format.js", 562);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "select", 562);
_yuitest_coverline("build/intl-format/intl-format.js", 563);
var result = options.other;
    _yuitest_coverline("build/intl-format/intl-format.js", 564);
if(params.value === 0 && options.zero) {
        _yuitest_coverline("build/intl-format/intl-format.js", 565);
result = options.zero;
    }
    _yuitest_coverline("build/intl-format/intl-format.js", 567);
if(params.value === 1 && options.one) {
        _yuitest_coverline("build/intl-format/intl-format.js", 568);
result = options.one;
    }
    _yuitest_coverline("build/intl-format/intl-format.js", 570);
if(params.value === 2 && options.two) {
        _yuitest_coverline("build/intl-format/intl-format.js", 571);
result = options.two;
    }

    _yuitest_coverline("build/intl-format/intl-format.js", 574);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/intl-format/intl-format.js", 576);
return result;
};
/**
 * Choice formatter. Select ouput based on numerical values
 * @class ChoiceFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 587);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "ChoiceFormatter", 587);
_yuitest_coverline("build/intl-format/intl-format.js", 588);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/intl-format/intl-format.js", 589);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/intl-format/intl-format.js", 592);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/intl-format/intl-format.js", 593);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 601);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/intl-format/intl-format.js", "createInstance", 601);
_yuitest_coverline("build/intl-format/intl-format.js", 602);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/intl-format/intl-format.js", 605);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "parseOptions", 612);
_yuitest_coverline("build/intl-format/intl-format.js", 613);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/intl-format/intl-format.js", 616);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/intl-format/intl-format.js", 617);
choice = choicesArray[i];
            _yuitest_coverline("build/intl-format/intl-format.js", 618);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/intl-format/intl-format.js", 619);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/intl-format/intl-format.js", 620);
rel = relations[j];
                _yuitest_coverline("build/intl-format/intl-format.js", 621);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/intl-format/intl-format.js", 622);
mapping = choice.split(rel);
                    _yuitest_coverline("build/intl-format/intl-format.js", 623);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/intl-format/intl-format.js", 628);
options.push(ch);
                    _yuitest_coverline("build/intl-format/intl-format.js", 629);
break;
                }
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 634);
return options;
    },

    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "getParams", 644);
_yuitest_coverline("build/intl-format/intl-format.js", 645);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/intl-format/intl-format.js", 646);
if(matches[2]) {
                _yuitest_coverline("build/intl-format/intl-format.js", 647);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/intl-format/intl-format.js", 648);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 652);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "select", 661);
_yuitest_coverline("build/intl-format/intl-format.js", 662);
var choice, value, result, relation, i;
        _yuitest_coverline("build/intl-format/intl-format.js", 663);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/intl-format/intl-format.js", 664);
choice = params.choices[i];
            _yuitest_coverline("build/intl-format/intl-format.js", 665);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/intl-format/intl-format.js", 667);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/intl-format/intl-format.js", 669);
return result;
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 673);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "format", 682);
_yuitest_coverline("build/intl-format/intl-format.js", 683);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/intl-format/intl-format.js", 686);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/intl-format/intl-format.js", 687);
params = {};

            _yuitest_coverline("build/intl-format/intl-format.js", 689);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/intl-format/intl-format.js", 690);
result = this.select(params);
                _yuitest_coverline("build/intl-format/intl-format.js", 691);
if(result) {
                    _yuitest_coverline("build/intl-format/intl-format.js", 692);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/intl-format/intl-format.js", 697);
return str;
    }
}, true);/**
 * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime.
 * @module intl-format
 * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl
 */

/**
 * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters.
 * If a formatter fails to parse, the next one in the list try to do so.
 */
_yuitest_coverline("build/intl-format/intl-format.js", 709);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter ];

_yuitest_coverline("build/intl-format/intl-format.js", 711);
Y.mix(Y.Intl, {

    /**
     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.
     * @method formatMessage
     * @static
     * @param pattern {String} string contains static text with embedded format elements that specify
              how to process and insert strings, numbers, and dates, as well as perform conditional processing.
     * @param values {Object|Array} The data to be processed and inserted.
     * @param [config] {Object} Optional configuration parameters
     * @return {String} Formatted result
     * @example
            //String formatting. Key is replaced by value
            Y.Intl.formatMessage("{EMPLOYEE} reports to {MANAGER}", {
                "EMPLOYEE": "Ashik",
                "MANAGER": "Dharmesh"
            });

            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full
            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone
            Y.Intl.formatMessage("Today is {DATE, date, short}", { DATE: new Date() });
            Y.Intl.formatMessage("The time is {DATE, time, medium}", {DATE: new Date()}, {timezone: "Asia/Kolkata"});
            Y.Intl.formatMessage("There are {POPULATION_INDIA, number} million people in India.", {POPULATION_INDIA: 1241.492});

            //Select formatting. Selects output depending on value
            Y.Intl.formatMessage("{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.", {
                "NAME": "Henri",
                "GENDER": "male",
                "CITY": "Paris"
            });

            //Plural formatting. Selects output depending on whether numerical value is singular/plural
            Y.Intl.formatMessage("{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.", {
                "COMPANY_COUNT": 1
            });

            //Choice formatting. Selects output depending on numerical value
            Y.Intl.formatMessage("There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.", {
                "FILE_COUNT": 1
            });
     */
    formatMessage: function(pattern, values, config) {
        _yuitest_coverfunc("build/intl-format/intl-format.js", "formatMessage", 752);
_yuitest_coverline("build/intl-format/intl-format.js", 753);
config = config || {};
        _yuitest_coverline("build/intl-format/intl-format.js", 754);
var i, formatter;
        _yuitest_coverline("build/intl-format/intl-format.js", 755);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/intl-format/intl-format.js", 756);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/intl-format/intl-format.js", 757);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/intl-format/intl-format.js", 759);
return pattern;
    }
});


}, '@VERSION@', {"requires": ["datatype-date-advanced-format", "datatype-number-advanced-format", "intl"]});
