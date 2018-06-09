let express = require('express');
let router = express.Router();
let request = require('request');
let axios = require('axios');

let hubUrl = 'https://api.hubstaff.com/v1/';
let testUrl = 'http://localhost:3000/test/';
let appToken = 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U';
let authToken = 'AjkNZDrobx8NDO8GhujhlBRA5bAI7W0veNgWdoYFj3U';
let usersIDs = 315143;
let startTime = '2018-06-09T00:00:00.000Z';
let stopTime = '2018-06-11T00:00:00.000Z';

let testActivities = [
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 304,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:25:35Z",
        "user_id": 315144,
        "project_id": 444804,
        "overall": 9,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:25:44Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 5,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:26:01Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 4,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:26:32Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 8,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:26:53Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 3,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:27:15Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 2,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "starts_at": "2018-06-09T06:27:31Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 14,
    }
];


function getHubstaffActivities(userID) {
    axios({
        method: 'get',
        url: hubUrl + 'activities' + '?start_time=' + startTime + '&stop_time=' + stopTime + '&users=' + userID,
        headers: {
            'App-Token': appToken,
            'Auth-Token': authToken,
        }
    })
        .then(function (response) {
            //todo добавить проверку на статус ответа
            return response.data;
        })
        .catch(function (error) {
            // error.response.data.error
            return false;
        });
}

function parseActivities(rawActivities) {

    let resultData = {};

    rawActivities.forEach((activity) => {
        let timeSlot = activity.time_slot;
        let userID = activity.user_id;
        let projectID = activity.project_id;
        let activityTime = activity.overall;

        // Grouping projects
        let projectData = {};
        if (!resultData[projectID]) {
            resultData[projectID] = {
                name: 'Project Name',
                data: projectData
            };
        } else {
            projectData = resultData[projectID].data;
        }

        // Grouping users inside of project
        let userData = {};
        if (!projectData[userID]) {
            projectData[userID] = {
                name: 'User Name',
                data: userData
            };
        } else {
            userData = projectData[userID];
        }

        // Grouping activities inside of user
        if (!userData[timeSlot]) {
            userData[timeSlot] = {
                activityTime: activityTime,
                randomValue: 0.111
            };
        } else {
            userData[timeSlot].activityTime += activityTime;
        }

    });

    return resultData;
}

router.all('/', function (req, res, next) {
    res.send('Hello');
});

router.all('/projects', function (req, res, next) {

    // let rawActivities = getHubstaffActivities();
    res.send(parseActivities(testActivities));

});

router.all('/user', function (req, res, next) {

    let userID = req.data.id;
    if (!userID) {
        res.send('User ID not passed');
    }
    // let rawActivities = getHubstaffActivities(userID);
    res.send(parseActivities(testActivities));
});

module.exports = router;
