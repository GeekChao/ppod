class Part {
  public constructor(
    private name: string,
    private description: string,
    private needSpare: boolean = true
  ) {}

  public get spareable() {
    return this.needSpare;
  }
}

class Parts {
  public constructor(private parts: Part[]) {}

  public spares() {
    return this.parts.filter((part) => part.spareable);
  }
}

type PartConfig = [string, string, boolean?];
type PartsConfig = PartConfig[];

const createPartsFactory = (config: PartsConfig) => {
  const parts = config.map((configArgs) => {
    return new Part(...configArgs);
  });

  return new Parts(parts);
};

class Bicycle {
  public constructor(private size: string, private parts: Parts) {}

  public spares() {
    return this.parts.spares();
  }
}

const road_config = [
  ["chain", "11-speed"],
  ["tire_size", "23"],
  ["tape_color", "red"]
] as PartsConfig;

const mountain_config = [
  ["chain", "11-speed"],
  ["tire_size", "2.1"],
  ["front_shock", "Manitou"],
  ["rear_shock", "Fox", false]
] as PartsConfig;

const roadBicycle = new Bicycle("S", createPartsFactory(road_config));

console.log(roadBicycle.spares());

const mountainBicycle = new Bicycle("L", createPartsFactory(mountain_config));

console.log(mountainBicycle.spares());
