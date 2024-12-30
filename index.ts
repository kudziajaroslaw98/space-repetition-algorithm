import spaceRepetitionAlgorithm from "./space-repetition";

const items = [
  { reviseAt: new Date("2024-12-30 19:00"), name: "Item 1" },
  { reviseAt: new Date("2024-12-31 19:00"), name: "Item 2" },
  { reviseAt: new Date("2025-01-01 12:00"), name: "Item 3" },
  { reviseAt: new Date("2025-01-01 14:00"), name: "Item 4" },
  { reviseAt: new Date("2025-01-01 16:00"), name: "Item 5" },
];

spaceRepetitionAlgorithm({
  items,
  dateAttributeKey: "reviseAt",
  debug: true,
});
