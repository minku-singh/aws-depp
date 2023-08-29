const express = require('express');
const mongoose = require('mongoose');
const callRecordsRouter = require('./routes/callRoute');

const app = express();
const PORT = 3000;
const MONGODB_URI = "mongodb+srv://minku:1234@cluster0.lh9fdus.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.get("/", (req, res) => {
    res.send("api running, use '/call-records' route for more");
})
app.use('/call-records', callRecordsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
