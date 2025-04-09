/**
 * Chilean RUT Validator
 *
 * A simple package to validate Chilean RUT (Rol Único Tributario) numbers.
 *
 * @author Created by Claude
 * @license MIT
 */

/**
 * Safely converts input to string and cleans a RUT by removing formatting characters
 *
 * @param {*} rut - RUT input to clean
 * @returns {string} Cleaned RUT string
 */
function cleanRut(rut) {
  // Handle null or undefined
  if (rut === null || rut === undefined) {
    return ''
  }

  // Safe conversion to string
  let rutString
  try {
    rutString = String(rut)
  } catch (e) {
    return ''
  }

  // Remove dots, dashes, spaces and convert to uppercase
  return rutString.replace(/[.-\s]/g, '').toUpperCase()
}

/**
 * Formats a RUT string to standard Chilean format (XX.XXX.XXX-X)
 *
 * @param {*} rut - RUT to format
 * @returns {string|null} Formatted RUT string or null if invalid
 */
function formatRut(rut) {
  const cleanedRut = cleanRut(rut)
  if (!isValidRut(cleanedRut)) {
    return null
  }

  // Protect against empty strings after cleaning
  if (!cleanedRut) {
    return null
  }

  // Split verification digit from the rest
  const rutDigits = cleanedRut.slice(0, -1)
  const verificationDigit = cleanedRut.slice(-1)

  // Format the main digits with dots
  let formattedRut = ''
  let counter = 0

  for (let i = rutDigits.length - 1; i >= 0; i--) {
    formattedRut = rutDigits[i] + formattedRut
    counter++

    if (counter === 3 && i !== 0) {
      formattedRut = '.' + formattedRut
      counter = 0
    }
  }

  // Add the verification digit with hyphen
  return `${formattedRut}-${verificationDigit}`
}

/**
 * Calculates the verification digit for a given RUT
 *
 * @param {string|number} rutNumber - RUT number without verification digit
 * @returns {string} Calculated verification digit
 */
function calculateVerificationDigit(rutNumber) {
  // Convert to string safely
  const rutString = String(rutNumber)

  // Validate input is numeric
  if (!/^\d+$/.test(rutString)) {
    return ''
  }

  // Limit input length to prevent performance issues
  // Chilean RUTs are typically less than 10 digits
  if (rutString.length > 20) {
    return ''
  }

  const rutDigits = rutString.split('').reverse()
  const multipliers = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7]

  let sum = 0
  for (let i = 0; i < rutDigits.length; i++) {
    // Use modulo to cycle through multipliers for very long inputs
    sum += parseInt(rutDigits[i], 10) * multipliers[i % multipliers.length]
  }

  const remainder = sum % 11
  const verificationDigit = 11 - remainder

  if (verificationDigit === 11) return '0'
  if (verificationDigit === 10) return 'K'
  return String(verificationDigit)
}

/**
 * Validates if a given string is a valid Chilean RUT
 *
 * @param {*} rut - RUT to validate
 * @returns {boolean} True if the RUT is valid, false otherwise
 */
function isValidRut(rut) {
  try {
    // Clean the input
    const cleanedRut = cleanRut(rut)

    // Check for minimum length (at least 2 characters: 1 digit + verification digit)
    if (cleanedRut.length < 2) return false

    // Limit maximum length to prevent potential DoS
    // Chilean RUTs are typically less than 10 characters including verification digit
    if (cleanedRut.length > 20) return false

    // Regular expression to validate RUT format after cleaning
    // Allowing only digits and potentially a 'K' at the end
    const rutRegex = /^(\d+)([K\d])$/
    if (!rutRegex.test(cleanedRut)) return false

    // Extract the number and verification digit
    const match = cleanedRut.match(rutRegex)
    if (!match || match.length !== 3) return false

    const rutNumber = match[1]
    const providedVerificationDigit = match[2]

    // Validate RUT number is not too long
    if (rutNumber.length > 20) return false

    // Calculate the expected verification digit
    const calculatedVerificationDigit = calculateVerificationDigit(rutNumber)

    // If calculation failed or returned empty, the RUT is invalid
    if (!calculatedVerificationDigit) return false

    // Compare the calculated verification digit with the provided one
    return calculatedVerificationDigit === providedVerificationDigit
  } catch (e) {
    // Any exception means the RUT is invalid
    return false
  }
}

/**
 * Returns detailed validation information for a RUT
 *
 * @param {*} rut - RUT to validate
 * @returns {Object} Validation information
 */
function validateRut(rut) {
  try {
    const cleanedRut = cleanRut(rut)
    const isValid = isValidRut(cleanedRut)

    // If invalid, return early
    if (!isValid) {
      return {
        isValid: false,
        formatted: null,
        raw: cleanedRut
      }
    }

    // If valid, extract and return additional information
    const rutRegex = /^(\d+)([K\d])$/
    const match = cleanedRut.match(rutRegex)

    if (!match || match.length !== 3) {
      return {
        isValid: false,
        formatted: null,
        raw: cleanedRut
      }
    }

    const rutNumber = match[1]
    const verificationDigit = match[2]

    return {
      isValid: true,
      formatted: formatRut(cleanedRut),
      raw: cleanedRut,
      rutNumber,
      verificationDigit
    }
  } catch (e) {
    return {
      isValid: false,
      formatted: null,
      raw: String(rut)
    }
  }
}

module.exports = {
  isValidRut,
  validateRut,
  formatRut,
  cleanRut,
  calculateVerificationDigit
}
