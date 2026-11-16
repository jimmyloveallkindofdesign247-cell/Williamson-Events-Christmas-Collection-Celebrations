import { useState, type FormEvent } from 'react';
import { Check, Instagram, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { validateEmail } from '../utils/christmasLogic';

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);
  const [footerError, setFooterError] = useState('');

  const handleFooterSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(footerEmail)) {
      setFooterError('Enter a valid email address.');
      return;
    }
    setFooterError('');
    setFooterSubscribed(true);
    setFooterEmail('');
  };

  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#171717] pt-16 pb-10 text-[#FFFDF5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-[#FFFDF5]/10 pb-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#top"
              className="font-display text-2xl font-semibold tracking-wide text-[#FFFDF5]"
            >
              WILLIAMSON EVENTS
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FFFDF5]/70">
              Luxury Christmas event planning, bespoke holiday installations, and curated seasonal
              hampers crafted for unforgettable winter celebrations.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#newsletter"
                aria-label="Williamson Events Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#FFFDF5]/15 text-[#FFFDF5]/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#newsletter"
                aria-label="Share Williamson Events"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#FFFDF5]/15 text-[#FFFDF5]/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:concierge@williamsonevents.com"
                aria-label="Email Williamson Events"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#FFFDF5]/15 text-[#FFFDF5]/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FFFDF5]/75">
              <li>
                <a href="#offers" className="transition-colors hover:text-[#D4AF37]">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#packages" className="transition-colors hover:text-[#D4AF37]">
                  Event Packages
                </a>
              </li>
              <li>
                <a href="#gift-finder" className="transition-colors hover:text-[#D4AF37]">
                  Gift Finder
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-[#D4AF37]">
                  Festive Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-[#D4AF37]">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Studio Concierge
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#FFFDF5]/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <span>24 Mount Street, Mayfair, London W1K 2TH</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <a href="tel:+442079460821" className="transition-colors hover:text-[#D4AF37]">
                  +44 (0) 20 7946 0821
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <a
                  href="mailto:concierge@williamsonevents.com"
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  concierge@williamsonevents.com
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={onOpenBooking}
              className="mt-5 inline-flex min-h-[40px] items-center rounded-sm border border-[#D4AF37]/50 px-4 py-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase transition-colors hover:bg-[#D4AF37] hover:text-[#171717]"
            >
              Book Consultation
            </button>
          </div>

          {/* Compact Footer Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Seasonal Updates
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-[#FFFDF5]/70">
              Receive private invitations to late-season dates and limited festive hamper releases.
            </p>
            {footerSubscribed ? (
              <div className="mt-4 flex items-center gap-2 text-xs text-[#D4AF37]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Subscribed to seasonal dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleFooterSubscribe} noValidate className="mt-4">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Footer newsletter email
                </label>
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={footerEmail}
                    onChange={(e) => {
                      setFooterEmail(e.target.value);
                      if (footerError) setFooterError('');
                    }}
                    placeholder="Email address"
                    className="min-h-[40px] w-full rounded-sm border border-[#FFFDF5]/20 bg-[#1F1F1F] px-3 py-2 text-xs text-[#FFFDF5] placeholder:text-[#FFFDF5]/45 focus:border-[#D4AF37] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="min-h-[40px] rounded-sm bg-[#8B0000] px-4 py-2 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#D4AF37] hover:text-[#171717] whitespace-nowrap shrink-0"
                  >
                    Join
                  </button>
                </div>
                {footerError && (
                  <p className="mt-1.5 text-xs text-[#D4AF37]">{footerError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#FFFDF5]/55 sm:flex-row">
          <p>© 2026 Williamson Events. All Rights Reserved.</p>
          <p>Bespoke Christmas Celebrations · Corporate Galas · Luxury Hampers</p>
        </div>
      </div>
    </footer>
  );
}
