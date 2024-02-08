const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    category: String,
    image: String,
    rating: Number,
    comments: [String]
});

const productModel = mongoose.model("productModel", productSchema)
module.exports=productModel;