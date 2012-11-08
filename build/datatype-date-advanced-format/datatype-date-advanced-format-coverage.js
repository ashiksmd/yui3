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
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatype-date-advanced-format/datatype-date-advanced-format.js",
    code: []
};
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].code=["YUI.add('datatype-date-advanced-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc. "," */","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the"," * format of your choice and call the <code>format</code> method which"," * returns the formatted string."," */","Format = function(pattern, formats) {","    if (arguments.length == 0) {","        return;","    }","    this._pattern = pattern;","    this._segments = []; ","    this.Formats = formats; ","}","","// Data","","Format.prototype._pattern = null;","Format.prototype._segments = null;","","//Exceptions","","Y.mix(Format, {","    Exception: function(name, message) {","        this.name = name;","        this.message = message;","        this.toString = function() {","            return this.name + \": \" + this.message;","        }","    },","    ParsingException: function(message) {","        Format.ParsingException.superclass.constructor.call(this, \"ParsingException\", message);","    },","    IllegalArgumentsException: function(message) {","        Format.IllegalArgumentsException.superclass.constructor.call(this, \"IllegalArgumentsException\", message);","    },","    FormatException: function(message) {","        Format.FormatException.superclass.constructor.call(this, \"FormatException\", message);","    }","});","","Y.extend(Format.ParsingException, Format.Exception);","Y.extend(Format.IllegalArgumentsException, Format.Exception);","Y.extend(Format.FormatException, Format.Exception);","","// Public methods","","Format.prototype.format = function(object) { ","    var s = [];","        ","    for (var i = 0; i < this._segments.length; i++) {","        s.push(this._segments[i].format(object));","    }","    return s.join(\"\");","};","","// Protected static methods","","function zeroPad (s, length, zeroChar, rightSide) {","    s = typeof s == \"string\" ? s : String(s);","","    if (s.length >= length) return s;","","    zeroChar = zeroChar || '0';","	","    var a = [];","    for (var i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","}","    ","/** "," * Parses the given string according to this format's pattern and returns"," * an object."," * <p>"," * <strong>Note:</strong>"," * The default implementation of this method assumes that the sub-class"," * has implemented the <code>_createParseObject</code> method."," */","Format.prototype.parse = function(s, pp) {","    var object = this._createParseObject();","    var index = pp || 0;","    for (var i = 0; i < this._segments.length; i++) {","        var segment = this._segments[i];","        index = segment.parse(object, s, index);","    }","        ","    if (index < s.length) {","        throw new Format.ParsingException(\"Input too long\");","    }","    return object;","};","    ","/**"," * Creates the object that is initialized by parsing"," * <p>"," * <strong>Note:</strong>"," * This must be implemented by sub-classes."," */","Format.prototype._createParseObject = function(s) {","    throw new Format.ParsingException(\"Not implemented\");","};","","//","// Segment class","//","","Format.Segment = function(format, s) {","    if (arguments.length == 0) return;","    this._parent = format;","    this._s = s;","};","    ","// Public methods","","Format.Segment.prototype.format = function(o) { ","    return this._s; ","};","","/**"," * Parses the string at the given index, initializes the parse object"," * (as appropriate), and returns the new index within the string for"," * the next parsing step."," * <p>"," * <strong>Note:</strong>"," * This method must be implemented by sub-classes."," *"," * @param o     [object] The parse object to be initialized."," * @param s     [string] The input string to be parsed."," * @param index [number] The index within the string to start parsing."," */","Format.Segment.prototype.parse = function(o, s, index) {","    throw new Format.ParsingException(\"Not implemented\");","};","","Format.Segment.prototype.getFormat = function() {","    return this._parent;","};","","Format.Segment._parseLiteral = function(literal, s, index) {","    if (s.length - index < literal.length) {","        throw new Format.ParsingException(\"Input too short\");","    }","    for (var i = 0; i < literal.length; i++) {","        if (literal.charAt(i) != s.charAt(index + i)) {","            throw new Format.ParsingException(\"Input doesn't match\");","        }","    }","    return index + literal.length;","};","    ","/**"," * Parses an integer at the offset of the given string and calls a"," * method on the specified object."," *"," * @param o         [object]   The target object."," * @param f         [function|string] The method to call on the target object."," *                             If this parameter is a string, then it is used"," *                             as the name of the property to set on the"," *                             target object."," * @param adjust    [number]   The numeric adjustment to make on the"," *                             value before calling the object method."," * @param s         [string]   The string to parse."," * @param index     [number]   The index within the string to start parsing."," * @param fixedlen  [number]   If specified, specifies the required number"," *                             of digits to be parsed."," * @param radix     [number]   Optional. Specifies the radix of the parse"," *                             string. Defaults to 10 if not specified."," */","Format.Segment._parseInt = function(o, f, adjust, s, index, fixedlen, radix) {","    var len = fixedlen || s.length - index;","    var head = index;","    for (var i = 0; i < len; i++) {","        if (!s.charAt(index++).match(/\\d/)) {","            index--;","            break;","        }","    }","    var tail = index;","    if (head == tail) {","        throw new Format.ParsingException(\"Number not present\");","    }","    if (fixedlen && tail - head != fixedlen) {","        throw new Format.ParsingException(\"Number too short\");","    }","    var value = parseInt(s.substring(head, tail), radix || 10);","    if (f) {","        var target = o || window;","        if (typeof f == \"function\") {","            f.call(target, value + adjust);","        }","        else {","            target[f] = value + adjust;","        }","    }","    return tail;","};","","//","// Text segment class","//","","Format.TextSegment = function(format, s) {","    if (arguments.length == 0) return;","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Format.TextSegment.prototype.toString = function() { ","    return \"text: \\\"\"+this._s+'\"'; ","};","    ","Format.TextSegment.prototype.parse = function(o, s, index) {","    return Format.Segment._parseLiteral(this._s, s, index);","};","","if(String.prototype.trim == null) {","    String.prototype.trim = function() {","        return this.replace(/^\\s+/, '').replace(/\\s+$/, '');","    };","}","/**"," * YDateFormat provides absolute date and time formatting."," * Applications can choose date, time, and time zone components separately. For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported. "," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," * "," * Absolute formats use the default calendar specified in CLDR for each locale. Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags; for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory. "," */","","var MODULE_NAME = \"datatype-date-advanced-format\";","    ","//","// Resources","//","ShortNames = {","    \"weekdayMonShort\":\"M\",","    \"weekdayTueShort\":\"T\",","    \"weekdayWedShort\":\"W\",","    \"weekdayThuShort\":\"T\",","    \"weekdayFriShort\":\"F\",","    \"weekdaySatShort\":\"S\",","    \"weekdaySunShort\":\"S\",","    \"monthJanShort\":\"J\",","    \"monthFebShort\":\"F\",","    \"monthMarShort\":\"M\",","    \"monthAprShort\":\"A\",","    \"monthMayShort\":\"M\",","    \"monthJunShort\":\"J\",","    \"monthJulShort\":\"J\",","    \"monthAugShort\":\"A\",","    \"monthSepShort\":\"S\",","    \"monthOctShort\":\"O\",","    \"monthNovShort\":\"N\",","    \"monthDecShort\":\"D\"","}","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified "," * pattern. The patterns are defined the same as the SimpleDateFormat"," * class in the Java libraries."," * <p>"," * <strong>Note:</strong>"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended "," * pattern found in the Common Locale Data Repository (CLDR) found at: "," * http://www.unicode.org/cldr/."," */","DateFormat = function(pattern, formats, timeZoneId) {","    if (arguments.length == 0) {","        return;","    }","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern == null) {","        return;","    }","    var head, tail, segment;","    for (var i = 0; i < pattern.length; i++) {","        // literal","        var c = pattern.charAt(i);","        if (c == \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c == \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) == \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i == pattern.length) {","                throw new Format.FormatException(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) != -1 || c == \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head != tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) != c) {","                break;","            }		","        }","        tail = i--;","        var count = tail - head;","        var field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment != null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","}","Y.extend(DateFormat, Format);","","// Constants","","DateFormat.SHORT = 0;","DateFormat.MEDIUM = 1;","DateFormat.LONG = 2;","DateFormat.DEFAULT = DateFormat.MEDIUM;","","DateFormat._META_CHARS = \"GyMwWDdFEaHkKhmsSzZ\";","","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false;","    if(relative != null && relative != \"\") {","        useRelative = true;","    }","","    var s = [];","    var datePattern = false;","    for (var i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") == 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") == 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","}","","//","// Date segment class","//","","DateFormat.DateSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","}","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","DateFormat.EraSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","// Public methods","","DateFormat.EraSegment.prototype.format = function(date) { ","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","DateFormat.YearSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","DateFormat.YearSegment.prototype.toString = function() { ","    return \"dateYear: \\\"\"+this._s+'\"'; ","};","","// Public methods","","DateFormat.YearSegment.prototype.format = function(date) { ","    var year = String(date.getFullYear());","    return this._s.length != 1 && this._s.length < 4 ? year.substr(year.length - 2) : zeroPad(year, this._s.length);","};","","//","// Date month segment class","//","","DateFormat.MonthSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","DateFormat.MonthSegment.prototype.toString = function() { ","    return \"dateMonth: \\\"\"+this._s+'\"'; ","};","","DateFormat.MonthSegment.prototype.initialize = function() {","    DateFormat.MonthSegment.MONTHS = {};","    DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","    ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","    ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","    ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","    ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","    ];","    DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","    this.getFormat().Formats.monthJanMedium, this.getFormat().Formats.monthFebMedium, this.getFormat().Formats.monthMarMedium,","    this.getFormat().Formats.monthAprMedium, this.getFormat().Formats.monthMayMedium, this.getFormat().Formats.monthJunMedium,","    this.getFormat().Formats.monthJulMedium, this.getFormat().Formats.monthAugMedium, this.getFormat().Formats.monthSepMedium,","    this.getFormat().Formats.monthOctMedium, this.getFormat().Formats.monthNovMedium, this.getFormat().Formats.monthDecMedium","    ];","    DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","    this.getFormat().Formats.monthJanLong, this.getFormat().Formats.monthFebLong, this.getFormat().Formats.monthMarLong,","    this.getFormat().Formats.monthAprLong, this.getFormat().Formats.monthMayLong, this.getFormat().Formats.monthJunLong,","    this.getFormat().Formats.monthJulLong, this.getFormat().Formats.monthAugLong, this.getFormat().Formats.monthSepLong,","    this.getFormat().Formats.monthOctLong, this.getFormat().Formats.monthNovLong, this.getFormat().Formats.monthDecLong","    ];","};","","// Public methods","","DateFormat.MonthSegment.prototype.format = function(date) {","    var month = date.getMonth();","    switch (this._s.length) {","        case 1:","            return String(month + 1);","        case 2:","            return zeroPad(month + 1, 2);","        case 3:","            return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","        case 5:","            return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","    }","    return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","};","","//","// Date week segment class","//","","DateFormat.WeekSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","// Public methods","","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear();","    var month = date.getMonth();","    var day = date.getDate();","	","    var ofYear = /w/.test(this._s);","    var date2 = new Date(year, ofYear ? 0 : month, 1);","","    var week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() == month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","DateFormat.DaySegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","// Public methods","","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth();","    var day = date.getDate();","    if (/D/.test(this._s) && month > 0) {","        var year = date.getYear();","        do {","            // set date to first day of month and then go back one day","            var date2 = new Date(year, month, 1);","            date2.setDate(0); ","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","DateFormat.WeekdaySegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","DateFormat.DaySegment.prototype.toString = function() { ","    return \"dateDay: \\\"\"+this._s+'\"'; ","};","","DateFormat.WeekdaySegment.prototype.initialize = function() {","    DateFormat.WeekdaySegment.WEEKDAYS = {};","    // NOTE: The short names aren't available in Java so we have to define them.","    DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","    ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","    ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","    ShortNames.weekdaySatShort","    ];","    DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","    this.getFormat().Formats.weekdaySunMedium, this.getFormat().Formats.weekdayMonMedium, this.getFormat().Formats.weekdayTueMedium,","    this.getFormat().Formats.weekdayWedMedium, this.getFormat().Formats.weekdayThuMedium, this.getFormat().Formats.weekdayFriMedium,","    this.getFormat().Formats.weekdaySatMedium","    ];","    DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","    this.getFormat().Formats.weekdaySunLong, this.getFormat().Formats.weekdayMonLong, this.getFormat().Formats.weekdayTueLong,","    this.getFormat().Formats.weekdayWedLong, this.getFormat().Formats.weekdayThuLong, this.getFormat().Formats.weekdayFriLong,","    this.getFormat().Formats.weekdaySatLong","    ];","};","","// Public methods","","DateFormat.WeekdaySegment.prototype.format = function(date) {","    var weekday = date.getDay();","    if (/E/.test(this._s)) {","        var style;","        switch (this._s.length) {","            case 4:","                style = DateFormat.LONG;","                break;","            case 5:","                style = DateFormat.SHORT;","                break;","            default:","                style = DateFormat.MEDIUM;","        }","        return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","    }","    return zeroPad(weekday, this._s.length);","};","","//","// Time segment class","//","","DateFormat.TimeSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Format.Segment);","","//","// Time hour segment class","//","","DateFormat.HourSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","DateFormat.HourSegment.prototype.toString = function() { ","    return \"timeHour: \\\"\"+this._s+'\"'; ","};","","// Public methods","","DateFormat.HourSegment.prototype.format = function(date) {","    var hours = date.getHours();","    if (hours > 12 && /[hK]/.test(this._s)) {","        hours -= 12;","    }","    else if (hours == 0 && /[h]/.test(this._s)) {","        hours = 12;","    }","    /***","	// NOTE: This is commented out to match the Java formatter output","	//       but from the comments for these meta-chars, it doesn't","	//       seem right.","	if (/[Hk]/.test(this._s)) {","		hours--;","	}","    /***/","    return zeroPad(hours, this._s.length);","};","","//","// Time minute segment class","//","","DateFormat.MinuteSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","DateFormat.MinuteSegment.prototype.toString = function() { ","    return \"timeMinute: \\\"\"+this._s+'\"'; ","};","","// Public methods","","DateFormat.MinuteSegment.prototype.format = function(date) {","    var minutes = date.getMinutes();","    return zeroPad(minutes, this._s.length);","};","","//","// Time second segment class","//","","DateFormat.SecondSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","// Public methods","","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","DateFormat.AmPmSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","DateFormat.AmPmSegment.prototype.toString = function() { ","    return \"timeAmPm: \\\"\"+this._s+'\"'; ","};","","// Public methods","","DateFormat.AmPmSegment.prototype.format = function(date) {","    var hours = date.getHours();","    return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","};","","//","// Time timezone segment class","//","","DateFormat.TimezoneSegment = function(format, s) {","    if (arguments.length == 0) return;","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","DateFormat.TimezoneSegment.prototype.toString = function() { ","    return \"timeTimezone: \\\"\"+this._s+'\"'; ","};","","// Public methods","","DateFormat.TimezoneSegment.prototype.format = function(date) {","    if (/Z/.test(this._s)) {","        return this.getFormat().timeZone.getShortName();","    }","    return this._s.length < 4 ? this.getFormat().timeZone.getMediumName() : this.getFormat().timeZone.getLongName();","};","    ","//","// Non-Gregorian Calendars","//","    ","//Buddhist Calendar. This is normally used only for Thai locales (th).","BuddhistDateFormat = function(pattern, formats, timeZoneId, locale) {","    if (arguments.length == 0) return;","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId, locale);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments;","    for(var i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","}","","Y.extend(BuddhistDateFormat, DateFormat);","    ","//Override YearSegment class for Buddhist Calender","BuddhistDateFormat.YearSegment = function(segment) {","    if (arguments.length == 0) return;","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","BuddhistDateFormat.YearSegment.prototype.format = function(date) { ","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length != 1 && this._s.length < 4 ? year.substr(year.length - 2) : zeroPad(year, this._s.length);","};","    ","//Override EraSegment class for Buddhist Calender","BuddhistDateFormat.EraSegment = function(segment) {","    if (arguments.length == 0) return;","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","BuddhistDateFormat.EraSegment.prototype.format = function(date) { ","    return \"BE\";    //Only Buddhist Era supported for now","};","        ","//","// Start YUI code","//","    ","/**"," * @class YDateFormat"," * @constructor"," * @param {String} timeZone (Optional) TZ database ID for the time zone that should be used. If no argument is provided, \"Etc/GMT\" is used. If an argument is provided that is not a valid time zone identifier, an Error exception is thrown."," * @param {Number} dateFormat (Optional) Selector for the desired date format from Y.Date.DATE_FORMATS. If no argument is provided, NONE is assumed. If an argument is provided that's not a valid selector, an Error exception is thrown. "," * @param {Number} timeFormat (Optional) Selector for the desired time format from Y.Date.TIME_FORMATS. If no argument is provided, NONE is assumed. If an argument is provided that's not a valid selector, an Error exception is thrown. "," * @param {Number} timeZoneFormat (Optional) Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS. If no argument is provided, NONE is assumed. If an argument is provided that's not a valid selector, an Error exception is thrown. "," */","YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone == null) {","        timeZone = \"Etc/GMT\";","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","        throw new Y.Date.Timezone.UnknownTimeZoneException(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat;","    this._timeFormat = timeFormat;","    this._timeZoneFormat = timeZoneFormat;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }        ","}","","Y.mix(Y.Date, {","    //Selector values","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    },","    ","    //Static methods","    ","    /**","     * Returns an array of BCP 47 language tags for the languages supported by this class","     * @return {Array} an array of BCP 47 language tags for the languages supported by this class.","     */","    availableLanguages: function() {","        return Y.Intl.getAvailableLangs(MODULE_NAME);","    }","});","","//Private methods","","/**"," * Generate date pattern for selected format"," * @return {String} Date pattern for internal use."," */","YDateFormat.prototype._generateDatePattern = function() {","    var format = this._dateFormat;","    if(format && Y.Lang.isString(format)) {","        format = Y.Date.DATE_FORMATS[format];","    }","    ","    if(format == null) return \"\";","    if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","        this._relative = true;","        format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","    }","    switch(format) {","        //Use relative only for formats with day component","        case Y.Date.DATE_FORMATS.NONE:","            this._relative = false;","            return \"\";","        case Y.Date.DATE_FORMATS.WYMD_LONG:","            return this._Formats.WYMD_long;","        case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","            return this._Formats.WYMD_abbreviated;","        case Y.Date.DATE_FORMATS.WYMD_SHORT:","            return this._Formats.WYMD_short;","        case Y.Date.DATE_FORMATS.WMD_LONG:","            return this._Formats.WMD_long;","        case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","            return this._Formats.WMD_abbreviated;","        case Y.Date.DATE_FORMATS.WMD_SHORT:","            return this._Formats.WMD_short;","        case Y.Date.DATE_FORMATS.YMD_LONG:","            return this._Formats.YMD_long;","        case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","            return this._Formats.YMD_abbreviated;","        case Y.Date.DATE_FORMATS.YMD_SHORT:","            return this._Formats.YMD_short;","        case Y.Date.DATE_FORMATS.YM_LONG:","            this._relative = false;","            return this._Formats.YM_long;","        case Y.Date.DATE_FORMATS.MD_LONG:","            return this._Formats.MD_long;","        case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","            return this._Formats.MD_abbreviated;","        case Y.Date.DATE_FORMATS.MD_SHORT:","            return this._Formats.MD_short;","        case Y.Date.DATE_FORMATS.W_LONG:","            this._relative = false;","            return this._Formats.W_long;","        case Y.Date.DATE_FORMATS.W_ABBREVIATED:","            this._relative = false;","            return this._Formats.W_abbreviated;","        case Y.Date.DATE_FORMATS.M_LONG:","            this._relative = false;","            return this._Formats.M_long;","        case Y.Date.DATE_FORMATS.M_ABBREVIATED:","            this._relative = false;","            return this._Formats.M_abbreviated;","        case Y.Date.DATE_FORMATS.YMD_FULL:","            return this._Formats.YMD_full;","        default:","            throw new Format.IllegalArgumentsException(\"Date format given does not exist\");	//Error no such pattern.","    }","}","    ","/**"," * Generate time pattern for selected format"," * @return {String} Time pattern for internal use."," */","YDateFormat.prototype._generateTimePattern = function() {","    var format = this._timeFormat;","    if(format && Y.Lang.isString(format)) {","        format = Y.Date.TIME_FORMATS[format];","    }","    ","    if(format == null) return \"\";","    switch(format) {","        case Y.Date.TIME_FORMATS.NONE:","            return \"\";","        case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","            return this._Formats.HM_abbreviated;","        case Y.Date.TIME_FORMATS.HM_SHORT:","            return this._Formats.HM_short;","        case Y.Date.TIME_FORMATS.H_ABBREVIATED:","            return this._Formats.H_abbreviated;","        default:","            throw new Format.IllegalArgumentsException(\"Time format given does not exist\");	//Error no such pattern.","    }","}","    ","/**"," * Generate time-zone pattern for selected format"," * @return {String} Time-Zone pattern for internal use."," */","YDateFormat.prototype._generateTimeZonePattern = function() {","    var format = this._timeZoneFormat;","    if(format && Y.Lang.isString(format)) {","        format = Y.Date.TIMEZONE_FORMATS[format];","    }","    ","    if(format == null) return \"\";","    switch(format) {","        case Y.Date.TIMEZONE_FORMATS.NONE:","            return \"\";","        case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","            return \"z\";","        case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","            return \"Z\";","        default:","            throw new Format.IllegalArgumentsException(\"Time Zone format given does not exist\");	//Error no such pattern.","    }","}","    ","/**"," * Generate pattern for selected date, time and time-zone formats"," * @return {String} Combined pattern for date, time and time-zone for internal use."," */","YDateFormat.prototype._generatePattern = function() {","    var datePattern = this._generateDatePattern();","    var timePattern = this._generateTimePattern();","    var timeZonePattern = this._generateTimeZonePattern();","","    //Combine patterns. Mark date pattern part, to use with relative dates.","    if(datePattern != \"\") {","        datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","    }","        ","    var pattern = \"\";","    if(timePattern != \"\" && timeZonePattern != \"\") {","        pattern = this._Formats.DateTimeTimezoneCombination;","    } else if (timePattern != \"\") {","        pattern = this._Formats.DateTimeCombination;","    } else if(timeZonePattern != \"\") {","        pattern = this._Formats.DateTimezoneCombination;","    } else if(datePattern != \"\"){","        //Just date","        pattern = \"{1}\";","    }","        ","    pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","    //Remove unnecessary whitespaces","    pattern = pattern.replace(/\\s\\s+/g, \" \").replace(/^\\s+/, \"\").replace(/\\s+$/, \"\");","","    return pattern;","}","","//public methods","","/**"," * Formats a time value."," * @param {Date} date The time value to be formatted. If no valid Date object is provided, an Error exception is thrown."," * @return {String} The formatted string"," */","YDateFormat.prototype.format = function(date) {","    if(date == null || !Y.Lang.isDate(date)) {","        throw new Format.IllegalArgumentsException(\"format called without a date.\");","    }","        ","    var offset = this._timeZoneInstance.getRawOffset() * 1000;","    date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","        ","    var relativeDate = null;","    if(this._relative) {","        var today = new Date();","        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);","        var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","","        if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {","            relativeDate = this._Formats.today;","        }","","        if(date.getFullYear() == tomorrow.getFullYear() && date.getMonth() == tomorrow.getMonth() && date.getDate() == tomorrow.getDate()) {","            relativeDate = this._Formats.tomorrow;","        }","","        if(date.getFullYear() == yesterday.getFullYear() && date.getMonth() == yesterday.getMonth() && date.getDate() == yesterday.getDate()) {","            relativeDate = this._Formats.yesterday;","        }","    }","    return this._dateFormatInstance.format(date, relativeDate);","}/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," * @module format-relative"," */","","var MODULE_NAME = \"datatype-date-advanced-format\";","/**"," * @class YRelativeTimeFormat"," * @constructor"," * @param {Number} style (Optional) Selector for the desired relative time format. If no argument is provided, default to ONE_UNIT_LONG. If argument is provided but is not a valid selector, an Error exception is thrown."," */","YRelativeTimeFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","    if(style == null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            throw new Format.IllegalArgumentsException(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","}","	","//Static data","","Y.mix(Y.Date, {","    currentDate: function() { return new Date(); },","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","//Public methods","	","/**"," * Formats a time value."," * One or two parameters are needed. If only one parameter is specified, this function formats the parameter relative to current time."," * If two parameters are specified, this function formats the first parameter relative to the second parameter."," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} relativeTo (Optional) The time value (seconds since Epoch) in relation to which timeValue should be formatted. It must be greater than or equal to timeValue, otherwise exception will be thrown."," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo == null) { ","        relativeTo = (new Date()).getTime()/1000; ","        if(timeValue > relativeTo) {","            throw new Format.IllegalArgumentsException(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        throw new Format.IllegalArgumentsException(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000);","","    var result = [];","    var numUnits = this.numUnits;","        ","    var value = date.getUTCFullYear() - 1970;	//Need zero-based index","    var text;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.years_abbr : this.patterns.year_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.years : this.patterns.year); ","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.months_abbr : this.patterns.month_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.months : this.patterns.month); ","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.days_abbr : this.patterns.day_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.days : this.patterns.day); ","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.hours : this.patterns.hour); ","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.minutes : this.patterns.minute); ","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length == 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value != 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr); ","            result.push(text);","        } else {","            text = value + \" \" + (value != 1 ? this.patterns.seconds : this.patterns.second); ","            result.push(text);","        }","        numUnits--;","    }","","    var pattern = (result.length == 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(var i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = pattern.replace(/\\s+/g, \" \").replace(/^\\s+/, \"\").replace(/\\s+$/, \"\");","        ","    return pattern;","}","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages. "," * @module format-duration"," * @requires format-numbers"," */","","var MODULE_NAME = \"datatype-date-advanced-format\";","/**"," * YDurationFormat class formats time in a language independent manner."," * @class YDurationFormat"," * @constructor"," * @param {Number} style selector for the desired duration format, from Y.Date.DURATION_FORMATS"," */","YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","}","    ","//Exceptions","","Y.mix(YDurationFormat, {","    IllegalArgumentsException: function(message) {","        this.message = message;","        this.toString = function() {","            return \"IllegalArgumentsException: \" + this.message;","        }","    }","})","","//Static Data","Y.mix(Y.Date, {","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","    ","//Support methods","    ","/**"," * Strip decimal part of argument and return the integer part"," * @param floatNum A real number"," * @return Integer part of floatNum"," */","function stripDecimals(floatNum) {","    return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","}","    ","function zeroPad (s, length, zeroChar, rightSide) {","    s = typeof s == \"string\" ? s : String(s);","","    if (s.length >= length) return s;","","    zeroChar = zeroChar || '0';","	","    var a = [];","    for (var i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","}","    ","if(String.prototype.trim == null) {","    String.prototype.trim = function() {","        return this.replace(/^\\s\\s*/, '').replace(/\\s\\s*$/, '');","    };","}","    ","/**"," * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds"," * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short"," * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used"," * @param {String} xmlDuration XML Duration String. "," *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS, "," *      where nY represents the number of years, nM the number of months, nD the number of days, "," *      'T' is the date/time separator,"," *      nH the number of hours, nM the number of minutes and nS the number of seconds."," *      The number of seconds can include decimal digits to arbitrary precision."," * @return {Object} Duration as an object with the parameters hours, minutes and seconds."," */","function getDuration_XML(xmlDuration) {","    var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/);","    var matches = xmlDuration.match(regex);","        ","    if(matches == null) {","        throw new YDurationFormat.IllegalArgumentsException(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","    }","        ","    return {","        hours: parseInt(matches[4] || -1),","        minutes: parseInt(matches[5] || -1),","        seconds: parseFloat(matches[6] || -1)","    };","}","    ","/**"," * Get duration from time in seconds."," * The value should be integer value in seconds, and should not be negative."," * @param {Number} timeValueInSeconds Duration in seconds"," * @return {Object} Duration as an object with the parameters hours, minutes and seconds."," */","function getDuration_Seconds(timeValueInSeconds) {","    var duration = {};","    if(timeValueInSeconds < 0) {","        throw new YDurationFormat.IllegalArgumentsException(\"TimeValue cannot be negative\");","    }","                ","    duration.hours = stripDecimals(timeValueInSeconds / 3600);","                ","    timeValueInSeconds %= 3600;","    duration.minutes = stripDecimals(timeValueInSeconds / 60);","                ","    timeValueInSeconds %= 60;","    duration.seconds = timeValueInSeconds;","        ","    return duration;","}","    ","//Public methods","    ","/**"," * Formats the given value into a duration format string. This function supports three kinds of usage, listed below:"," *  String format(int timeValueInSeconds):"," *      Formats the given value into a duration format string. The value should be integer value in seconds, and should not be negative."," *  String format(string xmlDurationFormat):"," *      Formats the given XML duration format into a duration format string. "," *      The year/month/day fields are ignored in the final format string in this version. For future compatibility, please do not pass in the Year/Month/Day part in the parameter."," *      For hour, minute, and second, absent parts are ignored in HMS_long format, but are treated as 0 in HMS_short format style."," *  String format(int hour, int min, int second)"," *      Formats the given duration into a duration format string. Negative values are ignored in HMS_long format, but treated as 0 in HMS_short format."," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function() {","    var duration = {};","    if(arguments.length == 1) {","        if(arguments[0] == null) {","            throw new YDurationFormat.IllegalArgumentsException(\"Argument is null\");","        }","        if(isNaN(arguments[0])) {                               //Non-numeric string. format(string xmlDurationFormat)","            duration = getDuration_XML(arguments[0].trim());","        } else {                                                //format(int timeValueInSeconds)","            duration = getDuration_Seconds(arguments[0]);","        }","    } else if(arguments.length == 3) {                          //format(int hour, int min, int second)","        if(arguments[2] == null || arguments[1] == null || arguments[0] == null) {","            throw new YDurationFormat.IllegalArgumentsException(\"One or more arguments are null/undefined\");","        }","        if(isNaN(arguments[2]) || isNaN(arguments[1]) || isNaN(arguments[0])) {              //Non-numeric string.","            throw new YDurationFormat.IllegalArgumentsException(\"One or more arguments are not numeric\");","        }","            ","        duration = {","            hours: parseInt(arguments[0]),","            minutes: parseInt(arguments[1]),","            seconds: parseInt(arguments[2])","        }","    } else {","        throw new YDurationFormat.IllegalArgumentsException(\"Unexpected number of arguments\");","    }","        ","    //Test minutes and seconds for invalid values","    if(duration.minutes > 59 || duration.seconds > 59) {","        throw new YDurationFormat.IllegalArgumentsException(\"Minutes and Seconds should be less than 60\");","    }","        ","    var result = \"\";","        ","    if(this.style == Y.Date.DURATION_FORMATS.HMS_LONG) {","        result = this.patterns.HMS_long;","        if(duration.hours < 0) {","            duration.hours = \"\";","        } else {","            duration.hours = Y.Number.format(duration.hours) + \" \" + (duration.hours == 1 ? this.patterns.hour : this.patterns.hours);","        }","            ","        if(duration.minutes < 0) {","            duration.minutes = \"\";","        } else {","            duration.minutes = duration.minutes + \" \" + (duration.minutes == 1 ? this.patterns.minute : this.patterns.minutes);","        }","            ","        if(duration.seconds < 0) {","            duration.seconds = \"\";","        } else {","            duration.seconds = duration.seconds + \" \" + (duration.seconds == 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        result = this.patterns.HMS_short;","            ","        duration.hours = Y.Number.format(duration.hours < 0 ? 0: duration.hours);","        duration.minutes = duration.minutes < 0 ? \"00\": zeroPad(duration.minutes, 2);","        duration.seconds = duration.seconds < 0 ? \"00\": zeroPad(duration.seconds, 2);","    }","        ","    result = result.replace(\"{0}\", duration.hours);","    result = result.replace(\"{1}\", duration.minutes);","    result = result.replace(\"{2}\", duration.seconds);","        ","    //Remove unnecessary whitespaces","    result = result.replace(/\\s\\s+/g, \" \").replace(/^\\s+/, \"\").replace(/\\s+$/, \"\");","        ","    return result;","}","","Y.Date.deprecatedFormat = Y.Date.format;","","/**"," * Takes a native JavaScript Date and formats it as a string for display to user."," * @for Date"," * @method format"," * @param oDate {Date} Date"," * @param oConfig {Obhect} (Optional) Object literal of configuration values:"," *    <dl>"," *       <dt>dateFormat {String/Number} (Optional)</dt>"," *           <dd>Date Format/Style</dd>"," *       <dt>timeFormat {String/Number} (Optional)</dt>"," *           <dd>Time Format/Style</dd>"," *       <dt>timezoneFormat {String/Number} (Optional)</dt>"," *           <dd> Timezone Format/Style</dd>"," *       <dt>format {HTML} (Optional)</dt>"," *           <dd>format string to use the deprecated format method in datatype-date-format module</dd>"," *    </dl>"," * @return {String} string representation of the date"," */","Y.Date.format = function(oDate, oConfig) {","    oConfig = oConfig || {};","    if(oConfig.format && Y.Lang.isString(oConfig.format)) {","        return Y.Date.deprecatedFormat(oDate, oConfig);","    }","    ","    if(!Y.Lang.isDate(oDate)) {","        return Y.Lang.isValue(oDate) ? oDate : \"\";","    }","                ","    var formatter;","    if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {    ","        formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","        return formatter.format(oDate);","    }","    ","    var relativeTo = (typeof Y.Date.currentDate == 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","    if(oConfig.relativeTimeFormat) {","        formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","        return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","    }","    ","    throw new Format.FormatException(\"Unrecognized format options.\");","}","","/**"," * Returns a string representation of the duration"," * @for Date"," * @method format"," * @param oDuration {String/Number/Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds"," * @param oConfig {Object} (Optional) Configuration object. Used to pass style parameter to the method. 'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS"," * @return {String} string representation of the duration"," */","Y.Date.formatDuration = function(oDuration, oConfig) {","    oConfig = oConfig || {};","    if(oDuration == null) {","        oDuration = {};","    }","    if(Y.Lang.isNumber(oDuration) || Y.Lang.isString(oDuration)) {","        return (new YDurationFormat(oConfig.style)).format(oDuration);","    } else if(oDuration.hours != null || oDuration.minutes != null || oDuration.seconds != null) {","        if(oDuration.hours == null) { oDuration.hours = -1; }","        if(oDuration.minutes == null) { oDuration.minutes= -1; }","        if(oDuration.seconds == null) { oDuration.seconds = -1; }","        return (new YDurationFormat(oConfig.style)).format(oDuration.hours || -1, oDuration.minutes || -1, oDuration.seconds || -1);","    }","    ","    throw new Format.IllegalArgumentsException(\"Unrecognized duration values\");","}","","","}, '@VERSION@', {","    \"lang\": [","        \"af-NA\",","        \"af\",","        \"af-ZA\",","        \"am-ET\",","        \"am\",","        \"ar-AE\",","        \"ar-BH\",","        \"ar-DZ\",","        \"ar-EG\",","        \"ar-IQ\",","        \"ar-JO\",","        \"ar-KW\",","        \"ar-LB\",","        \"ar-LY\",","        \"ar-MA\",","        \"ar-OM\",","        \"ar-QA\",","        \"ar-SA\",","        \"ar-SD\",","        \"ar-SY\",","        \"ar-TN\",","        \"ar\",","        \"ar-YE\",","        \"as-IN\",","        \"as\",","        \"az-AZ\",","        \"az-Cyrl-AZ\",","        \"az-Cyrl\",","        \"az-Latn-AZ\",","        \"az-Latn\",","        \"az\",","        \"be-BY\",","        \"be\",","        \"bg-BG\",","        \"bg\",","        \"bn-BD\",","        \"bn-IN\",","        \"bn\",","        \"bo-CN\",","        \"bo-IN\",","        \"bo\",","        \"ca-ES\",","        \"ca\",","        \"cs-CZ\",","        \"cs\",","        \"cy-GB\",","        \"cy\",","        \"da-DK\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de-CH\",","        \"de-DE\",","        \"de-LI\",","        \"de-LU\",","        \"de\",","        \"el-CY\",","        \"el-GR\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-BZ\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JM\",","        \"en-JO\",","        \"en-MH\",","        \"en-MT\",","        \"en-MY\",","        \"en-NA\",","        \"en-NZ\",","        \"en-PH\",","        \"en-PK\",","        \"en-RH\",","        \"en-SG\",","        \"en-TT\",","        \"en\",","        \"en-US-POSIX\",","        \"en-US\",","        \"en-VI\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-BO\",","        \"es-CL\",","        \"es-CO\",","        \"es-CR\",","        \"es-DO\",","        \"es-EC\",","        \"es-ES\",","        \"es-GT\",","        \"es-HN\",","        \"es-MX\",","        \"es-NI\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-PY\",","        \"es-SV\",","        \"es\",","        \"es-US\",","        \"es-UY\",","        \"es-VE\",","        \"et-EE\",","        \"et\",","        \"eu-ES\",","        \"eu\",","        \"fa-AF\",","        \"fa-IR\",","        \"fa\",","        \"fi-FI\",","        \"fi\",","        \"fil-PH\",","        \"fil\",","        \"fo-FO\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr-FR\",","        \"fr-LU\",","        \"fr-MC\",","        \"fr-SN\",","        \"fr\",","        \"ga-IE\",","        \"ga\",","        \"gl-ES\",","        \"gl\",","        \"gsw-CH\",","        \"gsw\",","        \"gu-IN\",","        \"gu\",","        \"gv-GB\",","        \"gv\",","        \"ha-GH\",","        \"ha-Latn-GH\",","        \"ha-Latn-NE\",","        \"ha-Latn-NG\",","        \"ha-Latn\",","        \"ha-NE\",","        \"ha-NG\",","        \"ha\",","        \"haw\",","        \"haw-US\",","        \"he-IL\",","        \"he\",","        \"hi-IN\",","        \"hi\",","        \"hr-HR\",","        \"hr\",","        \"hu-HU\",","        \"hu\",","        \"hy-AM-REVISED\",","        \"hy-AM\",","        \"hy\",","        \"id-ID\",","        \"id\",","        \"ii-CN\",","        \"ii\",","        \"in-ID\",","        \"in\",","        \"is-IS\",","        \"is\",","        \"it-CH\",","        \"it-IT\",","        \"it\",","        \"iw-IL\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja-JP\",","        \"ja\",","        \"ka-GE\",","        \"ka\",","        \"kk-Cyrl-KZ\",","        \"kk-Cyrl\",","        \"kk-KZ\",","        \"kk\",","        \"kl-GL\",","        \"kl\",","        \"km-KH\",","        \"km\",","        \"kn-IN\",","        \"kn\",","        \"kok-IN\",","        \"kok\",","        \"ko-KR\",","        \"ko\",","        \"kw-GB\",","        \"kw\",","        \"lt-LT\",","        \"lt\",","        \"lv-LV\",","        \"lv\",","        \"mk-MK\",","        \"mk\",","        \"ml-IN\",","        \"ml\",","        \"mr-IN\",","        \"mr\",","        \"ms-BN\",","        \"ms-MY\",","        \"ms\",","        \"mt-MT\",","        \"mt\",","        \"nb-NO\",","        \"nb\",","        \"ne-IN\",","        \"ne-NP\",","        \"ne\",","        \"nl-BE\",","        \"nl-NL\",","        \"nl\",","        \"nn-NO\",","        \"nn\",","        \"no-NO-NY\",","        \"no-NO\",","        \"no\",","        \"om-ET\",","        \"om-KE\",","        \"om\",","        \"or-IN\",","        \"or\",","        \"pa-Arab-PK\",","        \"pa-Arab\",","        \"pa-Guru-IN\",","        \"pa-Guru\",","        \"pa-IN\",","        \"pa-PK\",","        \"pa\",","        \"pl-PL\",","        \"pl\",","        \"ps-AF\",","        \"ps\",","        \"pt-BR\",","        \"pt-PT\",","        \"pt\",","        \"ro-MD\",","        \"ro-RO\",","        \"ro\",","        \"ru-RU\",","        \"ru\",","        \"ru-UA\",","        \"sh-BA\",","        \"sh-CS\",","        \"sh\",","        \"sh-YU\",","        \"si-LK\",","        \"si\",","        \"sk-SK\",","        \"sk\",","        \"sl-SI\",","        \"sl\",","        \"so-DJ\",","        \"so-ET\",","        \"so-KE\",","        \"so-SO\",","        \"so\",","        \"sq-AL\",","        \"sq\",","        \"sr-BA\",","        \"sr-CS\",","        \"sr-Cyrl-BA\",","        \"sr-Cyrl-CS\",","        \"sr-Cyrl-ME\",","        \"sr-Cyrl-RS\",","        \"sr-Cyrl\",","        \"sr-Cyrl-YU\",","        \"sr-Latn-BA\",","        \"sr-Latn-CS\",","        \"sr-Latn-ME\",","        \"sr-Latn-RS\",","        \"sr-Latn\",","        \"sr-Latn-YU\",","        \"sr-ME\",","        \"sr-RS\",","        \"sr\",","        \"sr-YU\",","        \"sv-FI\",","        \"sv-SE\",","        \"sv\",","        \"sw-KE\",","        \"sw\",","        \"sw-TZ\",","        \"ta-IN\",","        \"ta\",","        \"te-IN\",","        \"te\",","        \"th-TH-TRADITIONAL\",","        \"th-TH\",","        \"th\",","        \"ti-ER\",","        \"ti-ET\",","        \"ti\",","        \"tl-PH\",","        \"tl\",","        \"tr-TR\",","        \"tr\",","        \"uk\",","        \"uk-UA\",","        \"ur-IN\",","        \"ur-PK\",","        \"ur\",","        \"uz-AF\",","        \"uz-Arab-AF\",","        \"uz-Arab\",","        \"uz-Cyrl\",","        \"uz-Cyrl-UZ\",","        \"uz-Latn\",","        \"uz-Latn-UZ\",","        \"uz\",","        \"uz-UZ\",","        \"vi\",","        \"vi-VN\",","        \"zh-CN\",","        \"zh-Hans-CN\",","        \"zh-Hans-HK\",","        \"zh-Hans-MO\",","        \"zh-Hans-SG\",","        \"zh-Hans\",","        \"zh-Hant-HK\",","        \"zh-Hant-MO\",","        \"zh-Hant-TW\",","        \"zh-Hant\",","        \"zh-HK\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zh\",","        \"zu\",","        \"zu-ZA\"","    ],","    \"requires\": [","        \"datatype-date-timezone\",","        \"datatype-date-format\",","        \"datatype-number-advanced-format\"","    ]","});"];
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].lines = {"1":0,"16":0,"17":0,"18":0,"20":0,"21":0,"22":0,"27":0,"28":0,"32":0,"34":0,"35":0,"36":0,"37":0,"41":0,"44":0,"47":0,"51":0,"52":0,"53":0,"57":0,"58":0,"60":0,"61":0,"63":0,"68":0,"69":0,"71":0,"73":0,"75":0,"76":0,"77":0,"79":0,"81":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"100":0,"101":0,"103":0,"112":0,"113":0,"120":0,"121":0,"122":0,"123":0,"128":0,"129":0,"144":0,"145":0,"148":0,"149":0,"152":0,"153":0,"154":0,"156":0,"157":0,"158":0,"161":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"188":0,"191":0,"192":0,"193":0,"195":0,"196":0,"198":0,"199":0,"200":0,"201":0,"202":0,"205":0,"208":0,"215":0,"216":0,"217":0,"220":0,"222":0,"223":0,"226":0,"227":0,"230":0,"231":0,"232":0,"244":0,"249":0,"287":0,"288":0,"289":0,"291":0,"292":0,"294":0,"295":0,"297":0,"298":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"310":0,"314":0,"315":0,"317":0,"318":0,"319":0,"320":0,"324":0,"325":0,"326":0,"327":0,"328":0,"330":0,"332":0,"333":0,"334":0,"335":0,"336":0,"337":0,"341":0,"342":0,"343":0,"344":0,"347":0,"348":0,"349":0,"350":0,"351":0,"353":0,"354":0,"356":0,"357":0,"359":0,"360":0,"363":0,"364":0,"367":0,"368":0,"371":0,"372":0,"374":0,"375":0,"380":0,"381":0,"383":0,"384":0,"387":0,"388":0,"391":0,"392":0,"394":0,"395":0,"396":0,"400":0,"404":0,"405":0,"406":0,"407":0,"409":0,"411":0,"412":0,"413":0,"414":0,"417":0,"418":0,"419":0,"421":0,"422":0,"423":0,"425":0,"426":0,"428":0,"429":0,"430":0,"432":0,"433":0,"436":0,"443":0,"444":0,"445":0,"447":0,"453":0,"454":0,"455":0,"457":0,"461":0,"463":0,"470":0,"471":0,"472":0,"474":0,"476":0,"477":0,"482":0,"483":0,"484":0,"491":0,"492":0,"493":0,"494":0,"496":0,"498":0,"499":0,"502":0,"503":0,"504":0,"510":0,"516":0,"526":0,"527":0,"528":0,"530":0,"532":0,"534":0,"536":0,"538":0,"545":0,"546":0,"547":0,"549":0,"553":0,"554":0,"555":0,"556":0,"558":0,"559":0,"561":0,"562":0,"563":0,"564":0,"565":0,"567":0,"570":0,"577":0,"578":0,"579":0,"581":0,"585":0,"586":0,"587":0,"588":0,"589":0,"590":0,"592":0,"593":0,"595":0,"596":0,"599":0,"606":0,"607":0,"608":0,"609":0,"611":0,"613":0,"614":0,"617":0,"618":0,"620":0,"625":0,"630":0,"639":0,"640":0,"641":0,"642":0,"643":0,"645":0,"646":0,"648":0,"649":0,"651":0,"653":0,"655":0,"662":0,"663":0,"664":0,"666":0,"672":0,"673":0,"674":0,"676":0,"678":0,"679":0,"684":0,"685":0,"686":0,"687":0,"689":0,"690":0,"700":0,"707":0,"708":0,"709":0,"711":0,"713":0,"714":0,"719":0,"720":0,"721":0,"728":0,"729":0,"730":0,"732":0,"736":0,"737":0,"738":0,"745":0,"746":0,"747":0,"749":0,"751":0,"752":0,"757":0,"758":0,"759":0,"766":0,"767":0,"768":0,"770":0,"772":0,"773":0,"778":0,"779":0,"780":0,"782":0,"790":0,"791":0,"792":0,"795":0,"796":0,"797":0,"798":0,"799":0,"800":0,"805":0,"808":0,"809":0,"810":0,"813":0,"815":0,"816":0,"817":0,"818":0,"822":0,"823":0,"824":0,"827":0,"829":0,"830":0,"845":0,"847":0,"848":0,"851":0,"854":0,"855":0,"858":0,"859":0,"861":0,"862":0,"863":0,"865":0,"866":0,"868":0,"870":0,"872":0,"875":0,"879":0,"922":0,"932":0,"933":0,"934":0,"935":0,"938":0,"939":0,"940":0,"941":0,"943":0,"946":0,"947":0,"949":0,"951":0,"953":0,"955":0,"957":0,"959":0,"961":0,"963":0,"965":0,"967":0,"968":0,"970":0,"972":0,"974":0,"976":0,"977":0,"979":0,"980":0,"982":0,"983":0,"985":0,"986":0,"988":0,"990":0,"998":0,"999":0,"1000":0,"1001":0,"1004":0,"1005":0,"1007":0,"1009":0,"1011":0,"1013":0,"1015":0,"1023":0,"1024":0,"1025":0,"1026":0,"1029":0,"1030":0,"1032":0,"1034":0,"1036":0,"1038":0,"1046":0,"1047":0,"1048":0,"1049":0,"1052":0,"1053":0,"1056":0,"1057":0,"1058":0,"1059":0,"1060":0,"1061":0,"1062":0,"1063":0,"1065":0,"1068":0,"1071":0,"1073":0,"1083":0,"1084":0,"1085":0,"1088":0,"1089":0,"1091":0,"1092":0,"1093":0,"1094":0,"1095":0,"1097":0,"1098":0,"1101":0,"1102":0,"1105":0,"1106":0,"1109":0,"1118":0,"1124":0,"1125":0,"1126":0,"1128":0,"1129":0,"1132":0,"1133":0,"1135":0,"1137":0,"1138":0,"1139":0,"1141":0,"1142":0,"1143":0,"1145":0,"1146":0,"1147":0,"1149":0,"1150":0,"1151":0,"1153":0,"1159":0,"1160":0,"1179":0,"1180":0,"1181":0,"1182":0,"1183":0,"1185":0,"1186":0,"1189":0,"1191":0,"1192":0,"1194":0,"1195":0,"1197":0,"1198":0,"1199":0,"1200":0,"1202":0,"1203":0,"1205":0,"1208":0,"1209":0,"1210":0,"1211":0,"1212":0,"1214":0,"1215":0,"1217":0,"1220":0,"1221":0,"1222":0,"1223":0,"1224":0,"1226":0,"1227":0,"1229":0,"1232":0,"1233":0,"1234":0,"1235":0,"1236":0,"1238":0,"1239":0,"1241":0,"1244":0,"1245":0,"1246":0,"1247":0,"1248":0,"1250":0,"1251":0,"1253":0,"1256":0,"1257":0,"1258":0,"1259":0,"1260":0,"1262":0,"1263":0,"1265":0,"1268":0,"1270":0,"1271":0,"1273":0,"1274":0,"1277":0,"1279":0,"1288":0,"1295":0,"1296":0,"1297":0,"1299":0,"1300":0,"1305":0,"1307":0,"1308":0,"1309":0,"1315":0,"1329":0,"1330":0,"1333":0,"1334":0,"1336":0,"1338":0,"1340":0,"1341":0,"1342":0,"1344":0,"1346":0,"1349":0,"1350":0,"1351":0,"1367":0,"1368":0,"1369":0,"1371":0,"1372":0,"1375":0,"1388":0,"1389":0,"1390":0,"1391":0,"1394":0,"1396":0,"1397":0,"1399":0,"1400":0,"1402":0,"1419":0,"1420":0,"1421":0,"1422":0,"1423":0,"1425":0,"1426":0,"1428":0,"1430":0,"1431":0,"1432":0,"1434":0,"1435":0,"1438":0,"1444":0,"1448":0,"1449":0,"1452":0,"1454":0,"1455":0,"1456":0,"1457":0,"1459":0,"1462":0,"1463":0,"1465":0,"1468":0,"1469":0,"1471":0,"1474":0,"1476":0,"1477":0,"1478":0,"1481":0,"1482":0,"1483":0,"1486":0,"1488":0,"1491":0,"1511":0,"1512":0,"1513":0,"1514":0,"1517":0,"1518":0,"1521":0,"1522":0,"1523":0,"1524":0,"1527":0,"1528":0,"1529":0,"1530":0,"1533":0,"1544":0,"1545":0,"1546":0,"1547":0,"1549":0,"1550":0,"1551":0,"1552":0,"1553":0,"1554":0,"1555":0,"1558":0};
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].functions = {"Format:16":0,"toString:36":0,"Exception:33":0,"ParsingException:40":0,"IllegalArgumentsException:43":0,"FormatException:46":0,"format:57":0,"zeroPad:68":0,"parse:92":0,"_createParseObject:112":0,"Segment:120":0,"format:128":0,"parse:144":0,"getFormat:148":0,"_parseLiteral:152":0,"_parseInt:182":0,"TextSegment:215":0,"toString:222":0,"parse:226":0,"trim:231":0,"DateFormat:287":0,"format:411":0,"DateSegment:443":0,"EraSegment:453":0,"format:461":0,"YearSegment:470":0,"toString:476":0,"format:482":0,"MonthSegment:491":0,"toString:498":0,"initialize:502":0,"format:526":0,"WeekSegment:545":0,"format:553":0,"DaySegment:577":0,"format:585":0,"WeekdaySegment:606":0,"toString:613":0,"initialize:617":0,"format:639":0,"TimeSegment:662":0,"HourSegment:672":0,"toString:678":0,"format:684":0,"MinuteSegment:707":0,"toString:713":0,"format:719":0,"SecondSegment:728":0,"format:736":0,"AmPmSegment:745":0,"toString:751":0,"format:757":0,"TimezoneSegment:766":0,"toString:772":0,"format:778":0,"BuddhistDateFormat:790":0,"YearSegment:808":0,"format:815":0,"EraSegment:822":0,"format:829":0,"YDateFormat:845":0,"availableLanguages:921":0,"_generateDatePattern:932":0,"_generateTimePattern:998":0,"_generateTimeZonePattern:1023":0,"_generatePattern:1046":0,"format:1083":0,"YRelativeTimeFormat:1124":0,"currentDate:1160":0,"format:1179":0,"YDurationFormat:1295":0,"toString:1308":0,"IllegalArgumentsException:1306":0,"stripDecimals:1329":0,"zeroPad:1333":0,"trim:1350":0,"getDuration_XML:1367":0,"getDuration_Seconds:1388":0,"format:1419":0,"format:1511":0,"formatDuration:1544":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].coveredLines = 666;
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].coveredFunctions = 82;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 1);
YUI.add('datatype-date-advanced-format', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc. 
 */

//
// Format class
//

/**
 * Base class for all formats. To format an object, instantiate the
 * format of your choice and call the <code>format</code> method which
 * returns the formatted string.
 */
_yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 16);
Format = function(pattern, formats) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "Format", 16);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 17);
if (arguments.length == 0) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 18);
return;
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 20);
this._pattern = pattern;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 21);
this._segments = []; 
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 22);
this.Formats = formats; 
}

