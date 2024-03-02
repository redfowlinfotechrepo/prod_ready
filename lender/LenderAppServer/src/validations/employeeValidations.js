const { check:employeeCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
employeecheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];