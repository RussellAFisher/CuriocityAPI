var request = require("request");

module.exports = {
    homeInfo: function(addressComponents) {
        return new Promise((resolve, reject) => {
            var url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz19l7src3rbf_64j9s&address=' + addressComponents[0].long_name + '+' + addressComponents[1].short_name + '&citystatezip=' + addressComponents[3].long_name + '%2C+' + addressComponents[5].short_name;

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
            }
            request(url, callback);
        });
    }
};
