const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    createDate: { type: Date, default: Date.now },
    infoMessage: { type: String, required: true },
    tagValue: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    file: { type: String },
    image: { type: String },
    fileName: { type: String },
    imageName: { type: String },
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
