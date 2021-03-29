const mongoose=require('mongoose');
const contactShema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        required:true,
        unique:true,
    }
});

const contactus=new mongoose.model('contact',contactShema);
module.exports=contactus;