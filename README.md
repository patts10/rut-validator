# validate-chilean-rut

A lightweight JavaScript package for validating and formatting Chilean RUT (Rol Único Tributario) numbers.

## Installation

```
npm install validate-chilean-rut
```

## Usage

```javascript
const { isValidRut, validateRut, formatRut } = require('validate-chilean-rut');

// Basic validation
console.log(isValidRut('12.345.678-5')); // true or false

// Detailed validation
const validation = validateRut('12.345.678-5');
console.log(validation);
/*
{
  isValid: true,
  formatted: '12.345.678-5',
  raw: '123456785',
  rutNumber: '12345678',
  verificationDigit: '5'
}
*/

// Formatting
console.log(formatRut('123456785')); // '12.345.678-5'
```

## API

### isValidRut(rut)

Validates if a given string is a valid Chilean RUT.

- **Parameters**: `rut` (string) - The RUT to validate
- **Returns**: `boolean` - True if the RUT is valid, false otherwise

### validateRut(rut)

Returns detailed validation information for a RUT.

- **Parameters**: `rut` (string) - The RUT to validate
- **Returns**: `Object` with the following properties:
  - `isValid` (boolean): Whether the RUT is valid
  - `formatted` (string|null): The formatted RUT (if valid)
  - `raw` (string): The cleaned RUT without formatting
  - `rutNumber` (string): The RUT number without verification digit (if valid)
  - `verificationDigit` (string): The verification digit (if valid)

### formatRut(rut)

Formats a RUT string to standard Chilean format (XX.XXX.XXX-X).

- **Parameters**: `rut` (string) - The RUT to format
- **Returns**: `string|null` - The formatted RUT if valid, or null if invalid

### cleanRut(rut)

Cleans a RUT string by removing formatting characters.

- **Parameters**: `rut` (string) - The RUT to clean
- **Returns**: `string` - The cleaned RUT string

### calculateVerificationDigit(rutNumber)

Calculates the verification digit for a given RUT number.

- **Parameters**: `rutNumber` (string|number) - RUT number without verification digit
- **Returns**: `string` - The calculated verification digit

## Understanding Chilean RUT

The Chilean RUT (Rol Único Tributario) is the national tax ID number in Chile. It consists of:

1. A sequence of digits (typically 7-8 digits)
2. A verification digit (0-9 or 'K')

The verification digit is calculated using Module 11 algorithm as follows:
- Reverse the digits of the RUT number
- Multiply each digit by the corresponding position in the sequence: 2,3,4,5,6,7,2,3,4,5,6,7,...
- Sum all the products
- Calculate 11 minus the remainder of the sum divided by 11
- If the result is 11, the verification digit is '0'
- If the result is 10, the verification digit is 'K'
- Otherwise, the verification digit is the result as a string

## License

MIT