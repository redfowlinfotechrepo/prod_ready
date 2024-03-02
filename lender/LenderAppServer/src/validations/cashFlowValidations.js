const { check:cashFlowCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
cashFlowcheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];