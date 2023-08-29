const express = require('express');
const router = express.Router();
const CallRecord = require('../model/callRecord');

router.get('/', async (req, res) => {
  try {
    const callRecords = await CallRecord.find();
    res.json(callRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', getCallRecord, (req, res) => {
  res.json(res.callRecord);
});


router.post('/', async (req, res) => {
  const callRecord = new CallRecord({
    callerNumber: req.body.callerNumber,
    receiverNumber: req.body.receiverNumber,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    duration: req.body.duration,
  });

  try {
    const newCallRecord = await callRecord.save();
    res.status(201).json(newCallRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', getCallRecord, async (req, res) => {
  if (req.body.endTime) res.callRecord.endTime = req.body.endTime;
  if (req.body.duration) res.callRecord.duration = req.body.duration;

  try {
    const updatedCallRecord = await res.callRecord.save();
    res.json(updatedCallRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', getCallRecord, async (req, res) => {
  try {
    await res.callRecord.remove();
    res.json({ message: 'Call record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCallRecord(req, res, next) {
  try {
    const callRecord = await CallRecord.findById(req.params.id);
    if (!callRecord) {
      return res.status(404).json({ message: 'Call record not found' });
    }
    res.callRecord = callRecord;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
