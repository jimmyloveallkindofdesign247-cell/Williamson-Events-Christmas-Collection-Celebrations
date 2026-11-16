import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  calculateDiscountPercent,
  getChristmasCountdown,
  recommendFestiveMatches,
  validateBookingForm,
  validateEmail,
} from './christmasLogic';
import { EVENT_PACKAGES, SPECIAL_OFFERS } from '../data/christmasData';

test('getChristmasCountdown computes exact days/hours/minutes/seconds before Dec 25', () => {
  const sampleNow = new Date(2026, 10, 16, 12, 30, 15); // Nov 16, 2026 12:30:15
  const result = getChristmasCountdown(sampleNow);

  assert.equal(result.isChristmasDay, false);
  assert.equal(result.targetYear, 2026);
  assert.equal(result.days, 38);
  assert.equal(result.hours, 11);
  assert.equal(result.minutes, 29);
  assert.equal(result.seconds, 45);
});

test('getChristmasCountdown recognizes Christmas Day and rolls over after Dec 25', () => {
  const christmasDay = new Date(2026, 11, 25, 9, 0, 0);
  const onDay = getChristmasCountdown(christmasDay);
  assert.equal(onDay.isChristmasDay, true);

  const boxingDay = new Date(2026, 11, 26, 10, 0, 0);
  const afterDay = getChristmasCountdown(boxingDay);
  assert.equal(afterDay.isChristmasDay, false);
  assert.equal(afterDay.targetYear, 2027);
  assert.ok(afterDay.days >= 363);
});

test('calculateDiscountPercent computes clean rounded savings', () => {
  assert.equal(calculateDiscountPercent(360, 270), 25);
  assert.equal(calculateDiscountPercent(240, 180), 25);
  assert.equal(calculateDiscountPercent(100, 100), 0);
});

test('calculateCartTotals computes savings, delivery threshold, and gift wrap accurately', () => {
  const wreath = SPECIAL_OFFERS.find((o) => o.id === 'offer-georgian-wreath')!;
  const hamper = SPECIAL_OFFERS.find((o) => o.id === 'offer-emerald-hamper')!;

  // Below $300 threshold ($135) -> $25 delivery fee + $18 gift wrap
  const smallCart = calculateCartTotals([{ offer: wreath, quantity: 1 }], true);
  assert.equal(smallCart.itemCount, 1);
  assert.equal(smallCart.subtotal, 135);
  assert.equal(smallCart.originalTotal, 175);
  assert.equal(smallCart.totalSavings, 40);
  assert.equal(smallCart.qualifiesForFreeDelivery, false);
  assert.equal(smallCart.deliveryFee, 25);
  assert.equal(smallCart.giftWrapFee, 18);
  assert.equal(smallCart.grandTotal, 178);

  // Above $300 threshold ($135 + $270 = $405) -> free delivery
  const qualifyingCart = calculateCartTotals(
    [
      { offer: wreath, quantity: 1 },
      { offer: hamper, quantity: 1 },
    ],
    false
  );
  assert.equal(qualifyingCart.itemCount, 2);
  assert.equal(qualifyingCart.subtotal, 405);
  assert.equal(qualifyingCart.totalSavings, 130);
  assert.equal(qualifyingCart.qualifiesForFreeDelivery, true);
  assert.equal(qualifyingCart.deliveryFee, 0);
  assert.equal(qualifyingCart.grandTotal, 405);
});

test('recommendFestiveMatches tailors offer and package to preferences', () => {
  const vipMatch = recommendFestiveMatches(
    { occasion: 'vip-gift', aesthetic: 'emerald-pine', budget: 'under-350' },
    SPECIAL_OFFERS,
    EVENT_PACKAGES
  );
  assert.equal(vipMatch.recommendedOffer.id, 'offer-emerald-hamper');

  const corporateMatch = recommendFestiveMatches(
    { occasion: 'corporate', aesthetic: 'candlelit-champagne', budget: '2500-plus' },
    SPECIAL_OFFERS,
    EVENT_PACKAGES
  );
  assert.equal(corporateMatch.recommendedOffer.id, 'offer-corporate-gala');
  assert.equal(corporateMatch.recommendedPackage.id, 'pkg-corporate');
  assert.ok(corporateMatch.conciergeNote.length > 20);
});

test('validateEmail and validateBookingForm enforce strict validation', () => {
  assert.equal(validateEmail('concierge@williamsonevents.com'), true);
  assert.equal(validateEmail('not-an-email'), false);
  assert.equal(validateEmail('   '), false);

  const invalid = validateBookingForm({
    name: 'A',
    email: 'bad',
    phone: '123',
    packageId: '',
    eventDate: '',
    guestCount: 0,
  });
  assert.equal(Object.keys(invalid).length, 6);

  const valid = validateBookingForm({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    phone: '+44 20 7946 0192',
    packageId: 'pkg-corporate',
    eventDate: '2026-12-18',
    guestCount: 120,
  });
  assert.equal(Object.keys(valid).length, 0);
});
