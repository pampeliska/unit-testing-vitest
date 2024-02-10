import { describe, expect, it } from 'vitest';
import {
  calculateDiscount,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from '../src/core.js';

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    //if it is an array
    expect(Array.isArray(coupons)).toBe(true); //just for JS
    //expect(coupons).toHaveLength(2);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string'); //just for JS
      expect(coupon.code).toBeTruthy(); //not empty string
    });
  });

  it('should return an array with valid coupon discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number'); //just for JS
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given valid input', () => {
    expect(validateUserInput('Juana', 20)).toMatch(/success/i);
  });

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(2, 20)).toMatch(/invalid/i);
  });

  it('should return an error if username is less then 3 characters', () => {
    expect(validateUserInput('Ja', 20)).toMatch(/invalid/i);
  });

  it('should return an error if username is longer than 255 characters', () => {
    expect(validateUserInput('J'.repeat(256), 20)).toMatch(/invalid/i);
  });

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('Juana', 'Juana')).toMatch(/invalid/i); //In the case of using TS, it wasn't be needed
  });

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('Juana', 17)).toMatch(/invalid/i);
  });

  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('Juana', 101)).toMatch(/invalid/i);
  });

  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('Ju', 101)).toMatch(/invalid username/i);
    expect(validateUserInput('Ju', 101)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it('should return false when the price is outside the range', () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(101, 0, 100)).toBe(false);
  });

  it('should return true when the price is equal to the min or to the max', () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it('should return true when the price is within the range', () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });
});

describe('isValidUsername', () => {
  //constraints
  // const minlength = 5;
  // const msxlength = 15;
  it('should return false then the length of the username is outside the range', () => {
    //'a'.repeat(minlength - 1)
    expect(isValidUsername('Jane')).toBe(false);
    //'a'.repeat(maxlength + 1)
    expect(isValidUsername('J'.repeat(16))).toBe(false);
  });

  it('should return true then the length is equal to the min or to the max lenght', () => {
    expect(isValidUsername('Juana')).toBe(true);
    expect(isValidUsername('J'.repeat(15))).toBe(true);
  });

  it('should return true then the length is within the range', () => {
    expect(isValidUsername('JuanaJana')).toBe(true);
  });

  it('should return false for invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(9)).toBe(false);
    expect(isValidUsername('')).toBe(false);
  });
});
