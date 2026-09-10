/**
 * Delivery fee calculation utilities matching the backend:
 * - App\Services\HaversineDistanceCalculator
 * - App\Services\DeliveryFeeService
 * - config/delivery.php
 */

export const MAX_DELIVERY_DISTANCE_KM = 10;
export const BASE_DELIVERY_FEE = 30.0; // 3000 centavos = ₱30.00
export const PER_KM_DELIVERY_FEE = 10.0; // 1000 centavos = ₱10.00/km

/**
 * Calculate Haversine distance in kilometers between two lat/lng points.
 * Matches App\Services\HaversineDistanceCalculator
 */
export function calculateDistanceKm(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number {
  const earthRadiusInKm = 6371.0;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const latDelta = toRad(toLat - fromLat);
  const lonDelta = toRad(toLon - fromLon);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(toRad(fromLat)) *
      Math.cos(toRad(toLat)) *
      Math.sin(lonDelta / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusInKm * c;
}

/**
 * Calculate the total delivery fee in PHP:
 * base_fee (₱30) + ceil(distanceKm) * per_km (₱10) + option.additional_fee
 */
export function calculateTotalDeliveryFee(
  distanceKm: number,
  optionAdditionalFee: number | string
): number {
  const safeDistance = Math.max(distanceKm, 0.1);
  const distanceFee = BASE_DELIVERY_FEE + Math.ceil(safeDistance) * PER_KM_DELIVERY_FEE;
  const additional = Number(optionAdditionalFee) || 0;
  return distanceFee + additional;
}
