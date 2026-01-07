// /**
//  * Haversine Distance Calculator
//  * Calculates the great-circle distance between two points on Earth
//  * @param {number} lat1 - Latitude of point 1 in degrees
//  * @param {number} lon1 - Longitude of point 1 in degrees
//  * @param {number} lat2 - Latitude of point 2 in degrees
//  * @param {number} lon2 - Longitude of point 2 in degrees
//  * @returns {number} Distance in meters
//  */
// function haversine(lat1, lon1, lat2, lon2) {
//   // Validate input parameters
//   if (
//     typeof lat1 !== 'number' || typeof lon1 !== 'number' ||
//     typeof lat2 !== 'number' || typeof lon2 !== 'number'
//   ) {
//     throw new Error('All parameters must be numbers');
//   }

//   // Validate latitude range (-90 to 90)
//   if (Math.abs(lat1) > 90 || Math.abs(lat2) > 90) {
//     throw new Error('Latitude must be between -90 and 90 degrees');
//   }

//   // Validate longitude range (-180 to 180)
//   if (Math.abs(lon1) > 180 || Math.abs(lon2) > 180) {
//     throw new Error('Longitude must be between -180 and 180 degrees');
//   }

//   // Earth's radius in meters (mean radius)
//   const R = 6371000;

//   // Convert degrees to radians
//   const toRadians = (angle) => angle * Math.PI / 180;

//   const φ1 = toRadians(lat1);
//   const φ2 = toRadians(lat2);
//   const Δφ = toRadians(lat2 - lat1);
//   const Δλ = toRadians(lon2 - lon1);

//   // Haversine formula
//   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
//   // Distance in meters
//   const distance = R * c;

//   // Handle edge cases (same point, antipodal points)
//   if (isNaN(distance)) {
//     return 0; // Same point
//   }

//   // Round to 2 decimal places for precision
//   return Math.round(distance * 100) / 100;
// }

// // Export the function
// module.exports = { haversine };






/**
 * Haversine Distance Calculator
 * Calculates the great-circle distance between two points on Earth
 * @param {number} lat1 - Latitude of point 1 in degrees
 * @param {number} lon1 - Longitude of point 1 in degrees
 * @param {number} lat2 - Latitude of point 2 in degrees
 * @param {number} lon2 - Longitude of point 2 in degrees
 * @returns {number} Distance in meters
 */

export function haversine(lat1, lon1, lat2, lon2) {
  // Validate inputs
  if (
    typeof lat1 !== 'number' || typeof lon1 !== 'number' ||
    typeof lat2 !== 'number' || typeof lon2 !== 'number'
  ) {
    throw new Error('All parameters must be numbers');
  }

  if (Math.abs(lat1) > 90 || Math.abs(lat2) > 90) {
    throw new Error('Latitude must be between -90 and 90 degrees');
  }

  if (Math.abs(lon1) > 180 || Math.abs(lon2) > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees');
  }

  const R = 6371000; // meters
  const toRadians = (angle) => angle * Math.PI / 180;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) *
    Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}
