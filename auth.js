const passport = require('passport');
const localStrategy= require('passport-local').Strategy; //Username-Password strategy

const Person=require('./models/person.js');

passport.use(new localStrategy(async (userName,password,done) => {
    //Authentication logic here
    try{
        // console.log("Recieved creds:" , userName, password);
        const user=await Person.findOne({username:userName});
        if(!user){
            return done(null,false,{message:'Incorrect UserName'});
        }
        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'});
        }
    }catch(err){
        return done(err);
    }
}))

module.exports=passport;