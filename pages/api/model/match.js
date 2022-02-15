const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
*/

const matchSchema = new Schema({
  id:  Number,
  date: Date,
  team1: { name: String, id: Number },
  team2: { name: String, id: Number },
  format:   String,
  played: Boolean,
  live: Boolean
});

// To avoid
// OverwriteModelError: Cannot overwrite `Match` model once compiled.
mongoose.models = {};

const Match = mongoose.model('Match', matchSchema)

// module.exports = mongoose.models.Match || mongoose.model('Match', customerSchema);
export default Match;
