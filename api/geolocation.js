var request = require("request");

module.exports = {
    getAddress: function(lat, lng) {
        return new Promise((resolve, reject) => {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyDMijTtiaZ5rJz9tT4erNWrYb-s6xyxu80';

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
            }
            request(url, callback);
        });
    }
};
