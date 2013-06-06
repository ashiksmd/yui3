/**
 * This module adds the ability to fallback to ecmascript i18n api if available when formatting dates.
 *
 * @module datatype-date-format-ecma
 * @requires datatype-date-format-advanced
 */
Y.namespace("Date");

Y.mix(Y.Date, {
    /**
     * Date Format Style mapping to use with ecmascript i18n api
     * @property DATE_FORMATS_ECMA
     * @type Object
     * @static
     * @final
     * @for Date
     */
    DATE_FORMATS_ECMA: {
        0: /*NONE*/ {},
        1: /*WYMD_LONG*/ {weekday: "long", year: "numeric", month: "long", day: "numeric"},
        2: /*WYMD_ABBREVIATED*/ {weekday: "short", year: "numeric", month: "short", day: "numeric"},
        3: /*WYMD_SHORT*/ {weekday: "short", year: "2-digit", month: "numeric", day: "numeric"},
        4: /*WMD_LONG*/ {weekday: "long", month: "long", day: "numeric"},
        5: /*WMD_ABBREVIATED*/ {weekday: "short", month: "short", day: "numeric"},
        6: /*WMD_SHORT*/ {weekday: "short", month: "numeric", day: "numeric"},
        7: /*YMD_LONG*/ {year: "numeric", month: "long", day: "numeric"},
        8: /*YMD_ABBREVIATED*/ {year: "numeric", month: "short", day: "numeric"},
        9: /*YMD_SHORT*/ {year: "2-digit", month: "numeric", day: "numeric"},
        10: /*YM_LONG*/ {year: "numeric", month: "long"},
        11: /*MD_LONG*/ {month: "long", day: "numeric"},
        12: /*MD_ABBREVIATED*/ {month: "short", day: "numeric"},
        13: /*MD_SHORT*/ {month: "numeric", day: "numeric"},
        14: /*W_LONG*/ {weekday: "long"},
        15: /*W_ABBREVIATED*/ {weekday: "short"},
        16: /*M_LONG*/ {month: "long"},
        17: /*M_ABBREVIATED*/ {month: "short"},
        18: /*YMD_FULL for en-US,es-US. For other, fall back to YMD_SHORT*/ {year: "numeric", month: "2-digit", day: "2-digit"}
        // 19: RELATIVE_DATE  //Not supported
    },

    /**
     * Time Format Style mappings to use with ecmascript i18n api
     * @property TIME_FORMATS_ECMA
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIME_FORMATS_ECMA: {
        0: /*NONE*/ {},
        1: /*HM_ABBREVIATED*/ {hour: "numeric", minute:"2-digit"},
        2: /*HM_SHORT*/ {hour: "numeric", minute: "2-digit"},
        3: /*H_ABBREVIATED*/ {hour: "numeric"}
    },

    /**
     * Timezone Format Style mappings to use with ecmascript i18n api
     * @property TIMEZONE_FORMATS_ECMA
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIMEZONE_FORMATS_ECMA: {
        0: /*NONE*/ {},
        1: /*Z_ABBREVIATED*/ {timeZoneName: "short"},
        2: /*Z_SHORT*/ {timeZoneName: "long"}
    },

    /**
     * Format date using ecmascript i18n api
     * @param oDate {Date} The date to format
     * @param oConfig {Object} Configuration parameters. Should contain dateFormat
     * @return {String} Formatted result
     */
    formatEcma: function(oDate, oConfig) {
        var dateFormat = oConfig.dateFormat || 0,
            timeFormat = oConfig.timeFormat || 0,
            timezoneFormat = oConfig.timezoneFormat || 0,
            format,
            locale = Y.Intl.getLang("datatype-date-format-advanced"),
            localeOptions, calendar = "", numberSystem = "";

        if(Y.Lang.isString(dateFormat)) { dateFormat = Y.Date.DATE_FORMATS[dateFormat]; }
        if(Y.Lang.isString(timeFormat)) { timeFormat = Y.Date.TIME_FORMATS[timeFormat]; }
        if(Y.Lang.isString(timezoneFormat)) { timezoneFormat = Y.Date.TIMEZONE_FORMATS[timezoneFormat]; }

        //YMD_FULL is same as YMD_SHORT except for en-US,es-US
        if(dateFormat === Y.Date.DATE_FORMATS.YMD_FULL && locale !== "en-US" && locale !== "es-US") {
            dateFormat = Y.Date.DATE_FORMATS.YMD_SHORT;
        }

        //Mix all the formats
        format = {};
        Y.mix(format, Y.Date.DATE_FORMATS_ECMA[dateFormat]);
        Y.mix(format, Y.Date.TIME_FORMATS_ECMA[timeFormat]);
        Y.mix(format, Y.Date.TIMEZONE_FORMATS_ECMA[timezoneFormat]);

        //Add timezone if it was provided
        if(oConfig.timezone) {
            format.timeZone = oConfig.timezone;
        }

        //If thai locale, use buddhist calendar by default
        if(locale.match(/^th/)) {
            localeOptions = locale.split("-u-")[1];
            if(localeOptions) {
                calendar = localeOptions.match(/ca-[^\-]+/);
                numberSystem = localeOptions.match(/nu-[^\-]+/);
            }
            if(!calendar) { calendar = "-ca-buddhist"; }
            else { calendar = "-" + calendar; }

            if(numberSystem) { numberSystem = "-" + numberSystem; }

            locale = "th-u" + calendar + numberSystem;
        }

        //Get result
        return oDate.toLocaleString(locale, format);
    }
});
