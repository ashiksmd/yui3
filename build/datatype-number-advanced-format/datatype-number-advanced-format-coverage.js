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
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatype-number-advanced-format/datatype-number-advanced-format.js",
    code: []
};
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"].code=["YUI.add('datatype-number-advanced-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var Format, NumberFormat, YNumberFormat;","","/**"," * Pad string to specified length"," * @method _zeroPad"," * @for Number"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class __BaseFormat"," * @namespace Number"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Number.__BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Number.__BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Number.__BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Number.__BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class __BaseFormat.Segment"," * @for __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Number.__BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class __BaseFormat.TextSegment"," * @for __BaseFormat"," * @namespace Number"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","/**"," * NumberFormat helps you to format and parse numbers for any locale."," * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,"," * or even the particular decimal digits used, or whether the number format is even decimal."," *"," * This module uses parts of zimbra NumberFormat"," *"," * @module datatype-number-advanced-format"," * @requires datatype-number-format, datatype-number-parse"," */","","/**"," * Class to handle Number formatting."," * @class __zNumberFormat"," * @extends __BaseFormat"," * @namespace Number"," * @private"," * @constructor"," * @param pattern {String}       The number pattern."," * @param formats {Object}       locale data"," * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only"," */","Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {","    var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,","        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;","    if (arguments.length === 0) { return; }","","    NumberFormat.superclass.constructor.call(this, pattern, formats);","    if (!pattern) { return; }","","    if(pattern === \"{plural_style}\") {","        pattern = this.Formats.decimalFormat;","        this._isPluralCurrency = true;","        this._pattern = pattern;","    }","","    //Default currency","    this.currency = this.Formats.defaultCurrency;","    if(this.currency === undefined || !this.currency) {","        this.currency = \"USD\";","    }","        ","    patterns = pattern.split(/;/);","    pattern = patterns[0];","	","    this._useGrouping = (pattern.indexOf(\",\") !== -1);      //Will be set to true if pattern uses grouping","    this._parseIntegerOnly = (pattern.indexOf(\".\") === -1);  //Will be set to false if pattern contains fractional parts","        ","    //If grouping is used, find primary and secondary grouping","    if(this._useGrouping) {","        numberPattern = pattern.match(/[0#,]+/);","        groupingRegex = new RegExp(\"[0#]+\", \"g\");","        groups = numberPattern[0].match(groupingRegex);","            ","        i = groups.length - 2;","        this._primaryGrouping = groups[i+1].length;","        this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);","    }","        ","    // parse prefix","    i = 0;","        ","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    hasPrefix = results.text !== \"\";","    if (hasPrefix) {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // parse number descriptor","    start = i;","    while (i < pattern.length &&","        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {","        i++;","    }","    end = i;","","    numPattern = pattern.substring(start, end);","    e = numPattern.indexOf(this.Formats.exponentialSymbol);","    expon = e !== -1 ? numPattern.substring(e + 1) : null;","    if (expon) {","        numPattern = numPattern.substring(0, e);","        this._showExponent = true;","    }","	","    dot = numPattern.indexOf('.');","    whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;","    if (whole) {","        /*var comma = whole.lastIndexOf(',');","            if (comma != -1) {","                this._groupingOffset = whole.length - comma - 1;","            }*/","        whole = whole.replace(/[^#0]/g,\"\");","        zero = whole.indexOf('0');","        if (zero !== -1) {","            this._minIntDigits = whole.length - zero;","        }","        this._maxIntDigits = whole.length;","    }","	","    fract = dot !== -1 ? numPattern.substring(dot + 1) : null;","    if (fract) {","        zero = fract.lastIndexOf('0');","        if (zero !== -1) {","            this._minFracDigits = zero + 1;","        }","        this._maxFracDigits = fract.replace(/[^#0]/g,\"\").length;","    }","	","    this._segments.push(new NumberFormat.NumberSegment(this, numPattern));","	","    // parse suffix","    results = this.__parseStatic(pattern, i);","    i = results.offset;","    if (results.text !== \"\") {","        this._segments.push(new Format.TextSegment(this, results.text));","    }","	","    // add negative formatter","    if (skipNegFormat) { return; }","	","    if (patterns.length > 1) {","        pattern = patterns[1];","        this._negativeFormatter = new NumberFormat(pattern, formats, true);","    }","    else {","        // no negative pattern; insert minus sign before number segment","        formatter = new NumberFormat(\"\", formats);","        formatter._segments = formatter._segments.concat(this._segments);","","        index = hasPrefix ? 1 : 0;","        minus = new Format.TextSegment(formatter, this.Formats.minusSign);","        formatter._segments.splice(index, 0, minus);","		","        this._negativeFormatter = formatter;","    }","};","","NumberFormat = Y.Number.__zNumberFormat;","Y.extend(NumberFormat, Y.Number.__BaseFormat);","    ","// Constants","","Y.mix(NumberFormat, {","    _NUMBER: \"number\",","    _INTEGER: \"integer\",","    _CURRENCY: \"currency\",","    _PERCENT: \"percent\",","","    _META_CHARS: \"0#.,E\"","});","","Y.mix( NumberFormat.prototype, {","    _groupingOffset: Number.MAX_VALUE,","    _minIntDigits: 1,","    _isCurrency: false,","    _isPercent: false,","    _isPerMille: false,","    _showExponent: false,","","    /**","     * Format a number","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        if (number < 0 && this._negativeFormatter) {","            return this._negativeFormatter.format(number);","        }","        ","        var result = Format.prototype.format.call(this, number), pattern = \"\";","        ","        if(this._isPluralCurrency) {","            if(number === 1) {","                //Singular","                pattern = this.Formats.currencyPatternSingular;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencySingular\"]);","            } else {","                //Plural","                pattern = this.Formats.currencyPatternPlural;","                pattern = pattern.replace(\"{1}\", this.Formats[this.currency + \"_currencyPlural\"]);","            }","            ","            result = pattern.replace(\"{0}\", result);","        }","        ","        return result;","    },","","    /**","     * Parse string and return number","     * @method parse","     * @param s {String} The string to parse","     * @param pp {Number} Parse position. Will start parsing from this index in string s.","     * @return {Number} Parse result","     */","    parse: function(s, pp) {","        var singular, plural, object;","        if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {","            return this._negativeFormatter.parse(s, pp);","        }","        ","        if(this._isPluralCurrency) {","            singular = this.Formats[this.currency + \"_currencySingular\"],","                plural = this.Formats[this.currency + \"_currencyPlural\"];","            ","            s = Y.Lang.trim(s.replace(plural, \"\").replace(singular, \"\"));","        }","        ","        object = null;","        try {","            object = Format.prototype.parse.call(this, s, pp);","            object = object.value;","        } catch(e) {","            Y.error(\"Failed to parse: \" + s, e);","        }","        ","        return object;","    },","","    /**","     * Parse static. Internal use only.","     * @method __parseStatic","     * @private","     * @param {String} s Pattern","     * @param {Number} i Index","     * @return {Object}","     */","    __parseStatic: function(s, i) {","        var data = [], c, start, end;","        while (i < s.length) {","            c = s.charAt(i++);","            if (NumberFormat._META_CHARS.indexOf(c) !== -1) {","                i--;","                break;","            }","            switch (c) {","                case \"'\":","                    start = i;","                    while (i < s.length && s.charAt(i) !== \"'\") {","			i++;","                    }","                    end = i;","                    c = end - start === 0 ? \"'\" : s.substring(start, end);","                    break;","                case '%':","                    c = this.Formats.percentSign;","                    this._isPercent = true;","                    break;","                case '\\u2030':","                    c = this.Formats.perMilleSign;","                    this._isPerMille = true;","                    break;","                case '\\u00a4':","                    if(s.charAt(i) === '\\u00a4') {","                        c = this.Formats[this.currency + \"_currencyISO\"];","                        i++;","                    } else {","                        c = this.Formats[this.currency + \"_currencySymbol\"];","                    }","                    this._isCurrency = true;","                    break;","            }","            data.push(c);","        }","        return {","            text: data.join(\"\"),","            offset: i","        };","    },","","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Overrides method from __BaseFormat","     * @method _createParseObject","     * @private","     * @return {Object}","     */","    _createParseObject: function() {","        return {","            value: null","        };","    }","}, true);","    ","//","// NumberFormat.NumberSegment class","//","","/**"," * Number segment class."," * @class __zNumberFormat.NumberSegment"," * @for __zNumberFormat"," * @namespace Number"," * @extends Number.__BaseFormat.Segment"," *"," * @private"," * @constructor"," *"," * @param format {Number.__zNumberFormat} Parent Format object"," * @param s {String} Pattern representing this segment"," */","NumberFormat.NumberSegment = function(format, s) {","    if (format === null && s === null) { return; }","    NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);","};","Y.extend(NumberFormat.NumberSegment, Format.Segment);","","Y.mix(NumberFormat.NumberSegment.prototype, {","    /**","     * Format number segment","     * @method format","     * @param number {Number}","     * @return {String} Formatted result","     */","    format: function(number) {","        var expon, exponReg, s;","        // special values","        if (isNaN(number)) { return this._parent.Formats.nanSymbol; }","        if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {","            return this._parent.Formats.infinitySign;","        }","","        // adjust value","        if (typeof number !== \"number\") { number = Number(number); }","        number = Math.abs(number); // NOTE: minus sign is part of pattern","        if (this._parent._isPercent) { number *= 100; }","        else if (this._parent._isPerMille) { number *= 1000; }","        if(this._parent._parseIntegerOnly) { number = Math.floor(number); }","        ","        // format","        expon = this._parent.Formats.exponentialSymbol;","        exponReg = new RegExp(expon + \"+\");","        s = this._parent._showExponent","            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)","            : number.toFixed(this._parent._maxFracDigits || 0);","        s = this._normalize(s);","        return s;","    },","","    /**","     * Normalize pattern","     * @method _normalize","     * @protected","     * @param {String} s Pattern","     * @return {String} Normalized pattern","     */","    _normalize: function(s) {","        var exponSymbol = this._parent.Formats.exponentialSymbol,","            splitReg = new RegExp(\"[\\\\.\" + exponSymbol + \"]\"),","            match = s.split(splitReg),","            whole = match.shift(),  //Normalize the whole part","            a = [],","            offset = this._parent._primaryGrouping,","            fract = '0',","            decimal = this._parent.Formats.decimalSeparator,","            expon, i;","","	if (whole.length < this._parent._minIntDigits) {","            whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);","        }","        if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {","            i = whole.length - offset;","            while (i > 0) {","                a.unshift(whole.substr(i, offset));","                a.unshift(this._parent.Formats.groupingSeparator);","                offset = this._parent._secondaryGrouping;","                i -= offset;","            }","            a.unshift(whole.substring(0, i + offset));","		","            whole = a.join(\"\");","        }","	","        if(s.match(/\\./)) {","            fract = match.shift();","        }","        else if(s.match(/\\e/) || s.match(/\\E/)) {","            expon = match.shift();","        }","","        fract = fract.replace(/0+$/,\"\");","        if (fract.length < this._parent._minFracDigits) {","            fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);","        }","	","        a = [ whole ];","        if (fract.length > 0) {","            a.push(decimal, fract);","        }","        if (expon) {","            a.push(exponSymbol, expon.replace(/^\\+/,\"\"));","        }","	","        // return normalize result","        return a.join(\"\");","    },","","    /**","     * Parse Number Segment","     * @method parse","     * @param object {Object} Result will be stored in object.value","     * @param s {String} Pattern","     * @param index {Number}","     * @return {Number} Index in s where parse ended","     */","    parse: function(object, s, index) {","        var comma = this._parent.Formats.groupingSeparator,","            dot = this._parent.Formats.decimalSeparator,","            minusSign = this._parent.Formats.minusSign,","            expon = this._parent.Formats.exponentialSymbol,","            numberRegexPattern = \"[\\\\\" + minusSign + \"0-9\" + comma + \"]+\",","            numberRegex, matches, negativeNum, endIndex, scientific = null, i,","            //If more groups, use primary/secondary grouping as applicable","            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;","","        if(!this._parent._parseIntegerOnly) {","            numberRegexPattern += \"(\\\\\" + dot + \"[0-9]+)?\";","        }","        if(this._parent._showExponent) {","            numberRegexPattern += \"(\" + expon +\"\\\\+?[0-9]+)\";","        }","        ","        numberRegex = new RegExp(numberRegexPattern);","        matches = s.match(numberRegex);","        ","        if(!matches) {","            Y.error(\"Error parsing: Number does not match pattern\");","        }","        ","        negativeNum = s.indexOf(minusSign) !== -1;","        endIndex = index + matches[0].length;","        s = s.slice(index, endIndex);","        ","        //Scientific format does not use grouping","        if(this._parent.showExponent) {","            scientific = s.split(expon);","        } else if(this._parent._useGrouping) {","            //Verify grouping data exists","            if(!this._parent._primaryGrouping) {","                //Should not happen","                Y.error(\"Error parsing: Invalid pattern\");","            }","            ","            //Verify grouping is correct","            i = s.length - this._parent._primaryGrouping - 1;","            ","            if(matches[1]) {","                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part","                i = i - matches[1].length;","            }","            ","            //Use primary grouping for first group","            if(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","            }","            ","            i = i - grouping - 1;","            ","            while(i > 0) {","                //There should be a comma at i","                if(s.charAt(i) !== ',') {","                    Y.error(\"Error parsing: Number does not match pattern\");","                }","                ","                //Remove comma","                s = s.slice(0, i) + s.slice(i+1);","                i = i - grouping - 1;","            }","            ","            //Verify there are no more grouping separators","            if(s.indexOf(comma) !== -1) {","                Y.error(\"Error parsing: Number does not match pattern\");","            }","        }","        ","        if(scientific) {","            object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));","        } else {","            object.value = parseFloat(s, 10);","        }","        ","        //Special types","        if(negativeNum) { object.value *= -1; }","        if (this._parent._isPercent) { object.value /= 100; }","        else if (this._parent._isPerMille) { object.value /= 1000; }","        ","        return endIndex;","    }","}, true);","","/**"," * Number Formatting"," * @class __YNumberFormat"," * @namespace Number"," * @private"," * @constructor"," * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES"," */","Y.Number.__YNumberFormat = function(style) {","    style = style || Y.Number.STYLES.NUMBER_STYLE;","    ","    if(Y.Lang.isString(style)) {","        style = Y.Number.STYLES[style];","    }","    ","    var pattern = \"\",","        formats = Y.Intl.get(\"datatype-number-advanced-format\");","    switch(style) {","        case Y.Number.STYLES.CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            break;","        case Y.Number.STYLES.ISO_CURRENCY_STYLE:","            pattern = formats.currencyFormat;","            pattern = pattern.replace(\"\\u00a4\", \"\\u00a4\\u00a4\");","            break;","        case Y.Number.STYLES.NUMBER_STYLE:","            pattern = formats.decimalFormat;","            break;","        case Y.Number.STYLES.PERCENT_STYLE:","            pattern = formats.percentFormat;","            break;","        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:","            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting","            pattern = \"{plural_style}\";","            break;","        case Y.Number.STYLES.SCIENTIFIC_STYLE:","            pattern = formats.scientificFormat;","            break;","    }","        ","    this._numberFormatInstance = new NumberFormat(pattern, formats);","};","","YNumberFormat = Y.Number.__YNumberFormat;","","Y.mix(Y.Number, {","    /**","     * Style values to use during format/parse","     * @property STYLES","     * @type Object","     * @static","     * @final","     * @for Number","     */","    STYLES: {","        CURRENCY_STYLE: 1,","        ISO_CURRENCY_STYLE: 2,","        NUMBER_STYLE: 4,","        PERCENT_STYLE: 8,","        PLURAL_CURRENCY_STYLE: 16,","        SCIENTIFIC_STYLE: 32","    }","});","   ","Y.mix(YNumberFormat.prototype, {","    /**","     * Format a number","     * @method format","     * @param number {Number} the number to format","     * @for Number.YNumberFormat","     * @return {Number}","     */","    format: function(number) {","        return this._numberFormatInstance.format(number);","    },","    ","    /**","     * Return true if this format will parse numbers as integers only.","     * For example in the English locale, with ParseIntegerOnly true, the string \"1234.\" would be parsed as the integer value 1234","     * and parsing would stop at the \".\" character. Of course, the exact format accepted by the parse operation is locale dependant.","     * @method isParseIntegerOnly","     * @return {Boolean}","     */","    isParseIntegerOnly: function() {","        return this._numberFormatInstance._parseIntegerOnly;","    },","    ","    /**","     * Parse the string to get a number","     * @method parse","     * @param {String} txt The string to parse","     * @param {Number} [pp=0] Parse position. The position to start parsing at.","     */","    parse: function(txt, pp) {","        return this._numberFormatInstance.parse(txt, pp);","    },","    ","    /**","     * Sets whether or not numbers should be parsed as integers only.","     * @method setParseIntegerOnly","     * @param {Boolean} newValue set True, this format will parse numbers as integers only.","     */","    setParseIntegerOnly: function(newValue) {","        this._numberFormatInstance._parseIntegerOnly = newValue;","    }","});","Y.mix( Y.Number, {","     _oldFormat: Y.Number.format,","     _oldParse:  Y.Number.parse","});","","Y.mix( Y.Number, {","     /**","      * Takes a Number and formats to string for display to user","      *","      * @for Number","      * @method format","      * @param data {Number} Number","      * @param [config] {Object} Optional Configuration values.","      *   <dl>","      *      <dt>[style] {Number|String}</dt>","      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>","      *      <dt>[parseIntegerOnly] {Boolean}</dt>","      *         <dd>If set to true, only the whole number part of data will be used</dd>","      *      <dt>[prefix] {String}</dd>","      *         <dd>String prepended before each number, like a currency designator \"$\"</dd>","      *      <dt>[decimalPlaces] {Number}</dd>","      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>","      *      <dt>[decimalSeparator] {String}</dd>","      *         <dd>Decimal separator</dd>","      *      <dt>[thousandsSeparator] {String}</dd>","      *         <dd>Thousands separator</dd>","      *      <dt>[suffix] {String}</dd>","      *         <dd>String appended after each number, like \" items\" (note the space)</dd>","      *   </dl>","      * @return {String} Formatted string representation of data","      */","     format: function(data, config) {","         config = config || {};","    ","         if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined","               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {","             return Y.Number._oldFormat(data, config);","         }","    ","         try {","             var formatter = new YNumberFormat(config.style);","             if(config.parseIntegerOnly) {","                 formatter.setParseIntegerOnly(true);","             }","             return formatter.format(data);","         } catch(e) {","             //Error. Fallback to original format","         }","         return Y.Number._oldFormat(data, config);","     },","","     /**","      * Parses data and returns a number","      *","      * @for Number","      * @method format","      * @param data {String} Data to be parsed","      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.","               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.","               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0","      * @return {Number} Number represented by data","      */","     parse: function(data, config) {","         try {","             var formatter = new YNumberFormat(config.style);","             return formatter.parse(data, config.parsePosition);","         } catch(e) {","             //Fallback on deprecated parse","         }","    ","         return Y.Number._oldParse(data);","     }","}, true);","","//Update Parsers shortcut","Y.namespace(\"Parsers\").number = Y.Number.parse;","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"af-NA\",","        \"af-ZA\",","        \"am-ET\",","        \"am\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar-YE\",","        \"as-IN\",","        \"as\",","        \"az-AZ\",","        \"az-Cyrl-AZ\",","        \"az-Cyrl\",","        \"az\",","        \"az-Latn-AZ\",","        \"be-BY\",","        \"be\",","        \"bg-BG\",","        \"bg\",","        \"bn-BD\",","        \"bn-IN\",","        \"bn\",","        \"bo-CN\",","        \"bo-IN\",","        \"bo\",","        \"ca-ES\",","        \"ca\",","        \"cs-CZ\",","        \"cs\",","        \"cy-GB\",","        \"cy\",","        \"da-DK\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de\",","        \"de-LI\",","        \"de-LU\",","        \"el-CY\",","        \"el-GR\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et-EE\",","        \"et\",","        \"eu-ES\",","        \"eu\",","        \"fa-AF\",","        \"fa-IR\",","        \"fa\",","        \"fi-FI\",","        \"fi\",","        \"fil\",","        \"fil-PH\",","        \"fo-FO\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"ga-IE\",","        \"ga\",","        \"gl-ES\",","        \"gl\",","        \"gsw-CH\",","        \"gsw\",","        \"gu-IN\",","        \"gu\",","        \"gv-GB\",","        \"gv\",","        \"ha-GH\",","        \"ha\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-NE\",","        \"ha-NG\",","        \"haw\",","        \"haw-US\",","        \"he-IL\",","        \"he\",","        \"hi-IN\",","        \"hi\",","        \"hr-HR\",","        \"hr\",","        \"hu-HU\",","        \"hu\",","        \"hy-AM\",","        \"hy\",","        \"id-ID\",","        \"id\",","        \"ii-CN\",","        \"ii\",","        \"in-ID\",","        \"in\",","        \"is-IS\",","        \"is\",","        \"it-CH\",","        \"it-IT\",","        \"it\",","        \"iw-IL\",","        \"iw\",","        \"ja-JP\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka-GE\",","        \"ka\",","        \"kk-Cyrl-KZ\",","        \"kk\",","        \"kk-KZ\",","        \"kl-GL\",","        \"kl\",","        \"km\",","        \"km-KH\",","        \"kn-IN\",","        \"kn\",","        \"ko\",","        \"kok-IN\",","        \"kok\",","        \"ko-KR\",","        \"kw-GB\",","        \"kw\",","        \"lt\",","        \"lt-LT\",","        \"lv\",","        \"lv-LV\",","        \"mk\",","        \"mk-MK\",","        \"ml-IN\",","        \"ml\",","        \"mr-IN\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"ms-MY\",","        \"mt\",","        \"mt-MT\",","        \"nb\",","        \"nb-NO\",","        \"ne-IN\",","        \"ne\",","        \"ne-NP\",","        \"nl-BE\",","        \"nl\",","        \"nl-NL\",","        \"nn\",","        \"nn-NO\",","        \"no\",","        \"no-NO\",","        \"no-NO-NY\",","        \"om-ET\",","        \"om\",","        \"om-KE\",","        \"or-IN\",","        \"or\",","        \"pa-Arab\",","        \"pa-Arab-PK\",","        \"pa-Guru-IN\",","        \"pa-IN\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"pl-PL\",","        \"ps-AF\",","        \"ps\",","        \"pt-BR\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ro-MD\",","        \"ro-RO\",","        \"ru\",","        \"ru-RU\",","        \"ru-UA\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh\",","        \"sh-YU\",","        \"si\",","        \"si-LK\",","        \"sk\",","        \"sk-SK\",","        \"sl\",","        \"sl-SI\",","        \"so-DJ\",","        \"so-ET\",","        \"so\",","        \"so-KE\",","        \"so-SO\",","        \"sq-AL\",","        \"sq\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl-YU\",","        \"sr\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr-YU\",","        \"sv-FI\",","        \"sv\",","        \"sv-SE\",","        \"sw\",","        \"sw-KE\",","        \"sw-TZ\",","        \"ta-IN\",","        \"ta\",","        \"te-IN\",","        \"te\",","        \"th\",","        \"th-TH\",","        \"ti-ER\",","        \"ti-ET\",","        \"ti\",","        \"tl\",","        \"tl-PH\",","        \"tr\",","        \"tr-TR\",","        \"uk\",","        \"uk-UA\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz-AF\",","        \"uz-Arab-AF\",","        \"uz-Arab\",","        \"uz-Cyrl-UZ\",","        \"uz\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"datatype-number-format\",","        \"datatype-number-parse\"","    ]","});"];
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"].lines = {"1":0,"7":0,"21":0,"22":0,"24":0,"26":0,"28":0,"29":0,"30":0,"32":0,"34":0,"52":0,"53":0,"54":0,"57":0,"74":0,"76":0,"84":0,"86":0,"87":0,"89":0,"105":0,"108":0,"109":0,"112":0,"113":0,"115":0,"127":0,"145":0,"146":0,"147":0,"148":0,"151":0,"159":0,"177":0,"186":0,"190":0,"202":0,"203":0,"205":0,"206":0,"207":0,"210":0,"235":0,"239":0,"240":0,"241":0,"242":0,"245":0,"246":0,"247":0,"249":0,"250":0,"252":0,"253":0,"254":0,"255":0,"256":0,"259":0,"262":0,"280":0,"281":0,"282":0,"285":0,"287":0,"295":0,"307":0,"332":0,"333":0,"335":0,"337":0,"338":0,"340":0,"341":0,"342":0,"343":0,"347":0,"348":0,"349":0,"352":0,"353":0,"355":0,"356":0,"359":0,"360":0,"361":0,"362":0,"364":0,"365":0,"366":0,"370":0,"372":0,"373":0,"374":0,"375":0,"376":0,"380":0,"381":0,"383":0,"385":0,"387":0,"388":0,"389":0,"390":0,"391":0,"392":0,"395":0,"396":0,"397":0,"402":0,"403":0,"404":0,"405":0,"407":0,"410":0,"411":0,"412":0,"413":0,"414":0,"416":0,"419":0,"422":0,"423":0,"424":0,"425":0,"429":0,"431":0,"432":0,"433":0,"437":0,"438":0,"440":0,"441":0,"442":0,"444":0,"448":0,"449":0,"453":0,"462":0,"477":0,"478":0,"481":0,"483":0,"484":0,"486":0,"487":0,"490":0,"491":0,"494":0,"497":0,"508":0,"509":0,"510":0,"513":0,"514":0,"517":0,"520":0,"521":0,"522":0,"523":0,"525":0,"528":0,"540":0,"541":0,"542":0,"543":0,"544":0,"545":0,"547":0,"549":0,"550":0,"551":0,"553":0,"554":0,"555":0,"557":0,"558":0,"559":0,"561":0,"562":0,"563":0,"565":0,"566":0,"567":0,"569":0,"571":0,"572":0,"574":0,"576":0,"590":0,"613":0,"614":0,"615":0,"617":0,"619":0,"627":0,"629":0,"630":0,"631":0,"635":0,"636":0,"637":0,"638":0,"639":0,"642":0,"643":0,"644":0,"647":0,"648":0,"659":0,"669":0,"670":0,"672":0,"673":0,"674":0,"675":0,"676":0,"677":0,"678":0,"680":0,"682":0,"685":0,"686":0,"688":0,"689":0,"692":0,"693":0,"694":0,"697":0,"698":0,"699":0,"701":0,"702":0,"706":0,"718":0,"727":0,"728":0,"730":0,"731":0,"734":0,"735":0,"737":0,"738":0,"741":0,"742":0,"743":0,"746":0,"747":0,"748":0,"750":0,"752":0,"756":0,"758":0,"760":0,"764":0,"766":0,"767":0,"771":0,"774":0,"776":0,"778":0,"779":0,"783":0,"784":0,"788":0,"789":0,"793":0,"794":0,"796":0,"800":0,"801":0,"802":0,"804":0,"816":0,"817":0,"819":0,"820":0,"823":0,"825":0,"827":0,"828":0,"830":0,"831":0,"832":0,"834":0,"835":0,"837":0,"838":0,"841":0,"842":0,"844":0,"845":0,"848":0,"851":0,"853":0,"872":0,"881":0,"892":0,"902":0,"911":0,"914":0,"919":0,"946":0,"948":0,"950":0,"953":0,"954":0,"955":0,"956":0,"958":0,"962":0,"977":0,"978":0,"979":0,"984":0,"989":0};
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"].functions = {"_zeroPad:21":0,"__BaseFormat:52":0,"format:83":0,"parse:104":0,"_createParseObject:126":0,"Segment:145":0,"format:158":0,"parse:176":0,"getFormat:185":0,"_parseLiteral:201":0,"_parseInt:234":0,"TextSegment:280":0,"toString:294":0,"parse:306":0,"__zNumberFormat:332":0,"format:476":0,"parse:507":0,"__parseStatic:539":0,"_createParseObject:589":0,"NumberSegment:613":0,"format:626":0,"_normalize:658":0,"parse:717":0,"__YNumberFormat:816":0,"format:880":0,"isParseIntegerOnly:891":0,"parse:901":0,"setParseIntegerOnly:910":0,"format:945":0,"parse:976":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"].coveredLines = 316;
_yuitest_coverage["build/datatype-number-advanced-format/datatype-number-advanced-format.js"].coveredFunctions = 31;
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 1);
YUI.add('datatype-number-advanced-format', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 7);
var Format, NumberFormat, YNumberFormat;

