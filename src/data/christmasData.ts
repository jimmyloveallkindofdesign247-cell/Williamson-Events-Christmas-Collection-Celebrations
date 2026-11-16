export type OfferCategory =
  | 'All'
  | 'Hampers & Gifts'
  | 'Tablescapes & Decor'
  | 'Event Experiences';

export interface SpecialOffer {
  id: string;
  name: string;
  category: Exclude<OfferCategory, 'All'>;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  tag: string;
  actionType: 'cart' | 'book';
  packageId?: string;
  highlights: string[];
}

export interface EventPackage {
  id: string;
  title: string;
  category: string;
  description: string;
  startingPrice: number;
  guestCapacity: string;
  image: string;
  inclusions: string[];
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  iconName: 'sparkles' | 'calendar' | 'award' | 'heart' | 'tag' | 'star';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Galas' | 'Tablescapes' | 'Decor & Trees';
  venue: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  rating: number;
  quote: string;
  eventType: string;
  outcome: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_christmas_gala_1794837194042.jpg';
export const COUNTDOWN_IMAGE = '/src/assets/images/countdown_christmas_hearth_1794837198304.jpg';

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-emerald-hamper',
    name: 'The Sovereign Emerald & Gold Hamper',
    category: 'Hampers & Gifts',
    description:
      'Velvet presentation trunk filled with vintage Brut champagne, hand-blown gilded ornaments, beeswax tapers, and artisanal spiced truffles.',
    originalPrice: 360,
    discountedPrice: 270,
    image: '/src/assets/images/offer_emerald_hamper_1794837195287.jpg',
    tag: 'Signature Gift',
    actionType: 'cart',
    highlights: ['Vintage Champagne 750ml', '3 Gilded Glass Ornaments', 'Hand-poured Beeswax Tapers'],
  },
  {
    id: 'offer-garland-centerpiece',
    name: 'Candlelit Noble Fir Table Garland',
    category: 'Tablescapes & Decor',
    description:
      'Freshly woven six-foot noble fir and eucalyptus runner dressed with crimson velvet bows, gilded berries, and solid brass taper holders.',
    originalPrice: 240,
    discountedPrice: 180,
    image: '/src/assets/images/offer_garland_centerpiece_1794837196550.jpg',
    tag: 'Limited Run',
    actionType: 'cart',
    highlights: ['6ft Fresh Noble Fir', '4 Solid Brass Candlesticks', 'Crimson Velvet Ribbonwork'],
  },
  {
    id: 'offer-georgian-wreath',
    name: 'Mayfair Spruce & Brass Bell Wreath',
    category: 'Tablescapes & Decor',
    description:
      'Hand-tied blue spruce and gilded eucalyptus door wreath finished with deep crimson velvet tails and antique-finish brass sleigh bells.',
    originalPrice: 175,
    discountedPrice: 135,
    image: '/src/assets/images/offer_wreath_gold_1794837198428.jpg',
    tag: 'Doorstep Luxury',
    actionType: 'cart',
    highlights: ['24-inch Fresh Blue Spruce', 'Gilded Eucalyptus Sprigs', 'Brass Chime Bells'],
  },
  {
    id: 'offer-private-soiree',
    name: 'Fireside Private Christmas Soiree',
    category: 'Event Experiences',
    description:
      'Full drawing-room transformation with bespoke tree styling, mantel garland installation, bartender service, and curated winter canapes.',
    originalPrice: 2800,
    discountedPrice: 2150,
    image: '/src/assets/images/package_private_party_1794837195774.jpg',
    tag: 'Early Booking',
    actionType: 'book',
    packageId: 'pkg-private-party',
    highlights: ['Up to 35 Guests', 'Mixologist & Glassware', 'Full Floral & Tree Styling'],
  },
  {
    id: 'offer-catering-banquet',
    name: 'Grand Festive Banquet & Champagne Service',
    category: 'Event Experiences',
    description:
      'Three-course seasonal gourmet feast for 20 guests with rosemary champagne coupes, artisan fig tarts, and full tablescape styling.',
    originalPrice: 3400,
    discountedPrice: 2650,
    image: '/src/assets/images/package_catering_feast_1794837197057.jpg',
    tag: 'Chef Curated',
    actionType: 'book',
    packageId: 'pkg-catering',
    highlights: ['3-Course Winter Menu', 'Sommelier Champagne Pairing', 'Linen & Crystal Place Settings'],
  },
  {
    id: 'offer-corporate-gala',
    name: 'Executive Champagne Tower Gala Bundle',
    category: 'Event Experiences',
    description:
      'Turnkey corporate year-end celebration including canopy fairy lighting, six-tier champagne tower, floral centerpieces, and live jazz.',
    originalPrice: 6500,
    discountedPrice: 4950,
    image: '/src/assets/images/package_corporate_celebration_1794837195728.jpg',
    tag: 'Corporate Favourite',
    actionType: 'book',
    packageId: 'pkg-corporate',
    highlights: ['60–150 Guests', '6-Tier Champagne Tower', 'Dedicated Event Director'],
  },
];

