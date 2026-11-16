import { useMemo, useState } from 'react';
import { EVENT_PACKAGES, type SpecialOffer } from './data/christmasData';
import { calculateCartTotals, type CartItem } from './utils/christmasLogic';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CountdownSection } from './components/CountdownSection';
import { EventPackagesSection } from './components/EventPackagesSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { GiftRecommendationEngine } from './components/GiftRecommendationEngine';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NewsletterSection } from './components/NewsletterSection';
import { SnowfallCanvas } from './components/SnowfallCanvas';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseSection } from './components/WhyChooseSection';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(EVENT_PACKAGES[0].id);

  const cartSummary = useMemo(() => calculateCartTotals(cartItems, false), [cartItems]);

  const handleAddToCart = (offer: SpecialOffer) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.offer.id === offer.id);
      if (existing) {
        return prev.map((item) =>
          item.offer.id === offer.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { offer, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (offerId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.offer.id === offerId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (offerId: string) => {
    setCartItems((prev) => prev.filter((item) => item.offer.id !== offerId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenBooking = (packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#171717] text-[#FFFDF5]">
      <SnowfallCanvas />
      <Navbar cartCount={cartSummary.itemCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <HeroSection onBookEvent={() => handleOpenBooking(EVENT_PACKAGES[0].id)} />
        <CountdownSection />
        <SpecialOffersSection
          onAddToCart={handleAddToCart}
          onBookOffer={(packageId) => handleOpenBooking(packageId)}
        />
        <GiftRecommendationEngine
          onAddToCart={(offer) => {
            handleAddToCart(offer);
            setIsCartOpen(true);
          }}
          onBookPackage={(packageId) => handleOpenBooking(packageId)}
        />
        <EventPackagesSection onBookPackage={(packageId) => handleOpenBooking(packageId)} />
        <WhyChooseSection />
        <GallerySection onBookFromGallery={() => handleOpenBooking(EVENT_PACKAGES[2].id)} />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer onOpenBooking={() => handleOpenBooking(EVENT_PACKAGES[0].id)} />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <BookingModal
        isOpen={isBookingOpen}
        initialPackageId={selectedPackageId}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
