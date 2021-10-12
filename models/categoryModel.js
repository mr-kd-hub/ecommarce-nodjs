const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    title:{
        required:true,
        trim:true,
        type: String,
        unique:true
    },
    
    status:{
        type:Boolean,
        default: true
    }
},{timestamps:true})
module.exports=mongoose.model('category',categorySchema)