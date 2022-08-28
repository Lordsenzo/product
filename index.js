const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const product = require("./models/product");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/farmApp");
    console.log("working finally mongo connection open");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// getting things from forms
app.use(express.urlencoded({ extended: true }));

// app.get('/products', async(req, res)=>{
//     // filtering
//     const {category} = req.query
//     if(category){

//     }else{

//     }
//     const products = await product.find({})
//     res.render('products/index', {products})
// } )

app.get('/products', async (req, res)=>{
    const products = await product.find({})
    res.render('products/index', {products})
})

app.get('/products/new', async(req, res)=>{
    res.render('products/new')    
})
app.post('/products', async(req, res)=>{
    const newest = new product(req.body)
    await newest.save()
    // console.log(newest);
    res.redirect(`products/${newest._id}`)
})

// editing documents
app.get('/products/:id/edit', async(req, res)=>{
    const {id} = req.params
    const production = await product.findById(id)
    res.render('products/edit', {production})
})
// remember to use method override
app.put('/products/:id', async (req, res)=>{
    const {id} = req.params
    const producer = await product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
    res.redirect(`/products/${producer._id}`)
    console.log(req.body);
    console.log(put);
})

app.get('/products/:id', async (req, res)=>{
    const {id} = req.params
    const production = await product.findById(id)
    // console.log(production);

    res.render('products/show', {production})
    // res.send('details page')
})

app.delete("/products/:id", async (req, res)=>{
    const {id} = req.params
    const producer = await product.findByIdAndDelete(id)
    res.redirect('/products')
})





app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})