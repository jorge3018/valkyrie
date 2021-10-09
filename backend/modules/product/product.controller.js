(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();


    var ProductMiddleware = require('./product.module')().ProductMiddleware;

    /** 
    * @swagger 
    * /products: 
    *   post: 
    *     description: Create an Employee 
    *     parameters: 
    *     - in: formData
    *       name: name
    *       type: string
    *       description: A person's name.
    *     - in: formData
    *       name: fav_number
    *       type: number
    *       description: A person's favorite number.
    *     - in: formData
    *       name: fav_number2
    *       type: number
    *       description: A person's favorite number.
    *     - in: formData
    *       name: fav_number3
    *       type: number
    *       description: A person's favorite number.
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
*     description: Get all Employee 
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

    router.get('/:productId',
        ProductMiddleware.getProductById,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.put('/:productId',
        ProductMiddleware.modifyProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.delete('/:productId',
        ProductMiddleware.removeProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;

})();