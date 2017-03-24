import express = require('express');
import { workModel, IWork } from '../models';
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  var works = await workModel.find().exec();
  res.render('index', { works });
});

export { router as indexRouter };
