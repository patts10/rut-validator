# Chilean RUT Validator

A TypeScript package for validating and formatting Chilean RUT (Rol Único Tributario) numbers.

## Installation

```bash
npm install cl-rut-validator
```

## Features

- Written in TypeScript with full type definitions
- Comprehensive validation for Chilean RUT numbers
- Security-focused implementation
- Formatting to standard Chilean format (XX.XXX.XXX-X)
- No external dependencies

## Usage

### JavaScript (CommonJS)

```javascript
const { isValidRut, validateRut, formatRut } = require('cl-rut-validator');

// Basic validation
console.log(isValidRut('12.345.678-5')); // true

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

### TypeScript / ES Modules

```typescript
import { isValidRut, validateRut, formatRut, RutValidationResult } from 'cl-rut-validator';

// Basic validation
console.log(isValidRut('12.345.678-5')); // true

// Detailed validation with type safety
const validation: RutValidationResult = validateRut('12.345.678-5');
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

### isValidRut(rut: unknown): boolean

Validates if a given input is a valid Chilean RUT.

- **Parameters**: `rut` (any type) - The RUT to validate
- **Returns**: `boolean` - True if the RUT is valid, false otherwise

### validateRut(rut: unknown): RutValidationResult

Returns detailed validation information for a RUT.

- **Parameters**: `rut` (any type) - The RUT to validate
- **Returns**: `RutValidationResult` object with the following properties:
  - `isValid` (boolean): Whether the RUT is valid
  - `formatted` (string|null): The formatted RUT (if valid)
  - `raw` (string): The cleaned RUT without formatting
  - `rutNumber` (string, optional): The RUT number without verification digit (if valid)
  - `verificationDigit` (string, optional): The verification digit (if valid)

### formatRut(rut: unknown): string | null

Formats a RUT to standard Chilean format (XX.XXX.XXX-X).

- **Parameters**: `rut` (any type) - The RUT to format
- **Returns**: `string|null` - The formatted RUT if valid, or null if invalid

### cleanRut(rut: unknown): string

Cleans a RUT by removing formatting characters.

- **Parameters**: `rut` (any type) - The RUT to clean
- **Returns**: `string` - The cleaned RUT string

### calculateVerificationDigit(rutNumber: string | number): string

Calculates the verification digit for a given RUT number.

- **Parameters**: `rutNumber` (string|number) - RUT number without verification digit
- **Returns**: `string` - The calculated verification digit

## Understanding Chilean RUT

The Chilean RUT (Rol Único Tributario) is the national tax ID number in Chile. It consists of:

1. A sequence of digits (typically 7-8 digits)
2. A verification digit (0-9 or 'K')

The verification digit is calculated using Module 11 algorithm.

## Security

This package includes several security features:

- Protection against DoS attacks with input length limits
- Proper handling of all input types
- Comprehensive error management
- Protection against common validation bypass techniques

## License

MIT