const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Judge = require('../models/Judge')

router.get('/', (req, res) => {
    Judge.find()
        .exec((err, docs) => {
            if (err)
                return res.status(500).json({ error: err })
            return res.status(201).json(docs);
        })
})

router.post('/create', (req, res) => {
    Judge.find({
        judgeName: req.body.judgeName
    }).exec((err, judges) => {
        if (err)
            return res.status(500).json({ error: err })
        if (judges.length > 0)
            return res.status(500).json({ error: { message: 'Judge already exists' } })
        const judge = new Judge({
            _id: new mongoose.Types.ObjectId(),
            judgeName: req.body.judgeName
        })
        judge.save()
            .then(result => {
                return res.status(201).json({
                    success: { message: 'Judge created' }
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: { message: 'Invalid fields entered' }
                })
            })
    })

})

router.delete('/delete', (req, res) => {
    Judge.findByIdAndDelete(req.body._id)
        .exec((err, result) => {
            if (err)
                return res.status(500).json({
                    error: { message: 'Could not delete' }
                });

            return res.status(201).json({
                success: { message: 'Judge deelted' }
            });
        })
})

module.exports = router;