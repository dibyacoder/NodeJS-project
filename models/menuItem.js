const mongoose = require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ["sweet","spicy","sour"],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingradients:{
        type: [String],
        default:[]
    },
    num_sales:{
        type: Number,
        default:0
    }
})

const MenuItem=new mongoose.model("MenuItem",menuSchema);
module.exports = MenuItem;