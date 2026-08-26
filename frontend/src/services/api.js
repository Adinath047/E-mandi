// ============================================================
// e-Mandi API Service Layer
// All UI data access goes through these functions.
// Currently returns mock data.
// Replace with real fetch() calls to VITE_API_BASE_URL when backend is ready.
// ============================================================

import {
  farmer,
  lots,
  marketPrices,
  payments,
  notifications,
  dashboardSummary,
} from '../data/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// ---- HELPER ----
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- AUTH ----

/**
 * Mock login — accepts any credentials with role=farmer.
 * Returns { success, user, token }
 * 
 * TODO: Replace with:
 * return fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ identifier, password, role }) })
 */
export async function login({ identifier, password, role }) {
  await delay(400);
  if (!identifier || !password) {
    return { success: false, error: 'Please enter your credentials.' };
  }
  // Demo: any credentials work
  const user = { ...farmer };
  const token = 'mock-jwt-token-' + Date.now();
  return { success: true, user, token };
}

/**
 * Mock logout — clears localStorage.
 * TODO: Call backend revoke endpoint if needed.
 */
export async function logout() {
  await delay(100);
  return { success: true };
}

// ---- FARMER PROFILE ----

/**
 * Returns the current farmer's profile.
 * TODO: fetch(`${BASE_URL}/farmer/profile`, { headers: authHeader() })
 */
export async function getFarmerProfile() {
  await delay(300);
  return { success: true, data: farmer };
}

/**
 * Registers a new farmer account.
 * TODO: POST to ${BASE_URL}/farmer/register
 */
export async function registerFarmer(formData) {
  await delay(500);
  return { success: true, data: { ...farmer, ...formData, id: 'FMR-2026-' + Date.now() } };
}

/**
 * Updates farmer profile.
 * TODO: PUT ${BASE_URL}/farmer/profile
 */
export async function updateProfile(formData) {
  await delay(400);
  return { success: true, data: { ...farmer, ...formData } };
}

// ---- DASHBOARD ----

/**
 * Returns dashboard summary data.
 * TODO: fetch(`${BASE_URL}/farmer/dashboard`)
 */
export async function getDashboard() {
  await delay(300);
  return { success: true, data: dashboardSummary };
}

// ---- MARKET PRICES ----

/**
 * Returns live market prices.
 * TODO: fetch(`${BASE_URL}/market/prices`)
 */
export async function getMarketPrices() {
  await delay(300);
  return { success: true, data: marketPrices };
}

// ---- PRODUCE / LOTS ----

/**
 * Registers new produce and creates a lot.
 * TODO: POST ${BASE_URL}/lots/register
 */
export async function registerProduce(formData) {
  await delay(600);
  const newLot = {
    id: 'EM-' + Math.floor(1000 + Math.random() * 9000),
    crop: formData.crop,
    quantity: Number(formData.quantity),
    unit: formData.unit || 'Quintals',
    grade: formData.grade || 'Grade A',
    harvestDate: formData.harvestDate || new Date().toLocaleDateString('en-IN'),
    expectedPrice: Number(formData.expectedPrice),
    estimatedValue: Number(formData.quantity) * Number(formData.expectedPrice),
    mandi: formData.mandi,
    salePreference: formData.salePreference || 'Auction',
    status: 'Pending Verification',
    registeredDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    lotNumber: 'L-' + Date.now(),
  };
  lots.unshift(newLot);
  return { success: true, data: newLot };
}

/**
 * Returns all produce lots for the farmer.
 * TODO: fetch(`${BASE_URL}/farmer/lots`)
 */
export async function getMyLots() {
  await delay(300);
  return { success: true, data: lots };
}

/**
 * Returns a single lot by ID.
 * TODO: fetch(`${BASE_URL}/lots/${lotId}`)
 */
export async function getLotById(lotId) {
  await delay(200);
  const lot = lots.find((l) => l.id === lotId);
  if (!lot) return { success: false, error: 'Lot not found' };
  return { success: true, data: lot };
}

/**
 * Returns my produce (alias of lots for "My Produce" page).
 * TODO: fetch(`${BASE_URL}/farmer/produce`)
 */
export async function getMyProduce() {
  await delay(300);
  return { success: true, data: lots };
}

// ---- PAYMENTS ----

/**
 * Returns all payment transactions.
 * TODO: fetch(`${BASE_URL}/farmer/payments`)
 */
export async function getPayments() {
  await delay(300);
  return { success: true, data: payments };
}

// ---- NOTIFICATIONS ----

/**
 * Returns notifications for the farmer.
 * TODO: fetch(`${BASE_URL}/farmer/notifications`)
 */
export async function getNotifications() {
  await delay(200);
  return { success: true, data: notifications };
}

/**
 * Marks a notification as read.
 * TODO: PUT ${BASE_URL}/notifications/${id}/read
 */
export async function markNotificationRead(id) {
  await delay(100);
  return { success: true };
}
