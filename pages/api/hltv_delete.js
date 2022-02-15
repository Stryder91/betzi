import connectDB from './middleware/mongodb';
import Match from './model/match';

async function handler(req, res) {

  // Check if there is something to delete
  await Match.deleteMany(function(err) {
    if(err) { console.log(err) }
    else { console.log("Deletion...")}
  });
  console.log("Deletion done!");
}

export default connectDB(handler);