export const EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'pkg-party-planning',
    title: 'Christmas Party Planning',
    category: 'Full-Service Production',
    description:
      'End-to-end orchestration of your festive celebration, from venue scouting and custom invitations to lighting design and midnight finale.',
    startingPrice: 2400,
    guestCapacity: '30 – 250 Guests',
    image: '/src/assets/images/hero_christmas_gala_1794837194042.jpg',
    inclusions: ['Dedicated Senior Planner', 'Venue & Vendor Curation', 'Run-of-Show Direction'],
  },
  {
    id: 'pkg-corporate',
    title: 'Corporate Christmas Celebrations',
    category: 'Executive & Team Galas',
    description:
      'Elevated end-of-year company dinners, client appreciation receptions, and black-tie galas crafted to honor your team and brand.',
    startingPrice: 4950,
    guestCapacity: '50 – 400 Guests',
    image: '/src/assets/images/package_corporate_celebration_1794837195728.jpg',
    inclusions: ['Champagne Tower Reception', 'Branded Festive Gifting', 'AV & Stage Production'],
  },
  {
    id: 'pkg-decor-styling',
    title: 'Christmas Decorations & Styling',
    category: 'Bespoke Installations',
    description:
      'Architectural evergreen trees, sweeping staircase garlands, warm fairy-light canopies, and luxury tablescapes tailored to your space.',
    startingPrice: 1450,
    guestCapacity: 'Residences & Venues',
    image: '/src/assets/images/offer_garland_centerpiece_1794837196550.jpg',
    inclusions: ['Custom Color Palette', 'White-Glove Installation', 'Post-Season Takedown'],
  },
  {
    id: 'pkg-winter-wedding',
    title: 'Wedding & End-of-Year Celebrations',
    category: 'Winter Romance',
    description:
      'Enchanting winter weddings and New Year’s Eve milestone celebrations featuring white winter roses, crystal chandeliers, and candlelight.',
    startingPrice: 5800,
    guestCapacity: '40 – 300 Guests',
    image: '/src/assets/images/package_winter_wedding_1794837197405.jpg',
    inclusions: ['Floral Arch & Tablescapes', 'Candlelit Ceremony Design', 'Evening Reception Styling'],
  },
  {
    id: 'pkg-private-party',
    title: 'Private Christmas Parties',
    category: 'Intimate Gatherings',
    description:
      'Warm, inviting townhouse soirées and family Christmas Eve dinners complete with fireside styling, cocktail trolleys, and host concierge.',
    startingPrice: 2150,
    guestCapacity: '12 – 50 Guests',
    image: '/src/assets/images/package_private_party_1794837195774.jpg',
    inclusions: ['Hearth & Tree Dressing', 'Private Bartender Service', 'Curated Playlist & Acoustics'],
  },
  {
    id: 'pkg-catering',
    title: 'Christmas Catering & Entertainment',
    category: 'Culinary & Live Arts',
    description:
      'Seasonal tasting menus, carving stations, winter cocktail bars paired with string quartets, jazz trios, and roaming performers.',
    startingPrice: 2650,
    guestCapacity: '20 – 300 Guests',
    image: '/src/assets/images/package_catering_feast_1794837197057.jpg',
    inclusions: ['Bespoke 3-Course Menu', 'Seasonal Craft Cocktails', 'Live Quartet or Jazz Trio'],
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01.',
    title: 'Creative and Unique Event Designs',
    description:
      'Every celebration is sketched from scratch around your architecture, pairing heritage holiday warmth with editorial spatial composition.',
    iconName: 'sparkles',
  },
  {
    number: '02.',
    title: 'Professional Event Planning',
    description:
      'Experienced production directors coordinate florists, chefs, lighting riggers, and musicians to a minute-by-minute schedule.',
    iconName: 'calendar',
  },
  {
    number: '03.',
    title: 'Premium Decorations and Styling',
    description:
      'We source fresh Oregon noble fir, hand-blown European glass ornaments, heavy silk-velvet ribbons, and solid brass tableware.',
    iconName: 'award',
  },
  {
    number: '04.',
    title: 'Exceptional Customer Experience',
    description:
      'From initial mood board to post-holiday pack-down, a single dedicated concierge handles every request with quiet precision.',
    iconName: 'heart',
  },
  {
    number: '05.',
    title: 'Affordable Christmas Packages',
    description:
      'Transparent seasonal pricing with bundled early-bird savings up to 25% off, allowing effortless elegance without surprise surcharges.',
    iconName: 'tag',
  },
  {
    number: '06.',
    title: 'Memorable Celebrations',
    description:
      'Thoughtful sensory details—cinnamon-infused pine, live strings, and warm candlelight—that guests remember long into the new year.',
    iconName: 'star',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Grand Heritage Ballroom Canopy',
    category: 'Galas',
    venue: 'Guildhall Great Chamber',
    image: '/src/assets/images/hero_christmas_gala_1794837194042.jpg',
    aspect: 'wide',
    caption: 'Twelve thousand warm fairy lights draped above 18-foot crimson-and-gold Christmas trees for 220 gala guests.',
  },
  {
    id: 'gal-2',
    title: 'Crimson Velvet & Brass Tablescape',
    category: 'Tablescapes',
    venue: 'Belgravia Dining Room',
    image: '/src/assets/images/offer_garland_centerpiece_1794837196550.jpg',
    aspect: 'square',
    caption: 'Hand-foraged noble fir garland woven with gilded berries, crimson velvet bows, and tall beeswax tapers.',
  },
  {
    id: 'gal-3',
    title: 'Six-Tier Champagne Gala Tower',
    category: 'Galas',
    venue: 'Merchant Taylors Hall',
    image: '/src/assets/images/package_corporate_celebration_1794837195728.jpg',
    aspect: 'tall',
    caption: 'Annual corporate holiday gala featuring a crystal champagne cascade beneath vaulted stone arches.',
  },
  {
    id: 'gal-4',
    title: 'Drawing Room Hearth & Tree',
    category: 'Decor & Trees',
    venue: 'Chelsea Townhouse',
    image: '/src/assets/images/package_private_party_1794837195774.jpg',
    aspect: 'square',
    caption: 'Intimate private residence Christmas styling with custom gold-ribboned spruce and glowing stone mantel.',
  },
  {
    id: 'gal-5',
    title: 'Winter Solstice Banquet Spread',
    category: 'Tablescapes',
    venue: 'Private Members Club',
    image: '/src/assets/images/package_catering_feast_1794837197057.jpg',
    aspect: 'wide',
    caption: 'Festive feasting table styled with rosemary champagne coupes, spiced fig tarts, and brass servingware.',
  },
  {
    id: 'gal-6',
    title: 'Winter Rose & Emerald Reception',
    category: 'Galas',
    venue: 'Orangery Conservatory',
    image: '/src/assets/images/package_winter_wedding_1794837197405.jpg',
    aspect: 'square',
    caption: 'End-of-year wedding reception layered with cascading white roses, emerald linens, and crystal chandeliers.',
  },
  {
    id: 'gal-7',
    title: 'Sovereign Velvet Gift Trunks',
    category: 'Decor & Trees',
    venue: 'Williamson Studio',
    image: '/src/assets/images/offer_emerald_hamper_1794837195287.jpg',
    aspect: 'square',
    caption: 'Custom corporate and VIP client Christmas hampers finished in deep forest velvet and champagne foil.',
  },
  {
    id: 'gal-8',
    title: 'Georgian Doorway Pine Wreath',
    category: 'Decor & Trees',
    venue: 'Mayfair Mews',
    image: '/src/assets/images/offer_wreath_gold_1794837198428.jpg',
    aspect: 'square',
    caption: 'Hand-bound blue spruce entrance wreath accented with gilded eucalyptus and antique brass bells.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Eleanor Vance',
    role: 'VP of People & Culture',
    organization: 'Alder & Sterling Capital',
    rating: 5,
    quote:
      'Our previous corporate dinners felt rushed and generic. Williamson Events transformed the Guildhall into a candlelit winter sanctuary—180 colleagues stayed until the final encore, and post-event satisfaction hit 98%.',
    eventType: 'Corporate Christmas Gala',
    outcome: '180 Guests · 98% Attendance Rating',
  },
  {
    id: 'test-2',
    name: 'Marcus & Clara Thorne',
    role: 'Private Hosts',
    organization: 'Kensington Residence',
    rating: 5,
    quote:
      'Hosting thirty family members for Christmas Eve used to mean three days of stress. Their team installed a twelve-foot tree, styled the entire dining room, and left us free to simply pour champagne and welcome our guests.',
    eventType: 'Private Christmas Party & Styling',
    outcome: 'Full Home Transformation in 5 Hours',
  },
  {
    id: 'test-3',
    name: 'Sophia Lindqvist',
    role: 'Creative Director',
    organization: 'Vespera Design Studio',
    rating: 5,
    quote:
      'We ordered forty Sovereign Emerald Hampers for our key partners. Every box arrived hand-tied with our custom card, and twelve clients wrote back within an hour calling it the finest festive gift they had ever received.',
    eventType: 'Luxury Corporate Gifting',
    outcome: '40 Bespoke Hampers Delivered On-Time',
  },
  {
    id: 'test-4',
    name: 'Julian & Hannah Beaumont',
    role: 'Winter Wedding Couple',
    organization: 'December 20th Celebration',
    rating: 5,
    quote:
      'We wanted festive warmth without clichés. The white winter roses, emerald velvet napkins, and overhead fairy-light canopy struck the exact balance of timeless romance and holiday magic.',
    eventType: 'Winter Wedding Reception',
    outcome: '140 Guests · Seamless 12-Hour Production',
  },
];
