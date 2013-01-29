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
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].code=["YUI.add('datatype-date-advanced-format', function (Y, NAME) {","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module datatype-date-advanced-format"," * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format"," */","","var MODULE_NAME = \"datatype-date-advanced-format\",","    Format = Y.Number.__BaseFormat,","    ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","    },","    DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Number.__BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateYear: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateMonth: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Number._zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Number._zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Number._zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateDay: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Number._zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeHour: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Number._zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeMinute: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Number._zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Number._zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeAmPm: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeTimezone: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone='Etc/GMT'] TZ database ID for the time zone that should be used."," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === null) {","        timeZone = \"Etc/GMT\";","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","        ","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Number, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Number","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Number._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Number._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\";","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","    ","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = Y.Number.format(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: Y.Number.format(oDuration.hours),","             minutes: Y.Number._zeroPad(oDuration.minutes, 2),","             seconds: Y.Number._zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"datatype-date-timezone\",","        \"datatype-number-advanced-format\"","    ]","});"];
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].lines = {"1":0,"21":0,"70":0,"71":0,"72":0,"74":0,"75":0,"77":0,"78":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"90":0,"94":0,"95":0,"97":0,"98":0,"99":0,"100":0,"104":0,"105":0,"106":0,"107":0,"108":0,"110":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"121":0,"122":0,"123":0,"124":0,"127":0,"128":0,"129":0,"130":0,"131":0,"133":0,"134":0,"136":0,"137":0,"139":0,"140":0,"143":0,"144":0,"147":0,"148":0,"151":0,"152":0,"154":0,"155":0,"160":0,"161":0,"163":0,"164":0,"167":0,"168":0,"171":0,"172":0,"174":0,"175":0,"176":0,"181":0,"182":0,"186":0,"201":0,"202":0,"207":0,"208":0,"211":0,"213":0,"214":0,"215":0,"217":0,"218":0,"220":0,"221":0,"222":0,"224":0,"225":0,"228":0,"246":0,"247":0,"249":0,"266":0,"267":0,"269":0,"277":0,"279":0,"297":0,"298":0,"300":0,"302":0,"309":0,"319":0,"320":0,"339":0,"340":0,"341":0,"343":0,"345":0,"352":0,"360":0,"361":0,"368":0,"369":0,"375":0,"390":0,"391":0,"393":0,"395":0,"397":0,"399":0,"401":0,"420":0,"421":0,"423":0,"431":0,"432":0,"438":0,"439":0,"440":0,"441":0,"443":0,"446":0,"463":0,"464":0,"466":0,"474":0,"475":0,"480":0,"481":0,"483":0,"484":0,"486":0,"487":0,"490":0,"508":0,"509":0,"510":0,"512":0,"514":0,"521":0,"529":0,"531":0,"537":0,"538":0,"543":0,"557":0,"559":0,"560":0,"562":0,"563":0,"565":0,"566":0,"568":0,"570":0,"572":0,"591":0,"592":0,"594":0,"611":0,"612":0,"614":0,"616":0,"623":0,"633":0,"634":0,"635":0,"637":0,"638":0,"648":0,"667":0,"668":0,"670":0,"672":0,"679":0,"689":0,"690":0,"709":0,"710":0,"712":0,"720":0,"721":0,"722":0,"740":0,"741":0,"743":0,"745":0,"752":0,"762":0,"763":0,"782":0,"783":0,"785":0,"787":0,"794":0,"804":0,"805":0,"806":0,"808":0,"827":0,"828":0,"831":0,"832":0,"833":0,"834":0,"835":0,"836":0,"841":0,"842":0,"853":0,"854":0,"857":0,"865":0,"866":0,"867":0,"868":0,"881":0,"882":0,"885":0,"893":0,"894":0,"908":0,"910":0,"911":0,"914":0,"917":0,"918":0,"921":0,"922":0,"924":0,"925":0,"926":0,"928":0,"929":0,"931":0,"933":0,"935":0,"938":0,"942":0,"944":0,"1006":0,"1015":0,"1016":0,"1017":0,"1020":0,"1022":0,"1023":0,"1024":0,"1027":0,"1030":0,"1031":0,"1033":0,"1035":0,"1037":0,"1039":0,"1041":0,"1043":0,"1045":0,"1047":0,"1049":0,"1051":0,"1052":0,"1054":0,"1056":0,"1058":0,"1060":0,"1061":0,"1063":0,"1064":0,"1066":0,"1067":0,"1069":0,"1070":0,"1072":0,"1074":0,"1085":0,"1086":0,"1087":0,"1090":0,"1091":0,"1093":0,"1095":0,"1097":0,"1099":0,"1101":0,"1112":0,"1113":0,"1114":0,"1117":0,"1118":0,"1120":0,"1122":0,"1124":0,"1126":0,"1137":0,"1143":0,"1144":0,"1147":0,"1148":0,"1149":0,"1150":0,"1151":0,"1152":0,"1153":0,"1155":0,"1158":0,"1161":0,"1163":0,"1173":0,"1174":0,"1177":0,"1183":0,"1185":0,"1186":0,"1187":0,"1190":0,"1191":0,"1194":0,"1195":0,"1198":0,"1216":0,"1217":0,"1218":0,"1219":0,"1220":0,"1223":0,"1224":0,"1226":0,"1228":0,"1229":0,"1230":0,"1232":0,"1233":0,"1234":0,"1236":0,"1237":0,"1238":0,"1240":0,"1241":0,"1242":0,"1244":0,"1248":0,"1250":0,"1257":0,"1284":0,"1285":0,"1286":0,"1287":0,"1288":0,"1290":0,"1291":0,"1294":0,"1300":0,"1301":0,"1302":0,"1303":0,"1305":0,"1306":0,"1308":0,"1311":0,"1312":0,"1313":0,"1314":0,"1315":0,"1317":0,"1318":0,"1320":0,"1323":0,"1324":0,"1325":0,"1326":0,"1327":0,"1329":0,"1330":0,"1332":0,"1335":0,"1336":0,"1337":0,"1338":0,"1339":0,"1341":0,"1342":0,"1344":0,"1347":0,"1348":0,"1349":0,"1350":0,"1351":0,"1353":0,"1354":0,"1356":0,"1359":0,"1360":0,"1361":0,"1362":0,"1363":0,"1365":0,"1366":0,"1368":0,"1371":0,"1373":0,"1374":0,"1376":0,"1377":0,"1380":0,"1382":0,"1389":0,"1400":0,"1412":0,"1413":0,"1414":0,"1416":0,"1417":0,"1420":0,"1422":0,"1437":0,"1455":0,"1458":0,"1459":0,"1462":0,"1479":0,"1480":0,"1481":0,"1484":0,"1486":0,"1487":0,"1489":0,"1490":0,"1492":0,"1511":0,"1512":0,"1513":0,"1514":0,"1515":0,"1518":0,"1526":0,"1527":0,"1528":0,"1531":0,"1532":0,"1535":0,"1536":0,"1537":0,"1538":0,"1541":0,"1542":0,"1545":0,"1546":0,"1549":0,"1550":0,"1557":0,"1558":0,"1559":0,"1562":0,"1564":0,"1567":0,"1569":0,"1594":0,"1595":0,"1596":0,"1599":0,"1600":0,"1603":0,"1604":0,"1605":0,"1606":0,"1609":0,"1610":0,"1611":0,"1612":0,"1615":0,"1632":0,"1633":0};
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].functions = {"__zDateFormat:70":0,"format:201":0,"DateSegment:246":0,"EraSegment:266":0,"format:277":0,"YearSegment:297":0,"toString:308":0,"format:318":0,"MonthSegment:339":0,"toString:351":0,"initialize:359":0,"format:389":0,"WeekSegment:420":0,"format:431":0,"DaySegment:463":0,"format:474":0,"WeekdaySegment:508":0,"toString:520":0,"initialize:528":0,"format:556":0,"TimeSegment:591":0,"HourSegment:611":0,"toString:622":0,"format:632":0,"MinuteSegment:667":0,"toString:678":0,"format:688":0,"SecondSegment:709":0,"format:720":0,"AmPmSegment:740":0,"toString:751":0,"format:761":0,"TimezoneSegment:782":0,"toString:793":0,"format:803":0,"__BuddhistDateFormat:827":0,"YearSegment:853":0,"format:865":0,"EraSegment:881":0,"format:893":0,"__YDateFormat:908":0,"_generateDatePattern:1014":0,"_generateTimePattern:1084":0,"_generateTimeZonePattern:1111":0,"_generatePattern:1136":0,"format:1172":0,"__YRelativeTimeFormat:1216":0,"currentDate:1257":0,"format:1284":0,"_stripDecimals:1399":0,"__YDurationFormat:1412":0,"_getDuration_XML:1454":0,"_getDuration_Seconds:1478":0,"format:1511":0,"format:1593":0,"formatDuration:1631":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].coveredLines = 483;
_yuitest_coverage["build/datatype-date-advanced-format/datatype-date-advanced-format.js"].coveredFunctions = 57;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 1);
YUI.add('datatype-date-advanced-format', function (Y, NAME) {

/**
 * This module provides absolute/relative date and time formatting, as well as duration formatting
 * Applications can choose date, time, and time zone components separately.
 * For dates, relative descriptions (English "yesterday", German "vorgestern", Japanese "後天") are also supported.
 *
 * This module uses a few modified parts of zimbra AjxFormat to handle dates and time.
 *
 * Absolute formats use the default calendar specified in CLDR for each locale.
 * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries.
 * However, you can specify other calendars using language subtags;
 * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory.
 *
 * Relative time formats only support times in the past. It can represent times like "1 hour 5 minutes ago"
 *
 * @module datatype-date-advanced-format
 * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format
 */

_yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 21);
var MODULE_NAME = "datatype-date-advanced-format",
    Format = Y.Number.__BaseFormat,
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
    },
    DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;
    
