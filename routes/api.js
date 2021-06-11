const router = require("express").Router();
const {Workout} = require('../models/index.js');
//still unsure what exactly is wrong with this one?
router.get('/workouts' , async (req,res)=>{
    console.log('***route hit***');
   try{ 
       Workout.findOne().sort({day: -1}).then(data =>{
        console.log("***last workout data***");   
        console.log(JSON.stringify(data));
         return JSON.stringify(data);
       })
   } catch (err){
       return console.error(err);
   }
});
//adding an exercise to a specific day's exercises array
router.put('/workouts/:id' , async (req , res) => {
    try{
        console.log('This is adding a workout???');
        Workout.create(req.body).then(data => {
            res.json(data);
        })
    } catch (err){
        return console.error(err);
    }
});
//creating a day plan workout with an exercise
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
