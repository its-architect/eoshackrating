let express = require('express');
let router = express.Router();

let rawActivities = [
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

let resultData = {};

function testParsing (rawActivities) {
    rawActivities.forEach((activity) => {
        let timeSlot = activity.time_slot;
        let userID = activity.user_id;
        let projectID = activity.project_id;
        let activityTime = activity.overall;

        console.log(timeSlot);
        console.log(userID);
        console.log(projectID);
        console.log(activityTime);

        // Grouping projects
        let projectData = {};
        if (!resultData[projectID]) {
            resultData[projectID] = {
                name: 'Project Name',
                users: projectData
            };
        } else {
            projectData = resultData[projectID].users;
        }

        // Grouping users inside of project
        let userData = {};
        if (!projectData[userID]) {
            projectData[userID] = {
                name: 'User Name',
                users: userData
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
}

// console.log('===========================');
// console.log(JSON.stringify(resultData));

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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('test', {
        a1: JSON.stringify(rawActivities),
        a2: JSON.stringify(groupedActivities),
    });
});

module.exports = router;
