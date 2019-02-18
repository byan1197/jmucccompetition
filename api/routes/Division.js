const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Match = require('../models/Match')
const Team = require('../models/Team')
const Report = require('../models/Report')
const Division = require('../models/Division')
const DivisionReport = require('../models/DivisionReport')

router.get('/', (req, res) => {
    Division.find()
        .populate("teams")
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
});

router.get('/getvisible', (req, res) => {
    Division.find()
        .populate("teams")
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs.filter(d => d.visible));
        })
});

router.get('/reports', (req, res) => {
    DivisionReport.find()
        .populate("ranking division judge")
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
});

router.post('/create', (req, res) => {

    var body = req.body

    if (body.teamids.length !== 4)
        return res.status(500).json({ error: { message: 'Insufficient number of teams for a division.' } })

    Team.find({
        _id: { $in: body.teamids }
    }).exec((err, teams) => {
        if (err)
            return res.status(500).json({ error: err })
        if (teams.length !== body.teamids.length)
            return res.status(500).json({ error: { message: 'Teams not found' } })
        const division = new Division({
            _id: new mongoose.Types.ObjectId(),
            teams: body.teamids,
            divNum: body.divNum,
            visible: false
        })
        division.save()
            .then(() => {
                return res.status(201).json({
                    success: { message: 'Division created' }
                });
            })
            .catch(() => {
                return res.status(500).json({
                    error: { message: 'Error while saving division' }
                })
            })
    })
})

router.post('/rank', (req, res) => {
    const body = req.body;

    console.log('body', body);

    if (!body.judgeSign)
        return res.status(500).json({
            error: { message: 'Does not comply with rules: judge has not signed' }
        });

    var divisionCheck = new Promise((reject, resolve) => {
        DivisionReport.find({ judge: body.judge }).exec((err, result) => {
            if (result.length >= 1) {
                return res.status(500).json({
                    error: { message: 'This division has already been judged by this person' }
                });
            }
        })
    })

    divisionCheck.then(() => {
        const divisionReport = new DivisionReport({
            _id: new mongoose.Types.ObjectId(),
            ranking: [body.rankings],
            judge: body.judge,
            division: body.division,
        })
    })

})

router.patch('/vis', (req, res) => {
    Division.updateOne({ _id: req.body._id }, { $set: { visible: req.body.visible } })
        .exec((err, result) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json({ success: { message: 'Successfully changed division visibility. Judges can only see visible divisions.' } });

        })
})

router.delete('/delete', (req, res) => {
    DivisionReport.deleteMany({
        division: req.body._id
    }).exec((err, reportRes) => {
        var message = err ? 'Could not delete corresponding reports' : '';
        Division.findByIdAndDelete(req.body._id)
            .exec((divErr, result) => {
                if (divErr)
                    return res.status(500).json({
                        error: { message: 'Could not delete' }
                    });

                return res.status(201).json({
                    success: { message: 'Division deleted.' + message }
                });
            })

    })
})

module.exports = router;