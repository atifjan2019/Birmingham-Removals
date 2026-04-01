const BASE_PRICES = {
  house: {
    0: 150, // studio
    1: 250,
    2: 350,
    3: 500,
    4: 700,
    5: 850,
    6: 1000,
  },
  office: 600,
  studio: 150,
  single: 80,
};

const EXTRA_PRICES = {
  packing: 120,
  dismantling: 80,
  storage: 150,
  cleaning: 200,
};

export function calculateQuote(moveType, bedrooms, extras) {
  let base = 0;

  if (moveType === "house") {
    base = BASE_PRICES.house[Math.min(bedrooms, 6)] || BASE_PRICES.house[3];
  } else if (moveType === "office") {
    base = BASE_PRICES.office;
  } else if (moveType === "studio") {
    base = BASE_PRICES.studio;
  } else if (moveType === "single") {
    base = BASE_PRICES.single;
  }

  let extrasTotal = 0;
  if (extras && extras.length > 0) {
    extras.forEach((extra) => {
      if (EXTRA_PRICES[extra]) {
        extrasTotal += EXTRA_PRICES[extra];
      }
    });
  }

  const total = base + extrasTotal;

  return {
    min: Math.round(total * 0.9),
    max: Math.round(total * 1.3),
    base,
    extrasTotal,
  };
}

export { EXTRA_PRICES };
