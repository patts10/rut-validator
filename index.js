/**
 * Chilean RUT Validator
 * A simple package to validate Chilean RUT (Rol Único Tributario) numbers.
 */

const {
  isValidRut,
  validateRut,
  formatRut,
  cleanRut,
  calculateVerificationDigit
} = require('./src/validate-chilean-rut.js');

module.exports = {
  isValidRut,
  validateRut,
  formatRut,
  cleanRut,
  calculateVerificationDigit
};