export const interpolate = (
  minReal: number,
  maxReal: number,
  minTarget: number,
  maxTarget: number,
  value: number,
) => {
  const realRange = maxReal - minReal;
  const targetRange = maxTarget - minTarget;
  const ratio = (value - minReal) / realRange;
  return ratio * targetRange + minTarget;
};