/**
 * Pad string to specified length
 * @method _zeroPad
 * @for Number
 * @static
 * @private
 * @param {String|Number} s The string or number to be padded
 * @param {Number} length The maximum length s should be padded to have
 * @param {String} [zeroChar='0'] The character to be used to pad the string.
 * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string
 * @return {String} The padded string
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 21);
Y.Number._zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_zeroPad", 21);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 22);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 24);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 26);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 28);
var a = [], i;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 29);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 30);
a.push(zeroChar);
    }
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 32);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 34);
return a.join("");
};

//
// Format class
//

/**
 * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which
 * returns the formatted string.
 * For internal use only.
 * @class __BaseFormat
 * @namespace Number
 * @constructor
 * @private
 * @param {String} pattern
 * @param {Object} formats
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 52);
Y.Number.__BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "__BaseFormat", 52);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 53);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 54);
return;
    }

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 57);
Y.mix(this, {
        /**
         * Pattern to format/parse
         * @property _pattern
         * @type String
         */
        _pattern: pattern,
        /**
         * Segments in the pattern
         * @property _segments
         * @type Number.__BaseFormat.Segment
         */
        _segments: [],
        Formats: formats
    });
};

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 74);
Format = Y.Number.__BaseFormat;

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 76);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 83);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 84);
var s = [], i = 0;
    
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 86);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 87);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 89);
return s.join("");
    },

    
    /**
     * Parses the given string according to this format's pattern and returns
     * an object.
     * Note:
     * The default implementation of this method assumes that the sub-class
     * has implemented the _createParseObject method.
     * @method parse
     * @for Number.__BaseFormat
     * @param {String} s The string to be parsed
     * @param {Number} [pp=0] Parse position. String will only be read from here
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 104);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 105);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 108);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 109);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 112);
if (index < s.length) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 113);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 115);
return object;
    },
    
    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Note:
     * This must be implemented by sub-classes.
     * @method _createParseObject
     * @private
     * //return {Object}
     */
    _createParseObject: function(/*s*/) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_createParseObject", 126);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 127);
