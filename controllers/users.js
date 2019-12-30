const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('../routers/auth');
const Users = mongoose.model('Users');
const Tokens = require('../models/Token')
//POST new user route (optional, everyone has access)

exports.create = (auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(423).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.status(200).send({
            "status": 200,
            user: finalUser.toAuthJSON()
        }));
});

//POST login route (optional, everyone has access)
exports.login = (auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        console.log(passportUser);
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            req.session.token = user.token;
            const finalUser = new Tokens({
                email: user.email
            });
            finalUser.token = user.token;
            finalUser.save().then(() => console.log("save token thanh cong"));
            req.session.email = user.email;
            return res.send({
                "status": 200,
                user: user.toAuthJSON()
            });
        } else {
            return res.send({
                "status": 403,
                "message": "Account not found"
            })
        }

        return req.info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
exports.currentAuthen = (auth.required, (req, res, next) => {
    const { body: { email } } = req;
    console.log("email nè" + email);
    const user = Users.find({
        occupation: /host/,
        'user.email': 'leanhvu86@gmail.com'
    }).limit(10)
        .sort({ occupation: -1 }).
        select({ email: 1, occupation: 1 }).
        exec(callback);

    if (!user) {
        return res.status(400).send({
            message: "can not found current user"
        });
    } else {
        console.log(" id nguoi dung ne " + user.id);
        Tokens.findById(user.id).then((tokens) => {
            if (tokens) {
                return res.send({
                    "status": 200,
                    "token": tokens.token
                })
            } else {
                return res.send({
                    "status": 401,
                    "message": "can not found token"
                })
            }
        })
    }




    // .then((user) => {
    //         if (!user) {
    //             return res.status(400).send({
    //                 message: "can not found current user"
    //             });
    //         } else {
    //             console.log(" id nguoi dung ne " + user.id);
    //             Tokens.findById(user.id).then((tokens) => {
    //                 if (tokens) {
    //                     return res.send({
    //                         "status": 200,
    //                         "token": tokens.token
    //                     })
    //                 } else {
    //                     return res.send({
    //                         "status": 401,
    //                         "message": "can not found token"
    //                     })
    //                 }
    //             })
    //         }
    //     }).catch(error => {
    //         return res.send({
    //             "status": 403,
    //             "message": "current user is not exist"
    //         });
    //     })





    // return Users.find({ email: email })
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(400).send({
    //                 message: "can not found current user"
    //             });
    //         }

    //         return res.json({
    //             "status": 200,
    //             //user: user.toAuthJSON()
    //         });
    //     });
});
exports.logout = ('/logout', (req, res) => {
    if (req.session.user && req.cookies.token) {
        res.clearCookie('user');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
