const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.get('/',(req,res)=>{
    res.send('Hello,world');
})

app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log('Server Ok');
});