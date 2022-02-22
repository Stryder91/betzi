import connectDB from './middleware/mongodb';
import Result from './model/result';

async function handler(req, res) {
  try {
    const allRes = await Result.find();
    res.status(200).json(allRes);
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

export default connectDB(handler)