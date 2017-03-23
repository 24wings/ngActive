import mongoose = require('mongoose');
var recordWeekSchema = new mongoose.Schema({
    peoples: { type: [String], default: [] },
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record', default: [] }],
    creatDt: { type: Date, default: Date.now },
    finishDt: { type: Date },
    state: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
});

export interface IWeekRecord extends mongoose.Document {
    records: mongoose.Schema.Types.ObjectId[];

}


export var recordWeekModel = mongoose.model<IWeekRecord>('RecordWeek', recordWeekSchema);