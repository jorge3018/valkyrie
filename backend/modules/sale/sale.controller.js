(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();


    var SaleMiddleware = require('./sale.module')().SaleMiddleware;

    /** 
    * @swagger 
    * /sales: 
    *   post: 
    *     description: Create an sale.
    *     parameters: 
    *     - in: formData
    *       name: sale
    *       type: string
    *       description: A sale's name.
    *   - in: formData
    *       name: description
    *       type: String
    *       description: A sale's description.
    *   - in: formData
    *       name: client
    *       type: string
    *       description: A client's name.
    *   - in: formData
    *       name: seller
    *       type: string
    *       description: A seller's name.
    *   - in: formData
    *       name: value
    *       type: number
    *       description: A total sale value.
    *   - in: formData
    *       name: quantity
    *       type: number
    *       description: quantity sold.
    *   - in: formData
    *       name: unitValue
    *       type: number
    *       description: A sale's unitary price.
    *   - in: formData
    *       name: date
    *       type: date
    *       description: date of sale.
    *    - in: formData
    *       name: document
    *       type: number
    *       description: customer identity document.
    *     - in: formData
    *       name: statesale
    *       type: String
    *       description: A sale's state (delivered, canceled, in process).
    *     
    *   
    *   
    *     responses:  
    *       201: 
    *         description: Created  
    *   
    */
    router.post('/',
        SaleMiddleware.addSale,
        function (req, res) {
            res.status(201).json(req.response);
        });

    /** 
    * @swagger 
    * /sales: 
    *   get: 
    *     description: Get all sales 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.get('/',
        SaleMiddleware.getSales,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    /** 
    * @swagger 
    * /sales/saleId: 
    *   get: 
    *     description: Get sale by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */

    router.get('/:saleId',
        SaleMiddleware.getSaleById,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /** 
    * @swagger 
    * /sales/saleId: 
    *   put: 
    *     description: Modify sale by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.put('/:saleId',
        SaleMiddleware.modifySale,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /** 
    * @swagger 
    * /sales/saleId: 
    *   delete: 
    *     description: Delete sale by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.delete('/:saleId',
        SaleMiddleware.removeSale,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;

})();