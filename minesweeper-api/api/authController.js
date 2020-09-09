const db = require("../models/");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {JWT_SECRET} = require('../config')

const signup = (req, res,next) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then((user) => {
            res.send({message: "User was registered successfully!"});
        })
        .catch((err) => {
            res.status(500).send({message: err.message});
        });
};

const signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            var token = jwt.sign({id: user.id}, JWT_SECRET, {
                expiresIn: "365d", // 24 hours
            });

            res.status(200).send({
                userid: user.userid,
                username: user.username,
                email: user.email,
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(500).send({message: err.message});
        });
};

module.exports = {signin, signup};
