import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { CheckCircle2, Mail } from 'lucide-react';
import { COUNTDOWN_IMAGE } from '../data/christmasData';
import { validateEmail } from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.4,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ['-12%', '12%']);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address to receive our Christmas specials.');
      return;
    }
    setError('');
    setSubscribedEmail(email.trim());
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden bg-[#8B0000] py-24 text-[#FFFDF5]"
    >
      {/* Fluid scroll-parallax background image */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-20 inset-x-0 opacity-20 will-change-transform"
      >
        <ResilientImage
          src={COUNTDOWN_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#8B0000]/80 via-[#8B0000]/75 to-[#171717]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
          The Festive Dispatch
        </p>

        <h2
          id="newsletter-heading"
          className="font-display text-balance mt-2 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold tracking-tight text-[#FFFDF5]"
        >
          DON&apos;T MISS OUT ON OUR CHRISTMAS SPECIALS!
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#FFFDF5]/85">
          Subscribe to receive exclusive Christmas deals, special offers, event inspiration, and
          exciting updates from Williamson Events.
        </p>

        {subscribedEmail ? (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-sm border border-[#D4AF37]/60 bg-[#171717]/80 px-6 py-5 text-sm text-[#FFFDF5]"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
            <span>
              Welcome to Williamson Events. Your seasonal invitation and 10% privilege code have
              been sent to <strong>{subscribedEmail}</strong>.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for Christmas specials
                </label>
                <Mail
                  className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#171717]/45"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="min-h-[48px] w-full rounded-sm border border-[#FFFDF5]/30 bg-[#FFFDF5] py-3 pr-4 pl-11 text-sm text-[#171717] placeholder:text-[#171717]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="min-h-[48px] rounded-sm bg-[#D4AF37] px-8 py-3 text-xs font-bold tracking-wider text-[#171717] uppercase transition-colors duration-200 hover:bg-[#e0be4d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF5]"
              >
                SUBSCRIBE
              </button>
            </div>

            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-2.5 text-left text-xs font-medium text-[#FFFDF5]"
              >
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
