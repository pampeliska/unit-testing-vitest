import { describe, expect, it } from "vitest";
import { max } from "../src/intro";

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
