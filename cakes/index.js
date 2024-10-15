const mongoose = require('mongoose');
const { descriptors } = require('./cakeHelpers');
const Product = require('../models/product');

// Price list for each flavour
const prices = [2500, 2500, 2500, 2600, 2500, 2700, 3000, 2500, 3000, 3000, 3000, 2500, 2600, 2600, 2700, 2500, 2700, 3000];

async function main() {
    await mongoose.connect('mongodb+srv://Gloh:ApMR0QQvueqgigKW@cluster0.vay9paa.mongodb.net/LoloCakes?retryWrites=true&w=majority');
    console.log('Database connected!')
}
main().catch(err => console.log(err));


const cakeDB = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < descriptors.length; i++) {
        const prod = new Product({
            name: descriptors[i],
            price: prices[i],  //Add prices here
            image: '/images/cake2.jpg',
            description: 'Made with love!!'
        })
        await prod.save();
    }
}
cakeDB().then(() => {
    mongoose.connection.close();
});