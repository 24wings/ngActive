import express = require('express');
import { userModel, IUser } from '../models';

var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('signup');
    })
    .post(async (req, res, next) => {
        var { name, phone, password, school, specil, grader } = req.body;
        var isExisit = await userModel.count({ phone }).exec();
        if (isExisit) {
            res.json({
                issuccess: false,
                data: '该手机号已经存在'
            });
        } else {
            var user = await new userModel({ name, phone, password, school, specil, grader }).save();
            req.session.user = user;
            res.json({
                issuccess: true,
                data: user
            });
        }


    });

export { router as signupRouter };