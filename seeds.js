const mongoose = require("mongoose")
const product = require('./models/product')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmApp');
    console.log("working finally mongo connection open")
}

const seedProduct = [
    {
        name:'fairy eggplant',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'organic goodness melon',
        price:4.99,
        category:'fruit'
    },
    {
        name:'organic mini seedless water melon',
        price:3.99,
        category:'fruit'
    },
    {
        name:'organic celery',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'chocolate whole milk',
        price:2.690,
        category:'dairy'
    },
]

product.insertMany(seedProduct)

// const p = new product({
//     name :'ruby grapefruit',
//     price:  1.99,
//     category:'fruit'

// })
// p.save()
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})