import express = require('express');
import { workModel, IWork } from '../models';
var router = express.Router();

/* GET home page. */
router.get('/isLogin', async function (req, res, next) {
    var isLogin = res.locals.user ? true : false;
    res.json({
        issuccess: res.locals.user ? true : false,
        data: isLogin
    });
});

export { router as userRouter };
