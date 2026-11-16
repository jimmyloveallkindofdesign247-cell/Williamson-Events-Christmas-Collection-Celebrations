import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight, CalendarCheck, ShoppingBag } from 'lucide-react';
import { HERO_IMAGE } from '../data/christmasData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onBookEvent: () => void;
}

const FAIRY_LIGHTS = [
  { left: '54%', top: '12%', size: 8, delay: '0.4s' },
  { left: '63%', top: '17%', size: 10, delay: '1.2s' },
  { left: '72%', top: '10%', size: 7, delay: '2.1s' },
  { left: '81%', top: '19%', size: 9, delay: '0.6s' },
  { left: '89%', top: '13%', size: 7, delay: '1.5s' },
  { left: '94%', top: '24%', size: 8, delay: '0.9s' },
];

export function HeroSection({ onBookEvent }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(smoothProgress, [0, 1], [1.03, 1.16]);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[94vh] items-center overflow-hidden bg-[#171717] pt-20 pb-24"
    >
      {/* Fluid Scroll Parallax + Gentle Ken Burns Background */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="pointer-events-none absolute -inset-y-12 inset-x-0 will-change-transform"
        aria-hidden="true"
      >
        <div className="h-full w-full animate-ken-burns">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Williamson Events grand luxury Christmas gala ballroom with illuminated evergreen trees"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </motion.div>

      {/* Measured contrast scrim for crisp WCAG AA legibility + seamless transition into next band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#171717]/75 via-[#171717]/50 to-[#171717]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-[#171717]/35 to-transparent"
      />

      {/* Subtle warm golden fairy light ambiance */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {FAIRY_LIGHTS.map((light, index) => (
          <span
            key={index}
            style={{
              left: light.left,
              top: light.top,
              width: `${light.size}px`,
              height: `${light.size}px`,
              animationDelay: light.delay,
              boxShadow: '0 0 18px 5px rgba(212, 175, 55, 0.45)',
            }}
            className="animate-fairy-twinkle absolute rounded-full bg-[#D4AF37]/85"
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
            2026 Winter Collection · Bespoke Celebrations &amp; Festive Gifting
          </p>

          <h1 className="font-display text-balance text-[clamp(2.35rem,4.7vw,4.35rem)] leading-[1.06] font-semibold tracking-tight text-[#FFFDF5]">
            MAKE THIS CHRISTMAS MAGICAL WITH{' '}
            <span className="text-[#D4AF37]">WILLIAMSON EVENTS!</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FFFDF5]/90 sm:text-lg">
            Celebrate the season in style! Discover our exclusive Christmas offers, festive event
            packages, and unforgettable experiences designed to make your celebrations truly
            special.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#offers"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-sm bg-[#D4AF37] px-7 py-3.5 text-xs font-bold tracking-wider text-[#171717] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e0be4d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF5]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span>SHOP CHRISTMAS OFFERS</span>
            </a>

            <button
              type="button"
              onClick={onBookEvent}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-sm border border-[#D4AF37]/70 bg-[#8B0000]/90 px-7 py-3.5 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#8B0000] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              <CalendarCheck className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              <span>BOOK YOUR CHRISTMAS EVENT</span>
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-y-2 border-t border-[#FFFDF5]/15 pt-6 text-xs text-[#FFFDF5]/75 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <span>Early-Season Offers up to 25% Off</span>
            <span aria-hidden="true" className="hidden text-[#D4AF37] sm:inline">
              ·
            </span>
            <span>Private Residences &amp; Corporate Venues</span>
            <span aria-hidden="true" className="hidden text-[#D4AF37] sm:inline">
              ·
            </span>
            <a
              href="#gift-finder"
              className="inline-flex items-center gap-1 font-medium text-[#D4AF37] transition-colors hover:text-[#FFFDF5]"
            >
              <span>Try the Festive Gift Finder</span>
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom seamless blend divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#171717] to-transparent"
      />
    </section>
  );
}
