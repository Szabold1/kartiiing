const currentYear = new Date().getFullYear();

// Races
const raceFilterKeys = [
  "sorting",
  "status",
  "years",
  "months",
  "categories",
  "championships",
  "countries",
];

const defaultRaceFilterValues = {
  sorting: ["Date ascending"],
  years: [currentYear.toString()],
};

// Circuits
const circuitFilterKeys = ["sorting", "countries"];

const defaultCircuitFilterValues = {
  sorting: ["Name ascending"],
};

// Championships
const championshipsData = [
  "Champions of the future",
  "FIA Academy Trophy",
  "FIA CEZ",
  "FIA Endurance Championship",
  "FIA European Championship",
  "FIA World Cup",
  "FIA World Championship",
  "IAME Euro Series",
  "IAME Series Benelux",
  "IAME Warrior Final",
  "Moravský Pohár",
  "RMC Austria",
  "RMC BNL",
  "RMC CEE",
  "RMC Euro Trophy",
  "RMC Germany",
  "RMC Grand Finals",
  "RMC Hungary",
  "RMC International Trophy",
  "RMC SSC",
  "RMC Switzerland",
  "WSK",
  "SKUSA",
];

export {
  raceFilterKeys,
  defaultRaceFilterValues,
  circuitFilterKeys,
  defaultCircuitFilterValues,
  championshipsData,
};
