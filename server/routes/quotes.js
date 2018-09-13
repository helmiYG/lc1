var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Quote = require('../models/quotes');
var {isLogin} = require('../midllewares/isLogin');

router.post('/', isLogin, (req, res) => {
    Quote.create({
        status: req.body.status,
        user: req.info._id
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch((err) => {
        res.status(500).json(err)
    });
})

router.get('/', (req, res) => {
    Quote.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(500).json(err)
    });
})

router.delete('/:id', isLogin, (req, res) => {
    Quote.findOne({_id : req.params.id})
    .then((result) => {
        if(result){
            if(toString(result.user) === toString(req.info._id)){
                Quote.deleteOne({_id: req.params.id})
                .then((deleted) => {
                    res.status(201).json({
                        succes: true,
                        message: `quote with id ${req.params.id} deleted`
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
            } else {
                res.status(500).json({msg: 'not authorized'})
            }

        } else {
            res.status(500).json({msg: 'data not found'})
        }
    })
    .catch((err) => {
        res.status(500).json(err)
    });
})


/* GET home page. */
// router.post('/', );

module.exports = router;
