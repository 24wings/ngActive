import mongoose = require('mongoose');
mongoose.connect('mongodb://120.77.169.182/test');

export { playerModel, IPlayer } from './player';
export { recordModel, IRecord } from './record';
export { recordWeekModel, IWeekRecord } from './recordWeek';