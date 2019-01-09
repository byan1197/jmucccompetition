const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = require('../models/Team');

router.post('/create', (req, res) => {

    var where = {
        $or: [
            {
                teamName: req.body.teamName
            },
            {
                judgeName: req.body.judgeName
            }
        ]
    }

    Team.find(where).exec((err, docs) => {

        if (err)
            return res.status(400).json({ error: err })

        if (docs.length !== 0)
            return res.status(500).json({
                error: { message: 'Team already exists' }
            })

        const team = new Team({
            _id: new mongoose.Types.ObjectId(),
            teamName: req.body.teamName,
            judgeName: req.body.judgeName,
            university: req.body.university || ''
        })

        team.save()
            .then(result => {
                res.status(201).json({
                    success: { message: 'Team created' }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: { message: 'Invalid fields entered' }
                })
            })
    })
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
    Team.findByIdAndDelete(id)
        .exec((err, result) => {
            if (err)
                return res.status(500).json({
                    error: { message: 'Could not delete' }
                });

            return res.status(201).json({
                success: { message: 'Team deleted' }
            });
        })
});
module.exports = router;