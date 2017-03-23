import express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

  res.render('index', {
    /**
     * 标签组
     */
    tags: [{
      title: '个性签名',
      pageId: 'tag-sign',
      inputId: 'tag-sign-values',
      values: [],
      options: ['文艺青年', '普通青年', '有为青年', '2B青年',
        '学生', 'IT民工', '自由职业者', '上班族', '潜力股',
        '创业者', '技术宅', '小清新', '月光族', '乐活族']
    },
    {
      title: '我的兴趣爱好',
      pageId: 'tag-like',
      inputId: 'tag-like-values',
      values: [],
      options: ['K歌', '旅行', '果粉', '购物狂', '美食', '美食', '电影', '摄影', '游戏', '手机控', '读书', '动漫', '爱狗', '爱猫', '运动', '电视剧', '桌游']
    },
    {
      title: '我的个性',
      pageId: 'tag-special',
      inputId: 'tag-special-values',
      values: [],
      options: ['K歌', '旅行', '果粉', '购物狂', '美食', '美食', '电影', '摄影', '游戏', '手机控', '读书', '动漫', '爱狗', '爱猫', '运动', '电视剧', '桌游']
    },
    {
      title: '我现在的状态',
      pageId: 'tag-state',
      inputId: 'tag-state-values',
      values: [],
      options: ['起床困难户', '奋斗ing', '加班ing', '学习ing', '减肥ing', '寂寞ing', '缺爱ing', '成长ing']
    }



    ]
  });
});

module.exports = router;
