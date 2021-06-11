const router = require("express").Router();
const {Workout} = require('../models/index.js');
//still unsure what exactly is wrong with this one?
//this IS working in terms of adding exercises, however
//I expected to see the workout on the screen.
router.get('/workouts' , async (req,res)=>{
    console.log('***route hit***');
   try{ 
       Workout.findOne().sort({day: -1}).then(data =>{
        console.log("***last workout data***");   
        console.log(JSON.stringify(data));
         res.json.data;
       })
   } catch (err){
       return console.error(err);
   }
});
//adding an exercise to a specific day's exercises array
//this runs when you click either complete OR add exercise...
//I personally feel like complete should delete or something
router.put('/workouts/:id' , async (req , res) => {
    try{
        Workout.updateOne(
            { _id: req.params.id }, 
            { $push: { exercises: req.body } },
            
        ).then(data =>{
            res.json(data);
        })
    } catch (err){
        return console.error(err);
    }
});
//creating a day plan workout with an empty exercise array
// This is working and runs on clicking new workout
router.post('/workouts', async (req, res) =>{
    console.log('***Adding a workout***');
    console.log(req.body);
  try{  Workout.create(req).then(data => {
        res.json(data);
        })
    } catch (err) {
        return console.error(err);
    }
});
//I assume this is working because the stats page is working.
router.get('/workouts/range' , (req , res) => {
    try{
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {$sum : '$exercises.duration'},
                    totalWeight: {$sum: '$exercises.weight'}
                }
            }
        ]).sort({day: -1}).limit(7).then(data => {
            res.json(data);
        })
    } catch (err) {
        return console.log(err);
    }
});


module.exports = router;
