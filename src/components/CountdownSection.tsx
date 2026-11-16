import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { COUNTDOWN_IMAGE } from '../data/christmasData';
import { getChristmasCountdown } from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState(() => getChristmasCountdown(new Date()));
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getChristmasCountdown(new Date()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.4,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ['-14%', '14%']);
  const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [1.14, 1.06, 1.14]);

  const timeUnits = [
    { label: 'Days', value: String(countdown.days) },
    { label: 'Hours', value: padTwo(countdown.hours) },
    { label: 'Minutes', value: padTwo(countdown.minutes) },
    { label: 'Seconds', value: padTwo(countdown.seconds) },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="countdown-heading"
      className="relative overflow-hidden bg-[#171717] py-20 sm:py-24"
    >
      {/* Fluid moving festive parlor background on scroll */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-20 inset-x-0 will-change-transform"
      >
        <ResilientImage
          src={COUNTDOWN_IMAGE}
          alt="Illuminated Christmas tree and wrapped luxury gift boxes beside a warm hearth"
          className="h-full w-full object-cover object-center opacity-45"
        />
      </motion.div>

      {/* Seamless top & bottom dark gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#171717] via-[#064E3B]/55 to-[#171717]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
          Christmas Day · December 25, {countdown.targetYear}
        </p>

        <h2
          id="countdown-heading"
          className="font-display text-balance mt-3 text-[clamp(2rem,3.6vw,3.1rem)] font-semibold tracking-tight text-[#FFFDF5]"
        >
          THE MAGIC OF CHRISTMAS IS ALMOST HERE!
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#FFFDF5]/80 sm:text-base">
          Reserve bespoke event dates and handcrafted seasonal hampers before our December studio
          calendar closes.
        </p>

        {countdown.isChristmasDay ? (
          <div className="mt-10 inline-block rounded-sm border border-[#D4AF37]/60 bg-[#8B0000]/80 px-8 py-6">
            <p className="font-display text-2xl font-semibold text-[#FFFDF5]">
              Merry Christmas from Williamson Events
            </p>
          </div>
        ) : (
          <div
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            role="timer"
            aria-live="off"
          >
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="rounded-sm border border-[#D4AF37]/35 bg-[#171717]/80 px-4 py-6 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="font-display tabular-nums text-4xl font-semibold text-[#D4AF37] sm:text-5xl">
                  {unit.value}
                </div>
                <div className="mt-2 text-xs font-semibold tracking-[0.2em] text-[#FFFDF5]/80 uppercase">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