Y.error("Not implemented");
    }
});

//
// Segment class
//

/**
 * Segments in the pattern to be formatted
 * @class __BaseFormat.Segment
 * @for __BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param {Format} format The format object that created this segment
 * @param {String} s String representing this segment
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 145);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "Segment", 145);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 146);
if( !format && !s ) { return; }
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 147);
this._parent = format;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 148);
this._s = s;
};

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 151);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 158);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 159);
return this._s;
    },

    /**
     * Parses the string at the given index, initializes the parse object
     * (as appropriate), and returns the new index within the string for
     * the next parsing step.
     *
     * Note:
     * This method must be implemented by sub-classes.
     *
     * @method parse
     * //param o     {Object} The parse object to be initialized.
     * //param s     {String} The input string to be parsed.
     * //param index {Number} The index within the string to start parsing.
     * //return The parsed result.
     */
    parse: function(/*o, s, index*/) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 176);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 177);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Number.__BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "getFormat", 185);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 186);
return this._parent;
    }
});

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 190);
Y.mix(Format.Segment, {
    /**
     * Parse literal string that matches the pattern
     * @method _parseLiteral
     * @static
     * @private
     * @param {String} literal The pattern that literal should match
     * @param {String} s The literal to be parsed
     * @param {Number} index The position in s where literal is expected to start from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    _parseLiteral: function(literal, s, index) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_parseLiteral", 201);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 202);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 203);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 205);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 206);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 207);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 210);
return index + literal.length;
    },
    
    /**
     * Parses an integer at the offset of the given string and calls a
     * method on the specified object.
     *
     * @method _parseInt
     * @private
     *
     * @param o           {Object}   The target object.
     * @param f           {function|String} The method to call on the target object.
     *                               If this parameter is a string, then it is used
     *                               as the name of the property to set on the
     *                               target object.
     * @param adjust      {Number}   The numeric adjustment to make on the
     *                               value before calling the object method.
     * @param s           {String}   The string to parse.
     * @param index       {Number}   The index within the string to start parsing.
     * @param fixedlen    {Number}   If specified, specifies the required number
     *                               of digits to be parsed.
     * @param [radix=10]  {Number}   Specifies the radix of the parse string.
     * @return {Number}   The position where the parsed number was found
     */
    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_parseInt", 234);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 235);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 239);
for (; i < len; i++) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 240);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 241);
index--;
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 242);
break;
            }
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 245);
tail = index;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 246);
if (head === tail) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 247);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 249);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 250);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 252);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 253);
if (f) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 254);
target = o || Y.config.win;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 255);
if (typeof f === "function") {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 256);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 259);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 262);
return tail;
    }
});

