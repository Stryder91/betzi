const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  id:  Number,
  date: Date,
  team1: { name: String, logo: String, id: Number },
  team2: { name: String, logo: String, id: Number },
  format: String,
  played: Boolean,
  result: { team1: Number, team2: Number}
});

// To avoid
// OverwriteModelError: Cannot overwrite `Result` model once compiled.
mongoose.models = {};

const Result = mongoose.model('Result', resultSchema)

export default Result;
