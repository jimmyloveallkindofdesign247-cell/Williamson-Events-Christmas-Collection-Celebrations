import { useEffect, useState, type FormEvent } from 'react';
import { CalendarCheck, CheckCircle2, X } from 'lucide-react';
import { EVENT_PACKAGES } from '../data/christmasData';
import { formatCurrency, validateBookingForm } from '../utils/christmasLogic';

interface BookingModalProps {
  isOpen: boolean;
  initialPackageId: string;
  onClose: () => void;
}

export function BookingModal({ isOpen, initialPackageId, onClose }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packageId, setPackageId] = useState(initialPackageId || EVENT_PACKAGES[0].id);
  const [eventDate, setEventDate] = useState('2026-12-18');
  const [guestCount, setGuestCount] = useState('60');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialPackageId) {
      setPackageId(initialPackageId);
    }
  }, [initialPackageId]);

  if (!isOpen) return null;

  const selectedPackage =
    EVENT_PACKAGES.find((p) => p.id === packageId) ?? EVENT_PACKAGES[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingForm({
      name,
      email,
      phone,
      packageId,
      eventDate,
      guestCount: Number(guestCount),
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setBookingRef(`WEC-${Math.floor(4200 + Math.random() * 5700)}`);
  };

  const handleClose = () => {
    setBookingRef(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/80 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[#D4AF37]/40 bg-[#FFFDF5] p-6 text-[#171717] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close event booking modal"
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-sm border border-[#171717]/15 text-[#171717] transition-colors hover:border-[#8B0000] hover:text-[#8B0000]"
        >
          <X className="h-5 w-5" />
        </button>

        {bookingRef ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#064E3B] text-[#D4AF37]">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-[#8B0000] uppercase">
              Enquiry Reference {bookingRef}
            </p>
            <h2
              id="booking-modal-title"
              className="font-display mt-2 text-3xl font-semibold text-[#171717]"
            >
              Your Christmas Event Request Is Received
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#171717]/75">
              Thank you, <strong>{name}</strong>. Our lead event producer has reserved a provisional
              hold for <strong>{selectedPackage.title}</strong> on{' '}
              <strong>{eventDate}</strong> ({guestCount} guests) and will contact you at{' '}
              <strong>{email}</strong> within 4 business hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 min-h-[44px] rounded-sm bg-[#8B0000] px-7 py-2.5 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#064E3B]"
            >
              Return to Williamson Events
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#8B0000] uppercase">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              <span>Private &amp; Corporate Reservations</span>
            </div>
            <h2
              id="booking-modal-title"
              className="font-display mt-2 text-3xl font-semibold text-[#171717]"
            >
              Book Your Christmas Event
            </h2>
            <p className="mt-1.5 text-sm text-[#171717]/70">
              Share your celebration details to receive a tailored proposal and seasonal availability.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="booking-package" className="block text-xs font-semibold text-[#171717]">
                  Christmas Event Package
                </label>
                <select
                  id="booking-package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                >
                  {EVENT_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} (From {formatCurrency(pkg.startingPrice)})
                    </option>
                  ))}
                </select>
                {errors.packageId && (
                  <p className="mt-1 text-xs text-[#8B0000]">{errors.packageId}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold text-[#171717]">
                    Full Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-xs text-[#8B0000]">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="booking-email" className="block text-xs font-semibold text-[#171717]">
                    Email Address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@company.com"
                    className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#8B0000]">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold text-[#171717]">
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0192"
                    className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#8B0000]">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="booking-date" className="block text-xs font-semibold text-[#171717]">
                    Preferred Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-xs text-[#8B0000]">{errors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="booking-guests" className="block text-xs font-semibold text-[#171717]">
                    Estimated Guests
                  </label>
                  <input
                    id="booking-guests"
                    type="number"
                    min={2}
                    max={2000}
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="mt-1 min-h-[44px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] tabular-nums focus:border-[#8B0000] focus:outline-none"
                  />
                  {errors.guestCount && (
                    <p className="mt-1 text-xs text-[#8B0000]">{errors.guestCount}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="booking-notes" className="block text-xs font-semibold text-[#171717]">
                  Venue &amp; Styling Notes (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share venue details, dietary notes, or preferred color palette..."
                  className="mt-1 w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#171717]/10 pt-5">
                <p className="text-xs text-[#171717]/65">
                  Selected baseline:{' '}
                  <strong className="tabular-nums text-[#8B0000]">
                    {formatCurrency(selectedPackage.startingPrice)}
                  </strong>
                </p>

                <button
                  type="submit"
                  className="min-h-[46px] rounded-sm bg-[#8B0000] px-7 py-3 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#064E3B]"
                >
                  Submit Event Enquiry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