// Data

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 27);
Format.prototype._pattern = null;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 28);
Format.prototype._segments = null;

//Exceptions

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 32);
Y.mix(Format, {
    Exception: function(name, message) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "Exception", 33);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 34);
this.name = name;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 35);
this.message = message;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 36);
this.toString = function() {
            _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 36);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 37);
return this.name + ": " + this.message;
        }
    },
    ParsingException: function(message) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "ParsingException", 40);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 41);
Format.ParsingException.superclass.constructor.call(this, "ParsingException", message);
    },
    IllegalArgumentsException: function(message) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "IllegalArgumentsException", 43);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 44);
Format.IllegalArgumentsException.superclass.constructor.call(this, "IllegalArgumentsException", message);
    },
    FormatException: function(message) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "FormatException", 46);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 47);
Format.FormatException.superclass.constructor.call(this, "FormatException", message);
    }
});

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 51);
Y.extend(Format.ParsingException, Format.Exception);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 52);
Y.extend(Format.IllegalArgumentsException, Format.Exception);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 53);
Y.extend(Format.FormatException, Format.Exception);

// Public methods

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 57);
Format.prototype.format = function(object) { 
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 57);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 58);
var s = [];
        
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 60);
for (var i = 0; i < this._segments.length; i++) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 61);
s.push(this._segments[i].format(object));
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 63);
return s.join("");
};

