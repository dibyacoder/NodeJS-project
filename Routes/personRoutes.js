//We have a lots of endpoints in a single file server.js
//Express Router is a way to modularize and organize our route handlinhg code in an Express.js application

const express=require('express');
const router= express.Router(); 
const Person=require('./../models/person.js');
const {jwtAuthMiddleware,generateToken} =require('./../jwt.js')

//creating end point in which the client will send data to the server and data will be saved in the database.
router.post('/addPerson',async (req,res)=>{
    try{
        const data=req.body; //Assuming the request body contains the person data
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');

        const payload={
            id:response.id,
            email: user.email,
        }
        const token=generateToken(payload);
        //console.log(token);

        res.status(200).json({response:response,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

 // Login route
 router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;
        // Find the user by username
        const user = await Person.findOne({ username });
        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const payload = { id: user.id, email: user.email }
        // Generate JWT token
        const token = generateToken(payload);
        // Send token in response
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("userData: ", userData);
        // Extract user id from decoded token
        const userId = userData.id;
        console.log("User ID from token:", userId);
        // Find the user by id
        const user = await Person.findById(userId);
        // If user does not exist, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Send user profile as JSON response
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

   
//Get method to get all the details 
router.get('/personDetails',jwtAuthMiddleware,async (req,res)=>{
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