const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    key:{type:String,  default:''},
    date: {type: Date, default:Date.now},
    dateLastLogin: {type: Date, default:Date.now},
    authenticated: {type:Boolean, default:false},
    admin: {type:Boolean, default:false},
    fanfics:[{type:Types.ObjectId, ref:'Fanfic'}]
    
})

module.exports = model('User',schema)
