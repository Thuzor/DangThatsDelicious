const mongoose = require('mongoose');

//Use built in ES6 promise
mongoose.Promise = global.Promise;

//Make URL friendly slugs
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

storeSchema.pre('save', function (next) {
    if(!this.isModified('name')) {
        next(); //skip it
        return; //stop this function from running
    }

    this.slug = slug(this.name);
    next();
    // TODO make more resilient so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);