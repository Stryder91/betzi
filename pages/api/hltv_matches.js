import HLTV from 'hltv'
import connectDB from './middleware/mongodb';
import Match from './model/match';

async function handler(req, res) {
  HLTV.getMatches().then(resfromApi => {
    const validData = resfromApi.filter(m => !m.title && m.date)
  
    validData.map(async (m) => {
      let t1 = { id: m.team1.id, name: m.team1.name }
      let t2 = { id: m.team2.id, name: m.team2.name }
      let newMatch = Match({
        id: m.id,
        date: m.date,
        team1: t1,
        team2: t2,
        played: false,
        format: m.format,
        live: m.live
      })
      await newMatch.save(function(err, data) {
        if(err) { console.log(err) }
        else { console.log("Data inserted", m.id)}
      });
    });
    console.log("Insertion done!");
  });
}

export default connectDB(handler);