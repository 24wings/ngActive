import express = require('express');
var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('signin');
    });


export { router as signinRouter };