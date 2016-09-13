var express = require('express');
var router = express.Router();
var api = require('../api/geolocation');
var prop = require('../api/property');
var request = require("request");
var parser = require('xml2json');

var addressComponents;

router.get('/geocode/json', function(req, res, next) {
    api.getAddress(req.query.lat, req.query.lng).then(function(data) {
        var address = JSON.parse(data);
        addressComponents = address.results[0].address_components;
        prop.homeInfo(addressComponents).then(function(data) {
            var jsonConvert = JSON.parse(parser.toJson(data));
            res.json(jsonConvert);
        });
    });
});

router.get('/', function(req, res, next) {
    res.json('test page');
});

module.exports = router;
