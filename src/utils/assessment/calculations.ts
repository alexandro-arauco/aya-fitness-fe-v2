export default function calculateSymmetry(
  firstValue: number,
  secondValue: number
): number {
  const division =
    firstValue > secondValue
      ? secondValue / firstValue
      : firstValue / secondValue;

  return +(100 * (1 - division)).toFixed(0);
}
