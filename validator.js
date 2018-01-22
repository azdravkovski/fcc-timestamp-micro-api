'use strict';

module.exports = function(timestamp) {

    function makeUTC(input) {
        return new Date(input).toUTCString();
    }

    const result = {
        unix: null,
        utc: null
    };

    if (+timestamp >= 0) { //UNIX timestamp
        result.unix = +timestamp;
        result.utc = makeUTC(+timestamp);
    } else if (isNaN(+timestamp)) { //ISO date
        result.unix = Date.parse(timestamp);
        result.utc = makeUTC(timestamp);
    }

    return result;

}