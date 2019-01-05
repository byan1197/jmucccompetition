var config = require('./frontEndConfig.json')
const Fetcher = {
    getAllMatches: function () {
        return fetch(config.host + '/match', {
            method: 'GET',
            // body: JSON.stringify({ pid: pid }),
            // headers: {
            //     'Content-Type': 'application/json',
            // //     'token': localStorage.getItem('token')
            // }
        }).then(res => res.json())
    },
    getJudges: function () {
        return fetch(config.host + '/judge', {
            method: 'GET'
        }).then(res => res.json())
    },
    submitReport: function (data) {
        return fetch(config.host + '/report/submit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addTeam: function (data) {
        return fetch(config.host + '/team/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addJudge: function (data) {
        return fetch(config.host + '/judge/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteJudge: function (data) {
        return fetch(config.host + '/judge/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    deleteMatch: function (data) {
        return fetch(config.host + '/match/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteTeam: function (data) {
        return fetch(config.host + '/team/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    createMatch: function (data) {
        return fetch(config.host + '/match/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    scrambleBrackets: function () {
        return fetch(config.host + '/match/bracketize', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllTeams: function () {
        return fetch(config.host + '/team', {
            method: 'GET'
        }).then(res => res.json())
    },
    getAllReports: function () {
        return fetch(config.host + '/report', {
            method: 'GET'
        }).then(res => res.json())
    },
    clearDb: function() {
        return fetch(config.host + '/db/dropall', {
            method: 'DELETE'
        }).then(res => res.json())

    }
}

export default Fetcher;