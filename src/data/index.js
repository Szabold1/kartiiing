const currentYear = new Date().getFullYear();

export const data = {
  races: {
    filterKeys: [
      "sorting",
      "status",
      "years",
      "months",
      "categories",
      "championships",
      "countries",
    ],
    defaultValues: {
      sorting: ["Date ascending"],
      years: [currentYear.toString()],
    },
  },
  circuits: {
    filterKeys: ["sorting", "countries"],
    defaultValues: {
      sorting: ["Name ascending"],
    },
  },
  championships: [
    "Champions of the Future",
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
  ],
};

export default data;
