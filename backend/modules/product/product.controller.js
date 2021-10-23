(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();


    var ProductMiddleware = require('./product.module')().ProductMiddleware;

    /** 
    * @swagger 
    * /products: 
    *   post: 
    *     description: Create an product.
    *     parameters: 
    *     - in: formData
    *       name: product
    *       type: string
    *       description: A product's name.
    *     - in: formData
    *       name: description
    *       type: String
    *       description: A product's description.
    *     - in: formData
    *       name: stateProduct
    *       type: Boolean
    *       description: A product's state (available and unavailable).
    *     - in: formData
    *       name: price
    *       type: number
    *       description: A product's unitary price.
    *     responses:  
    *       201: 
    *         description: Created  
    *   
    */
    router.post('/',
        ProductMiddleware.addProduct,
        function (req, res) {
            res.status(201).json(req.response);
        });

    /** 
    * @swagger 
    * /products: 
    *   get: 
    *     description: Get all products 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.get('/',
        ProductMiddleware.getProducts,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    /** 
    * @swagger 
    * /products/productId: 
    *   get: 
    *     description: Get product by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */

    router.get('/:productId',
        ProductMiddleware.getProductById,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /** 
    * @swagger 
    * /products/productId: 
    *   put: 
    *     description: Modify product by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.put('/:productId',
        ProductMiddleware.modifyProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /** 
    * @swagger 
    * /products/productId: 
    *   delete: 
    *     description: Delete product by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.delete('/:productId',
        ProductMiddleware.removeProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;

})();