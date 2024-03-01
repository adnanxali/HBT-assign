const express = require('express');
const mongoose = require('mongoose');
const Toy= require('../Schema/toySchema');
const z= require('zod');
const {valSchema,updateValSchema}=require('../Schema/validationSchema');
const key="1CJpes_vNc49_biclC4idW6no_gWCR0rUbvBrKiExZk";
async function createToy(req,res,next){
    const name=req.body.name;
    const response= valSchema.safeParse(req.body);
    if(!response.success){
        res.status(403).json({
            msg:"Something Wrong with inputs"
        })
    }
    const exist=await Toy.findOne({name:name});
    if(!exist){
        const imgRes= await fetch(`https://api.unsplash.com/photos/random/?client_id=${key}`);
        const {urls}= await imgRes.json();
        const imgurl=urls.full;
        const toy= new Toy(req.body);
        toy.image=imgurl;
        await toy.save();
        res.json({
            msg:"Toy added !"
        })
    }
    else{
        res.status(406).json({
            msg:"Toy Exist already"
        })
    }
}

async function displayToys(req,res,next){
    
    const alltoys=await Toy.find({},"name description price image").exec(0);
    if(!alltoys){
        res.status(404).json({
            msg:"No toys in store"
        })
    }
    else{
        res.json(alltoys);
    }
}
async function displayNamedToys(req,res,next){
    const toys=await Toy.find({name:req.body.name},"name description price").exec();
    if(toys.length===0){
        res.status(404).json({
            msg:"Not available"
        })
    }
    else{
        res.json(toys);
    }
}
async function findToy(req,res,next){
    const toy= await Toy.findById(req.params.id).exec();
    if(!toy){
        res.status(404).json({
            msg:"Not available"
        })
    }
    else{
        res.json(toy);
    }
}
async function updateToy(req,res,next){
    const updateval=req.body;
    const exist=await Toy.findOne(updateval);
    if(exist){
        res.status(403).json({
            msg:"Already present identity"
        })
        return;
    }
    const response=updateValSchema.safeParse(updateval);
    if(!response.success){
        res.status(403).json({
            msg:"Invalid input for updatation"
        })
    }
    else{
        try{
            await Toy.findByIdAndUpdate(req.params.id,updateval).exec();
            res.json({
                msg:"Toy Updated !"
            })
        }catch(e){
            res.status(404).json({
                msg:"Something went wrong"
            })
        }
    }
}

async function deleteToy(req,res,next){
    const id=req.params.id;
    try{
        const deletedToy= await Toy.findByIdAndDelete(id);
        if(!deletedToy){
            res.status(404).json({
                msg:"Toy not found"
            })
        }else{
            res.json({
                msg:"Toy deleted"
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}





module.exports={createToy,displayToys,displayNamedToys,findToy,updateToy,deleteToy}