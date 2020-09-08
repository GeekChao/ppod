/**
 * Inheritance is a mechanism for automatic message delegation
 * Template method pattern: offer a structure / algorithm that permits subclasses to contribute specializations
 * Hook: allow subclasses to contribute specializations without knowing the abstract algorithm
 */

interface BicylceType {
  size: string;
  chain?: string;
  tire_size?: string;
}

interface RoadBikeType extends BicylceType {
  tape_color: string;
}

interface MountainBikeType extends BicylceType {
  front_shock: string;
  rear_shock: string;
}

type Bike = RoadBikeType | MountainBikeType;

abstract class Bicylce {
  private size: string;
  private chain: string;
  private tire_size: string;

  public constructor(opts: Bike) {
    this.size = opts.size;
    this.chain = opts.chain || this.default_chain;
    this.tire_size = opts.tire_size || (this.default_tire_size as string);

    this.post_initialize(opts);
  }

  private get default_chain() {
    return "11 - Speed";
  }

  protected get default_tire_size(): void | string {
    throw new Error(
      `${this.constructor.prototype.constructor.name} getter default_tire_size must be implemented!`
    );
  }

  public post_initialize(opts: Bike) {}

  protected get local_spares() {
    return {};
  }

  public get spares() {
    return {
      tire_size: this.tire_size,
      chain: this.chain,
      ...this.local_spares
    };
  }
}

class RoadBike extends Bicylce {
  private tape_color: string;

  protected get default_tire_size() {
    return "23";
  }

  public post_initialize(opts: RoadBikeType) {
    this.tape_color = opts.tape_color;
  }

  protected get local_spares() {
    return {
      tape_color: this.tape_color
    };
  }
}

class MountainBike extends Bicylce {
  private front_shock: string;
  private rear_shock: string;

  protected get default_tire_size() {
    return "2.1";
  }

  public post_initialize(opts: MountainBikeType) {
    this.front_shock = opts.front_shock;
    this.rear_shock = opts.rear_shock;
  }

  protected get local_spares() {
    return {
      front_shock: this.front_shock
    };
  }
}

// RoadBike
const roadBike = new RoadBike({
  size: "M",
  tape_color: "Green"
});

const mountainBike = new MountainBike({
  size: "S",
  front_shock: "Manitou",
  rear_shock: "Fox"
});

console.log("Helo", roadBike, roadBike.spares);
console.log("Helo", mountainBike, mountainBike.spares);
