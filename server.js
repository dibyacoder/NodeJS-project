//--------------------------------------
//Normal function call in different ways
/*
var add=function(a,b){
    return a+b;
}

var add=(a,b)=>{return a+b}

var add=(a,b)=>a+b

var result=add(2,5)
console.log(result)
*/
//--------------------------------------------------
//Once the primary work is finished then the callback function is getting called.
//Function call within the function at the end of its execution.

/*function callback(){
    console.log("pintu is calling a callback function.")
}

const add=function(a,b,callback) {
    var result=a+b;
    console.log('result: '+ result );
    callback();
}

add(3,4,callback);
*/
/*
const add=function(a,b,callback) {
    var result=a+b;
    console.log('result: '+ result );
    callback();
}

add(2,3,function(){
    console.log("addition is completed");
})

add(2,3,()=>console.log("addition is completed"));
*/

// Learn about 'fs' & 'os' module
// It creates a file and writes the message inside
/*
var fs = require('fs');
var os = require('os');

//To know the functionalities present in fs and os
console.log(fs);
console.log(os);

var user=os.userInfo();
console.log(user);

fs.appendFile('greeeting.txt','Hello from pintu'+ user.username+'\n' ,()=>{
    console.log("file is created")
});
*/

//----------------------------------------
//Import files in Nodejs and exporting from the other file
//We used the file notes.js for importing and exporting details.
/*
const notes=require('./notes.js')
var age=notes.age
var result= notes.add(age,30);
console.log(age);
console.log(result);
*/

//-------------------------------
//Using loadash package from NPM.
//Used for , it helps in lots of operations used in arrays. Basically it has a lots of inbuilt functions
/*
var _=require('lodash');
var data=["Pintu","Ipsita",1,3,3,4,1,"name","Pintu"];
var filter=_.uniq(data);
console.log(filter);
console.log(_.isBoolean("Dibu"));
console.log(_.isBoolean(false));
*/

//Inter conversion JSONstring to object in Node.js 
/*
const jsonString='{"name":"Pintu","age":30}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.age);
*/
////Inter conversion Object to Jsonstring in Node.js
/* 
const jsonob={"name":"Pintu","age":30};
const jsonStringified=JSON.stringify(jsonob);
console.log(jsonStringified);
*/

// Creating a server in NodeJs via express package 
const express=require('express')
const app=express();
const db=require('./db.js');
require('dotenv').config();
console.log(db);

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //Pick the data coming from the frontend and stores it in the request body.We dont have to care about in which format we are getting datas from the frontend , it may be raw data or json data or form data.

const PORT=process.env.PORT || 3000;
const passport=require('./auth.js');




//Middleware Functions-----
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

//2 basic apis written under here.
app.get('/',localAuthMiddleware,function(req,res){
    res.send("Welcome to our Hotel")
})

app.get('/chicken',function(req,res){
    var customized={
        name:"Tandoor Chicken", 
        isSpicy:true,
        price:400
    }
    res.send(customized)
}) 

//Import the router files
const personRoutes=require('./Routes/personRoutes.js')
const menuRoutes=require('./Routes/menuRoutes.js')
//Use the routers
app.use('/',personRoutes);
app.use('/',localAuthMiddleware, menuRoutes);


 
app.listen(PORT,function(){
    console.log("server running on 3000")
})