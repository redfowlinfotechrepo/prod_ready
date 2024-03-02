const { check:roleDetailsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
roleDetailscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];