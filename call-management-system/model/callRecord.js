const mongoose = require('mongoose');

const callRecordSchema = new mongoose.Schema({
  callerNumber: String,
  receiverNumber: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
});

const CallRecord = mongoose.model('CallRecord', callRecordSchema);

module.exports = CallRecord;
