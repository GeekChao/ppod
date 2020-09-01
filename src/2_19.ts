/**
 * Summary: Write the changable code
 *  1. A Class and its method must have a single responsibility. Ask 'w' question or describe its responsibility in a single sentence
 *  2. Any decision you make in advance of an explicit requirement is just a guess.
 *  3. isolate the vulunerable external message
 */

class Gear {
  public constructor(
    private chainring: number,
    private cog: number,
    private wheel?: Wheel
  ) {}

  public get ratio() {
    return this.chainring / this.cog;
  }

  private get diameter() {
    return this.wheel?.diameter || 0;
  }

  public get gear_inches() {
    return this.ratio * this.diameter;
  }
}

class Wheel {
  public constructor(private rim: number, private tire: number) {}

  public get diameter() {
    return this.rim + this.tire * 2;
  }

  public get circumference() {
    return this.diameter * Math.PI;
  }
}

const wheel = new Wheel(26, 1.5);
console.log(wheel.circumference);

console.log(new Gear(52, 11, wheel).gear_inches);

console.log(new Gear(52, 11).ratio);
console.log(new Gear(52, 11).gear_inches);
