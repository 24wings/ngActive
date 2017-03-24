import * as express from 'express';
import { userModel, IUser, workModel, IWork } from '../models';
import fs = require('fs');
import path = require('path');
import multer = require('multer');
var router = express.Router();





var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var randomNum = req.session['randomNum'];
            var newDir = path.join(__dirname, '../../public/uploads/' + randomNum);
            fs.existsSync(newDir) ? '' : fs.mkdirSync(newDir);
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

        // var works = await workModel.find().exec();

        // res.render('works', { works });
    })
    .post(async (req, res, next) => {
    });

router.route('/:_id')
    .get(async (req, res, next) => {
        var user = await userModel.findOne({ _id: req.params._id }).populate('works').exec();
        var works = await workModel.find().exec();
        console.log(works);
        console.log(user);
        res.render('works', {
            works: user.works
        });
        // res.json(user)
    })
    //  参数_id 是指定删除的作品id,
    .delete(async (req, res, next) => {
        var _id = req.params._id;
        var result = await workModel.findOneAndRemove({ _id }).exec();
        res.json({
            issuccess: true,
            data: result
        });

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
    }).post((req, res, next) => {
        //随机文件夹
        req.session['randomNum'] = Math.floor(Math.random() * 1000000000);
        next();
    }, upload.any(), async (req, res, next) => {
        var user = await userModel.findById(req.params._id).exec();
        var { name, summary, detail } = req.body;
        var files: Express.Multer.File[] = req.files as any;
        // 后面要过滤一下上传的缩略图
        var uploadFiles = files.filter(file => file.fieldname == 'files').map(file => {
            return {
                url: file.destination.slice(6) + file.filename,
                rootPath: file.destination,
                filename: file.filename
            }
        });
        var bannerFile = files.filter(file => file.fieldname == 'banner').map(file => {
            return {
                url: file.destination.slice(6) + file.filename,
                rootPath: file.destination,
                filename: file.filename
            }
        });

        var work = await new workModel({ name, summary, detail, files: uploadFiles, banner: bannerFile[0] }).save();
        var result = await userModel.findByIdAndUpdate(user._id, {
            $push: {
                works: work._id
            }
        },
            { upsert: true, new: true },
        ).exec();
        res.json({
            issuccess: true,
            data: {
                work, url: bannerFile[0].rootPath.substring(6) + 'index.html'
            }
        });
    });

router.route('/star')
    // 加星星
    .post(async (req, res, next) => {
        var user: IUser = res.locals.user;
        var workId = req.body._id;
        if (user) {
            var count = await workModel.findById(workId).where('lover').in([user._id]).count().exec();
            // 已经评星
            if (count) {
                res.json({
                    issuccess: false,
                    data: '您已经为这个做评星过了'
                })
            } else {

                // 先判断是否有改用户
                var result = await workModel.findOneAndUpdate({ _id: workId }, {
                    $addToSet: {
                        lover: user._id
                    }
                }).exec();
                res.json({
                    issuccess: true,
                    data: { result, count }
                });


            }

        } else {
            res.json({
                issuccess: false,
                data: '错误'
            })
        }
    })

export { router as worksRouter };

