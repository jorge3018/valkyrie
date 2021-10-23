const { Int32 } = require('bson');

(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;
     
    var SaleSchema = new Schema({
        sale: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        seller: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unitValue: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        document: {
            type: Number,
            required: true
        },
        stateSale: {
            type: String,
            required: true
        },
        
    });

    module.exports = mongoose.model('sales', SaleSchema);
})();