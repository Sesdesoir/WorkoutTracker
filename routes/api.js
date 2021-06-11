const router = require("express").Router();
const {Workout} = require('../models/index.js');

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

router.post('/workouts', async (req, res) =>{
    console.log('***Adding a workout***');
    console.log(req.body);
  try{  Workout.create(req).then(data => {
        res.json(data);
        })
    } catch (err) {
        return console.error(err);
    }
})


module.exports = router;
