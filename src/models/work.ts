import mongoose = require('mongoose');


var workSchema = new mongoose.Schema({
    // 作品名字
    name: { type: String },
    summary: { type: String },
    detail: { type: String },
    files: {
        type: [{
            url: String,
            rootPath: String,
            filename: String
        }], default: []
    },
    banner: {
        type: {
            url: String,
            rootPath: String,
            filename: String
        }
    },
    // 评星的数量
    star: { type: Number, default: 0 },
    // 评星的人
    lover: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    creatDt: { type: Date, default: Date.now }
});


/**
 * 数据实体层
 */
interface IWork extends mongoose.Document {
    name: String;
    summary: String;
    detail: String;
    files: [{ url: String, rootPath: String, filePath: String }];
    creatDt: Date;
}

var workModel = mongoose.model<IWork>('Work', workSchema);

export { workModel, IWork }