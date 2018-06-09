let express = require('express');
let router = express.Router();
let request = require('request');
let axios = require('axios');

let hubUrl = 'https://api.hubstaff.com/v1/';
let testUrl = 'http://localhost:3000/test/';
let appToken = 'jr7vyt_6rSCDx3fgaQbEE--RYqjX95EsZFq2NlZoW5U';
let authToken = 'AjkNZDrobx8NDO8GhujhlBRA5bAI7W0veNgWdoYFj3U';
let startTime = '2018-06-09T00:00:00.000Z';
let stopTime = '2018-06-11T00:00:00.000Z';

let testActivities = [
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 304,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315144,
        "project_id": 444804,
        "overall": 9,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 5,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315144,
        "project_id": 444804,
        "overall": 4,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 8,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 3,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 2,
    },
    {
        "time_slot": "2018-06-09T06:20:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 14,
    },
    {
        "time_slot": "2018-06-09T06:30:00Z",
        "user_id": 315143,
        "project_id": 444803,
        "overall": 151,
    },
    {
        "time_slot": "2018-06-09T06:30:00Z",
        "user_id": 315144,
        "project_id": 444804,
        "overall": 152,
    }
];

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

async function getAllData() {
    let hub_projects = await requestHubstaffAPI('projects');
    console.log(hub_projects);
    // let hub_users = await requestHubstaffAPI('users',{project_memberships: true});
    let hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
        users: usersIDs
    });

/*    let projects = hub_projects.map( async (project) => {
        let users = await requestHubstaffAPI('projects/' + project.id+ '/members');
        return {...project, ...users }
    });
    console.log(projects);*/

    let projects =[];
    hub_projects.forEach((obj)=>{
        let users =[];
        let hub_users = await requestHubstaffAPI('projects/' + obj.id+ '/members');

        projects.push({
           id: obj.id,
           name: obj.name,
           users: users,
       })
    });

    /*hub_users.users.forEach((obj)=>{
        let users =[];
        users.push({
            id: obj.id,
            name: obj.name,
            project_id: obj.projects[0].id,
        });

        projects.push({
           id: obj.projects[0].id,
           name: obj.projects[0].name,
       })
    });*/


    let activities = [];
    hub_activities.activities.forEach((obj)=>{
        activities.push({
            id: obj.id,
            user_id: obj.user.id,
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

async function getUserData(userID) {
    let hub_user = await requestHubstaffAPI('users/' + userID);
    let hub_projects = await requestHubstaffAPI('users/' + userID + '/projects');
    let hub_activities = await requestHubstaffAPI('activities', {
        start_time: startTime,
        stop_time: stopTime,
        users: userID
    });
    let activities = [];
    hub_activities.activities.forEach((obj)=>{
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

router.all('/projects', function (req, res, next) {
    getAllData().then((result)=>{
        res.send(result);
    }).catch((error)=> {
        res.send(error);
    });
});

router.all('/user', function (req, res, next) {
    let userID = req.query.id;
    if (!userID) {
        res.end('User ID not passed');
    }
    getUserData(userID).then((result)=>{
        res.send(result);
    }).catch((error)=> {
        res.send(error);
    });
});


function parseActivities2(rawActivities) {

    let projects = {};

    rawActivities.forEach((activity) => {
        let timeSlot = activity.time_slot;
        let userID = activity.user_id;
        let projectID = activity.project_id;
        let activityTime = activity.overall;

        // Grouping projects
        let project_users = {};
        if (!(projectID in projects)) {
            projects[projectID] = {
                name: 'Project Name',
                rating: 50,
                users: project_users
            };
        } else {
            project_users = projects[projectID].users;
        }

        // Grouping users inside of project
        let user_activities = {};
        if (!(userID in project_users)) {
            project_users[userID] = {
                name: 'User Name',
                activities: user_activities
            };
        } else {
            user_activities = project_users[userID].activities;
        }

        // Grouping activities inside of user
        if (!(timeSlot in user_activities)) {
            user_activities[timeSlot] = activityTime;
        } else {
            user_activities[timeSlot] += activityTime;
        }
    });

    return projects;
}

module.exports = router;