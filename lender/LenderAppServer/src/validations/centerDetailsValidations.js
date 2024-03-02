const { check:centerDetailsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
centerDetailscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];