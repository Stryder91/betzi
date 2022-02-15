const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("connecté à Mongoose")
});


