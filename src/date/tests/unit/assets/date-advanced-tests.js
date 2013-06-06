YUI.add('module-tests', function(Y) {

       var absoluteDateFormat = new Y.Test.Case({
    
        name : "Absolute DateFormat Tests",

        testAbsoluteDateFormat : function () {
            Y.Intl.setLang("datatype-date-format-advanced", "en-US");
                        
            var date = new Date(Date.UTC(2012, 5, 25, 10));
            var result = Y.Date.format(date, {
                timezone: "Asia/Calcutta",
                dateFormat: Y.Date.DATE_FORMATS.WYMD_LONG,
                timeFormat: Y.Date.TIME_FORMATS.HM_SHORT,
                timezoneFormat: Y.Date.TIMEZONE_FORMATS.Z_SHORT
            });
                        
            Y.Assert.areEqual("Monday, June 25, 2012 3:30 PM GMT+05:30", result);
        },
                    
        testBuddhistCalendar: function () {
            //Thai calendar
            Y.Intl.setLang("datatype-date-format-advanced", "th");    //Change language for this test only
                        
            var date = new Date(Date.UTC(2012, 5, 25, 10));
            var result = Y.Date.format(date, {
                timezone: "Asia/Shanghai",
                dateFormat: Y.Date.DATE_FORMATS.WYMD_LONG,
                timeFormat: Y.Date.TIME_FORMATS.HM_SHORT,
                timezoneFormat: Y.Date.TIMEZONE_FORMATS.Z_SHORT
            });
            //Ecmascript defaults are slightlt different, both are correct
            if(Y.Date.formatEcma) {
                Y.Assert.areEqual("\u0E27\u0E31\u0E19\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C 25 \u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19 2555, 18:00 GMT+08:00", result);
            } else {
                Y.Assert.areEqual("\u0E27\u0E31\u0E19\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C\u0E17\u0E35\u0E48 25 \u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19 BE 2555, 18:00 GMT+08:00", result);
            }
        }
    });
                
    var absoluteWithRelative = new Y.Test.Case( {
                    
        name: "Absoulte Date Format with Relative Dates",
        
        setUp : function () {
            Y.Intl.setLang("datatype-date-format-advanced", "en-US");
            this.date = new Date();
        },
        
        //---------------------------------------------------------------------
        // Test methods
        //---------------------------------------------------------------------
                    
        testToday : function () {
            var result = Y.Date.format(this.date, {
                dateFormat:  Y.Date.DATE_FORMATS.YMD_FULL,
                relativeDate: true
            });
            Y.Assert.areEqual("Today", result);
        },
        
        testYesterday : function () {
            var date = new Date(this.date.getTime() - 24*60*60*1000);
            var result = Y.Date.format(date, {
                dateFormat:  Y.Date.DATE_FORMATS.YMD_FULL,
                relativeDate: true
            });
                        
            Y.Assert.areEqual("Yesterday", result);
        },
                    
        testTomorrow : function () {
            var date = new Date(this.date.getTime() + 24*60*60*1000);
            var result = Y.Date.format(date, {
                dateFormat:  Y.Date.DATE_FORMATS.YMD_FULL,
                relativeDate: true
            });
                        
            Y.Assert.areEqual("Tomorrow", result);
        },
                    
        testDayAfterTomorrow: function() {
            var date = new Date(this.date.getTime() + 2*24*60*60*1000);
            var result = Y.Date.format(date, {
                dateFormat:  Y.Date.DATE_FORMATS.YMD_FULL,
                relativeDate: true
            });
            var expected = Y.Date.format(date, {
                dateFormat:  Y.Date.DATE_FORMATS.YMD_FULL
            });
                        
            Y.Assert.areEqual(expected, result);
        }
    });
    
    var durationFormatTests = new Y.Test.Case( {
                    
        name: "Duration Format Tests",
                    
        setUp : function () {
            Y.Intl.setLang("datatype-date-format-advanced", "en-US");
        },
        
        //---------------------------------------------------------------------
        // Test methods
        //---------------------------------------------------------------------
                    
        "Test for format(int timeValueInSeconds)" : function () {
            var Assert = Y.Assert;
                        
            //Test long format first
            var result = Y.Date.formatDuration(1, {
                style: "HMS_LONG"
            }), expect = "0 hours 0 minutes 1 second";
            Assert.areEqual(expect, result);
                    
            result = Y.Date.formatDuration(3601, {
                style: "HMS_LONG"
            }), expect = "1 hour 0 minutes 1 second";
            Assert.areEqual(expect, result);
                        
            //Test short format
            result = Y.Date.formatDuration(1, {
                style: "HMS_SHORT"
            }), expect = "0:00:01";
            Assert.areEqual(expect, result);
                        
            result = Y.Date.formatDuration(3601, {
                style: "HMS_SHORT"
            }), expect = "1:00:01";
            Assert.areEqual(expect, result);
        },
        
        "Test for format(string xmlDurationFormat)" : function () {
            var Assert = Y.Assert;
                        
            //Test long format first
            var result = Y.Date.formatDuration("PT1M2S", {
                style: "HMS_LONG"
            }), expect = "1 minute 2 seconds";
            Assert.areEqual(expect, result);
                    
            result = Y.Date.formatDuration("P12Y23M34DT11H22M33S", {
                style: "HMS_LONG"
            }), expect = "11 hours 22 minutes 33 seconds";
            Assert.areEqual(expect, result);
                        
            //Test short format
            result = Y.Date.formatDuration("PT1M2S", {
                style: "HMS_SHORT"
            }), expect = "0:01:02";
            Assert.areEqual(expect, result);
                        
            result = Y.Date.formatDuration("P12Y23M34DT11H22M33S", {
                style: "HMS_SHORT"
            }), expect = "11:22:33";
            Assert.areEqual(expect, result);
        },
                    
        "Test for format(hours, minutes, seconds)" : function () {
            var Assert = Y.Assert;
                        
            //Test long format first
            var result = Y.Date.formatDuration({
                seconds: 3
            }, {
                style: "HMS_LONG"
            }), expect = "3 seconds";
            Assert.areEqual(expect, result);
                    
            result = Y.Date.formatDuration({
                minutes: 41
            }, {
                style: "HMS_LONG"
            }), expect = "41 minutes";
            Assert.areEqual(expect, result);
                        
            //Test short format
            result = Y.Date.formatDuration({
                seconds: 3
            }, {
                style: "HMS_SHORT"
            }), expect = "0:00:03";
            Assert.areEqual(expect, result);
                        
            result = Y.Date.formatDuration({
                minutes: 41
            }, {
                style: "HMS_SHORT"
            }), expect = "0:41:00";
            Assert.areEqual(expect, result);
            
            result = Y.Date.formatDuration({
                hours: 1, 
                minutes: 41, 
                seconds: 3
            }, {
                style: "HMS_SHORT"
            }), expect = "1:41:03";
            Assert.areEqual(expect, result);
        }
    });

    var relativeTimeFormatTests = new Y.Test.Case( {
                    
        name: "Relative Time Format Tests",
                    
        setUp : function () {
            this.delta = 60 * 1000;
            this.timeValue = 1265078145;
            
            Y.Intl.setLang("datatype-date-format-advanced", "en-US");
            Y.Date.currentDate = new Date(this.timeValue);
        },
        
        //---------------------------------------------------------------------
        // Test methods
        //---------------------------------------------------------------------
                    
        "One or Two Units Long" : function () {
            var result = Y.Date.format(new Date(this.timeValue - this.delta), {
                relativeTimeFormat: "ONE_OR_TWO_UNITS_LONG"
            });

            Y.Assert.areEqual("1 minute 0 seconds ago", result);
        },
        
        "One or Two Units Abbreviated" : function () {
            var result = Y.Date.format(new Date(this.timeValue - this.delta), {
                relativeTimeFormat: "ONE_OR_TWO_UNITS_ABBREVIATED"
            });
                        
            Y.Assert.areEqual("1 min 0 secs ago", result);
        },
                    
        "One Unit Long" : function () {
            var result = Y.Date.format(new Date(this.timeValue - this.delta), {
                relativeTimeFormat: "ONE_UNIT_LONG"
            });
                        
            Y.Assert.areEqual("1 minute ago", result);
        },
                    
        "One Unit Abbreviated" : function () {
            var result = Y.Date.format(new Date(this.timeValue - this.delta), {
                relativeTimeFormat: "ONE_UNIT_ABBREVIATED"
            });
                        
            Y.Assert.areEqual("1 min ago", result);
        },
                    
        "Test result when timeValue is equal to relativeTo Time" : function () {
            var result = Y.Date.format(new Date(this.timeValue), {
                relativeTimeFormat: "ONE_UNIT_ABBREVIATED"
            });
                        
            Y.Assert.areEqual("0 secs ago", result);
        }
    });

    var dateFormatTestSuite = new Y.Test.Suite("DateFormat Tests");
    dateFormatTestSuite.add(absoluteDateFormat);
    dateFormatTestSuite.add(absoluteWithRelative);
    dateFormatTestSuite.add(durationFormatTests);    
    dateFormatTestSuite.add(relativeTimeFormatTests);

    Y.Test.Runner.add(dateFormatTestSuite);

},'', { requires: [ 'test', 'datatype-date-format-advanced', "lang/datatype-date-format-advanced_en-US", "lang/datatype-date-format-advanced_th" ] });
