/**
 * Chilean RUT Validator
 * A TypeScript package to validate Chilean RUT (Rol Único Tributario) numbers.
 */

export {
  isValidRut,
  validateRut,
  formatRut,
  cleanRut,
  calculateVerificationDigit,
  RutValidationResult
} from './src/validate-chilean-rut'
