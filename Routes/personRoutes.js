//We have a lots of endpoints in a single file server.js
//Express Router is a way to modularize and organize our route handlinhg code in an Express.js application

const express=require('express');
const router= express.Router(); 
const Person=require('./../models/person.js');

//creating end point in which the client will send data to the server and data will be saved in the database.
router.post('/addPerson',async (req,res)=>{
    try{
        const data=req.body; //Assuming the request body contains the person data
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})
//Get method to get all the details 
router.get('/personDetails',async (req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})
//Parameterized URL
router.get('/personDetails/:workType',async (req, res) => {
   try{
        const workType = req.params.workType; //Extract the work type from the URL parameter
        if(workType == 'chef' ||workType == 'manager'||workType == 'waiter'){
            const response=await Person.find({work:workType});
            console.log("Response fetched for all",workType);
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
}) 

router.put('/updatePersonDetails/:id', async (req,res)=>{
    try{
        const personId=req.params.id; //Extract the id from the URL parameter
        const updatedPersonData=req.body; //Updated data for the person
        //console.log(updatedPersonData.salary)
        const response= await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true,//Return the updated document
            runValidators: true, //Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: "person not found"});
        }

        console.log("Data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.delete('/deletePersonData/:id',async  (req,res) => {
    try{
        const personId=req.params.id; //Extract the id from the URL parameter
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: "person not found"});
        }
        console.log("Person data deleted");
        res.status(200).json({msg:"Person data deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})



module.exports=router;