//
// Text segment class
//

/**
 * Text segment in the pattern.
 * @class __BaseFormat.TextSegment
 * @for __BaseFormat
 * @namespace Number
 * @extends Segment
 * @constructor
 * @param {Format} format The parent Format object
 * @param {String} s The pattern representing this segment
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 280);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "TextSegment", 280);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 281);
if (!format && !s) { return; }
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 282);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 285);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 287);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "toString", 294);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 295);
return "text: \""+this._s+'"';
    },

    /**
     * Parse an object according to the pattern
     * @method parse
     * @param o The parse object. Not used here. This is only used in more complex segment types
     * @param s {String} The string being parsed
     * @param index {Number} The index in s to start parsing from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    parse: function(o, s, index) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 306);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 307);
return Format.Segment._parseLiteral(this._s, s, index);
    }
}, true);
/**
 * NumberFormat helps you to format and parse numbers for any locale.
 * Your code can be completely independent of the locale conventions for decimal points, thousands-separators,
 * or even the particular decimal digits used, or whether the number format is even decimal.
 *
 * This module uses parts of zimbra NumberFormat
 *
 * @module datatype-number-advanced-format
 * @requires datatype-number-format, datatype-number-parse
 */

/**
 * Class to handle Number formatting.
 * @class __zNumberFormat
 * @extends __BaseFormat
 * @namespace Number
 * @private
 * @constructor
 * @param pattern {String}       The number pattern.
 * @param formats {Object}       locale data
 * @param [skipNegFormat] {Boolean} Specifies whether to skip the generation of this format's negative value formatter. Internal use only
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 332);
Y.Number.__zNumberFormat = function(pattern, formats, skipNegFormat) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "__zNumberFormat", 332);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 333);
var patterns, numberPattern, groupingRegex, groups, i, results, hasPrefix, start, end,
        numPattern, e, expon, dot, whole, zero, fract, formatter, index, minus;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 335);
if (arguments.length === 0) { return; }

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 337);
NumberFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 338);
if (!pattern) { return; }

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 340);
if(pattern === "{plural_style}") {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 341);
pattern = this.Formats.decimalFormat;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 342);
this._isPluralCurrency = true;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 343);
this._pattern = pattern;
    }

    //Default currency
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 347);
this.currency = this.Formats.defaultCurrency;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 348);
if(this.currency === undefined || !this.currency) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 349);
this.currency = "USD";
    }
        
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 352);
patterns = pattern.split(/;/);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 353);
pattern = patterns[0];
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 355);
this._useGrouping = (pattern.indexOf(",") !== -1);      //Will be set to true if pattern uses grouping
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 356);
this._parseIntegerOnly = (pattern.indexOf(".") === -1);  //Will be set to false if pattern contains fractional parts
        
    //If grouping is used, find primary and secondary grouping
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 359);
if(this._useGrouping) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 360);
numberPattern = pattern.match(/[0#,]+/);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 361);
groupingRegex = new RegExp("[0#]+", "g");
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 362);
groups = numberPattern[0].match(groupingRegex);
            
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 364);
i = groups.length - 2;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 365);
this._primaryGrouping = groups[i+1].length;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 366);
this._secondaryGrouping = (i > 0 ? groups[i].length : groups[i+1].length);
    }
        
    // parse prefix
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 370);
i = 0;
        
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 372);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 373);
i = results.offset;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 374);
hasPrefix = results.text !== "";
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 375);
if (hasPrefix) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 376);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // parse number descriptor
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 380);
start = i;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 381);
while (i < pattern.length &&
        NumberFormat._META_CHARS.indexOf(pattern.charAt(i)) !== -1) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 383);
i++;
    }
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 385);
end = i;

    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 387);
numPattern = pattern.substring(start, end);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 388);
e = numPattern.indexOf(this.Formats.exponentialSymbol);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 389);
expon = e !== -1 ? numPattern.substring(e + 1) : null;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 390);
if (expon) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 391);
numPattern = numPattern.substring(0, e);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 392);
this._showExponent = true;
    }
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 395);
dot = numPattern.indexOf('.');
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 396);
whole = dot !== -1 ? numPattern.substring(0, dot) : numPattern;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 397);
if (whole) {
        /*var comma = whole.lastIndexOf(',');
            if (comma != -1) {
                this._groupingOffset = whole.length - comma - 1;
            }*/
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 402);
whole = whole.replace(/[^#0]/g,"");
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 403);
zero = whole.indexOf('0');
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 404);
if (zero !== -1) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 405);
this._minIntDigits = whole.length - zero;
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 407);
this._maxIntDigits = whole.length;
    }
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 410);
fract = dot !== -1 ? numPattern.substring(dot + 1) : null;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 411);
if (fract) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 412);
zero = fract.lastIndexOf('0');
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 413);
if (zero !== -1) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 414);
this._minFracDigits = zero + 1;
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 416);
this._maxFracDigits = fract.replace(/[^#0]/g,"").length;
    }
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 419);
this._segments.push(new NumberFormat.NumberSegment(this, numPattern));
	
    // parse suffix
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 422);
results = this.__parseStatic(pattern, i);
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 423);
i = results.offset;
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 424);
if (results.text !== "") {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 425);
this._segments.push(new Format.TextSegment(this, results.text));
    }
	
    // add negative formatter
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 429);
if (skipNegFormat) { return; }
	
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 431);
if (patterns.length > 1) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 432);
pattern = patterns[1];
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 433);
this._negativeFormatter = new NumberFormat(pattern, formats, true);
    }
    else {
        // no negative pattern; insert minus sign before number segment
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 437);
formatter = new NumberFormat("", formats);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 438);
formatter._segments = formatter._segments.concat(this._segments);

        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 440);
