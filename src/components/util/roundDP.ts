export default function roundDP(dp: number) {
  return (val: number): string => val.toFixed(dp);
}
