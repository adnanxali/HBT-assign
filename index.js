const express = require('express');
const app = express();
const mongoose= require('mongoose');

mongoose.connect("mongodb+srv://adnanali11875:hello@cluster0.hkjnkqu.mongodb.net/toyStoredb");

const toyRoutes=require('./routes/toyRoutes');
app.use(express.json());
app.use('/toystore',toyRoutes);




app.listen(3000,()=>{
    console.log("Listening");
})