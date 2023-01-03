const baseUrl = "http://localhost:4000"
const Fetcher = {
    getAllMatches: () => getFetch('/api/matches'),
    getJudges: () => getFetch('/api/judges'),
    submitReport: data => functionalFetch('/api/reports/submit', 'POST', data),
    addTeam: data => functionalFetch('/api/teams', 'POST', data),
    addJudge: data => functionalFetch('/api/judges', 'POST', data),
    deleteJudge: data => functionalFetch('/api/judge/delete', 'DELETE', data),
    deleteMatch: data => functionalFetch('/api/matches/delete', 'DELETE', data),
    deleteTeam: data => functionalFetch('/api/teams/delete', 'DELETE', data),
    createMatch: data => functionalFetch('/api/matches', 'POST', data),
    matchCompletion: data => functionalFetch('/api/matches/complete', 'PATCH', data),
    scrambleBrackets: () => functionalFetch('/api/matches/bracketize', 'POST', {}),
    getAllTeams: () => getFetch('/api/teams'),
    getAllNonDivisionedTeams: () => getFetch('/api/teams/nondiv'),
    getAllDivisions: () => getFetch('/api/divisions'),
    getAllVisibleDivisions: () => getFetch('/api/divisions/visible'),
    createNewDivision: data => functionalFetch('/api/divisions', 'POST', data),
    toggleDivisionVisibility: data => functionalFetch('/api/divisions/vis', 'PATCH', data),
    submitRankings: data => functionalFetch('/api/divisions/rank', 'POST', data),
    getRankings: () => getFetch('/api/divisions/rankings'),
    deleteDivision: data => functionalFetch('/api/divisions/delete', 'DELETE', data),
    getAllReports: () => getFetch('/api/reports'),
    clearDb: () => functionalFetch('/api/db/dropall', 'DELETE', {}),
    auth: () => getFetch('/api/auth')
}

function getFetch(path) {
    return fetch(`${baseUrl}${path}`, {
        method: 'GET'
    }).then(res => res.json())
}

function functionalFetch(path, method, body) {
    return fetch(`${baseUrl}${path}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export default Fetcher;