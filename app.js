const express=require('express');
const app=express();
const bcrypt=require('bcryptjs');
const port=process.env.PORT||4000;

const contactus=require('./db/contactmodel');
require('./db/conn');
const signup=require('./db/registermodel');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// static files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use('/js',express.static(__dirname + 'public/js'));

app.set('views','./views');
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/signup',async(req,res)=>{
    try {
        const password=req.body.pass;
        const cpassword=req.body.cpass;
        if(password==cpassword){
        const register=new signup({
            username:req.body.username,
            email:req.body.email,
            password:req.body.pass,
            cpassword:req.body.cpass,
        })
        const result=await register.save();
        res.status(202).render('portt')
    }else{res.send('pass not matching')}
    }
    catch (error) {
        res.status(404).send(error)
    }
});

app.post('/login',async(req,res)=>{
    try {
        const username=req.body.username;
        const password=req.body.pass;
        const loginDetail=await signup.findOne({username:username});
        const ismatch=await bcrypt.compare(password,loginDetail.password)
        if(ismatch){
            res.status(202).render('portt')
        }else{res.send(' pass n m')}
        
    } catch (error) {
        res.status(404).send(error+ 'invalid');
    }
});

app.post('/contact',async(req,res)=>{
    try {
        const contactDEtail=new contactus({
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            msg:req.body.msg,
        });
        const result=await contactDEtail.save();
        res.status(202).render('portt');
    } catch (error) {
        res.status.send(error)
    }
})

app.listen(port,()=>{console.log(`listening at the port ${port}`);})