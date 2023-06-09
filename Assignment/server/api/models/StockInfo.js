const mongoose = require('mongoose');
const InfoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type : String,required : true,unique : true},
    last : {type : Number,required : true},
    buy : {type : Number,required : true},
    sell : {type : Number,required : true},
    volume : {type : Number,required : true},
    base_unit : {type : String,required : true}
})

module.exports = mongoose.model('Stock',InfoSchema);
