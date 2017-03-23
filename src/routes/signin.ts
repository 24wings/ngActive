import express = require('express');
import { userModel, IUser } from '../models';
var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('signin');
    })
    .post(async (req, res, next) => {
        var user = await userModel.findOne({ phone: req.body.phone, password: req.body.password }).exec();
        if (user) {
            req.session.user = user;
            res.json({
                issuccess: true,
                data: user
            });
        } else {
            res.json({
                issuccess: false,
                data: '该用户不存在'
            });
        }

    });



export { router as signinRouter }; 