import { useState, type FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  calculateCartTotals,
  formatCurrency,
  FREE_DELIVERY_THRESHOLD,
  GIFT_WRAP_FEE,
  validateEmail,
  type CartItem,
} from '../utils/christmasLogic';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (offerId: string, delta: number) => void;
  onRemoveItem: (offerId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [giftWrap, setGiftWrap] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderReference, setOrderReference] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, giftWrap);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (customerName.trim().length < 2) errors.name = 'Please enter your full name.';
    if (!validateEmail(customerEmail)) errors.email = 'Please enter a valid email address.';
    if (customerPhone.replace(/\D/g, '').length < 7)
      errors.phone = 'Please enter a valid phone number.';
    if (deliveryAddress.trim().length < 6)
      errors.address = 'Please enter your delivery address and postal code.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setConfirmedTotal(totals.grandTotal);
    setOrderReference(`WE-${Math.floor(1040 + Math.random() * 8900)}`);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleResetAndClose = () => {
    setCheckoutStep('bag');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end bg-[#171717]/75 backdrop-blur-sm"
      onClick={handleResetAndClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#D4AF37]/30 bg-[#FFFDF5] text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#171717]/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#8B0000]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-[#171717]">
              Festive Shopping Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close shopping bag"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#171717]/15 text-[#171717] transition-colors hover:border-[#8B0000] hover:text-[#8B0000]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkoutStep === 'confirmed' ? (
            <div className="flex h-full flex-col items-center justify-center py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#064E3B] text-[#D4AF37]">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-5 text-3xl font-semibold text-[#171717]">
                Order {orderReference} Confirmed
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#171717]/75">
                Thank you, <strong>{customerName}</strong>. Our studio team is preparing your
                Christmas order ({formatCurrency(confirmedTotal)}) and has sent your receipt to{' '}
                <strong>{customerEmail}</strong>.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-8 min-h-[44px] rounded-sm bg-[#8B0000] px-7 py-2.5 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#064E3B]"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-10 w-10 text-[#171717]/25" aria-hidden="true" />
              <h3 className="font-display mt-4 text-2xl font-semibold text-[#171717]">
                Your festive bag is empty
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[#171717]/65">
                Explore our seasonal hampers, noble fir garlands, and handcrafted wreaths to begin.
              </p>
              <a
                href="#offers"
                onClick={handleResetAndClose}
                className="mt-6 inline-flex min-h-[42px] items-center rounded-sm bg-[#8B0000] px-6 py-2.5 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#064E3B]"
              >
                Browse Christmas Offers
              </a>
            </div>
          ) : checkoutStep === 'bag' ? (
            <div className="space-y-5">
              {/* Free Delivery Progress */}
              <div className="rounded-sm border border-[#064E3B]/20 bg-[#064E3B]/[0.06] px-4 py-3 text-xs text-[#064E3B]">
                {totals.qualifiesForFreeDelivery ? (
                  <span className="font-semibold">
                    Complimentary white-glove courier delivery unlocked.
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <strong className="tabular-nums">
                      {formatCurrency(FREE_DELIVERY_THRESHOLD - totals.subtotal)}
                    </strong>{' '}
                    more for complimentary white-glove delivery.
                  </span>
                )}
              </div>

              {items.map((item) => (
                <div
                  key={item.offer.id}
                  className="flex gap-4 border-b border-[#171717]/10 pb-5"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-sm bg-[#171717]/5">
                    <ResilientImage
                      src={item.offer.image}
                      alt={item.offer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg leading-tight font-semibold text-[#171717]">
                        {item.offer.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.offer.id)}
                        aria-label={`Remove ${item.offer.name} from bag`}
                        className="text-[#171717]/45 transition-colors hover:text-[#8B0000]"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-sm border border-[#171717]/15">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.offer.id, -1)}
                          aria-label={`Decrease quantity of ${item.offer.name}`}
                          className="flex h-8 w-8 items-center justify-center text-[#171717] hover:bg-[#171717]/5"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="tabular-nums px-3 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.offer.id, 1)}
                          aria-label={`Increase quantity of ${item.offer.name}`}
                          className="flex h-8 w-8 items-center justify-center text-[#171717] hover:bg-[#171717]/5"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-right tabular-nums">
                        <span className="text-sm font-bold text-[#8B0000]">
                          {formatCurrency(item.offer.discountedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Luxury Gift Wrap Toggle */}
              <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-[#171717]/15 bg-white p-4">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#8B0000]"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#171717]">
                    <span>Crimson Velvet &amp; Wax-Seal Gift Wrapping</span>
                    <span className="tabular-nums">{formatCurrency(GIFT_WRAP_FEE)}</span>
                  </div>
                  <p className="mt-1 text-[#171717]/65">
                    Includes hand-calligraphed seasonal greeting card.
                  </p>
                </div>
              </label>
            </div>
          ) : (
            /* Checkout Verification Form */
            <form id="cart-checkout-form" onSubmit={handleCheckoutSubmit} noValidate className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
                <h3 className="font-display text-xl font-semibold text-[#171717]">
                  Delivery &amp; Recipient Details
                </h3>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="text-xs font-semibold text-[#8B0000] underline"
                >
                  Edit Bag
                </button>
              </div>

              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#171717]">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                />
                {formErrors.name && <p className="mt-1 text-xs text-[#8B0000]">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-xs font-semibold text-[#171717]">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-[#8B0000]">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#171717]">
                  Telephone
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-[#8B0000]">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#171717]">
                  Delivery Address &amp; Postal Code
                </label>
                <textarea
                  id="checkout-address"
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-[#171717]/20 bg-white px-3 py-2 text-sm text-[#171717] focus:border-[#8B0000] focus:outline-none"
                />
                {formErrors.address && (
                  <p className="mt-1 text-xs text-[#8B0000]">{formErrors.address}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Totals Footer */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="border-t border-[#171717]/10 bg-white px-6 py-5">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#171717]/75">
                <span>Subtotal ({totals.itemCount} items)</span>
                <span className="tabular-nums font-medium">{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.totalSavings > 0 && (
                <div className="flex justify-between text-[#064E3B]">
                  <span>Christmas Offer Savings</span>
                  <span className="tabular-nums font-semibold">
                    −{formatCurrency(totals.totalSavings)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#171717]/75">
                <span>Delivery</span>
                <span className="tabular-nums">
                  {totals.deliveryFee === 0 ? 'Complimentary' : formatCurrency(totals.deliveryFee)}
                </span>
              </div>
              {totals.giftWrapFee > 0 && (
                <div className="flex justify-between text-[#171717]/75">
                  <span>Velvet Gift Wrapping</span>
                  <span className="tabular-nums">{formatCurrency(totals.giftWrapFee)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#171717]/10 pt-2.5 text-base font-bold text-[#171717]">
                <span>Total</span>
                <span className="tabular-nums text-[#8B0000]">
                  {formatCurrency(totals.grandTotal)}
                </span>
              </div>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="mt-4 min-h-[46px] w-full rounded-sm bg-[#8B0000] px-6 py-3 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#064E3B]"
              >
                Proceed to Order Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="cart-checkout-form"
                className="mt-4 min-h-[46px] w-full rounded-sm bg-[#064E3B] px-6 py-3 text-xs font-bold tracking-wider text-[#FFFDF5] uppercase transition-colors hover:bg-[#8B0000]"
              >
                Confirm Christmas Order ({formatCurrency(totals.grandTotal)})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
