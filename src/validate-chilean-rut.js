/**
 * Chilean RUT Validator
 * 
 * A simple package to validate Chilean RUT (Rol Único Tributario) numbers.
 * 
 * @author Created by Claude
 * @license MIT
 */

/**
 * Cleans a RUT string by removing formatting characters
 * 
 * @param {string} rut - RUT string to clean
 * @returns {string} Cleaned RUT string
 */
function cleanRut(rut) {
  // Remove dots, dashes, spaces and convert to uppercase
  return rut.toString().replace(/[.-\s]/g, '').toUpperCase();
}

/**
 * Formats a RUT string to standard Chilean format (XX.XXX.XXX-X)
 * 
 * @param {string} rut - RUT string to format
 * @returns {string} Formatted RUT string
 */
function formatRut(rut) {
  const cleanedRut = cleanRut(rut);
  if (!isValidRut(cleanedRut)) {
    return null;
  }

  // Split verification digit from the rest
  const rutDigits = cleanedRut.slice(0, -1);
  const verificationDigit = cleanedRut.slice(-1);

  // Format the main digits with dots
  let formattedRut = '';
  let counter = 0;
  
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    formattedRut = rutDigits[i] + formattedRut;
    counter++;
    
    if (counter === 3 && i !== 0) {
      formattedRut = '.' + formattedRut;
      counter = 0;
    }
  }

  // Add the verification digit with hyphen
  return `${formattedRut}-${verificationDigit}`;
}

/**
 * Calculates the verification digit for a given RUT
 * 
 * @param {string|number} rutNumber - RUT number without verification digit
 * @returns {string} Calculated verification digit
 */
function calculateVerificationDigit(rutNumber) {
  const rutDigits = String(rutNumber).split('').reverse();
  const multipliers = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7];
  
  let sum = 0;
  for (let i = 0; i < rutDigits.length; i++) {
    sum += parseInt(rutDigits[i], 10) * multipliers[i];
  }
  
  const remainder = sum % 11;
  const verificationDigit = 11 - remainder;
  
  if (verificationDigit === 11) return '0';
  if (verificationDigit === 10) return 'K';
  return String(verificationDigit);
}

/**
 * Validates if a given string is a valid Chilean RUT
 * 
 * @param {string} rut - RUT string to validate
 * @returns {boolean} True if the RUT is valid, false otherwise
 */
function isValidRut(rut) {
  // Clean the input
  const cleanedRut = cleanRut(rut);
  
  // Check for minimum length (at least 2 characters: 1 digit + verification digit)
  if (cleanedRut.length < 2) return false;
  
  // Regular expression to validate RUT format after cleaning
  // Allowing only digits and potentially a 'K' at the end
  const rutRegex = /^(\d+)([K\d])$/;
  if (!rutRegex.test(cleanedRut)) return false;
  
  // Extract the number and verification digit
  const [, rutNumber, providedVerificationDigit] = cleanedRut.match(rutRegex);
  
  // Calculate the expected verification digit
  const calculatedVerificationDigit = calculateVerificationDigit(rutNumber);
  
  // Compare the calculated verification digit with the provided one
  return calculatedVerificationDigit === providedVerificationDigit;
}

/**
 * Returns detailed validation information for a RUT
 * 
 * @param {string} rut - RUT string to validate
 * @returns {Object} Validation information
 */
function validateRut(rut) {
  const cleanedRut = cleanRut(rut);
  const isValid = isValidRut(cleanedRut);
  
  // If invalid, return early
  if (!isValid) {
    return {
      isValid: false,
      formatted: null,
      raw: cleanedRut
    };
  }
  
  // If valid, extract and return additional information
  const rutRegex = /^(\d+)([K\d])$/;
  const [, rutNumber, verificationDigit] = cleanedRut.match(rutRegex);
  
  return {
    isValid: true,
    formatted: formatRut(cleanedRut),
    raw: cleanedRut,
    rutNumber,
    verificationDigit
  };
}

module.exports = {
  isValidRut,
  validateRut,
  formatRut,
  cleanRut,
  calculateVerificationDigit
};