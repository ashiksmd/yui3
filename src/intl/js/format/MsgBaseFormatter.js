//For MessageFormat

/**
 * Formatter base class
 * @class
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted. 
 */
Formatter = function(values) {
    this.values = values;
};

//Static methods

Formatter.createInstance = function(values) {
    //return new Formatter(values);
    Y.error('Not implemented');	//Must override in descendants
};

//Public methods

/**
 * Get value of key
 * @method
 * @private
 * @param key {String|Number} Key/index of value in the object/array 'values'
 * @return Value from the data in 'values'
 */
Formatter.prototype.getValue = function(key) {
    if(Y.Lang.isArray(this.values)) {
        key = parseInt(key); 
    }
    return this.values[key];
};

/**
 * Get value of params.key
 * The value found will be set to params.value
 * For internal use.
 * @method
 * @private
 * @param params {Object} Object containing key as in { key: "KEY" }
 * @return {Boolean} True if value found, False otherwise
 */
Formatter.prototype.getParams = function(params) {
    if(!params || !params.key) {
        return false;
    }

    var value = this.getValue(params.key);
	
    if(value != null) {
        params.value = value;
        return true;
    }

    return false;
};

Formatter.prototype.format = function(str, config) {
    Y.error('Not implemented');	//Must override in descendants
};

//For date and time formatters
Y.mix(Formatter, {
    /**
     * Get current timezone. Used for time format
     * @method
     * @private
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset); 
    }
})
