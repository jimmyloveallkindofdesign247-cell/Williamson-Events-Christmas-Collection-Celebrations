import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import { EVENT_PACKAGES, HERO_IMAGE } from '../data/christmasData';
import { formatCurrency } from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

interface EventPackagesSectionProps {
  onBookPackage: (packageId: string) => void;
}

export function EventPackagesSection({ onBookPackage }: EventPackagesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.4,
  });

  const parallaxY = useTransform(smoothProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="packages"
      ref={sectionRef}
      aria-labelledby="packages-heading"
      className="relative overflow-hidden bg-[#171717] py-24 text-[#FFFDF5]"
    >
      {/* Fluid Subtle Parallax Texture Backdrop */}
      <motion.div
        style={{ y: parallaxY }}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-24 inset-x-0 opacity-[0.07] will-change-transform"
      >
        <ResilientImage
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
            Full-Scale Production &amp; Styling
          </p>
          <h2
            id="packages-heading"
            className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#FFFDF5]"
          >
            OUR CHRISTMAS EVENT PACKAGES
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#FFFDF5]/80">
            Six bespoke service suites tailored for corporate galas, intimate family evenings,
            winter weddings, and immersive holiday installations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EVENT_PACKAGES.map((pkg, index) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-sm border border-[#FFFDF5]/12 bg-[#1F1F1F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
                <ResilientImage
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1F1F1F] to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2 text-xs text-[#D4AF37]">
                  <span className="font-semibold tracking-wider uppercase">{pkg.category}</span>
                  <span className="inline-flex items-center gap-1 text-[#FFFDF5]/70">
                    <Users className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                    <span>{pkg.guestCapacity}</span>
                  </span>
                </div>

                <h3 className="font-display mt-2 text-2xl leading-snug font-semibold text-[#FFFDF5]">
                  {pkg.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#FFFDF5]/75">
                  {pkg.description}
                </p>

                <ul className="mt-5 space-y-1.5 border-t border-[#FFFDF5]/10 pt-4 text-xs text-[#FFFDF5]/80">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-[#D4AF37]"
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#FFFDF5]/10 pt-5">
                  <div>
                    <span className="block text-[11px] tracking-wider text-[#FFFDF5]/55 uppercase">
                      Starting From
                    </span>
                    <span className="tabular-nums text-lg font-bold text-[#D4AF37]">
                      {formatCurrency(pkg.startingPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookPackage(pkg.id)}
                    aria-label={`Enquire and book ${pkg.title}`}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-sm bg-[#8B0000] px-4 py-2 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#171717] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