index = hasPrefix ? 1 : 0;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 441);
minus = new Format.TextSegment(formatter, this.Formats.minusSign);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 442);
formatter._segments.splice(index, 0, minus);
		
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 444);
this._negativeFormatter = formatter;
    }
};

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 448);
NumberFormat = Y.Number.__zNumberFormat;
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 449);
Y.extend(NumberFormat, Y.Number.__BaseFormat);
    
// Constants

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 453);
Y.mix(NumberFormat, {
    _NUMBER: "number",
    _INTEGER: "integer",
    _CURRENCY: "currency",
    _PERCENT: "percent",

    _META_CHARS: "0#.,E"
});

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 462);
Y.mix( NumberFormat.prototype, {
    _groupingOffset: Number.MAX_VALUE,
    _minIntDigits: 1,
    _isCurrency: false,
    _isPercent: false,
    _isPerMille: false,
    _showExponent: false,

    /**
     * Format a number
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 476);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 477);
if (number < 0 && this._negativeFormatter) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 478);
return this._negativeFormatter.format(number);
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 481);
var result = Format.prototype.format.call(this, number), pattern = "";
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 483);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 484);
if(number === 1) {
                //Singular
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 486);
pattern = this.Formats.currencyPatternSingular;
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 487);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencySingular"]);
            } else {
                //Plural
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 490);
pattern = this.Formats.currencyPatternPlural;
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 491);
pattern = pattern.replace("{1}", this.Formats[this.currency + "_currencyPlural"]);
            }
            
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 494);
result = pattern.replace("{0}", result);
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 497);
return result;
    },

    /**
     * Parse string and return number
     * @method parse
     * @param s {String} The string to parse
     * @param pp {Number} Parse position. Will start parsing from this index in string s.
     * @return {Number} Parse result
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 507);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 508);
var singular, plural, object;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 509);
if(s.indexOf(this.Formats.minusSign) !== -1 && this._negativeFormatter) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 510);
return this._negativeFormatter.parse(s, pp);
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 513);
if(this._isPluralCurrency) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 514);
singular = this.Formats[this.currency + "_currencySingular"],
                plural = this.Formats[this.currency + "_currencyPlural"];
            
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 517);
s = Y.Lang.trim(s.replace(plural, "").replace(singular, ""));
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 520);
object = null;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 521);
try {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 522);
object = Format.prototype.parse.call(this, s, pp);
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 523);
object = object.value;
        } catch(e) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 525);
Y.error("Failed to parse: " + s, e);
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 528);
return object;
    },

    /**
     * Parse static. Internal use only.
     * @method __parseStatic
     * @private
     * @param {String} s Pattern
     * @param {Number} i Index
     * @return {Object}
     */
    __parseStatic: function(s, i) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "__parseStatic", 539);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 540);
