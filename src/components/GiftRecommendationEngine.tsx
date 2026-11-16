import { useMemo, useState } from 'react';
import { CalendarCheck, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import { EVENT_PACKAGES, SPECIAL_OFFERS, type SpecialOffer } from '../data/christmasData';
import {
  formatCurrency,
  recommendFestiveMatches,
  type AestheticPreference,
  type BudgetPreference,
  type OccasionPreference,
} from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

interface GiftRecommendationEngineProps {
  onAddToCart: (offer: SpecialOffer) => void;
  onBookPackage: (packageId: string) => void;
}

const OCCASION_OPTIONS: { value: OccasionPreference; label: string }[] = [
  { value: 'vip-gift', label: 'VIP Client Gift' },
  { value: 'family', label: 'Family & Home' },
  { value: 'corporate', label: 'Corporate Team' },
  { value: 'gala-host', label: 'Gala & Banquet Host' },
];

const AESTHETIC_OPTIONS: { value: AestheticPreference; label: string }[] = [
  { value: 'crimson-gold', label: 'Crimson Velvet & Gold' },
  { value: 'emerald-pine', label: 'Emerald & Noble Pine' },
  { value: 'candlelit-champagne', label: 'Candlelit Champagne' },
];

const BUDGET_OPTIONS: { value: BudgetPreference; label: string }[] = [
  { value: 'under-350', label: 'Under $350' },
  { value: '350-2500', label: '$350 – $2,500' },
  { value: '2500-plus', label: '$2,500+ Bespoke' },
];

export function GiftRecommendationEngine({
  onAddToCart,
  onBookPackage,
}: GiftRecommendationEngineProps) {
  const [occasion, setOccasion] = useState<OccasionPreference>('vip-gift');
  const [aesthetic, setAesthetic] = useState<AestheticPreference>('emerald-pine');
  const [budget, setBudget] = useState<BudgetPreference>('under-350');

  const recommendation = useMemo(
    () =>
      recommendFestiveMatches(
        { occasion, aesthetic, budget },
        SPECIAL_OFFERS,
        EVENT_PACKAGES
      ),
    [occasion, aesthetic, budget]
  );

  return (
    <section
      id="gift-finder"
      aria-labelledby="gift-finder-heading"
      className="relative overflow-hidden bg-[#064E3B] py-24 text-[#FFFDF5]"
    >
      {/* Subtle architectural radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          {/* Left Controls Column */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
                Bespoke Festive Concierge
              </p>
              <h2
                id="gift-finder-heading"
                className="font-display text-balance mt-2 text-[clamp(2rem,3.4vw,3rem)] leading-tight font-semibold text-[#FFFDF5]"
              >
                Personalized Christmas Gift &amp; Event Finder
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#FFFDF5]/80 sm:text-base">
                Select your occasion, aesthetic palette, and seasonal budget to receive a tailored
                gift and celebration pairing curated by our studio directors.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2.5 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                  01. Who Are You Celebrating?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {OCCASION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={occasion === opt.value}
                      onClick={() => setOccasion(opt.value)}
                      className={`min-h-[42px] rounded-sm border px-3 py-2 text-left text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                        occasion === opt.value
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#171717]'
                          : 'border-[#FFFDF5]/20 bg-[#171717]/30 text-[#FFFDF5]/85 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                  02. Signature Holiday Palette
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {AESTHETIC_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={aesthetic === opt.value}
                      onClick={() => setAesthetic(opt.value)}
                      className={`min-h-[42px] rounded-sm border px-3 py-2 text-left text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                        aesthetic === opt.value
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#171717]'
                          : 'border-[#FFFDF5]/20 bg-[#171717]/30 text-[#FFFDF5]/85 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                  03. Preferred Budget Tier
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={budget === opt.value}
                      onClick={() => setBudget(opt.value)}
                      className={`min-h-[42px] rounded-sm border px-3 py-2 text-center text-xs font-semibold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                        budget === opt.value
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#171717]'
                          : 'border-[#FFFDF5]/20 bg-[#171717]/30 text-[#FFFDF5]/85 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Dynamic Recommendation Output Column */}
          <div className="lg:col-span-7">
            <div
              data-testid="recommendation-output"
              className="flex h-full flex-col justify-between rounded-sm border border-[#D4AF37]/40 bg-[#171717]/85 p-6 backdrop-blur-sm sm:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FFFDF5]/10 pb-5">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                      Your Curated Recommendation
                    </span>
                  </div>
                  <span className="tabular-nums text-xs font-semibold text-[#FFFDF5]/80">
                    Seasonal Savings: {formatCurrency(recommendation.bundleSavings)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#FFFDF5]/85">
                  {recommendation.conciergeNote}
                </p>

                {/* Primary Recommended Offer */}
                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#FFFDF5]/10 pt-6 sm:grid-cols-12">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm sm:col-span-5">
                    <ResilientImage
                      src={recommendation.recommendedOffer.image}
                      alt={recommendation.recommendedOffer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between sm:col-span-7">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                        <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Featured Seasonal Offer</span>
                      </div>
                      <h3 className="font-display mt-1 text-2xl font-semibold text-[#FFFDF5]">
                        {recommendation.recommendedOffer.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#FFFDF5]/75">
                        {recommendation.recommendedOffer.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-baseline gap-2 tabular-nums">
                        <span className="text-xl font-bold text-[#D4AF37]">
                          {formatCurrency(recommendation.recommendedOffer.discountedPrice)}
                        </span>
                        <span className="text-xs text-[#FFFDF5]/50 line-through">
                          {formatCurrency(recommendation.recommendedOffer.originalPrice)}
                        </span>
                      </div>

                      {recommendation.recommendedOffer.actionType === 'cart' ? (
                        <button
                          type="button"
                          onClick={() => onAddToCart(recommendation.recommendedOffer)}
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-2 text-xs font-bold tracking-wider text-[#171717] uppercase transition-colors hover:bg-[#e0be4d] whitespace-nowrap shrink-0"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Add Recommended Gift</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onBookPackage(
                              recommendation.recommendedOffer.packageId || 'pkg-corporate'
                            )
                          }
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-2 text-xs font-bold tracking-wider text-[#171717] uppercase transition-colors hover:bg-[#e0be4d] whitespace-nowrap shrink-0"
                        >
                          <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Reserve This Offer</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Complementary Event Package Pairing */}
              <div className="mt-6 flex flex-col justify-between gap-4 rounded-sm border border-[#FFFDF5]/15 bg-[#064E3B]/45 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                    Complementary Event Production
                  </p>
                  <p className="font-display mt-0.5 text-xl font-semibold text-[#FFFDF5]">
                    {recommendation.recommendedPackage.title}
                  </p>
                  <p className="mt-1 text-xs text-[#FFFDF5]/75">
                    {recommendation.recommendedPackage.guestCapacity} · From{' '}
                    <span className="tabular-nums font-semibold text-[#FFFDF5]">
                      {formatCurrency(recommendation.recommendedPackage.startingPrice)}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onBookPackage(recommendation.recommendedPackage.id)}
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-sm border border-[#D4AF37]/60 bg-[#8B0000] px-5 py-2.5 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#a10606] whitespace-nowrap shrink-0"
                >
                  <CalendarCheck className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                  <span>Book Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
