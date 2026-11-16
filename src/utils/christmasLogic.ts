import type { EventPackage, SpecialOffer } from '../data/christmasData';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isChristmasDay: boolean;
  targetYear: number;
}

export interface CartItem {
  offer: SpecialOffer;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  originalTotal: number;
  totalSavings: number;
  giftWrapFee: number;
  deliveryFee: number;
  grandTotal: number;
  qualifiesForFreeDelivery: boolean;
}

export type OccasionPreference = 'corporate' | 'family' | 'vip-gift' | 'gala-host';
export type AestheticPreference = 'crimson-gold' | 'emerald-pine' | 'candlelit-champagne';
export type BudgetPreference = 'under-350' | '350-2500' | '2500-plus';

export interface GiftPreferences {
  occasion: OccasionPreference;
  aesthetic: AestheticPreference;
  budget: BudgetPreference;
}

export interface RecommendationResult {
  recommendedOffer: SpecialOffer;
  recommendedPackage: EventPackage;
  conciergeNote: string;
  bundleSavings: number;
}

export interface BookingFormInput {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  eventDate: string;
  guestCount: number;
}

export const FREE_DELIVERY_THRESHOLD = 300;
export const STANDARD_DELIVERY_FEE = 25;
export const GIFT_WRAP_FEE = 18;

export function calculateDiscountPercent(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

export function getChristmasCountdown(now: Date = new Date()): CountdownTime {
  const year = now.getFullYear();
  const isDec25 = now.getMonth() === 11 && now.getDate() === 25;

  if (isDec25) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isChristmasDay: true,
      targetYear: year,
    };
  }

  let targetYear = year;
  let target = new Date(targetYear, 11, 25, 0, 0, 0, 0);
  if (now.getTime() > target.getTime()) {
    targetYear = year + 1;
    target = new Date(targetYear, 11, 25, 0, 0, 0, 0);
  }

  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isChristmasDay: false,
    targetYear,
  };
}

export function calculateCartTotals(items: CartItem[], giftWrapSelected: boolean): CartTotals {
  let itemCount = 0;
  let subtotal = 0;
  let originalTotal = 0;

  for (const item of items) {
    const qty = Math.max(0, Math.floor(item.quantity));
    if (qty === 0) continue;
    itemCount += qty;
    subtotal += item.offer.discountedPrice * qty;
    originalTotal += item.offer.originalPrice * qty;
  }

  const totalSavings = Math.max(0, originalTotal - subtotal);
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const deliveryFee = subtotal > 0 && !qualifiesForFreeDelivery ? STANDARD_DELIVERY_FEE : 0;
  const giftWrapFee = subtotal > 0 && giftWrapSelected ? GIFT_WRAP_FEE : 0;
  const grandTotal = subtotal + deliveryFee + giftWrapFee;

  return {
    itemCount,
    subtotal,
    originalTotal,
    totalSavings,
    giftWrapFee,
    deliveryFee,
    grandTotal,
    qualifiesForFreeDelivery,
  };
}

