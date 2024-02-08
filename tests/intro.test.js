import { describe, expect, it } from "vitest";
import { fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // const a = 2;
    // const b = 1;

    // const result = max(a, b);

    // expect(result).toBe(2);

    expect(max(2, 1)).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument if arguments are equal", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fizzBuzz", () => {
  it("should return FizzBuzz if arg is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz if arg is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return Buzz if arg is divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return arg as string if arg is not divisible by 3 or 5", () => {
    expect(fizzBuzz(4)).toBe("4");
  });
});