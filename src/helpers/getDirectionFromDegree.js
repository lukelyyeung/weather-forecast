const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export function getDirectionFromDegree(num) {
  const val = Math.floor((num / 22.5) + 0.5);
  return arr[(val % 16)];
}