const { check:clientVerificationIdCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientVerificationIdcheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];