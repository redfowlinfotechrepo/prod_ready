const { check:clientOtherExpensesCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
clientOtherExpensescheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];