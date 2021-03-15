const {Schema,model} = require('mongoose')

const schema = new Schema({
    tags:{type:Array}
})
module.exports = model('Tags',schema)