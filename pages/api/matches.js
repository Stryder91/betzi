import connectDB from './middleware/mongodb';
import Match from './model/match';


// const createMatch = async data => {
//  const match = await Match.create(data)
//  return match
// }

async function handler(req, res) {
  try {
    const allMatches = await Match.find();
    res.status(200).json(allMatches);
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

export default connectDB(handler)