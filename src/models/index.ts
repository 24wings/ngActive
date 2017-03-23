import mongoose = require('mongoose');
mongoose.connect('mongodb://120.77.169.182/test');

export { userModel, IUser } from './user';
export { workModel, IWork } from './work';