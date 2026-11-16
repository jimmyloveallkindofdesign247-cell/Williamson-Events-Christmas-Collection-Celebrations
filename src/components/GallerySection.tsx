import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/christmasData';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  onBookFromGallery: () => void;
}

type GalleryFilter = 'All' | 'Galas' | 'Tablescapes' | 'Decor & Trees';

const FILTERS: GalleryFilter[] = ['All', 'Galas', 'Tablescapes', 'Decor & Trees'];

export function GallerySection({ onBookFromGallery }: GallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const visibleItems =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative bg-[#171717] py-24 text-[#FFFDF5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#FFFDF5]/10 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
              Curated Portfolio
            </p>
            <h2
              id="gallery-heading"
              className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#FFFDF5]"
            >
              LUXURY CHRISTMAS GALLERY
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#FFFDF5]/80">
              Step inside our candlelit ballrooms, bespoke evergreen installations, and festive
              holiday tablescapes.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery images"
            className="flex flex-wrap items-center gap-1.5 rounded-sm border border-[#FFFDF5]/15 bg-[#1F1F1F] p-1"
          >
            {FILTERS.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(cat)}
                  className={`min-h-[40px] rounded-sm px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#171717]'
                      : 'text-[#FFFDF5]/80 hover:bg-[#FFFDF5]/5 hover:text-[#FFFDF5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modern Editorial Masonry-Inspired Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item, idx) => {
            const spanClass =
              item.aspect === 'wide' && filter === 'All'
                ? 'sm:col-span-2 aspect-[16/10]'
                : 'aspect-[4/3]';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`group relative overflow-hidden rounded-sm border border-[#FFFDF5]/10 bg-[#1F1F1F] ${spanClass}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  aria-label={`Inspect ${item.title} in lightbox`}
                  className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                >
                  <ResilientImage
                    src={item.image}
                    alt={`${item.title} at ${item.venue}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                        {item.category} · {item.venue}
                      </p>
                      <h3 className="font-display mt-1 text-xl font-semibold text-[#FFFDF5]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#FFFDF5]/25 bg-[#171717]/70 text-[#FFFDF5] transition-colors group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                      <Expand className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-[#D4AF37]/40 bg-[#1F1F1F]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close gallery preview"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-sm border border-[#FFFDF5]/25 bg-[#171717]/80 text-[#FFFDF5] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/10] w-full bg-[#171717]">
              <ResilientImage
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                  {activeItem.category} · {activeItem.venue}
                </p>
                <h3 id="lightbox-title" className="font-display mt-1 text-2xl font-semibold text-[#FFFDF5]">
                  {activeItem.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-[#FFFDF5]/80">{activeItem.caption}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveItem(null);
                  onBookFromGallery();
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-2.5 text-xs font-bold tracking-wider text-[#171717] uppercase transition-colors hover:bg-[#e0be4d] whitespace-nowrap shrink-0"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                <span>Request This Style</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
