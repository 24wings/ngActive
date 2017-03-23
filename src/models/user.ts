import mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    password: { type: String },
    school: { type: String },
    specil: { type: String },
    grader: { type: String },
    creatDt: { type: Date, default: Date.now },
    works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', default: [] }]
});


/**
 * 数据实体层
 */
interface IUser extends mongoose.Document {
    name: String;
    phone: String;
    password: String;
    school: String;
    specil: String;
    grader: String;
    works: mongoose.Schema.Types.ObjectId[];
}

var userModel = mongoose.model<IUser>('User', userSchema);

export { userModel, IUser }