import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/christmasData';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [paused]);

  const current = TESTIMONIALS[activeIndex];
  const secondary = TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative bg-[#FFFDF5] py-24 text-[#171717]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#171717]/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
              Client Experiences
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#171717]"
            >
              WHAT OUR CLIENTS SAY
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous client testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#171717]/20 bg-white text-[#171717] transition-colors hover:border-[#8B0000] hover:text-[#8B0000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next client testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#171717]/20 bg-white text-[#171717] transition-colors hover:border-[#8B0000] hover:text-[#8B0000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Two-card Carousel View on Desktop */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {[current, secondary].map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col justify-between rounded-sm border border-[#171717]/10 bg-white p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-[#D4AF37]/60" aria-hidden="true" />
                    </div>

                    <blockquote className="font-display mt-6 text-xl leading-relaxed text-[#171717] sm:text-2xl">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-8 border-t border-[#171717]/10 pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#171717]">{review.name}</p>
                        <p className="text-xs text-[#171717]/65">
                          {review.role} · {review.organization}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-[#064E3B]">{review.eventType}</p>
                        <p className="tabular-nums text-xs text-[#171717]/60">{review.outcome}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicator Controls */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View testimonial from ${item.name}`}
              aria-current={idx === activeIndex ? 'true' : undefined}
              className={`h-2 rounded-sm transition-all duration-200 ${
                idx === activeIndex
                  ? 'w-8 bg-[#8B0000]'
                  : 'w-2.5 bg-[#171717]/20 hover:bg-[#171717]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
