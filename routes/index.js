var express = require('express');
var router = express.Router();
var api = require('../api/geolocation');
var prop = require('../api/property');
var request = require("request");
var parser = require('xml2json');

var addressComponents;

router.get('/geocode/json', function(req, res, next) {
    var addressComponents;
    api.getAddress(req.query.lat, req.query.lng).then(function(data) {
        var address = JSON.parse(data);
        var addressStuff;
        addressComponents = address.results[0].address_components;
        if (addressComponents[0].long_name.indexOf('-') !== -1) {
            addressStuff = addressComponents[0].long_name.split('-')[0];
        } else {
            addressStuff = addressComponents[0].long_name;
        }
        prop.homeInfo(addressComponents, addressStuff).then(function(data) {
            var jsonConvert = JSON.parse(parser.toJson(data));
            var stringifyIt = JSON.stringify(jsonConvert);
            var replaceErrant = stringifyIt.replace("SearchResults:searchresults", "SearchResults");
            var reJSON = JSON.parse(replaceErrant);
            res.json(reJSON);
        });
    });
});

router.get('/address/json', function(req, res, next) {
    var street = req.query.street;
    var city = req.query.city;
    var state = req.query.state;
    prop.homeInfoByAddress(street, city, state).then(function(data) {
        var jsonConvert = JSON.parse(parser.toJson(data));
        var stringifyIt = JSON.stringify(jsonConvert);
        var replaceErrant = stringifyIt.replace("SearchResults:searchresults", "SearchResults");
        var reJSON = JSON.parse(replaceErrant);
        res.json(reJSON);
    });
});

router.get('/', function(req, res, next) {
    res.json('test page');
});

module.exports = router;
ts = router;
