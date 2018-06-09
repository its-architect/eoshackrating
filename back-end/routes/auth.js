let express = require('express');
let router = express.Router();
let request = require('request');
let axios = require('axios');
let hubUrl = 'https://api.hubstaff.com/v1/';
let testUrl = 'http://localhost:3000/test';


/* Do authorization via Hubstaff */
router.all('/', function (req, res, next) {
    axios({
        method: 'post',
        url: hubUrl + 'auth',
        data: {
            email: req.query.email,
            password: req.query.password,
        },
        headers: {'App-Token': 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U'}
    })
        .then(function (response) {
            res.send(JSON.parse(response.data));
        })
        .catch(function (error) {
            res.send(JSON.parse(error));
        });

/*
    request(
        {
            method: 'POST',
            url: testUrl,
            form: {
                'email': req.query.email,
                'password': req.query.password,
            },
            headers: {
                'App-Token': 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U',
            },
        },
        (error, response, body) => {
            res.send(JSON.parse(body));
            console.log(body);
        });
*/

});

module.exports = router;
