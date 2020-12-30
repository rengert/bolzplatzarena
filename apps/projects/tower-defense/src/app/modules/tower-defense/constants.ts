export const VALUES = {
  colors: {
    fields: {
      standard: { red: 0.123, green: 0.456, blue: 0.789 },
      hover: { red: 0.123, green: 1, blue: 0.789 },
      blocked: { red: 0.823, green: 0.1, blue: 0.789 },
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
      probability: 0.9,
      energy: 1,
      size: 0.125,
    },
    tower: {
      size: 0.125,
      power: 0.125,
      range: 1.125,
    },
  },
};
