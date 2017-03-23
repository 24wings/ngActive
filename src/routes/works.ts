import * as express from 'express';
import { userModel, IUser, workModel, IWork } from '../models';
import fs = require('fs');
import path = require('path');
import multer = require('multer');
var router = express.Router();
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(req.session.);
            var randomNum = Math.floor(Math.random() * 1000000000);
            fs.mkdirSync(path.join(__dirname, '../../public/uploads/' + randomNum))

            cb(null, `public/uploads/${randomNum}/`)
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

router.route('/')
    .get(async (req, res, next) => {



        res.render('works')
    })
    .post(async (req, res, next) => {
    });

router.route('/:_id')
    .get(async (req, res, next) => {
        var user = await userModel.findOne({ _id: req.params._id }).populate('works').exec();
        var works = await workModel.find().exec();
        console.log(works);
        console.log(user);
        // res.render('works', user);
        res.json(user)
    });
router.route('/addWork/:_id')
    .get(async (req, res, next) => {
        var user = await userModel.findById(req.params._id).exec();

        if (user) {
            res.render('add-work', {
                user: user
            });
        } else {
            res.redirect('/')
        }
    }).post(upload.any(), async (req, res, next) => {
        var user = await userModel.findById(req.params._id).exec();
        var { name, summary, detail } = req.body;
        var files: Express.Multer.File[] = req.files as any;
        // 后面要过滤一下上传的缩略图
        var uploadFiles = files.map(file => {
            return {
                url: file.destination.slice(6) + file.filename,
                rootPath: file.destination,
                filename: file.filename
            }
        })
        var work = await new workModel({ name, summary, detail, files: uploadFiles }).save();
        var result = await userModel.findByIdAndUpdate(user._id, {
            $push: {
                works: work._id
            }
        },
            { upsert: true, new: true },
        ).exec();
        res.json({
            issuccess: true,
            data: work
        });
    });

export { router as worksRouter };

