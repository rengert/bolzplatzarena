export const VALUES = {
  colors: {
    fields: {
      standard: { red: 0.123, green: 0.856, blue: 0.789 },
      hover: { red: 0.423, green: 1, blue: 0.789 },
      blocked: { red: 0.888, green: 0.888, blue: 0.888 },
    },
    towers: {
      standard: { red: 0, green: 0.99, blue: 0 },
    },
    enemies: {
      standard: { red: 0.99, green: 0, blue: 0 },
    },
  },
  config: {
    fields: {
      size: 1,
    },
    enemies: {
      // todo: move later to a better level system
      count: 40,
      probability: 0.99,
      energy: 1,
      size: 0.125,
    },
    tower: {
      size: 0.125,
      power: 0.125,
      range: 1.25,
      shotsPerSecond: 1,
    },
  },
};
