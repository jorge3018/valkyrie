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
    *       name: user
    *       type: string
    *       description: A person's name.
    *     - in: formData
    *       name: email
    *       type: string
    *       description: A person's email address.
    *     - in: formData
    *       name: stateUser
    *       type: String
    *       description: A person's state (Authorized, unauthorized and pending).
    *     - in: formData
    *       name:  rol
    *       type: String
    *       description: A person's rol (administrator and seller).
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
    * /users: 
    *   get: 
    *     description: Get all users 
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

     /** 
    * @swagger 
    * /users/userId: 
    *   get: 
    *     description: Get user by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.get('/:userId',
       UserMiddleware.getUserById,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    /** 
    * @swagger 
    * /users/email/userEmail: 
    *   get: 
    *     description: Get user by email 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */   
        router.get('/email/:userEmail',
        UserMiddleware.getUserByEmail,
         function (req, res) {
             res.status(200).json(req.response);
         });

    /** 
    * @swagger 
    * /users/userId: 
    *   put: 
    *     description: Modify user by Id
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */

    router.put('/:userId',
        UserMiddleware.modifyUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /** 
    * @swagger 
    * /users/userId: 
    *   delete: 
    *     description: Delete user by Id 
    *     responses:  
    *       200: 
    *         description: Success  
    *   
    */
    router.delete('/:userId',
        UserMiddleware.removeUser,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;

})();