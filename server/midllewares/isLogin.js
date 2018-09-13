const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    isLogin: (req, res, next) => {
        let token = req.headers.access_token
        if(token){
            let decode = jwt.verify(token, process.env.secretKey)
            console.log('masuk login is');
            console.log(decode.email);
            
            User.findOne({email : decode.email})
            .then((userLogin) => {
                if(userLogin){
                    req.info = userLogin
                    console.log(userLogin);
                    
                    next()
                }else{
                    res.status(400).json({msg: 'not found'})
                }
            })
            .catch((err) => {
                res.status(400).json(err)
            });
        }else{
            res.status(400).json({msg: 'not found'})
        }

    }
};
