"use strict";
/**
 * Chilean RUT Validator
 * A TypeScript package to validate Chilean RUT (Rol Único Tributario) numbers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVerificationDigit = exports.cleanRut = exports.formatRut = exports.validateRut = exports.isValidRut = void 0;
var validate_chilean_rut_1 = require("./src/validate-chilean-rut");
Object.defineProperty(exports, "isValidRut", { enumerable: true, get: function () { return validate_chilean_rut_1.isValidRut; } });
Object.defineProperty(exports, "validateRut", { enumerable: true, get: function () { return validate_chilean_rut_1.validateRut; } });
Object.defineProperty(exports, "formatRut", { enumerable: true, get: function () { return validate_chilean_rut_1.formatRut; } });
Object.defineProperty(exports, "cleanRut", { enumerable: true, get: function () { return validate_chilean_rut_1.cleanRut; } });
Object.defineProperty(exports, "calculateVerificationDigit", { enumerable: true, get: function () { return validate_chilean_rut_1.calculateVerificationDigit; } });
