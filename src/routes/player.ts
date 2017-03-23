import express = require('express');
import { playerModel, recordModel, recordWeekModel } from '../models';
var router = express.Router();


/**
 * 注册用户
 */
router.get('/', async (req, res, next) => {
    var _id = req.query._id;
    if (_id) {
        var player = await playerModel.findOne({ _id }).populate('currentRecord').exec();
        await player.currentRecord.populate('playerId toPlayerId').execPopulate();

        res.json({
            issuccess: true,
            data: player
        });
    } else {
        res.json({
            issuccess: false,
            data: '参数不合法'
        });
    }

}).post('/', async (req, res, next) => {
    var data = req.body;

    var newPlayer = await new playerModel(req.body).save();
    var currentRecord = await new recordModel({ playerId: newPlayer._id }).save();
    await newPlayer.update({ currentRecord: currentRecord._id }).exec();

    res.json({
        issuccess: true,
        data: newPlayer
    });

});

router.route('/joinParty/:_id').get(async (req, res, next) => {
    var _id = req.params._id;
    var player = await playerModel.findById(_id).populate('currentRecord').exec();
    await player.currentRecord.update({ state: 1 }).exec();
    await recordWeekModel.findOne({ isActive: true }).update({
        $push: {
            records: player.currentRecord._id
        }
    }).exec();

    res.json({
        issuccess: true,
        data: '成功加入排队'
    });
});

/* GET home page. */
router.get('/isExisit', async function (req, res, next) {
    var phone = req.query.phone;
    var num = await playerModel.count({ phone }).exec();
    res.json({
        issuccess: true,
        data: num ? true : false
    });

});


module.exports = router;
