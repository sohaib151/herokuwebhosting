const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const registerS=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    }
});
registerS.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    console.log(this.password);
    this.cpassword=undefined;
    next()
    
});



const signup=new mongoose.model('sign',registerS);
module.exports=signup;