export function recommendFestiveMatches(
  preferences: GiftPreferences,
  offers: SpecialOffer[],
  packages: EventPackage[]
): RecommendationResult {
  const offerScores = offers.map((offer) => {
    let score = 0;

    if (preferences.budget === 'under-350' && offer.discountedPrice <= 350) score += 5;
    if (preferences.budget === '350-2500' && offer.discountedPrice > 200 && offer.discountedPrice <= 2500) score += 4;
    if (preferences.budget === '2500-plus' && offer.discountedPrice >= 2000) score += 5;

    if (preferences.occasion === 'vip-gift' && offer.id === 'offer-emerald-hamper') score += 6;
    if (preferences.occasion === 'family' && (offer.id === 'offer-garland-centerpiece' || offer.id === 'offer-georgian-wreath' || offer.id === 'offer-private-soiree')) score += 5;
    if (preferences.occasion === 'corporate' && (offer.id === 'offer-corporate-gala' || offer.id === 'offer-emerald-hamper')) score += 5;
    if (preferences.occasion === 'gala-host' && (offer.id === 'offer-catering-banquet' || offer.id === 'offer-garland-centerpiece')) score += 5;

    if (preferences.aesthetic === 'crimson-gold' && (offer.id === 'offer-garland-centerpiece' || offer.id === 'offer-georgian-wreath')) score += 3;
    if (preferences.aesthetic === 'emerald-pine' && (offer.id === 'offer-emerald-hamper' || offer.id === 'offer-private-soiree')) score += 3;
    if (preferences.aesthetic === 'candlelit-champagne' && (offer.id === 'offer-catering-banquet' || offer.id === 'offer-corporate-gala')) score += 3;

    return { offer, score };
  });

  offerScores.sort((a, b) => b.score - a.score);
  const recommendedOffer = offerScores[0]?.offer ?? offers[0];

  const packageScores = packages.map((pkg) => {
    let score = 0;
    if (preferences.occasion === 'corporate' && pkg.id === 'pkg-corporate') score += 6;
    if (preferences.occasion === 'family' && (pkg.id === 'pkg-private-party' || pkg.id === 'pkg-decor-styling')) score += 5;
    if (preferences.occasion === 'vip-gift' && pkg.id === 'pkg-decor-styling') score += 4;
    if (preferences.occasion === 'gala-host' && (pkg.id === 'pkg-party-planning' || pkg.id === 'pkg-catering' || pkg.id === 'pkg-winter-wedding')) score += 5;

    if (preferences.aesthetic === 'candlelit-champagne' && pkg.id === 'pkg-winter-wedding') score += 3;
    if (preferences.aesthetic === 'crimson-gold' && pkg.id === 'pkg-party-planning') score += 2;
    if (preferences.aesthetic === 'emerald-pine' && pkg.id === 'pkg-decor-styling') score += 3;

    if (preferences.budget === 'under-350' && pkg.startingPrice <= 2200) score += 2;
    if (preferences.budget === '2500-plus' && pkg.startingPrice >= 2600) score += 2;

    return { pkg, score };
  });

  packageScores.sort((a, b) => b.score - a.score);
  const recommendedPackage = packageScores[0]?.pkg ?? packages[0];

  const occasionDescriptions: Record<OccasionPreference, string> = {
    corporate: 'your executive team and corporate guests',
    family: 'an unforgettable family gathering at home',
    'vip-gift': 'discerning VIP clients and cherished recipients',
    'gala-host': 'hosts curating an extraordinary festive soirée',
  };

  const aestheticDescriptions: Record<AestheticPreference, string> = {
    'crimson-gold': 'classic crimson velvet and champagne gold warmth',
    'emerald-pine': 'deep forest emerald and fresh evergreen textures',
    'candlelit-champagne': 'soft candlelight, crystal stemware, and champagne glow',
  };

  const conciergeNote = `Tailored for ${occasionDescriptions[preferences.occasion]} with ${aestheticDescriptions[preferences.aesthetic]}. Pair ${recommendedOffer.name} with our ${recommendedPackage.title} production for a cohesive holiday statement.`;

  const bundleSavings = recommendedOffer.originalPrice - recommendedOffer.discountedPrice;

  return {
    recommendedOffer,
    recommendedPackage,
    conciergeNote,
    bundleSavings,
  };
}

export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function validateBookingForm(input: BookingFormInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  if (!validateEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  const digits = input.phone.replace(/\D/g, '');
  if (digits.length < 7) {
    errors.phone = 'Please enter a valid contact telephone number.';
  }
  if (!input.packageId.trim()) {
    errors.packageId = 'Please select an event package.';
  }
  if (!input.eventDate.trim()) {
    errors.eventDate = 'Please choose your preferred event date.';
  }
  if (!Number.isFinite(input.guestCount) || input.guestCount < 2 || input.guestCount > 2000) {
    errors.guestCount = 'Guest count must be between 2 and 2,000.';
  }

  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
