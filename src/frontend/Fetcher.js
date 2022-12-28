const baseUrl = "http://localhost:4000"
const Fetcher = {
    getAllMatches: function () {
        return fetch(baseUrl + '/api/match', {
            method: 'GET',
        }).then(res => res.json())
    },
    getJudges: function () {
        return fetch(baseUrl + '/api/judge', {
            method: 'GET'
        }).then(res => res.json())
    },
    submitReport: function (data) {
        return fetch(baseUrl + '/api/report/submit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addTeam: function (data) {
        return fetch(baseUrl + '/api/team/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    addJudge: function (data) {
        return fetch(baseUrl + '/api/judge/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteJudge: function (data) {
        return fetch(baseUrl + '/api/judge/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    deleteMatch: function (data) {
        return fetch(baseUrl + '/api/match/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    deleteTeam: function (data) {
        return fetch(baseUrl + '/api/team/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    createMatch: function (data) {
        return fetch(baseUrl + '/api/match/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

    },
    matchCompletion: function (data) {
        return fetch(baseUrl + '/api/match/complete', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    scrambleBrackets: function () {
        return fetch(baseUrl + '/api/match/bracketize', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllTeams: function () {
        return fetch(baseUrl + '/api/team', {
            method: 'GET'
        }).then(res => res.json())
    },
    getAllNonDivisionedTeams: function () {
        return fetch(baseUrl + '/api/team/nondiv', {
            method: 'GET'
        }).then(res => res.json())
    },
    getAllDivisions: function () {
        return fetch(baseUrl + '/api/division', {
            method: 'GET'
        }).then(res => res.json())
    },
    getAllVisibleDivisions: function () {
        return fetch(baseUrl + '/api/division/getvisible', {
            method: 'GET'
        }).then(res => res.json())
    },
    createNewDivision: function (data) {
        return fetch(baseUrl + '/api/division/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    toggleDivisionVisibility: function (data) {
        return fetch(baseUrl + '/api/division/vis', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    submitRankings: function (data) {
        return fetch(baseUrl + '/api/division/rank', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getRankings: function () {
        return fetch(baseUrl + '/api/division/rankings', {
            method: 'GET'
        }).then(res => res.json());
    },
    deleteDivision: function (data) {
        return fetch(baseUrl + '/api/division/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllReports: function () {
        return fetch(baseUrl + '/api/report', {
            method: 'GET'
        }).then(res => res.json())
    },
    clearDb: function () {
        return fetch(baseUrl + '/api/db/dropall', {
            method: 'DELETE'
        }).then(res => res.json())

    },
    auth: function () {
        return fetch(baseUrl + '/api/auth', {
            method: 'GET'
        }).then(res => res.json())

    }
}

export default Fetcher;