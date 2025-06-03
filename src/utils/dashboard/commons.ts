export const DATA_GENDERS = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export const DATA_FITNESS_LEVEL = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

export const DATA_HEIGHT_METRIC = [
  {
    value: "cm",
    label: "cm",
  },
  {
    value: "in",
    label: "in",
  },
];

export const DATA_WEIGHT_METRIC = [
  {
    value: "kg",
    label: "kg",
  },
  {
    value: "lb",
    label: "lb",
  },
];

export function getCurrentDate(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
}