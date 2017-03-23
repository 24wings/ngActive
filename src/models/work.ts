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