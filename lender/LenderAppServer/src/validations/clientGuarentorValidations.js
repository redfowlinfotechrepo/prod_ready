const { check:clientGuarentorCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientGuarentorcheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];