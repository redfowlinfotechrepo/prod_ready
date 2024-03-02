const { check:clientBankDetailsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientBankDetailscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];