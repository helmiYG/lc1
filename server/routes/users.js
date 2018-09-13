var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/register', (req, res) => {
  const {name, email , password} = req.body
  var hash = bcrypt.hashSync(password, salt);
    User.create({
      name: name,
      email: email,
      password: hash
    })
    .then((result) => {
      res.status(200).json({
        succes: true,
        message: `Account ${name} registered`
      })
    })
    .catch((err) => {
     res.status(500).json(err)
    });
});

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then((result) => {
      if(result){
        console.log(result);
        
        let decrypt = bcrypt.compareSync(req.body.password, result.password);
        if(decrypt){
          let token = jwt.sign({
            name: result.name,
            email: result.email
          }, process.env.secretKey)
          
          res.status(201).json({
            token: token,
            idLogin: result._id
          })
        }
      }else{
        res.status(500).json(err)
      }
  })
  .catch((err) => {
    res.status(500).json(err)
  });
})

module.exports = router;
