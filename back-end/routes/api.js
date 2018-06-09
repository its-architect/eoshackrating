let express = require('express');
let router = express.Router();
let axios = require('axios');

const eosjs = require('eosjs');
const eos = new eosjs({keyProvider: ['5JmfV1RsfUzWNxD8vwP3eD2pq38FvhXBZP32bjNv6XXXzdebXci']});

let hubUrl = 'https://api.hubstaff.com/v1/';
let appToken = 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U';
let authToken = 'AjkNZDrobx8NDO8GhujhlBRA5bAI7W0veNgWdoYFj3U';
let startTime = '2018-06-09T00:00:00.000Z';
let stopTime = '2018-06-11T00:00:00.000Z';
const hub_users = [315143, 322140, 322444, 245720, 322449, 322483, 322489, 322491, 322498];

async function requestHubstaffAPI(object, params) {
    return (await axios({
        method: 'get',
        url: hubUrl + object,
        params: params,
        headers: {
            'App-Token': appToken,
            'Auth-Token': authToken,
        }
    })).data;
}

async function getUserData(userID) {
    let hub_user = await requestHubstaffAPI('users/' + userID);
    let hub_projects = await requestHubstaffAPI('users/' + userID + '/projects');
    let hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
        users: userID
    });

    let activities = [];
    let activitiesForRating = [];
    hub_activities.activities.forEach((obj) => {
        activities.push({
            id: obj.id,
            time_slot: obj.time_slot,
            active_time: obj.overall,
        });
        activitiesForRating.push(obj.overall);
    });

    // GETTING RATING
    const contract = await eos.contract("rating");
    await contract.calculate({
        hubstaff_id: userID,
        activities: activitiesForRating,
    }, {
        authorization: 'rating'
    });

    const {rows} = await eos.getTableRows({
        json: true,
        code: 'rating',
        scope: 'rating',
        table: 'ratings',
        'lowerBound': 0,
    });

    const {rating} = rows.find(({hubstaff_id}) => (hubstaff_id === userID));

    let result = {
        project: {
            id: hub_projects.projects[0].id,
            name: hub_projects.projects[0].name,
        },
        user: {
            id: hub_user.user.id,
            name: hub_user.user.name,
            rating: rating,
        },
        activities: activities
    };
    return result;
}

router.all('/', function (req, res, next) {
    res.send('API root');
});

router.all('/user', function (req, res, next) {
    let userID = req.query.id;
    if (!userID) {
        res.end('User ID not passed');
    }
    getUserData(userID).then((result) => {
        res.send(JSON.stringify(result));
    }).catch((error) => {
        res.send(error);
    });
});

router.all('/projects', async (req, res, next) => {

    const promises = hub_users.map((async user => {
        const userResult = await getUserData(user);
        return userResult;
    }));
    const users = await Promise.all(promises);

    res.send(JSON.stringify(users));
});

module.exports = router;