// Protected static methods

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 68);
function zeroPad (s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "zeroPad", 68);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 69);
s = typeof s == "string" ? s : String(s);

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 71);
if (s.length >= length) {return s;}

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 73);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 75);
var a = [];
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 76);
for (var i = s.length; i < length; i++) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 77);
a.push(zeroChar);
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 79);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 81);
return a.join("");
}
    
/** 
 * Parses the given string according to this format's pattern and returns
 * an object.
 * <p>
 * <strong>Note:</strong>
 * The default implementation of this method assumes that the sub-class
 * has implemented the <code>_createParseObject</code> method.
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 92);
Format.prototype.parse = function(s, pp) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "parse", 92);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 93);
var object = this._createParseObject();
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 94);
var index = pp || 0;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 95);
for (var i = 0; i < this._segments.length; i++) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 96);
var segment = this._segments[i];
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 97);
index = segment.parse(object, s, index);
    }
        
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 100);
if (index < s.length) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 101);
throw new Format.ParsingException("Input too long");
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 103);
return object;
};
    
/**
 * Creates the object that is initialized by parsing
 * <p>
 * <strong>Note:</strong>
 * This must be implemented by sub-classes.
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 112);
Format.prototype._createParseObject = function(s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "_createParseObject", 112);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 113);
throw new Format.ParsingException("Not implemented");
};

//
// Segment class
//

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 120);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "Segment", 120);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 121);
if (arguments.length == 0) {return;}
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 122);
this._parent = format;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 123);
this._s = s;
};
    
// Public methods

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 128);
Format.Segment.prototype.format = function(o) { 
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 128);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 129);
return this._s; 
};

/**
 * Parses the string at the given index, initializes the parse object
 * (as appropriate), and returns the new index within the string for
 * the next parsing step.
 * <p>
 * <strong>Note:</strong>
 * This method must be implemented by sub-classes.
 *
 * @param o     [object] The parse object to be initialized.
 * @param s     [string] The input string to be parsed.
 * @param index [number] The index within the string to start parsing.
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 144);
Format.Segment.prototype.parse = function(o, s, index) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "parse", 144);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 145);
throw new Format.ParsingException("Not implemented");
};

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 148);
Format.Segment.prototype.getFormat = function() {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "getFormat", 148);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 149);
return this._parent;
};

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 152);
Format.Segment._parseLiteral = function(literal, s, index) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "_parseLiteral", 152);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 153);
if (s.length - index < literal.length) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 154);
throw new Format.ParsingException("Input too short");
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 156);
for (var i = 0; i < literal.length; i++) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 157);
if (literal.charAt(i) != s.charAt(index + i)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 158);
throw new Format.ParsingException("Input doesn't match");
        }
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 161);
return index + literal.length;
};
    
/**
 * Parses an integer at the offset of the given string and calls a
 * method on the specified object.
 *
 * @param o         [object]   The target object.
 * @param f         [function|string] The method to call on the target object.
 *                             If this parameter is a string, then it is used
 *                             as the name of the property to set on the
 *                             target object.
 * @param adjust    [number]   The numeric adjustment to make on the
 *                             value before calling the object method.
 * @param s         [string]   The string to parse.
 * @param index     [number]   The index within the string to start parsing.
 * @param fixedlen  [number]   If specified, specifies the required number
 *                             of digits to be parsed.
 * @param radix     [number]   Optional. Specifies the radix of the parse
 *                             string. Defaults to 10 if not specified.
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 182);
Format.Segment._parseInt = function(o, f, adjust, s, index, fixedlen, radix) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "_parseInt", 182);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 183);
var len = fixedlen || s.length - index;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 184);
var head = index;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 185);
for (var i = 0; i < len; i++) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 186);
if (!s.charAt(index++).match(/\d/)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 187);
index--;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 188);
break;
        }
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 191);
var tail = index;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 192);
if (head == tail) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 193);
throw new Format.ParsingException("Number not present");
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 195);
if (fixedlen && tail - head != fixedlen) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 196);
throw new Format.ParsingException("Number too short");
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 198);
var value = parseInt(s.substring(head, tail), radix || 10);
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 199);
if (f) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 200);
var target = o || window;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 201);
if (typeof f == "function") {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 202);
f.call(target, value + adjust);
        }
        else {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 205);
target[f] = value + adjust;
        }
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 208);
return tail;
};

//
// Text segment class
//

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 215);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "TextSegment", 215);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 216);
if (arguments.length == 0) {return;}
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 217);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 220);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 222);
Format.TextSegment.prototype.toString = function() { 
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 222);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 223);
return "text: \""+this._s+'"'; 
};
    
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 226);
Format.TextSegment.prototype.parse = function(o, s, index) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "parse", 226);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 227);
return Format.Segment._parseLiteral(this._s, s, index);
};

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 230);
if(String.prototype.trim == null) {
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 231);
String.prototype.trim = function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "trim", 231);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 232);
return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}
/**
 * YDateFormat provides absolute date and time formatting.
 * Applications can choose date, time, and time zone components separately. For dates, relative descriptions (English "yesterday", German "vorgestern", Japanese "後天") are also supported. 
 * This module uses a few modified parts of zimbra AjxFormat to handle dates and time.
 * 
 * Absolute formats use the default calendar specified in CLDR for each locale. Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries.
 * However, you can specify other calendars using language subtags; for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory. 
 */

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 244);
var MODULE_NAME = "datatype-date-advanced-format";
    
