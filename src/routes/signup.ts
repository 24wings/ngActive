import express = require('express');
import { playerModel, recordModel } from '../models';

var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('signup');
    })
    .post(async (req, res, next) => {
        var isExisit = await playerModel.findOne({ phone: req.body.phone }).count();
        console.log(req.body);
        if (isExisit) {
            res.json({
                issuccess: false,
                data: '该手机号已经注册'
            });
        } else {
            req.body.age = parseInt(req.body.age);
            var newPlayer = await new playerModel(req.body).save();

            var currentRecord = await new recordModel({ playerId: newPlayer._id }).save();
            newPlayer.currentRecord = currentRecord._id;
            res.locals._id = newPlayer._id;
            // 本地存储用户_id
            res.json({
                issuccess: true,
                data: newPlayer._id
            });
        }
    });

export { router as signupRouter };