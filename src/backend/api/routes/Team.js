const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Report = require('../models/Report');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Division = require('../models/Division')

router.get('/nondiv', (req, res) => {

    var teamsInDiv = [];
    Division.find()
        .populate('teams')
        .exec((err, divs) => {
            if (err)
                return res.status(500).json({ error: err })

            divs.forEach(d => {
                teamsInDiv = teamsInDiv.concat(d.teams.map(t => t._id));
            })

            var where = teamsInDiv.length === 0 ?
                {} :
                {
                    _id: {
                        $nin: teamsInDiv
                    }
                };

            Team.find(where).exec((err, docs) => {
                if (err)
                    return res.status(500).json({ error: err })
                return res.status(201).json(docs);
            })

        })
})

router.post('/', async (req, res) => {
    let where = {
        $or: [
            {
                teamName: req.body.teamName
            },
            {
                judgeName: req.body.judgeName
            }
        ]
    }

    let currentTeams = await Team.find(where).catch(e => {
        return res.status(500).json({ error: err })
    });

    if (currentTeams.length !== 0)
        return res.status(400).json({
            error: { message: 'Team already exists' }
        })
    const team = new Team({
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
    })
    await team.save().catch(e => {
        res.status(500).json({
            error: { message: 'Error during team save' }
        })
    });

    return res.status(201).json({
        success: { message: 'Team created' }
    });
});

router.patch('/update', (req, res) => {

    var where = {
        _id: req.body._id
    }

    Team.updateOne(where, { $set: req.body }).exec((err, result) => {

        if (err)
            return res.status(400).json({ error: err })

        return res.status(201).json({
            success: { message: 'Successfully updated team' }
        })

    })
})

router.get('/', (req, res) => {
    Team.find()
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
})

router.get('/names', (req, res) => {

    Team.find()
        .select('teamName')
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs.map(t => t.teamName));
        })
})

router.delete('/delete', (req, res) => {
    var id = req.body._id;
    var matchIds = [];
    var promiseArr = [];

    Match.find({
        $or: [
            { team1: id },
            { team2: id }
        ]
    }).exec((err, matches) => {
        if (err)
            reject({ message: 'Error deleting related matches' });
        matchIds = matches.map(m => m._id);
        matchIds.forEach(mid => {
            promiseArr.push(new Promise((resolve, reject) => {
                Report.deleteMany({
                    match: mid
                })
                    .exec(err => {
                        if (err)
                            reject({ message: 'Error deleting related reports' });
                        resolve();
                    })
            }))
            promiseArr.push(new Promise((resolve, reject) => {
                Match.findByIdAndDelete(mid)
                    .exec(err => {
                        if (err)
                            reject({ message: 'Error deleting related matches' });
                        resolve();
                    })
            }))
        })
        Promise.all(promiseArr)
            .then(() => {
                Team.findByIdAndDelete(id)
                    .exec(err => {
                        if (err)
                            return res.status(500).json({
                                error: err
                            });
                        return res.status(201).json({
                            success: { message: 'Team deleted' }
                        });
                    })
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                });
            })
    });

});
module.exports = router;