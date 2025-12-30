// Ring size conversion data from CSV
export const RING_SIZE_DATA = [
  { diameter: 14.1, us: 3, uk: "F 1/2", euro: 44, circumferenceMm: 44.3, circumferenceIn: 1.74 },
  { diameter: 14.5, us: 3.5, uk: "G 1/2", euro: 45, circumferenceMm: 45.55, circumferenceIn: 1.79 },
  { diameter: 14.9, us: 4, uk: "H 1/2", euro: 47, circumferenceMm: 46.81, circumferenceIn: 1.84 },
  { diameter: 15.3, us: 4.5, uk: "I 1/2", euro: 48, circumferenceMm: 48.07, circumferenceIn: 1.89 },
  { diameter: 15.7, us: 5, uk: "J 1/2", euro: 49, circumferenceMm: 49.32, circumferenceIn: 1.94 },
  { diameter: 16.1, us: 5.5, uk: "K 1/2", euro: 50, circumferenceMm: 50.58, circumferenceIn: 1.99 },
  { diameter: 16.5, us: 6, uk: "L 1/2", euro: 52, circumferenceMm: 51.84, circumferenceIn: 2.04 },
  { diameter: 16.9, us: 6.5, uk: "M 1/2", euro: 53, circumferenceMm: 53.09, circumferenceIn: 2.09 },
  { diameter: 17.3, us: 7, uk: "N 1/2", euro: 54, circumferenceMm: 54.35, circumferenceIn: 2.14 },
  { diameter: 17.7, us: 7.5, uk: "O 1/2", euro: 55, circumferenceMm: 55.61, circumferenceIn: 2.19 },
  { diameter: 18.1, us: 8, uk: "P 1/2", euro: 57, circumferenceMm: 56.86, circumferenceIn: 2.24 },
  { diameter: 18.5, us: 8.5, uk: "Q 1/2", euro: 58, circumferenceMm: 58.12, circumferenceIn: 2.29 },
  { diameter: 19, us: 9, uk: "R 1/2", euro: 59, circumferenceMm: 59.69, circumferenceIn: 2.35 },
  { diameter: 19.4, us: 9.5, uk: "S 1/2", euro: 61, circumferenceMm: 60.95, circumferenceIn: 2.4 },
  { diameter: 19.8, us: 10, uk: "T 1/2", euro: 62, circumferenceMm: 62.2, circumferenceIn: 2.45 },
  { diameter: 20.2, us: 10.5, uk: "U 1/2", euro: 63, circumferenceMm: 63.46, circumferenceIn: 2.5 },
  { diameter: 20.6, us: 11, uk: "V 1/2", euro: 65, circumferenceMm: 64.72, circumferenceIn: 2.55 },
  { diameter: 21, us: 11.5, uk: "W 1/2", euro: 66, circumferenceMm: 65.97, circumferenceIn: 2.6 },
  { diameter: 21.4, us: 12, uk: "X 1/2", euro: 67, circumferenceMm: 67.23, circumferenceIn: 2.65 },
  { diameter: 21.8, us: 12.5, uk: "Z", euro: 68, circumferenceMm: 68.49, circumferenceIn: 2.7 },
  { diameter: 22.2, us: 13, uk: "Z+1", euro: 70, circumferenceMm: 69.74, circumferenceIn: 2.75 },
  { diameter: 22.6, us: 13.5, uk: "Z+2", euro: 71, circumferenceMm: 71, circumferenceIn: 2.8 },
]

// Interpolate quarter sizes from half-size data
export function getRingSizeFromCircumference(circumferenceMm: number) {
  const sortedData = [...RING_SIZE_DATA].sort((a, b) => a.circumferenceMm - b.circumferenceMm)

  // Find exact match or closest values
  const exactMatch = sortedData.find((d) => Math.abs(d.circumferenceMm - circumferenceMm) < 0.01)
  if (exactMatch) return exactMatch

  // Find surrounding values for interpolation
  let lower = null
  let upper = null

  for (let i = 0; i < sortedData.length; i++) {
    if (sortedData[i].circumferenceMm < circumferenceMm) {
      lower = sortedData[i]
    }
    if (sortedData[i].circumferenceMm > circumferenceMm && !upper) {
      upper = sortedData[i]
      break
    }
  }

  if (!lower) return sortedData[0]
  if (!upper) return sortedData[sortedData.length - 1]

  // Calculate which is closer
  const lowerDiff = Math.abs(circumferenceMm - lower.circumferenceMm)
  const upperDiff = Math.abs(upper.circumferenceMm - circumferenceMm)

  // Round to nearest quarter size
  const baseSize = lowerDiff < upperDiff ? lower : upper
  const interpolatedUs =
    lower.us +
    ((circumferenceMm - lower.circumferenceMm) / (upper.circumferenceMm - lower.circumferenceMm)) *
      (upper.us - lower.us)

  // Round to nearest 0.25
  const roundedUs = Math.round(interpolatedUs * 4) / 4

  // Interpolate other values proportionally
  const ratio = (roundedUs - lower.us) / (upper.us - lower.us)

  return {
    ...baseSize,
    us: roundedUs,
    uk: lowerDiff < upperDiff ? lower.uk : upper.uk,
    euro: Math.round(lower.euro + (upper.euro - lower.euro) * ratio),
    diameter: lower.diameter + (upper.diameter - lower.diameter) * ratio,
  }
}
