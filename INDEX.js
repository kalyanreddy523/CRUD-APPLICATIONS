const express=require('express')
const app=express()
const bodyParser=require('body-parser')
var mongoose=require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/suraj");
//{useUnifiedTopology:true, useNewUrlParser:true}
var connection=mongoose.connection;
connection.once('open',function(){
    console.log("connection successful")
})
const newSchema=new mongoose.Schema({
    name:String,
    email:String
})
const User=new mongoose.model('users',newSchema)

app.use(bodyParser.urlencoded({extended:true}))
app.set('views','./views')
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('insert')
})
app.post('/insert',(req,res)=>{
    var user=new User({
        name:req.body.name,
        email:req.body.email
    })
    user.save().then(res.redirect('/show')).catch((err)=>console.log(err))
})
app.get('/show',async function(req,res){
    var result=await User.find()
    res.render('show',{users:result});
})
app.get('/delete/:id',async function(req,res){
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/show')
})
app.get('/edit/:id',async function(req,res){
    const result=await User.findById(req.params.id)
    res.render('edit',{users:result})
})
app.post('/update/:id',async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show')
})
app.listen(3000,()=>console.log("server started..."))