var data = [], c, start, end;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 541);
while (i < s.length) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 542);
c = s.charAt(i++);
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 543);
if (NumberFormat._META_CHARS.indexOf(c) !== -1) {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 544);
i--;
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 545);
break;
            }
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 547);
switch (c) {
                case "'":
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 549);
start = i;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 550);
while (i < s.length && s.charAt(i) !== "'") {
			_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 551);
i++;
                    }
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 553);
end = i;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 554);
c = end - start === 0 ? "'" : s.substring(start, end);
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 555);
break;
                case '%':
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 557);
c = this.Formats.percentSign;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 558);
this._isPercent = true;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 559);
break;
                case '\u2030':
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 561);
c = this.Formats.perMilleSign;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 562);
this._isPerMille = true;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 563);
break;
                case '\u00a4':
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 565);
if(s.charAt(i) === '\u00a4') {
                        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 566);
c = this.Formats[this.currency + "_currencyISO"];
                        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 567);
i++;
                    } else {
                        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 569);
c = this.Formats[this.currency + "_currencySymbol"];
                    }
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 571);
this._isCurrency = true;
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 572);
break;
            }
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 574);
data.push(c);
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 576);
return {
            text: data.join(""),
            offset: i
        };
    },

    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Overrides method from __BaseFormat
     * @method _createParseObject
     * @private
     * @return {Object}
     */
    _createParseObject: function() {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_createParseObject", 589);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 590);
return {
            value: null
        };
    }
}, true);
    
//
// NumberFormat.NumberSegment class
//

/**
 * Number segment class.
 * @class __zNumberFormat.NumberSegment
 * @for __zNumberFormat
 * @namespace Number
 * @extends Number.__BaseFormat.Segment
 *
 * @private
 * @constructor
 *
 * @param format {Number.__zNumberFormat} Parent Format object
 * @param s {String} Pattern representing this segment
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 613);
NumberFormat.NumberSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "NumberSegment", 613);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 614);
if (format === null && s === null) { return; }
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 615);
NumberFormat.NumberSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 617);
Y.extend(NumberFormat.NumberSegment, Format.Segment);

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 619);
Y.mix(NumberFormat.NumberSegment.prototype, {
    /**
     * Format number segment
     * @method format
     * @param number {Number}
     * @return {String} Formatted result
     */
    format: function(number) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 626);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 627);
var expon, exponReg, s;
        // special values
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 629);
if (isNaN(number)) { return this._parent.Formats.nanSymbol; }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 630);
if (number === Number.NEGATIVE_INFINITY || number === Number.POSITIVE_INFINITY) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 631);
return this._parent.Formats.infinitySign;
        }

        // adjust value
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 635);
if (typeof number !== "number") { number = Number(number); }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 636);
number = Math.abs(number); // NOTE: minus sign is part of pattern
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 637);
if (this._parent._isPercent) { number *= 100; }
        else {_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 638);
if (this._parent._isPerMille) { number *= 1000; }}
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 639);
if(this._parent._parseIntegerOnly) { number = Math.floor(number); }
        
        // format
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 642);
expon = this._parent.Formats.exponentialSymbol;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 643);
exponReg = new RegExp(expon + "+");
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 644);
s = this._parent._showExponent
            ? number.toExponential(this._parent._maxFracDigits).toUpperCase().replace(exponReg,expon)
            : number.toFixed(this._parent._maxFracDigits || 0);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 647);
s = this._normalize(s);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 648);
return s;
    },

    /**
     * Normalize pattern
     * @method _normalize
     * @protected
     * @param {String} s Pattern
     * @return {String} Normalized pattern
     */
    _normalize: function(s) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "_normalize", 658);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 659);
var exponSymbol = this._parent.Formats.exponentialSymbol,
            splitReg = new RegExp("[\\." + exponSymbol + "]"),
            match = s.split(splitReg),
            whole = match.shift(),  //Normalize the whole part
            a = [],
            offset = this._parent._primaryGrouping,
            fract = '0',
            decimal = this._parent.Formats.decimalSeparator,
            expon, i;

	_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 669);
if (whole.length < this._parent._minIntDigits) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 670);
whole = Y.Number._zeroPad(whole, this._parent._minIntDigits, this._parent.Formats.numberZero);
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 672);
if (whole.length > this._parent._primaryGrouping && this._parent._useGrouping) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 673);
i = whole.length - offset;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 674);
while (i > 0) {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 675);
a.unshift(whole.substr(i, offset));
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 676);
a.unshift(this._parent.Formats.groupingSeparator);
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 677);
offset = this._parent._secondaryGrouping;
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 678);
i -= offset;
            }
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 680);
a.unshift(whole.substring(0, i + offset));
		
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 682);
whole = a.join("");
        }
	
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 685);
if(s.match(/\./)) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 686);
fract = match.shift();
        }
        else {_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 688);
if(s.match(/\e/) || s.match(/\E/)) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 689);
expon = match.shift();
        }}

        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 692);
fract = fract.replace(/0+$/,"");
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 693);
if (fract.length < this._parent._minFracDigits) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 694);
fract = Y.Number._zeroPad(fract, this._parent._minFracDigits, this._parent.Formats.numberZero, true);
        }
	
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 697);
a = [ whole ];
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 698);
if (fract.length > 0) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 699);
a.push(decimal, fract);
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 701);
if (expon) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 702);
a.push(exponSymbol, expon.replace(/^\+/,""));
        }
	
        // return normalize result
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 706);
return a.join("");
    },

    /**
     * Parse Number Segment
     * @method parse
     * @param object {Object} Result will be stored in object.value
     * @param s {String} Pattern
     * @param index {Number}
     * @return {Number} Index in s where parse ended
     */
    parse: function(object, s, index) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 717);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 718);
var comma = this._parent.Formats.groupingSeparator,
            dot = this._parent.Formats.decimalSeparator,
            minusSign = this._parent.Formats.minusSign,
            expon = this._parent.Formats.exponentialSymbol,
            numberRegexPattern = "[\\" + minusSign + "0-9" + comma + "]+",
            numberRegex, matches, negativeNum, endIndex, scientific = null, i,
            //If more groups, use primary/secondary grouping as applicable
            grouping = this._parent._secondaryGrouping || this._parent._primaryGrouping;

        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 727);
