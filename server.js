const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('hello')
})

app.get('/blog',(req,res)=>{
    res.send('blog')
})
// fetch data
app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({})
         res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
})
//get by id
app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
         res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
})
// create product
app.post('/products',async(req,res)=>{
  
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch (error) {
     console.log(error.message);
     res.status(500).json({message:error.message})
   }
})
//update
 app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
       // can't update product
        if(!product){
            return res.status(404).json({message:`cannot find product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
         res.status(200).json(updatedProduct);

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
 })
//delete data
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const  product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:`cannot find product with id ${id}`})

        }
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
        
    }
})
mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://suba:07072002@cluster0.7cjo7jl.mongodb.net/node-api')
.then(()=>{
    console.log("connected to mongodb")
    app.listen(3000,()=>{
        console.log("node api is running on 3000")
    });
   
}).catch((error)=>{
    console.log(error)
}
)
