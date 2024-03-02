const { check:transactionLogsCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
transactionLogscheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];