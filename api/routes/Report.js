const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Report = require('../models/Report')
const Match = require('../models/Match')
const Judge = require('../models/Judge')

router.get('/', (req, res) => {

    Report.find()
        .populate('judge')
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
})

router.post('/submit', (req, res) => {

    const body = req.body;
    if (!body.judgeSign)
        return res.status(500).json({
            error: { message: 'Does not comply with rules: judge has not signed' }
        });
    if (
        (body.team1Points + body.team2Points) !== 15 ||
        body.team1Points < 4 ||
        body.team2Points < 4
    )
        return res.status(500).json({
            error: { message: 'Incorrect point distribution' }
        });


    var reportPromise = new Promise((resolve, reject) => {
        Report.find({
            judge: body.judge,
            match: body.match
        }).exec((err, reports) => {
            if (err)
                reject(err);
            if (reports.length >= 1)
                reject({ message: 'Match has already been judged by you.' })
            resolve();
        });
    })


    var matchPromise = new Promise((resolve, reject) => {
        Match.find({ _id: body.match })
            .populate('team1 team2')
            .exec((err, docs) => {
                if (err || docs.length < 1)
                    reject({ message: 'Error finding match' })
                resolve(docs[0]);
            });
    })


    var judgePromise = new Promise((resolve, reject) => {
        Judge.find({
            _id: body.judge
        }).exec((err, judges) => {
            if (judges.length !== 1)
                reject({ message: 'Judge not found' })
            if (err)
                reject(err);
            resolve();
        })

    })
    Promise.all([judgePromise, reportPromise, matchPromise]).then(results => {

        const report = new Report({
            _id: new mongoose.Types.ObjectId(),
            team1Points: body.team1Points,
            team2Points: body.team2Points,
            judge: body.judge,
            team1: results[2].team1.judgeName,
            team2: results[2].team2.judgeName,
            match: body.match,
            judgeSign: body.judgeSign
        })

        report.save()
            .then((result) => {
                return res.status(201).json({
                    success: { message: 'Successfully saved score sheet' }
                })
            })
            .catch(error => {
                return res.status(500)
                    .json({
                        error: error
                    })
            })
    }).catch(err => {
        res.status(500).json({ error: err })
    })

})

module.exports = router;