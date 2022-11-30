import { neededPaper, needRibbon, part1, part2 } from "./WrappingPaper.js";
import { expect } from "vitest";

describe('Wrapping Paper', () => {
  it('should compute the needed paper for a present', () => {
    expect(neededPaper('2x3x4')).toEqual(58)
    expect(neededPaper('1x1x10')).toEqual(43)
  });

  it('should compute part1', () => {
    expect(part1()).toEqual(1588178)
  });

  it('should compute the needed ribbon length', () => {
    expect(needRibbon('2x3x4')).toEqual(34)
    expect(needRibbon('1x1x10')).toEqual(14)
  });

  it('should compute part2', () => {
    expect(part2()).toEqual(3783758)
  });

});
