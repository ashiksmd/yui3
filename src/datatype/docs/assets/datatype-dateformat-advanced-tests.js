YUI.add('datatype-dateformat-advanced-tests', function(Y) {

    var suite = new Y.Test.Suite('date format lang example test suite'),
        Assert = Y.Assert;
            var demo_btn = Y.one("#demo_btn"),
                demo_lang = Y.one("#demo_lang"),
                demo_dateFmt = Y.one("#demo_dateFormat"),
                demo_timeFmt = Y.one("#demo_timeFormat"),
                demo_tzoneFmt = Y.one("#demo_timezoneFormat"),
                demo_output = Y.one("#demo_output");

    suite.add(new Y.Test.Case({

        name: 'Date Format tests',

        'date format': function() {
                var test = this;
                demo_lang.set("value", "en-AU");
                demo_dateFmt.set("value", "WYMD_LONG");
                demo_timeFmt.set("value", "HM_SHORT");
                demo_tzoneFmt.set("value", "Z_SHORT");

                Y.use("lang/datatype-date-format-advanced_en-AU", function() {
                    test.resume(function() {
                        demo_btn.simulate("click");
                        var dateAtNoon = new Date();
                        dateAtNoon.setHours(12,0,0,0);
                        formattedDate = Y.DataType.Date.format(dateAtNoon, {
						      dateFormat: "WYMD_LONG",
						      timeFormat: "HM_SHORT",
						      timezoneFormat: "Z_SHORT"
						});
                        Assert.areEqual(Y.Lang.trim(demo_output.get("text")), Y.Lang.trim(formattedDate), " - The formatted date string doesn't match the expected value.");
                    }, 10);
                });

                test.wait();            
         }
    }));

    Y.Test.Runner.add(suite);

}, '', { requires: [ 'node', 'node-event-simulate', 'datatype-date-format-advanced'] });