if(!this._parent._parseIntegerOnly) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 728);
numberRegexPattern += "(\\" + dot + "[0-9]+)?";
        }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 730);
if(this._parent._showExponent) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 731);
numberRegexPattern += "(" + expon +"\\+?[0-9]+)";
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 734);
numberRegex = new RegExp(numberRegexPattern);
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 735);
matches = s.match(numberRegex);
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 737);
if(!matches) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 738);
Y.error("Error parsing: Number does not match pattern");
        }
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 741);
negativeNum = s.indexOf(minusSign) !== -1;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 742);
endIndex = index + matches[0].length;
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 743);
s = s.slice(index, endIndex);
        
        //Scientific format does not use grouping
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 746);
if(this._parent.showExponent) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 747);
scientific = s.split(expon);
        } else {_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 748);
if(this._parent._useGrouping) {
            //Verify grouping data exists
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 750);
if(!this._parent._primaryGrouping) {
                //Should not happen
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 752);
Y.error("Error parsing: Invalid pattern");
            }
            
            //Verify grouping is correct
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 756);
i = s.length - this._parent._primaryGrouping - 1;
            
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 758);
if(matches[1]) {
                //If there is a decimal part, ignore that. Grouping assumed to apply only to whole number part
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 760);
i = i - matches[1].length;
            }
            
            //Use primary grouping for first group
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 764);
if(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 766);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 767);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 771);
s = s.slice(0, i) + s.slice(i+1);
            }
            
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 774);
i = i - grouping - 1;
            
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 776);
while(i > 0) {
                //There should be a comma at i
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 778);
if(s.charAt(i) !== ',') {
                    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 779);
Y.error("Error parsing: Number does not match pattern");
                }
                
                //Remove comma
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 783);
s = s.slice(0, i) + s.slice(i+1);
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 784);
i = i - grouping - 1;
            }
            
            //Verify there are no more grouping separators
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 788);
if(s.indexOf(comma) !== -1) {
                _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 789);
Y.error("Error parsing: Number does not match pattern");
            }
        }}
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 793);
if(scientific) {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 794);
object.value = parseFloat(scientific[0], 10) * Math.pow(10, parseFloat(scientific[1], 10));
        } else {
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 796);
object.value = parseFloat(s, 10);
        }
        
        //Special types
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 800);
if(negativeNum) { object.value *= -1; }
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 801);
if (this._parent._isPercent) { object.value /= 100; }
        else {_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 802);
if (this._parent._isPerMille) { object.value /= 1000; }}
        
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 804);
return endIndex;
    }
}, true);

/**
 * Number Formatting
 * @class __YNumberFormat
 * @namespace Number
 * @private
 * @constructor
 * @param [style='NUMBER_STYLE'] {Number} the given style. Should be key/value from Y.Number.STYLES
 */
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 816);
Y.Number.__YNumberFormat = function(style) {
    _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "__YNumberFormat", 816);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 817);
style = style || Y.Number.STYLES.NUMBER_STYLE;
    
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 819);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 820);
style = Y.Number.STYLES[style];
    }
    
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 823);
var pattern = "",
        formats = Y.Intl.get("datatype-number-advanced-format");
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 825);
switch(style) {
        case Y.Number.STYLES.CURRENCY_STYLE:
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 827);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 828);
break;
        case Y.Number.STYLES.ISO_CURRENCY_STYLE:
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 830);
pattern = formats.currencyFormat;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 831);
pattern = pattern.replace("\u00a4", "\u00a4\u00a4");
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 832);
break;
        case Y.Number.STYLES.NUMBER_STYLE:
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 834);
pattern = formats.decimalFormat;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 835);
break;
        case Y.Number.STYLES.PERCENT_STYLE:
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 837);
pattern = formats.percentFormat;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 838);
break;
        case Y.Number.STYLES.PLURAL_CURRENCY_STYLE:
            //This is like <value> <currency>. This may be dependent on whether the value is singular or plural. Will be handled during formatting
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 841);
pattern = "{plural_style}";
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 842);
break;
        case Y.Number.STYLES.SCIENTIFIC_STYLE:
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 844);
pattern = formats.scientificFormat;
            _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 845);
break;
    }
        
    _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 848);
this._numberFormatInstance = new NumberFormat(pattern, formats);
};

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 851);
YNumberFormat = Y.Number.__YNumberFormat;

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 853);
Y.mix(Y.Number, {
    /**
     * Style values to use during format/parse
     * @property STYLES
     * @type Object
     * @static
     * @final
     * @for Number
     */
    STYLES: {
        CURRENCY_STYLE: 1,
        ISO_CURRENCY_STYLE: 2,
        NUMBER_STYLE: 4,
        PERCENT_STYLE: 8,
        PLURAL_CURRENCY_STYLE: 16,
        SCIENTIFIC_STYLE: 32
    }
});
   
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 872);
Y.mix(YNumberFormat.prototype, {
    /**
     * Format a number
     * @method format
     * @param number {Number} the number to format
     * @for Number.YNumberFormat
     * @return {Number}
     */
    format: function(number) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 880);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 881);
return this._numberFormatInstance.format(number);
    },
    
    /**
     * Return true if this format will parse numbers as integers only.
     * For example in the English locale, with ParseIntegerOnly true, the string "1234." would be parsed as the integer value 1234
     * and parsing would stop at the "." character. Of course, the exact format accepted by the parse operation is locale dependant.
     * @method isParseIntegerOnly
     * @return {Boolean}
     */
    isParseIntegerOnly: function() {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "isParseIntegerOnly", 891);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 892);
return this._numberFormatInstance._parseIntegerOnly;
    },
    
    /**
     * Parse the string to get a number
     * @method parse
     * @param {String} txt The string to parse
     * @param {Number} [pp=0] Parse position. The position to start parsing at.
     */
    parse: function(txt, pp) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 901);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 902);
return this._numberFormatInstance.parse(txt, pp);
    },
    
    /**
     * Sets whether or not numbers should be parsed as integers only.
     * @method setParseIntegerOnly
     * @param {Boolean} newValue set True, this format will parse numbers as integers only.
     */
    setParseIntegerOnly: function(newValue) {
        _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "setParseIntegerOnly", 910);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 911);
this._numberFormatInstance._parseIntegerOnly = newValue;
    }
});
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 914);
Y.mix( Y.Number, {
     _oldFormat: Y.Number.format,
     _oldParse:  Y.Number.parse
});

_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 919);
Y.mix( Y.Number, {
     /**
      * Takes a Number and formats to string for display to user
      *
      * @for Number
      * @method format
      * @param data {Number} Number
      * @param [config] {Object} Optional Configuration values.
      *   <dl>
      *      <dt>[style] {Number|String}</dt>
      *         <dd>Format/Style to use. See Y.Number.STYLES</dd>
      *      <dt>[parseIntegerOnly] {Boolean}</dt>
      *         <dd>If set to true, only the whole number part of data will be used</dd>
      *      <dt>[prefix] {String}</dd>
      *         <dd>String prepended before each number, like a currency designator "$"</dd>
      *      <dt>[decimalPlaces] {Number}</dd>
      *         <dd>Number of decimal places to round. Must be a number 0 to 20.</dd>
      *      <dt>[decimalSeparator] {String}</dd>
      *         <dd>Decimal separator</dd>
      *      <dt>[thousandsSeparator] {String}</dd>
      *         <dd>Thousands separator</dd>
      *      <dt>[suffix] {String}</dd>
      *         <dd>String appended after each number, like " items" (note the space)</dd>
      *   </dl>
      * @return {String} Formatted string representation of data
      */
     format: function(data, config) {
         _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "format", 945);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 946);
config = config || {};
    
         _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 948);
if(config.prefix !== undefined || config.decimalPlaces !== undefined || config.decimalSeparator !== undefined
               || config.thousandsSeparator !== undefined || config.suffix !== undefined) {
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 950);
return Y.Number._oldFormat(data, config);
         }
    
         _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 953);
try {
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 954);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 955);
if(config.parseIntegerOnly) {
                 _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 956);
formatter.setParseIntegerOnly(true);
             }
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 958);
return formatter.format(data);
         } catch(e) {
             //Error. Fallback to original format
         }
         _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 962);
