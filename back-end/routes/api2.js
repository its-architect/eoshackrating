let express = require('express');
let router = express.Router();
let axios = require('axios');
let fs = require('fs-extra');

const eosjs = require('eosjs');
const eos = new eosjs({keyProvider: ['5JmfV1RsfUzWNxD8vwP3eD2pq38FvhXBZP32bjNv6XXXzdebXci']});

const hubUrl = 'https://api.hubstaff.com/v1/';
const appToken = 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U';
const authToken = 'AjkNZDrobx8NDO8GhujhlBRA5bAI7W0veNgWdoYFj3U';
const startTime = '2018-06-09T00:00:00.000Z';
const stopTime = '2018-06-11T00:00:00.000Z';
const dataFile = "data.json";
const updatePeriod = 1000 * 60 * 2;

let initialization = null;
let ratingContract = null;
let data = {};

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

router.all('/', function (req, res, next) {
    res.send('API root');
});

router.all('/user', async function (req, res, next) {
    await initialization;

    const userID = req.query.id;

    if (!(userID in data.users)) {
        res.status(404).send(`No user with id: ${userID}`);
        return;
    }

    const user = { ...data.users[userID] };
    user.activities = data.activities.filter(activ => activ.user_id == userID);
    res.send(user);
});

router.all('/projects', async (req, res, next) => {
    await initialization;

    const result = data.projects.map(project => {
        const clone_project = { ...project };

        clone_project.users = Object.values(data.users)
        .filter(user => user.project_id === project.id)
        .map(user => {
            const user_activities = data.activities
            .filter(({ project_id, user_id }) => ((project.id === project_id) && (user.id === user_id)));

            return { ...user, activities: user_activities }
        });

        if (clone_project.users.length > 0) {
            clone_project.rating = clone_project.users.reduce((a,b) => a+b, 0) / clone_project.users.length;
        } else {
            clone_project.rating = 0;
        }

        return clone_project;
    });

    res.send(result);
});

const updateData = async () => {
    const hub_projects = await requestHubstaffAPI('projects');

    const users = {};

    const projects = await Promise.all(hub_projects.projects.map(async (project) => {
        const members = await requestHubstaffAPI(`projects/${project.id}/members`);

        members.users.forEach((user) => {
            users[user.id] = user;
            user.project_name = project.name;
            user.project_id = project.id;
            delete project.users;
        });

        return project;
    }));

    const hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
    });

    await Promise.all(Object.values(users).map(user =>
        ratingContract.calculate({
            hubstaff_id: user.id,
            activities: hub_activities.activities.filter(act => act.user_id == user.id).map(act => act.overall)
        }, {
            authorization: 'rating'
        })
    ));

    const blockchain_table = await eos.getTableRows({
        json: true,
        code: 'rating',
        scope: 'rating',
        table: 'ratings',
        lowerBound: 0
    });

    blockchain_table.rows.forEach((row) => {
        const user = users[row.hubstaff_id];

        if (!user) {
            throw new Error(`There is strange user with hubstaff_id='${row.hubstaff_id}' in blockchain`);
        }

        user.rating = row.rating;
        user.update_at = row.update_at;
    });

    data = {
        projects,
        users,
        activities: hub_activities.activities
    };

    await fs.writeJson(dataFile, data);
}

const startApi2 = async () => {
    if (fs.pathExistsSync(dataFile)) {
        data = fs.readJsonSync(dataFile);
        initialization = new Promise(r => r());
    }

    ratingContract = await eos.contract('rating');

    setTimeout(updateData, updatePeriod);
    await updateData();
}

initialization = startApi2().catch(error => {
    console.error("API2 start failed: ", error);
});

module.exports = router;