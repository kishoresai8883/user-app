const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// register user

router.post("/register",async(req,res)=>{
    const {name,email,age,mobile,work,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        return res.status(422).json("Please fill the data");
    }
    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            return res.status(422).json("This User is already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            return res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        return res.status(422).json(error);
    }
})

// get user

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(200).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(200).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

router.put("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user

router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(200).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
