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

const divisor = '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++';

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
    hub_activities.activities.forEach((obj) => {
        activities.push({
            id: obj.id,
            time_slot: obj.time_slot,
            active_time: obj.overall,
        })
    });

    let result = {
        project: {
            id: hub_projects.projects[0].id,
            name: hub_projects.projects[0].name,
        },
        user: {
            id: hub_user.user.id,
            name: hub_user.user.name,
        },
        activities: activities
    };
    return JSON.stringify(result);
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
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.all('/projects', async (req, res, next) => {
    const hub_projects = await requestHubstaffAPI('projects');

    let promises = hub_projects.projects.map(async project => {
        const {users} = await requestHubstaffAPI(`projects/${project.id}/members`);

        return {...project, users, activities: []};
    });

    const projects = await Promise.all(promises);

    let hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
    });

    const result = projects.map(project => {
        const users = project.users.map(user => {
            const activities = hub_activities.activities.filter(({project_id, user_id}) => ((project_id === project.id) && (user_id === user.id)));

            return {...user, activities}
        });

        return {...project, users}
    });

    res.send(result);
});

router.all('/projects_rating', async (req, res, next) => {
    const hub_projects = await requestHubstaffAPI('projects');

    let promises = hub_projects.projects.map(async project => {
        const {users} = await requestHubstaffAPI(`projects/${project.id}/members`);

        return {...project, users, activities: []};
    });

    const projects = await Promise.all(promises);

    let hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
    });

    console.log(divisor);
    console.log('HUB-ACTIVITIES-----', hub_activities);

    const results = projects.map(async project => {
        const users = project.users.map(async user => {
            const activities = hub_activities.activities.filter(({project_id, user_id}) => ((project_id === project.id) && (user_id === user.id)));
            console.log(divisor);
            console.log('activities++++++++++++++', activities.length);
            console.log(project.id, user.id);

            const contract = await eos.contract("rating");
            await contract.calculate({
                hubstaff_id: user.id,
                activities: activities,
                // randoms: randoms
            }, {
                authorization: 'rating'
            });

            console.log('user-----', user);

            const {rows} = await eos.getTableRows({
                json: true,
                code: 'rating',
                scope: 'rating',
                table: 'ratings',
                'lowerBound': 0,
            });
            console.log('rows-----', rows);

            const {rating} = rows.find(({hubstaff_id}) => (hubstaff_id === user.id));
            console.log('rating-----', rating);

            return {
                ...user,
                rating,
                activities,
            }
        });

        return {...project.id, users: await Promise.all(users)}
    });

    const result = await Promise.all(results);

    res.send(result);
});

module.exports = router;