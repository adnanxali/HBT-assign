const express = require('express');
const router= express.Router();
const toyController=require('../ToyController/ToyController');

router.post('/create',toyController.createToy);
router.get('/',toyController.displayToys);
router.get("/search",toyController.displayNamedToys);
router.get('/search/:id',toyController.findToy);
router.put('/update/:id', toyController.updateToy);
router.delete('/delete/:id',toyController.deleteToy);
module.exports=router;