const express=require('express')
const app=express()
app.get('/api/:name',(req,res)=>{
    res.send("hello"+"=>"+req.params.name)
})
app.listen(3000,()=>console.log("server started..."))