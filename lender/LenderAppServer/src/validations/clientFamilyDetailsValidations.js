const { check:clientFamilyDetailsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientFamilyDetailscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];