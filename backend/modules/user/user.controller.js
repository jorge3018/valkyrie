(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();


    var UserMiddleware = require('./user.module')().UserMiddleware;

    /** 
    * @swagger 
    * /users: 
    *   post: 
    *     description: Create an user 
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
        UserMiddleware.addUser,
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
        UserMiddleware.getUsers,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.get('/:userId',
       UserMiddleware.getUserById,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
        router.get('/email/:userEmail',
        UserMiddleware.getUserByEmail,
         function (req, res) {
             res.status(200).json(req.response);
         });

    router.put('/:userId',
        UserMiddleware.modifyUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.delete('/:userId',
        UserMiddleware.removeUser,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;

})();