//
// Resources
//
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 249);
ShortNames = {
    "weekdayMonShort":"M",
    "weekdayTueShort":"T",
    "weekdayWedShort":"W",
    "weekdayThuShort":"T",
    "weekdayFriShort":"F",
    "weekdaySatShort":"S",
    "weekdaySunShort":"S",
    "monthJanShort":"J",
    "monthFebShort":"F",
    "monthMarShort":"M",
    "monthAprShort":"A",
    "monthMayShort":"M",
    "monthJunShort":"J",
    "monthJulShort":"J",
    "monthAugShort":"A",
    "monthSepShort":"S",
    "monthOctShort":"O",
    "monthNovShort":"N",
    "monthDecShort":"D"
}
    
//
// Date format class
//

/**
 * The DateFormat class formats Date objects according to a specified 
 * pattern. The patterns are defined the same as the SimpleDateFormat
 * class in the Java libraries.
 * <p>
 * <strong>Note:</strong>
 * The date format differs from the Java patterns a few ways: the pattern
 * "EEEEE" (5 'E's) denotes a <em>short</em> weekday and the pattern "MMMMM"
 * (5 'M's) denotes a <em>short</em> month name. This matches the extended 
 * pattern found in the Common Locale Data Repository (CLDR) found at: 
 * http://www.unicode.org/cldr/.
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 287);
DateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "DateFormat", 287);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 288);
if (arguments.length == 0) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 289);
return;
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 291);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 292);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 294);
if (pattern == null) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 295);
return;
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 297);
var head, tail, segment;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 298);
for (var i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 300);
var c = pattern.charAt(i);
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 301);
if (c == "'") {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 302);
head = i + 1;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 303);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 304);
c = pattern.charAt(i);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 305);
if (c == "'") {
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 306);
if (i + 1 < pattern.length && pattern.charAt(i + 1) == "'") {
                        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 307);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 310);
break;
                    }
                }
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 314);
if (i == pattern.length) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 315);
throw new Format.FormatException("unterminated string literal");
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 317);
tail = i;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 318);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 319);
this._segments.push(segment);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 320);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 324);
head = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 325);
while(i < pattern.length) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 326);
c = pattern.charAt(i);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 327);
if (DateFormat._META_CHARS.indexOf(c) != -1 || c == "'") {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 328);
break;
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 330);
i++;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 332);
tail = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 333);
if (head != tail) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 334);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 335);
this._segments.push(segment);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 336);
i--;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 337);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 341);
head = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 342);
while(++i < pattern.length) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 343);
if (pattern.charAt(i) != c) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 344);
break;
            }		
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 347);
tail = i--;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 348);
var count = tail - head;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 349);
var field = pattern.substr(head, count);
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 350);
segment = null;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 351);
switch (c) {
            case 'G':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 353);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 354);
break;
            case 'y':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 356);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 357);
break;
            case 'M':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 359);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 360);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 363);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 364);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 367);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 368);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 371);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 372);
break;
            case 'a':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 374);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 375);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 380);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 381);
break;
            case 'm':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 383);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 384);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 387);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 388);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 391);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 392);
break;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 394);
if (segment != null) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 395);
segment._index = this._segments.length;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 396);
this._segments.push(segment);
        }
    }
}
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 400);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 404);
DateFormat.SHORT = 0;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 405);
DateFormat.MEDIUM = 1;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 406);
DateFormat.LONG = 2;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 407);
DateFormat.DEFAULT = DateFormat.MEDIUM;

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 409);
DateFormat._META_CHARS = "GyMwWDdFEaHkKhmsSzZ";

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 411);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 411);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 412);
var useRelative = false;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 413);
if(relative != null && relative != "") {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 414);
useRelative = true;
    }

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 417);
var s = [];
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 418);
var datePattern = false;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 419);
for (var i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 421);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") == 0) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 422);
if(useRelative) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 423);
s.push(relative);
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 425);
datePattern = true;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 426);
continue;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 428);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") == 0) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 429);
datePattern = false;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advan