return Y.Number._oldFormat(data, config);
     },

     /**
      * Parses data and returns a number
      *
      * @for Number
      * @method format
      * @param data {String} Data to be parsed
      * @param [config] (Object} Object containg 'style' (Pattern data is represented in.
               See Y.Number.STYLES) and 'parsePosition' (index position in data to start parsing at) Both parameters are optional.
               If omitted, style defaults to NUMBER_STYLE, and parsePosition defaults to 0
      * @return {Number} Number represented by data
      */
     parse: function(data, config) {
         _yuitest_coverfunc("build/datatype-number-advanced-format/datatype-number-advanced-format.js", "parse", 976);
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 977);
try {
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 978);
var formatter = new YNumberFormat(config.style);
             _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 979);
return formatter.parse(data, config.parsePosition);
         } catch(e) {
             //Fallback on deprecated parse
         }
    
         _yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 984);
return Y.Number._oldParse(data);
     }
}, true);

//Update Parsers shortcut
_yuitest_coverline("build/datatype-number-advanced-format/datatype-number-advanced-format.js", 989);
Y.namespace("Parsers").number = Y.Number.parse;


}, '@VERSION@', {
    "lang": [
        "af",
        "af-NA",
        "af-ZA",
        "am-ET",
        "am",
        "ar-AE",
        "ar-BH",
        "ar-DZ",
        "ar-EG",
        "ar-IQ",
        "ar-JO",
        "ar",
        "ar-KW",
        "ar-LB",
        "ar-LY",
        "ar-MA",
        "ar-OM",
        "ar-QA",
        "ar-SA",
        "ar-SD",
        "ar-SY",
        "ar-TN",
        "ar-YE",
        "as-IN",
        "as",
        "az-AZ",
        "az-Cyrl-AZ",
        "az-Cyrl",
        "az",
        "az-Latn-AZ",
        "be-BY",
        "be",
        "bg-BG",
        "bg",
        "bn-BD",
        "bn-IN",
        "bn",
        "bo-CN",
        "bo-IN",
        "bo",
        "ca-ES",
        "ca",
        "cs-CZ",
        "cs",
        "cy-GB",
        "cy",
        "da-DK",
        "da",
        "de-AT",
        "de-BE",
        "de-CH",
        "de-DE",
        "de",
        "de-LI",
        "de-LU",
        "el-CY",
        "el-GR",
        "el",
        "en-AU",
        "en-BE",
        "en-BW",
        "en-BZ",
        "en-CA",
        "en-GB",
        "en-HK",
        "en-IE",
        "en-IN",
        "en-JM",
        "en-JO",
        "en-MH",
        "en-MT",
        "en-MY",
        "en-NA",
        "en-NZ",
        "en-PH",
        "en-PK",
        "en-RH",
        "en-SG",
        "en-TT",
        "en-US",
        "en-US-POSIX",
        "en-VI",
        "en-ZA",
        "en-ZW",
        "eo",
        "es-AR",
        "es-BO",
        "es-CL",
        "es-CO",
        "es-CR",
        "es-DO",
        "es-EC",
        "es-ES",
        "es-GT",
        "es-HN",
        "es",
        "es-MX",
        "es-NI",
        "es-PA",
        "es-PE",
        "es-PR",
        "es-PY",
        "es-SV",
        "es-US",
        "es-UY",
        "es-VE",
        "et-EE",
        "et",
        "eu-ES",
        "eu",
        "fa-AF",
        "fa-IR",
        "fa",
        "fi-FI",
        "fi",
        "fil",
        "fil-PH",
        "fo-FO",
        "fo",
        "fr-BE",
        "fr-CA",
        "fr-CH",
        "fr-FR",
        "fr",
        "fr-LU",
        "fr-MC",
        "fr-SN",
        "ga-IE",
        "ga",
        "gl-ES",
        "gl",
        "gsw-CH",
        "gsw",
        "gu-IN",
        "gu",
        "gv-GB",
        "gv",
        "ha-GH",
        "ha",
        "ha-Latn-GH",
        "ha-Latn-NE",
        "ha-Latn-NG",
        "ha-NE",
        "ha-NG",
        "haw",
        "haw-US",
        "he-IL",
        "he",
        "hi-IN",
        "hi",
        "hr-HR",
        "hr",
        "hu-HU",
        "hu",
        "hy-AM",
        "hy",
        "id-ID",
        "id",
        "ii-CN",
        "ii",
        "in-ID",
        "in",
        "is-IS",
        "is",
        "it-CH",
        "it-IT",
        "it",
        "iw-IL",
        "iw",
        "ja-JP",
        "ja-JP-TRADITIONAL",
        "ja",
        "",
        "ka-GE",
        "ka",
        "kk-Cyrl-KZ",
        "kk",
        "kk-KZ",
        "kl-GL",
        "kl",
        "km",
        "km-KH",
        "kn-IN",
        "kn",
        "ko",
        "kok-IN",
        "kok",
        "ko-KR",
        "kw-GB",
        "kw",
        "lt",
        "lt-LT",
        "lv",
        "lv-LV",
        "mk",
        "mk-MK",
        "ml-IN",
        "ml",
        "mr-IN",
        "mr",
        "ms-BN",
        "ms",
        "ms-MY",
        "mt",
        "mt-MT",
        "nb",
        "nb-NO",
        "ne-IN",
        "ne",
        "ne-NP",
        "nl-BE",
        "nl",
        "nl-NL",
        "nn",
        "nn-NO",
        "no",
        "no-NO",
        "no-NO-NY",
        "om-ET",
        "om",
        "om-KE",
        "or-IN",
        "or",
        "pa-Arab",
        "pa-Arab-PK",
        "pa-Guru-IN",
        "pa-IN",
        "pa",
        "pa-PK",
        "pl",
        "pl-PL",
        "ps-AF",
        "ps",
        "pt-BR",
        "pt",
        "pt-PT",
        "ro",
        "ro-MD",
        "ro-RO",
        "ru",
        "ru-RU",
        "ru-UA",
        "sh-BA",
        "sh-CS",
        "sh",
        "sh-YU",
        "si",
        "si-LK",
        "sk",
        "sk-SK",
        "sl",
        "sl-SI",
        "so-DJ",
        "so-ET",
        "so",
        "so-KE",
        "so-SO",
        "sq-AL",
        "sq",
        "sr-BA",
        "sr-CS",
        "sr-Cyrl-BA",
        "sr-Cyrl-CS",
        "sr-Cyrl-ME",
        "sr-Cyrl-RS",
        "sr-Cyrl-YU",
        "sr",
        "sr-Latn-BA",
        "sr-Latn-CS",
        "sr-Latn",
        "sr-Latn-ME",
        "sr-Latn-RS",
        "sr-Latn-YU",
        "sr-ME",
        "sr-RS",
        "sr-YU",
        "sv-FI",
        "sv",
        "sv-SE",
        "sw",
        "sw-KE",
        "sw-TZ",
        "ta-IN",
        "ta",
        "te-IN",
        "te",
        "th",
        "th-TH",
        "ti-ER",
        "ti-ET",
        "ti",
        "tl",
        "tl-PH",
        "tr",
        "tr-TR",
        "uk",
        "uk-UA",
        "ur-IN",
        "ur",
        "ur-PK",
        "uz-AF",
        "uz-Arab-AF",
        "uz-Arab",
        "uz-Cyrl-UZ",
        "uz",
        "uz-Latn",
        "uz-Latn-UZ",
        "uz-UZ",
        "vi",
        "vi-VN",
        "zh-CN",
        "zh-Hans-CN",
        "zh-Hans-HK",
        "zh-Hans-MO",
        "zh-Hans-SG",
        "zh-Hant-HK",
        "zh-Hant",
        "zh-Hant-MO",
        "zh-Hant-TW",
        "zh-HK",
        "zh",
        "zh-MO",
        "zh-SG",
        "zh-TW",
        "zu",
        "zu-ZA"
    ],
    "requires": [
        "datatype-number-format",
        "datatype-number-parse"
    ]
});
