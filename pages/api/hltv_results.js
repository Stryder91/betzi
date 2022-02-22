import HLTV from 'hltv'
import connectDB from './middleware/mongodb';
import Result from './model/result';

async function handler(req, res) {
  HLTV.getResults({eventIds : [6136]}).then(resfromApi => {
    // console.log("resfromApi", resfromApi);
    const validData = resfromApi.filter(m => !m.title && m.date)
    validData.map(async (m) => {
      let t1 = { logo: m.team1.logo, name: m.team1.name, id: 0 }
      let t2 = { logo: m.team2.logo, name: m.team2.name, id: 0 }
      let result = {team1: m.result.team1, team2 : m.result.team2}
      let newResult = Result({
        id: m.id,
        date: m.date,
        team1: t1,
        team2: t2,
        played: true,
        format: m.format,
        result: result
      });

      console.log("newResult", newResult);
      await newResult.save(function(err, data) {
        if(err) { console.log(err) }
        else { console.log("Data inserted", m.id)}
      });
    });
    console.log("Insertion done!");
  })
}

export default connectDB(handler);