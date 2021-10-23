(function () {
    'use strict';

    module.exports = {
        addSale: addSale,
        getSales: getSales,
        getSaleById: getSaleById,
        modifySale: modifySale,
        removeSale: removeSale
    };

    var SaleService = require('./sale.module')().SaleService;
    const { BadRequest } = require('../util/errors');


    function addSale(req, res, next) {
        const {sale, description, client, seller, value, quantity, unitValue, date, document, 
            stateSale} = req.body;
        try{
            if (!sale || !client || !seller || ! value || !quantity || !date || !document || !stateSale ) {
                throw new BadRequest('Los campos: venta, cliente, vendedor, valor total,'+
                'cantidad, fecha, documento y estado, son obligatorios');
            }
            SaleService.createSale(req.body)
            .then(success)
            .catch(failure);

            function success(data) {
                req.response = data;
                next();
            }
        
            function failure(error) {
                next(error);
            }
        }catch(err){
            next(err)
        }

        

    }

    function getSales(req, res, next) {

        SaleService.fetchSales()
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function getSaleById(req, res, next) {

        SaleService.fetchSaleById(req.params.saleId)
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function modifySale(req, res, next) {
        SaleService.updateSale(req.params.saleId, req.body)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }
    }

    function removeSale(req, res, next) {

        SaleService.deleteSale(req.params.saleId)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }

    }

})();
