YUI.add('module-tests', function(Y) {

    var messageFormatTests = new Y.Test.Case({
    
        name : "Message Format Tests",
        
        setUp: function() {
            Y.Intl.setLang("datatype-number-format-advanced", "en-US");
            Y.Intl.setLang("intl-message-format", "en");
        },

        testStringFormat: function () {
            var result = Y.Intl.formatMessage("{EMPLOYEE} reports to {MANAGER}", {
                "EMPLOYEE": "Ashik", 
                "MANAGER": "Dharmesh"
            });
            Y.Assert.areEqual("Ashik reports to Dharmesh", result);
        },

        testDateFormat: function() {
            var values = {
                "DATE": new Date(Date.UTC(2012, 8, 25, 16, 30))
            },
            config = {
                timezone: "Asia/Calcutta"
            };

            var result = Y.Intl.formatMessage("Today is {DATE, date, short}", values, config);
            Y.Assert.areEqual("Today is 9/25/12", result, "short DateFormat failed");

            result = Y.Intl.formatMessage("Today is {DATE, date, medium}", values, config);
            Y.Assert.areEqual("Today is Sep 25, 2012", result, "medium DateFormat failed");

            result = Y.Intl.formatMessage("Today is {DATE, date, long}", values, config);
            Y.Assert.areEqual("Today is September 25, 2012", result, "long DateFormat failed");

            result = Y.Intl.formatMessage("Today is {DATE, date, full}", values, config);
            Y.Assert.areEqual("Today is Tuesday, September 25, 2012", result, "full DateFormat failed");
        },

        testTimeFormat: function() {
            var values = {
                "DATE": Date.UTC(2012, 8, 25, 11)
            };
            var config = {
                timezone: "Asia/Calcutta"
            }
            
            var result = Y.Intl.formatMessage("The time is {DATE, time, short}", values, config);
            Y.Assert.areEqual("The time is 4:30 PM", result, "short DateFormat failed");

            result = Y.Intl.formatMessage("The time is {DATE, time, medium}", values, config);
            Y.Assert.areEqual("The time is 4:30 PM", result, "medium DateFormat failed");

            result = Y.Intl.formatMessage("The time is {DATE, time, long}", values, config);
            Y.Assert.areEqual("The time is 4:30 PM GMT+05:30", result, "long DateFormat failed");
            
            result = Y.Intl.formatMessage("The time is {DATE, time, full}", values, config);

            //If ecmascript i18n api is supported, we get more detailed timezone info
            if(Y.Date.formatEcma) {
	           Y.Assert.areEqual("The time is 4:30 PM India Time", result, "full DateFormat failed");
	        } else {
		       Y.Assert.areEqual("The time is 4:30 PM (GMT+05:30) Asia/Kolkata", result, "full DateFormat failed");
	        }
        },

        testNumberFormat: function() {
            var values = {
                "PRICE": 5000000,
                "POPULATION": 8244910,
                "POPULATION_INDIA": 1241.492,
                "CITY": "New York",
                "SF_PERCENT": 0.15
            };

            var result = Y.Intl.formatMessage("There are {POPULATION_INDIA, number} million people in India.", values);
            Y.Assert.areEqual("There are 1,241.492 million people in India.", result, "MessageFormat: {KEY, number} failed");

            result = Y.Intl.formatMessage("There are {POPULATION, number, integer} people in {CITY}.", values);
            Y.Assert.areEqual("There are 8,244,910 people in New York.", result, "MessageFormat: {KEY, number, integer} failed");

            result = Y.Intl.formatMessage("Current estimates of global smartphone penetration is around {SF_PERCENT, number, percent}.", values);
            Y.Assert.areEqual("Current estimates of global smartphone penetration is around 15%.", result, "MessageFormat: {KEY, number, percent} failed");

            result = Y.Intl.formatMessage("The land was sold for {PRICE, number, currency}.", values);
            Y.Assert.areEqual("The land was sold for $5,000,000.", result, "MessageFormat: {KEY, number, currency} failed");
        },

        testSelectFormat: function() {
            var pattern = "{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.";
            var values = {
                "NAME": "Henri", 
                "GENDER": "male", 
                "CITY": "Paris"
            };
	
            var result = Y.Intl.formatMessage(pattern, values);
            Y.Assert.areEqual("Henri est allé à Paris.", result);

            values.NAME = "Anne";
            values.GENDER = "female";
            result = Y.Intl.formatMessage(pattern, values);
            Y.Assert.areEqual("Anne est allée à Paris.", result);
        },

        testPluralFormat: function() {
            var pattern = "{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.";
	
            var result = Y.Intl.formatMessage(pattern, {
                "COMPANY_COUNT": 1
            });
            Y.Assert.areEqual("One company published new books.", result);

            result = Y.Intl.formatMessage(pattern, {
                "COMPANY_COUNT": 2
            });
            Y.Assert.areEqual("2 companies published new books.", result);
            
            //Change language to russian
            Y.Intl.setLang("datatype-number-format-advanced", "ru");
            Y.Intl.setLang("intl-message-format", "ru");

            
            pattern = "{COMPANY_COUNT, plural, one {\u041E\u0434\u043D\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0430} few {# \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438} many {# \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438} other {# \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438}} \u043D\u043E\u0432\u044B\u0435 \u043A\u043D\u0438\u0433\u0438.";
            result = Y.Intl.formatMessage(pattern, {
                "COMPANY_COUNT": 23   //Should match few
            });
            Y.Assert.areEqual("23 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438 \u043D\u043E\u0432\u044B\u0435 \u043A\u043D\u0438\u0433\u0438.", result);
            
            result = Y.Intl.formatMessage(pattern, {
                "COMPANY_COUNT": 36   //Should match many
            });
            Y.Assert.areEqual("36 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438 \u043D\u043E\u0432\u044B\u0435 \u043A\u043D\u0438\u0433\u0438.", result);
        },

        testChoiceFormat: function() {
            var pattern = "There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.";

            var result = Y.Intl.formatMessage(pattern, {
                "FILE_COUNT": 0
            });
            Y.Assert.areEqual("There are no files on disk.", result);

            result = Y.Intl.formatMessage(pattern, {
                "FILE_COUNT": 1
            });
            Y.Assert.areEqual("There is one file on disk.", result);

            result = Y.Intl.formatMessage(pattern, {
                "FILE_COUNT": 2
            });
            Y.Assert.areEqual("There are 2 files on disk.", result);
        },

        testListFormat: function() {
            var input = {
                COUNTRIES: []
            };

            var result = Y.Intl.formatMessage("{COUNTRIES, list}", input);
            Y.Assert.areEqual("", result);

            input.COUNTRIES.push("US");
            result = Y.Intl.formatMessage("{COUNTRIES, list}", input);
            Y.Assert.areEqual("US", result);

            input.COUNTRIES.push("UK");
            result = Y.Intl.formatMessage("{COUNTRIES, list}", input);
            Y.Assert.areEqual("US and UK", result);

            input.COUNTRIES.push("Canada");
            result = Y.Intl.formatMessage("{COUNTRIES, list}", input);
            Y.Assert.areEqual("US, UK and Canada", result);
        },

        testNoMatch: function() {
            var pattern = "Test string. {blah}. blah should not match any type.";
            var result = Y.Intl.formatMessage(pattern, {});
            Y.Assert.areEqual(pattern, result);
        }
    });

    Y.Test.Runner.add(messageFormatTests);

},'', { requires: [ 'test', 'intl-message-format', 'datatype-list-format', 'datatype-date-format-advanced', 'datatype-number-format-advanced',
'lang/datatype-number-format-advanced_ru', 'lang/datatype-number-format-advanced_en-US',
'lang/intl-message-format_ru', 'lang/intl-message-format_en',
'lang/datatype-list-format_en-GB',
'lang/datatype-date-format-advanced_en-US' ] });
