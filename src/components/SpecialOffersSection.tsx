import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Check, ShoppingBag } from 'lucide-react';
import { SPECIAL_OFFERS, type OfferCategory, type SpecialOffer } from '../data/christmasData';
import { calculateDiscountPercent, formatCurrency } from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

interface SpecialOffersSectionProps {
  onAddToCart: (offer: SpecialOffer) => void;
  onBookOffer: (packageId: string) => void;
}

const CATEGORIES: OfferCategory[] = [
  'All',
  'Hampers & Gifts',
  'Tablescapes & Decor',
  'Event Experiences',
];

export function SpecialOffersSection({
  onAddToCart,
  onBookOffer,
}: SpecialOffersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory>('All');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredOffers =
    selectedCategory === 'All'
      ? SPECIAL_OFFERS
      : SPECIAL_OFFERS.filter((offer) => offer.category === selectedCategory);

  const handleAdd = (offer: SpecialOffer) => {
    onAddToCart(offer);
    setJustAddedId(offer.id);
    window.setTimeout(() => {
      setJustAddedId((current) => (current === offer.id ? null : current));
    }, 1600);
  };

  return (
    <section
      id="offers"
      aria-labelledby="offers-heading"
      className="relative bg-[#FFFDF5] py-24 text-[#171717]"
    >
      {/* Seamless dark-to-warm-parchment top transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#171717]/10 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-[#171717]/10 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
              Seasonal Privileges · Limited Winter Release
            </p>
            <h2
              id="offers-heading"
              className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#171717]"
            >
              CHRISTMAS SPECIAL OFFERS
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#171717]/75">
              Give yourself something special this Christmas with our exclusive festive deals.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter Christmas special offers"
            className="flex flex-wrap items-center gap-1.5 rounded-sm border border-[#171717]/10 bg-[#171717]/[0.04] p-1"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-sm px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000] ${
                    active
                      ? 'bg-[#8B0000] text-[#FFFDF5]'
                      : 'text-[#171717]/75 hover:bg-[#171717]/5 hover:text-[#171717]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-column Uniform Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredOffers.map((offer, index) => {
            const discountPercent = calculateDiscountPercent(
              offer.originalPrice,
              offer.discountedPrice
            );
            const isAdded = justAddedId === offer.id;

            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-sm border border-[#171717]/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-[0_14px_34px_-14px_rgba(23,23,23,0.16)]"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]/5">
                  <ResilientImage
                    src={offer.image}
                    alt={offer.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 rounded-sm bg-[#8B0000] px-3 py-1 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase">
                      Save {discountPercent}%
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Unboxed quiet metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#064E3B] uppercase">
                    <span>{offer.category}</span>
                    <span aria-hidden="true" className="text-[#D4AF37]">
                      ·
                    </span>
                    <span className="text-[#171717]/60">{offer.tag}</span>
                  </div>

                  <h3 className="font-display mt-2 text-2xl leading-snug font-semibold text-[#171717]">
                    {offer.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#171717]/75">
                    {offer.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-[#171717]/10 pt-4 text-xs text-[#171717]/75">
                    {offer.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-[#D4AF37]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Action Footer */}
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#171717]/10 pt-5">
                    <div className="flex items-baseline gap-2.5 tabular-nums">
                      <span className="text-xl font-bold text-[#8B0000]">
                        {formatCurrency(offer.discountedPrice)}
                      </span>
                      <span className="text-sm text-[#171717]/45 line-through">
                        {formatCurrency(offer.originalPrice)}
                      </span>
                    </div>

                    {offer.actionType === 'cart' ? (
                      <button
                        type="button"
                        onClick={() => handleAdd(offer)}
                        aria-label={`Add ${offer.name} to bag`}
                        className={`inline-flex min-h-[42px] items-center gap-2 rounded-sm px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B] ${
                          isAdded
                            ? 'bg-[#064E3B] text-[#FFFDF5]'
                            : 'bg-[#171717] text-[#FFFDF5] hover:bg-[#8B0000]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onBookOffer(offer.packageId || 'pkg-party-planning')}
                        aria-label={`Book ${offer.name}`}
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#064E3B] px-4 py-2 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors duration-200 hover:bg-[#8B0000] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B]"
                      >
                        <CalendarCheck className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                        <span>Book Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
