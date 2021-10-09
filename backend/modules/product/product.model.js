const { Int32 } = require('bson');

(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var ProductSchema = new Schema({
        product: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stateProduct: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    });

    module.exports = mongoose.model('products', ProductSchema);
})();