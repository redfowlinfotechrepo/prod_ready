const { check:clientPersonalDtlsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientPersonalDtlscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];