//
// Date format class
//

/**
 * The DateFormat class formats Date objects according to a specified pattern.
 * The patterns are defined the same as the SimpleDateFormat class in the Java libraries.
 *
 * Note:
 * The date format differs from the Java patterns a few ways: the pattern
 * "EEEEE" (5 'E's) denotes a <em>short</em> weekday and the pattern "MMMMM"
 * (5 'M's) denotes a <em>short</em> month name. This matches the extended
 * pattern found in the Common Locale Data Repository (CLDR) found at:
 * http://www.unicode.org/cldr/.
 *
 * @class __zDateFormat
 * @extends Number.__BaseFormat
 * @namespace Date
 * @private
 * @constructor
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 70);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "__zDateFormat", 70);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 71);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 72);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 74);
if (pattern === null) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 75);
return;
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 77);
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 78);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 80);
c = pattern.charAt(i);
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 81);
if (c === "'") {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 82);
head = i + 1;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 83);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 84);
c = pattern.charAt(i);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 85);
if (c === "'") {
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 86);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 87);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 90);
break;
                    }
                }
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 94);
if (i === pattern.length) {
		_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 95);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 97);
tail = i;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 98);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 99);
this._segments.push(segment);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 100);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 104);
head = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 105);
while(i < pattern.length) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 106);
c = pattern.charAt(i);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 107);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 108);
break;
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 110);
i++;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 112);
tail = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 113);
if (head !== tail) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 114);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 115);
this._segments.push(segment);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 116);
i--;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 117);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 121);
head = i;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 122);
while(++i < pattern.length) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 123);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 124);
break;
            }
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 127);
tail = i--;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 128);
count = tail - head;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 129);
field = pattern.substr(head, count);
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 130);
segment = null;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 131);
switch (c) {
            case 'G':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 133);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 134);
break;
            case 'y':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 136);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 137);
break;
            case 'M':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 139);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 140);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 143);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 144);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 147);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 148);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 151);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 152);
break;
            case 'a':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 154);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 155);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 160);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 161);
break;
            case 'm':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 163);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 164);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 167);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 168);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 171);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 172);
break;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 174);
if (segment !== null) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 175);
segment._index = this._segments.length;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 176);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 181);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 182);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 186);
Y.mix(DateFormat, {
	SHORT: 0,
	MEDIUM: 1,
	LONG: 2,
	DEFAULT: 1,
	_META_CHARS: "GyMwWDdFEaHkKhmsSzZ"
});

/**
 * Format the date
 * @method format
 * @param object {Date} The date to be formatted
 * @param [relative=false] {Boolean} Whether relative dates should be used.
 * @return {String} Formatted result
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 201);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 201);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 202);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 207);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 208);
useRelative = true;
    }

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 211);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 213);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") === 0) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 214);
if(useRelative) {
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 215);
s.push(relative);
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 217);
datePattern = true;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 218);
continue;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 220);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") === 0) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 221);
datePattern = false;
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 222);
continue;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 224);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 225);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 228);
return s.join("");
};

//
// Date segment class
//

/**
 * Date Segment in the pattern
 * @class DateSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 246);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "DateSegment", 246);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 247);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 249);
Y.extend(DateFormat.DateSegment, Format.Segment);

//
// Date era segment class
//

/**
 * Era Segment in the pattern
 * @class EraSegment
 * @for Date.__DateFormat
 * @namespace Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 266);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "EraSegment", 266);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 267);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 269);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 277);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 277);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 279);
return this.getFormat().AD;
};

//
// Date year segment class
//

/**
 * Year Segment in the pattern
 * @class YearSegment
 * @namespace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 297);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "YearSegment", 297);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 298);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 300);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 302);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 308);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 309);
return "dateYear: \""+this._s+'"';
    },

    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 318);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 319);
var year = String(date.getFullYear());
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 320);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Number._zeroPad(year, this._s.length);
    }
}, true);

//
// Date month segment class
//

/**
 * Month Segment in the pattern
 * @class MonthSegment
 * @namepspace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 339);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "MonthSegment", 339);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 340);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 341);
this.initialize();
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 343);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 345);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 351);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 352);
return "dateMonth: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "initialize", 359);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 360);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 361);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 368);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 369);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 375);
DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [
            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,
            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,
            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,
            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong
        ];
    },

    /**
     * Format date and get the month segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 389);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 390);
var month = date.getMonth();
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 391);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 393);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 395);
return Y.Number._zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 397);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 399);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 401);
return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];
    }
}, true);

//
// Date week segment class
//

/**
 * Week Segment in the pattern
 * @class WeekSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 420);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "WeekSegment", 420);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 421);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 423);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 431);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 431);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 432);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 438);
while (true) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 439);
week++;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 440);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 441);
break;
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 443);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 446);
return Y.Number._zeroPad(week, this._s.length);
};

//
// Date day segment class
//

/**
 * Day Segment in the pattern
 * @class DaySegment
 * @namespace Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 463);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "DaySegment", 463);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 464);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 466);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 474);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 474);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 475);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 480);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 481);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 483);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 484);
date2.setDate(0);
			
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 486);
day += date2.getDate();
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 487);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 490);
return Y.Number._zeroPad(day, this._s.length);
};

//
// Date weekday segment class
//

/**
 * Weekday Segment in the pattern
 * @class WeekdaySegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 508);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "WeekdaySegment", 508);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 509);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 510);
this.initialize();
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 512);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 514);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 520);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 521);
return "dateDay: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "initialize", 528);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 529);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 531);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 537);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 538);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 543);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [
            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,
            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,
            Formats.weekdaySatLong
        ];
    },

    /**
     * Format date and get the weekday segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 556);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 557);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 559);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 560);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 562);
style = DateFormat.LONG;
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 563);
break;
                case 5:
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 565);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 566);
break;
                default:
                    _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 568);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 570);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 572);
return Y.Number._zeroPad(weekday, this._s.length);
    }
}, true);

//
// Time segment class
//

/**
 * Time Segment in the pattern
 * @class TimeSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 591);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "TimeSegment", 591);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 592);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 594);
Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);

//
// Time hour segment class
//

/**
 * Hour Segment in the pattern
 * @class HourSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 611);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "HourSegment", 611);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 612);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 614);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 616);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 622);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 623);
return "timeHour: \""+this._s+'"';
    },

    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 632);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 633);
var hours = date.getHours();
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 634);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 635);
hours -= 12;
        }
        else {_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 637);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 638);
hours = 12;
        }}
        /***
            // NOTE: This is commented out to match the Java formatter output
            //       but from the comments for these meta-chars, it doesn't
            //       seem right.
            if (/[Hk]/.test(this._s)) {
                hours--;
            }
        /***/
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 648);
return Y.Number._zeroPad(hours, this._s.length);
    }
}, true);

//
// Time minute segment class
//

/**
 * Minute Segment in the pattern
 * @class MinuteSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 667);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "MinuteSegment", 667);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 668);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 670);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 672);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "toString", 678);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 679);
return "timeMinute: \""+this._s+'"';
    },

    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "format", 688);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 689);
var minutes = date.getMinutes();
        _yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 690);
return Y.Number._zeroPad(minutes, this._s.length);
    }
}, true);

//
// Time second segment class
//

/**
 * Second Segment in the pattern
 * @class SecondSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 709);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/datatype-date-advanced-format/datatype-date-advanced-format.js", "SecondSegment", 709);
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 710);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 712);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/datatype-date-advanced-format/datatype-date-advanced-format.js", 720);
D