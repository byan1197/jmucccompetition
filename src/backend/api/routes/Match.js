const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Match = require('../models/Match')
const Team = require('../models/Team')
const Report = require('../models/Report')

router.get('/', (req, res) => {

    Match.find()
        .populate('team1 team2')
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
})

router.post('/', (req, res) => {
    if (req.body.team1Name === req.body.team2Name)
        return res.status(400).json({
            error: { message: 'Both teams cannot be the same' }
        });

    var promiseTeam1 = new Promise((resolve, reject) => {
        Team.find({ teamName: req.body.team1Name })
            .exec((err, teamDocs) => {
                if (err)
                    return reject(err)
                if (teamDocs.length !== 1)
                    return reject({ message: 'Conflicting teams' })
                resolve(teamDocs[0]._id);
            })
    })
    var promiseTeam2 = new Promise((resolve, reject) => {
        Team.find({ teamName: req.body.team2Name })
            .exec((err, teamDocs) => {
                if (err)
                    return reject(err)
                if (teamDocs.length !== 1)
                    return reject({ message: 'Conflicting teams' })
                resolve(teamDocs[0]._id);
            })
    })

    Promise.all([promiseTeam1, promiseTeam2])
        .then(results => {
            const match = new Match({
                _id: new mongoose.Types.ObjectId(),
                team1: results[0],
                team2: results[1],
                complete: false,
                day: req.body.day,
                div: req.body.div
            })

            match.save()
                .then(result => {
                    return res.status(201).json({
                        success: { message: 'Match created' }
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: { message: 'Invalid fields entered' }
                    })
                })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
})

router.post('/bracketize', (req, res) => {
    var shuffle = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    var teamPromiseArr = [];
    var omittedTeam = null;

    Team.find()
        .exec((err, teams) => {
            if (err)
                return res.status(500).json(err)

            if (teams.length < 1)
                return res.status(201).json({
                    error: { message: 'No teams to shuffle' }
                })

            var shufTeams = shuffle(teams.map(t => {
                return {
                    _id: t._id,
                    teamName: t.teamName
                }
            }));

            console.log(shufTeams);

            omittedTeam = shufTeams.length % 2 !== 0 ? shufTeams.pop() : null;

            for (var i = 0; i < shufTeams.length; i = i + 2) {
                var match = new Match({
                    _id: new mongoose.Types.ObjectId(),
                    team1: shufTeams[i]._id,
                    team2: shufTeams[i + 1]._id,
                    complete: false,
                    day: 1,
                    div: 1
                })

                teamPromiseArr.push(new Promise((resolve, reject) => {
                    match.save()
                        .then(result => {
                            resolve()
                        })
                        .catch(err => {
                            reject(err)
                        })
                }))
            }

            Promise.all(teamPromiseArr)
                .then(results => {
                    var message = omittedTeam ? 'Matches created. Omitted team ' + omittedTeam.teamName + ' due to team imbalance' : 'Matches created.'
                    return res.status(201).json({
                        success: { message: message }
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        error: error
                    })
                })
        })
})

router.delete('/delete', (req, res) => {
    Report.deleteMany({
        match: req.body._id
    }).exec((err, reportRes) => {
        var message = err ? 'Could not delete corresponding reports' : '';
        Match.findByIdAndDelete(req.body._id)
            .exec((matchErr, result) => {
                if (matchErr)
                    return res.status(500).json({
                        error: { message: 'Could not delete' }
                    });

                return res.status(201).json({
                    success: { message: 'Match deleted.' + message }
                });
            })

    })
});

router.patch('/complete', (req, res) => {
    var complete = req.body.complete;
    var id = req.body._id;
    Match.updateOne({ _id: id }, { $set: { complete: complete } }).exec((err, result) => {
        if (err)
            return res.status(500).json({ error: err })
        return res.status(201).json({ success: { message: 'Successfully changed match completion. Judges will not see completed matches.' } });
    })
})

module.exports = router;