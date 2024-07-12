const express=require('express');
const router= express.Router(); 
const MenuItem=require('./../models/menuItem.js');

router.post('/addMenu',async (req,res)=>{
    try{
        const data=req.body;
        const newMenu=MenuItem(data);
        const response=await newMenu.save();
        console.log("Menu added");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }  
})

router.get('/viewMenu',async (req,res)=>{
    try{
        const response=await MenuItem.find();
        console.log("Menu fetched");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }  
})

module.exports=router;