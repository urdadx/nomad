import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getRandomSize = () => {
  return Math.random() * (0.05 - 0.03) + 0.03;
};

export const markers = [
  { location: [38.8951, -77.0364], size: getRandomSize() }, // Washington
  { location: [51.509865, -0.118092], size: getRandomSize() }, // London
  { location: [5.6037, -0.187], size: getRandomSize() }, // Accra
  { location: [13.5127, 2.1126], size: getRandomSize() }, // Niamey
  { location: [24.7136, 46.6753], size: getRandomSize() }, // Riyadh
  { location: [39.9042, 116.4074], size: getRandomSize() }, // Beijing
  { location: [41.0082, 28.9784], size: getRandomSize() }, // Istanbul
  { location: [32.8872, 13.1913], size: getRandomSize() }, // Tripoli
  { location: [28.0339, 1.6596], size: getRandomSize() }, // Algeria
  { location: [-33.918861, 18.4233], size: getRandomSize() }, // Cape Town
  { location: [28.6139, 77.209], size: getRandomSize() }, // New Delhi
  { location: [-34.6118, -58.4173], size: getRandomSize() }, // Buenos Aires
  { location: [-15.7801, -47.9292], size: getRandomSize() }, // Brasília
  { location: [19.4326, -99.1332], size: getRandomSize() }, // Mexico City
  { location: [33.6844, 73.0479], size: getRandomSize() }, // Islamabad
  { location: [13.7563, 100.5018], size: getRandomSize() }, // Bangkok
  { location: [55.7558, 37.6176], size: getRandomSize() }, // Moscow
  { location: [30.0444, 31.2357], size: getRandomSize() }, // Cairo
  { location: [15.5007, 32.5599], size: getRandomSize() }, // Khartoum
  { location: [-6.1659, 39.2026], size: getRandomSize() }, // Zanzibar
  { location: [-1.286389, 36.817223], size: getRandomSize() },
  { location: [-33.8688, 151.2093], size: getRandomSize() }, // Sydney
  { location: [-35.2809, 149.13], size: getRandomSize() },
];
