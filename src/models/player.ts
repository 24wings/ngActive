import mongoose = require('mongoose');

import { IRecord } from './record';
var playerSchema = new mongoose.Schema({
    currentRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
    records: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    name: { type: String },
    gender: { type: String, default: '男' },
    phone: { type: Number },
    tags: { type: { tagName: String, values: [String], options: [String] } },
    anwsers: { type: { question: String, value: String, fullLength: Number } },
    age: { type: Number },
    height: { type: Number },
    creatDt: { type: Date, default: Date.now },
    filterAge: {
        type: {
            label: String,
            value: String
        }
    },

    filterGender: {
        type: {
            label: String,
            value: String
        }
    },
    filterCity: {
        label: String,
        value: String
    }
});


/**
 * 数据实体层
 */
interface IPlayer extends mongoose.Document {
    currentRecord: IRecord;

}

var playerModel = mongoose.model<IPlayer>('Player', playerSchema);

export { playerModel, IPlayer }