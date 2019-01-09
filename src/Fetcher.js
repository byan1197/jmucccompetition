var env = process.env.NODE_ENV || "development";
const Fetcher = {
    getAllMatches: function () {
        return fetch('/api/match', {
            method: 'GET',
            // body: JSON.stringify({ pid: pid }),
            // headers: {
            //     'Content-Type': 'application/json',
            // //     'token': localStorage.getItem('token')
            // }
        }).then(res => res.json())
    },
    getJudges: function () {
        return fetch('/api/judge', {
            method: 'GET'
        }).then(res => res.json())
    },
    submitReport: function (data) {
        return fetch('/api/report/submit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addTeam: function (data) {
        return fetch('/api/team/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addJudge: function (data) {
        return fetch('/api/judge/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteJudge: function (data) {
        return fetch('/api/judge/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    deleteMatch: function (data) {
        return fetch('/api/match/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteTeam: function (data) {
        return fetch('/api/team/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    createMatch: function (data) {
        return fetch('/api/match/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    matchCompletion: function (data) {
        return fetch('/api/match/complete', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    scrambleBrackets: function () {
        return fetch('/api/match/bracketize', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllTeams: function () {
        return fetch('/api/team', {
            method: 'GET'
        }).then(res => res.json())
    },
    getAllReports: function () {
        return fetch('/api/report', {
            method: 'GET'
        }).then(res => res.json())
    },
    clearDb: function() {
        return fetch('/api/db/dropall', {
            method: 'DELETE'
        }).then(res => res.json())

    }
}

export default Fetcher;