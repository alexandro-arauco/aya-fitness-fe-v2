export default function calculateSymmetry(
  firstValue: number,
  secondValue: number
): number {
  const division =
    firstValue > secondValue
      ? firstValue / secondValue
      : secondValue / firstValue;

  return +(100 * (1 - division)).toFixed(0);
}
