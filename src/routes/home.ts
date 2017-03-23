import express = require('express');
import { playerModel, recordModel } from '../models';
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    var _id = req.query._id;
    if (_id) {
        var player = await playerModel.findOne({ _id }).populate('currentRecord').exec();
        console.log(player);
        if (player) {
            var toPlayer;
            if (player.currentRecord) {
                if (player.currentRecord.toPlayer)
                    toPlayer = await playerModel.find({ _id: player.currentRecord.toPlayer }).exec();
            }
            res.render('home', {
                player: player,
                toPlayer: toPlayer
            });
        }
        else {
            res.json({
                issuccess: true,
                data: '错误'
            })
        }
    } else {
        res.json({
            issuccess: false,
            data: '参数不非法'
        })

    }
    // res.render('home');
});

module.exports = router;
