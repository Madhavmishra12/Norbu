'use client';

import { FormEvent, useEffect, useState } from 'react';

const media = '/norbu/2022';
const bookingUrl = 'https://staahmax.staah.net/be/indexpackdetail?propertyId=NDAxNg%3D%3D&individual=true';
const heroSlides = [
  `${media}/06/Home.webp`,
  `${media}/06/Gallery-1a-scaled.webp`,
  `${media}/06/gallery-1b-scaled.webp`,
  `${media}/06/Gallery-1c-scaled.webp`,
  `${media}/06/meetings-solo-ilustra-scaled-1-scaled.webp`,
];

const formatBookingDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
};

const suites = [
  {
    name: 'Presidential Suite',
    description: 'Live it up yeti-style in our stunning presidential suite. Luxurious interiors, a deep soak tub, panoramic mountain views, a private bar, a large terrace and your personal butler.',
    image: `${media}/04/yetisabode.jpg`,
    anchor: 'yetisab',
  },
  {
    name: "Yeti's Ku-Gu",
    description: 'Unwind in complete privacy, with unobstructed corner views of the mountains and lake.',
    image: `${media}/04/yestkugu.jpg`,
    anchor: 'yetiskg',
  },
  {
    name: 'Mountain View Suites',
    description: 'Wake to changing mountain light, then linger on your private terrace above the Kangra Valley.',
    image: `${media}/05/habitacionmont.jpg`,
    anchor: 'mountain-view',
  },
  {
    name: 'Tea Garden Suites',
    description: 'A peaceful hideaway surrounded by the colour and quiet of Dharamshala’s tea gardens.',
    image: `${media}/04/teagardensuite.jpg`,
    anchor: 'tea-garden',
  },
  {
    name: 'Tea Experience Suites',
    description: 'Settle into a spacious suite inspired by the gardens, flavours and stories of Kangra tea.',
    image: `${media}/04/teaexperiencesuite.jpg`,
    anchor: 'tea-experience',
  },
  {
    name: 'Pawcations Room',
    description: 'A welcoming retreat for you and your four-legged companion, with thoughtful comforts and room to unwind together.',
    image: '/norbu/2026/pawcations-room.jpg',
    anchor: 'happy-paws',
  },
];

const gallerySlides = [
  `${media}/06/Gallery-1d-scaled.webp`,
  `${media}/06/Gallery-1a-scaled.webp`,
  `${media}/06/gallery-1b-scaled.webp`,
  `${media}/06/Gallery-1c-scaled.webp`,
  `${media}/06/Gallery-1e-scaled.webp`,
  '/norbu/2026/bathroom.jpg',
];

const experiences = [
  {
    title: 'BARBEQUE BY THE RIVER',
    description: 'A riverside fire pit, live music and the cool mountain air set the scene for an evening outdoors.',
    details: 'Gather with friends beside the Lhasa river for a fireside barbecue, mountain breezes and an evening under the stars. Ask our team about availability and arrangements.',
    image: '/norbu/2026/experiences/barbeque-by-the-river.jpg',
    alt: 'Barbeque by a riverside fire pit',
  },
  {
    title: 'HILLTOP LUNCH',
    description: 'Take a slow, freshly prepared lunch above the valley with open views of the surrounding mountains.',
    details: 'Enjoy an easy-paced barbecue lunch on a scenic hilltop, surrounded by panoramic views and drifting clouds. Contact the team to plan a private meal.',
    image: '/norbu/2026/experiences/hilltop-lunch.jpg',
    alt: 'A long outdoor lunch table among the hills',
  },
  {
    title: 'COSMIC CONVERSATIONS',
    description: 'Spend time in meditation and thoughtful conversation with visiting monks in the quiet of the hills.',
    details: 'Visiting guest monks share spiritual teachings and offer personal consultations, making space for reflection, mindfulness and a renewed perspective.',
    image: '/norbu/2026/experiences/cosmic-conversations.jpg',
    alt: 'Two visiting monks in the gardens',
  },
  {
    title: 'ADVENTURES IN GASTRONOMY',
    description: 'Discover Tibetan flavours through an eight-course tasting menu made with fresh, organic ingredients.',
    details: 'A considered eight-course Tibetan degustation brings together organic ingredients, regional flavours and a mountain setting. Ask our team about menus and availability.',
    image: '/norbu/2026/experiences/adventures-in-gastronomy.jpg',
    alt: 'A carefully presented Tibetan tasting menu',
  },
  {
    title: 'CULINARY SESSIONS',
    description: 'Join the chefs for a hands-on session, from baking something sweet to creating a gourmet dish.',
    details: 'Learn alongside the hotel’s chefs as they share techniques and ideas for everything from artisanal baking to gourmet cooking.',
    image: '/norbu/2026/experiences/culinary-sessions.jpg',
    alt: 'A chef preparing a dish in the kitchen',
  },
  {
    title: 'LAKESIDE EXPERIENCES',
    description: 'Enjoy a private riverside dinner, cocktail soirée or intimate barbecue beside the water.',
    details: 'Spend an unhurried evening by the Lhasa river with private dining, cocktails or a small barbecue arranged for your group.',
    image: '/norbu/2026/experiences/lakeside-experiences.jpg',
    alt: 'A private dining experience beside the river',
  },
  {
    title: 'MIXOLOGY SESSIONS',
    description: 'Explore cocktail-making with an expert mixologist at the poolside bar.',
    details: 'Discover new flavours and techniques in an interactive session led by the hotel’s mixologist. Contact the team for current timings and availability.',
    image: '/norbu/2026/experiences/mixology-sessions.jpg',
    alt: 'A colourful cocktail prepared at the poolside bar',
  },
];

const wellnessPractices = [
  'Yoga',
  'Meditation',
  'Rebirthing & inner-child breathwork',
  'Aura reading',
  'Spiritual counselling',
  'Chakra balancing',
  'Sound healing',
  'Past-life regression',
];

const astrologyReadings = [
  'Natal horoscope',
  'Yearly horoscope',
  'Marital compatibility horoscope',
  'Medical horoscope',
  'Miscellaneous calculations',
];

const venueSpaces = [
  { name: 'Pool', description: 'Enjoy time by the outdoor pool, a relaxed setting to pause between mountain adventures.', image: `${media}/05/met05y06.webp`, alt: 'The outdoor pool with the mountains beyond' },
  { name: 'Pool deck', description: 'An open-air setting beside the water for intimate gatherings and easy-going celebrations.', image: `${media}/06/meetings-solo-ilustra-scaled-1-scaled.webp`, alt: 'An open-air terrace with mountain views' },
  { name: 'Lawns', description: 'Fresh air and mountain scenery create a natural backdrop for outdoor occasions.', image: `${media}/05/met02y03.webp`, alt: 'Outdoor dining surrounded by the hills' },
  { name: 'Banquet', description: 'A dedicated indoor setting for celebrations, meetings and private gatherings.', image: `${media}/06/Gallery-1e-scaled.webp`, alt: 'The hotel dining room set for guests' },
  { name: 'Gufa', description: 'A distinctive, intimate space for a gathering with a sense of place.', image: `${media}/06/Gallery-1a-scaled.webp`, alt: 'A warm hotel lounge with views of the valley' },
];

const meetingSlides = [
  `${media}/06/meetings-solo-ilustra-scaled-1-scaled.webp`,
  `${media}/05/met02y03.webp`,
  `${media}/05/met03y04.webp`,
  `${media}/05/met04y05.webp`,
  `${media}/05/met05y06.webp`,
];

const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.link/2s1udm', icon: 'whatsapp' },
  { label: 'Instagram', href: 'https://www.instagram.com/norbuhotels/', icon: 'instagram' },
];

function SocialIcon({ name }: { name: string }) {
  const common = { 'aria-hidden': true as const, viewBox: '0 0 24 24', focusable: false as const };

  if (name === 'whatsapp') return (
    <svg {...common}>
      <path d="M20.4 11.8a8.3 8.3 0 0 1-12.3 7.3L3 20.5l1.5-4.9a8.3 8.3 0 1 1 15.9-3.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.3 7.7c-.3.3-.7.8-.7 1.6s.5 1.7.7 2c.2.4 1.8 2.9 4.3 3.9 2.1.8 2.5.6 3 .5.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2s-.3-.2-.7-.4l-1.6-.8c-.2-.1-.4-.1-.6.2l-.7.9c-.2.2-.4.2-.7.1a7 7 0 0 1-2-1.3 7.7 7.7 0 0 1-1.4-1.8c-.1-.2 0-.4.1-.5l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5Z" fill="currentColor" />
    </svg>
  );

  if (name === 'instagram') return (
    <svg {...common}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.65" cy="6.5" r="1.15" fill="currentColor" />
    </svg>
  );

  return null;
}

function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`nh-social${footer ? ' nh-social-footer' : ''}`} aria-label="Norbu on social media">
      {socialLinks.map((item) => (
        <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">
          <SocialIcon name={item.icon} />
        </a>
      ))}
    </div>
  );
}

function PhotoSlider({
  images,
  index,
  onChange,
  label,
}: {
  images: string[];
  index: number;
  onChange: (next: number) => void;
  label: string;
}) {
  const advance = (step: number) => onChange((index + step + images.length) % images.length);
  return (
    <div className="nh-photo-slider" aria-label={label}>
      <div className={`nh-photo-frame${images[index].endsWith('/bathroom.jpg') ? ' is-contained' : ''}`} aria-live="polite">
        <img key={images[index]} src={images[index]} alt={images[index].endsWith('/bathroom.jpg') ? 'Bathroom with freestanding bath and mountain view' : `${label} view ${index + 1}`} />
      </div>
      <button className="nh-gallery-arrow nh-rail-prev" onClick={() => advance(-1)} aria-label={`Previous ${label.toLowerCase()} photo`}>
        <span aria-hidden="true">‹</span>
      </button>
      <button className="nh-gallery-arrow nh-rail-next" onClick={() => advance(1)} aria-label={`Next ${label.toLowerCase()} photo`}>
        <span aria-hidden="true">›</span>
      </button>
      <div className="nh-rail-dots" aria-label={`${label} slide ${index + 1} of ${images.length}`}>
        {images.map((_, dot) => (
          <button key={dot} aria-label={`Show ${label.toLowerCase()} photos ${dot + 1}`} aria-pressed={index === dot} className={index === dot ? 'is-active' : ''} onClick={() => onChange(dot)} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [suiteStart, setSuiteStart] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [meetingIndex, setMeetingIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [rooms, setRooms] = useState('1');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const site = document.querySelector('.norbu-site');
    if (!site) return;

    const revealThreshold = 0.08;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= revealThreshold) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: [0, revealThreshold], rootMargin: '0px 0px -8% 0px' });

    const parallaxItems = new Set<HTMLElement>();
    const collectScrollMotion = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.matches('[data-scroll-parallax]')) parallaxItems.add(node);
      node.querySelectorAll<HTMLElement>('[data-scroll-parallax]').forEach((element) => parallaxItems.add(element));
    };
    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      parallaxItems.forEach((element) => {
        if (!element.isConnected) {
          parallaxItems.delete(element);
          return;
        }
        // Measure the untransformed section, not the moving image. This keeps
        // the position stable and reversible at every scroll position.
        const bounds = (element.closest('section') ?? element.parentElement ?? element).getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
        const centeredProgress = progress - 0.5;
        const strength = Number(element.dataset.scrollParallax) || 0;
        const offset = centeredProgress * Math.min(viewportHeight, 1000) * strength;
        const rotation = centeredProgress * (Number(element.dataset.scrollRotate) || 0);
        element.style.setProperty('--nh-parallax-y', `${offset.toFixed(2)}px`);
        element.style.setProperty('--nh-parallax-rotation', `${rotation.toFixed(2)}deg`);
      });
    };
    const queueParallaxUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };
    const collectItems = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.matches('[data-reveal]')) revealObserver.observe(node);
      node.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => revealObserver.observe(element));
      collectScrollMotion(node);
    };

    site.classList.add('nh-motion-ready');
    collectItems(site);
    queueParallaxUpdate();
    window.addEventListener('scroll', queueParallaxUpdate, { passive: true });
    window.addEventListener('resize', queueParallaxUpdate);
    const contentObserver = new MutationObserver((changes) => {
      changes.forEach((change) => change.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) collectItems(node);
      }));
    });
    contentObserver.observe(site, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      contentObserver.disconnect();
      window.removeEventListener('scroll', queueParallaxUpdate);
      window.removeEventListener('resize', queueParallaxUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      site.classList.remove('nh-motion-ready');
    };
  }, []);

  useEffect(() => {
    if (!bookingOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBookingOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [bookingOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openBooking = () => {
    const localDate = (date: Date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const arrival = new Date();
    arrival.setDate(arrival.getDate() + 1);
    const today = new Date();
    const selectedArrival = checkIn || localDate(arrival);
    setTodayDate(localDate(today));
    if (!checkIn) setCheckIn(selectedArrival);
    if (!checkOut || checkOut <= selectedArrival) {
      const selectedDeparture = new Date(`${selectedArrival}T12:00:00`);
      selectedDeparture.setDate(selectedDeparture.getDate() + 1);
      setCheckOut(localDate(selectedDeparture));
    }
    setBookingOpen(true);
  };

  const continueBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({
      checkIn: formatBookingDate(checkIn),
      checkOut: formatBookingDate(checkOut),
      roomadult: guests,
      roomchild: '0',
      rooms,
      currency: 'INR',
      submit: 'Search',
      promoCode: '',
    });
    window.open(`${bookingUrl}&${params.toString()}`, '_blank', 'noopener,noreferrer');
    setBookingOpen(false);
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const visibleSuites = [-1, 0, 1].map((offset) => suites[(suiteStart + offset + suites.length) % suites.length]);

  return (
    <main className="norbu-site">
      <section
        className="nh-hero"
        id="home"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onFocusCapture={() => setHeroPaused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeroPaused(false); }}
      >
        <div className="nh-hero-backgrounds" aria-hidden="true">
          {heroSlides.map((image, index) => <img key={image} src={image} alt="" className={heroSlide === index ? 'is-active' : ''} />)}
        </div>
        <div className="nh-utility">
          <a className="nh-phone" href="tel:+918894055112"><span aria-hidden="true">↗</span> CALL US: +91 8894055112</a>
          <SocialLinks />
        </div>
        <header className="nh-header">
          <button className={`nh-menu-button${menuOpen ? ' is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
          <a className="nh-header-link nh-table-link" href="tel:+918894055112">BOOK A TABLE</a>
          <a href="#home" className="nh-logo" aria-label="Norbu The Montanna home">
            <img src={`${media}/03/Recurso-2-300x106.png`} alt="Norbu The Montanna" />
          </a>
          <button className="nh-header-link nh-room-link" onClick={openBooking}>BOOK A ROOM</button>
          <span className="nh-header-spacer" aria-hidden="true" />
        </header>
        {menuOpen && (
          <nav className="nh-menu-panel" aria-label="Main navigation">
            <button onClick={() => scrollTo('discover')}>Discover</button>
            <button onClick={() => scrollTo('suites')}>Rooms</button>
            <button onClick={() => scrollTo('dining')}>Dining</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('experiences')}>Experiences</button>
            <button onClick={() => scrollTo('wellness')}>Wellness</button>
            <button onClick={() => scrollTo('event-spaces')}>Event spaces</button>
            <button onClick={() => scrollTo('weddings')}>Weddings</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
        )}
        <div className="nh-hero-center" data-reveal="up">
          <img className="nh-hero-seal" data-scroll-parallax="0.045" src={`${media}/04/NNARANJA.png`} alt="" />
          <p className="nh-hero-kicker">A HIMALAYAN HIDEAWAY</p>
          <h1>Norbu The Montanna</h1>
          <p className="nh-hero-place">DHARAMSHALA <span>·</span> HIMACHAL PRADESH</p>
          <button className="nh-hero-cta" onClick={() => scrollTo('discover')}>DISCOVER THE MOUNTAIN <span aria-hidden="true">↓</span></button>
        </div>
        <div className="nh-hero-bottom">
          <button onClick={() => scrollTo('contact')}>LOCATION <span aria-hidden="true">↗</span></button>
          <div className="nh-hero-dots" aria-label={`Hero photo ${heroSlide + 1} of ${heroSlides.length}`}>
            {heroSlides.map((_, index) => <button key={index} aria-label={`Show hero photo ${index + 1}`} aria-pressed={heroSlide === index} className={heroSlide === index ? 'is-active' : ''} onClick={() => setHeroSlide(index)} />)}
          </div>
          <button onClick={() => scrollTo('gallery')}>VIEW GALLERY <span aria-hidden="true">↗</span></button>
        </div>
        <button className="nh-hero-arrow nh-hero-prev" aria-label="Previous hero image" onClick={() => setHeroSlide((heroSlide + heroSlides.length - 1) % heroSlides.length)}>←</button>
        <button className="nh-hero-arrow nh-hero-next" aria-label="Next hero image" onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)}>→</button>
      </section>

      <section className="nh-discover" id="discover">
        <div className="nh-discover-art" data-reveal="left">
          <img className="nh-discover-mark" data-scroll-parallax="0.035" src={`${media}/04/NNARANJA.png`} alt="" />
          <img className="nh-discover-leaves" data-scroll-parallax="0" data-scroll-rotate="-40" src={`${media}/04/naranjahojas.png`} alt="" />
          <span className="nh-art-caption">A JEWEL IN THE KANGRA VALLEY</span>
        </div>
        <div className="nh-discover-copy" data-reveal="right">
          <p className="nh-kicker">A PLACE TO FIND YOUR PACE</p>
          <h2>Discover Norbu<br />The Montanna</h2>
          <p className="nh-discover-lead">Something new is coming to the Kangra Valley. Timeless traditions meet contemporary comfort on the edge of the Himalayas.</p>
          <p>Settle into Dharamshala’s slower rhythm, surrounded by cedar-covered hills, mountain air and a rich Tibetan heritage. Here, every day begins with a view and leaves room for a little discovery.</p>
          <div className="nh-location-line"><span className="nh-location-mark" aria-hidden="true">⌖</span><span>Dharamshala<br /><small>Himachal Pradesh, India</small></span></div>
          <button className="nh-text-link" onClick={() => scrollTo('suites')}>EXPLORE YOUR STAY <span aria-hidden="true">↗</span></button>
        </div>
      </section>

      <section className="nh-suites" id="suites">
        <div className="nh-section-intro nh-suite-intro" data-reveal="up">
          <p className="nh-kicker">ROOMS &amp; SUITES</p>
          <h2>Settle in. Look out.</h2>
          <p>Thoughtful hideaways, each with its own way of bringing the mountains close. Find the space that feels like yours.</p>
        </div>
        <div className="nh-suite-carousel" aria-roledescription="carousel" aria-label="Norbu rooms and suites">
          <div className="nh-suite-track">
            {visibleSuites.map((suite, slot) => (
              <article className={`nh-suite-card nh-suite-card-${slot}${suite.anchor === 'happy-paws' ? ' nh-suite-card-pawcations' : ''}`} key={`${suite.anchor}-${slot}`} data-reveal="up" style={{ transitionDelay: `${slot * 90}ms` }}>
                <img src={suite.image} alt={suite.name} />
                <div className="nh-suite-shade" />
                <div className="nh-suite-card-copy">
                  <span className="nh-suite-count">0{(suites.indexOf(suite) + 1).toString()} <i>/ {`${suites.length}`.padStart(2, '0')}</i></span>
                  <h3>{suite.name}</h3>
                  <p>{suite.description}</p>
                  <button type="button" onClick={openBooking}>CHECK AVAILABILITY <span aria-hidden="true">↗</span></button>
                </div>
              </article>
            ))}
          </div>
          <button className="nh-round-arrow nh-suite-prev" aria-label="Previous suite" onClick={() => setSuiteStart((suiteStart - 1 + suites.length) % suites.length)}>←</button>
          <button className="nh-round-arrow nh-suite-next" aria-label="Next suite" onClick={() => setSuiteStart((suiteStart + 1) % suites.length)}>→</button>
        </div>
        <div className="nh-suite-dots" aria-label={`Suite ${suiteStart + 1} of ${suites.length}`}>
          {suites.map((suite, index) => <button key={suite.anchor} aria-label={`Show ${suite.name}`} aria-pressed={suiteStart === index} className={suiteStart === index ? 'is-active' : ''} onClick={() => setSuiteStart(index)} />)}
        </div>
      </section>

      <section className="nh-dining" id="dining">
        <div className="nh-dining-illustration" data-reveal="left">
          <img className="nh-dining-plate" data-scroll-parallax="0" data-scroll-rotate="40" src={`${media}/04/platonamak.png`} alt="A selection of dishes from Namak restaurant" />
          <img className="nh-dining-flower" data-scroll-parallax="0.15" src={`${media}/04/floresamarillas-1.png`} alt="" />
          <span className="nh-dining-stamp">GATHER<br />AROUND<br />THE TABLE</span>
        </div>
        <div className="nh-dining-copy" data-reveal="right">
          <p className="nh-kicker">FLAVOURS OF THE HILLS</p>
          <img className="nh-namak-logo" src={`${media}/04/namak-300x56.png`} alt="Namak" />
          <h2>Good food.<br />Good company.</h2>
          <p>Namak is the word for salt, and in our kitchen we use varieties. Choose from a selection of Indian, Tibetan and international cuisine, or find a new delight in the chef’s special menu. All-day dining that’s worth its salt.</p>
          <a className="nh-dark-button" href="tel:+918894055112">BOOK A TABLE <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="nh-gallery" id="gallery">
        <PhotoSlider images={gallerySlides} index={galleryIndex} onChange={setGalleryIndex} label="Moments in the mountains" />
      </section>

      <section className="nh-experiences" id="experiences">
        <div className="nh-experiences-heading" data-reveal="up">
          <h2>STILLNESS IN <strong>THE MOUNTAINS</strong></h2>
          <p>Experience a sense of calm through nature-inspired moments within the property. From quiet outdoor pursuits to unhurried leisure, each experience reflects the serenity of the hills. Simple yet immersive, these moments invite you to slow down and take in the quiet beauty of the mountains.</p>
        </div>
        <div className="nh-experience-grid">
          {experiences.map((experience) => (
            <article className="nh-experience-card" key={experience.title}>
              <img src={experience.image} alt={experience.alt} />
              <div className="nh-experience-card-copy">
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <details>
                  <summary><span className="nh-know-more">KNOW MORE</span><span className="nh-know-less">KNOW LESS</span><span className="nh-experience-arrow" aria-hidden="true">↗</span></summary>
                  <p>{experience.details}</p>
                  <button className="nh-experience-enquire" onClick={() => scrollTo('contact')}>ENQUIRE <span aria-hidden="true">↗</span></button>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nh-wellness" id="wellness">
        <div className="nh-wellness-heading" data-reveal="up">
          <p className="nh-kicker">RESTORE YOUR RHYTHM</p>
          <h2>Wellness, with room to breathe.</h2>
          <p>Find space for stillness, reflection and renewal in the calm of the mountains.</p>
        </div>
        <div className="nh-wellness-grid">
          <article className="nh-wellness-card" data-reveal="left">
            <p className="nh-kicker">LONGER RETREATS</p>
            <h3>Practices for a deeper pause</h3>
            <p>These wellness experiences are offered as longer retreats. Please get in touch with our team for more information, planning and availability.</p>
            <ul className="nh-wellness-practices">
              {wellnessPractices.map((practice) => <li key={practice}>{practice}</li>)}
            </ul>
          </article>
          <article className="nh-wellness-card nh-tibetan-card" data-reveal="right">
            <p className="nh-kicker">TIBETAN WELLNESS</p>
            <h3>Traditional knowledge</h3>
            <p>Enquire about consultations with a Tibetan doctor and astrology services through the Men-Tsee-Khang organisation.</p>
            <h4>Tibetan astrology readings</h4>
            <ul className="nh-reading-list">
              {astrologyReadings.map((reading) => <li key={reading}>{reading}</li>)}
            </ul>
            <button className="nh-text-link" onClick={() => scrollTo('contact')}>ASK OUR TEAM <span aria-hidden="true">↗</span></button>
          </article>
        </div>
      </section>

      <section className="nh-amenities" id="amenities">
        <div className="nh-amenity-copy" data-reveal="left">
          <p className="nh-kicker">TIME TO UNWIND</p>
          <h2>Make room for a slower day.</h2>
          <p>Take a refreshing dip in the outdoor pool, then make time for a restorative visit to the spa. Ask our team about current facilities, treatments and availability during your stay.</p>
          <button className="nh-dark-button" onClick={() => scrollTo('contact')}>ASK ABOUT AMENITIES <span aria-hidden="true">↗</span></button>
        </div>
        <div className="nh-amenity-list" data-reveal="right">
          <article><span>01</span><div><h3>Outdoor pool</h3><p>A refreshing pause with the mountain air all around.</p></div></article>
          <article><span>02</span><div><h3>Spa</h3><p>Make time to slow down and enquire about spa experiences.</p></div></article>
        </div>
      </section>

      <section className="nh-spaces" id="event-spaces">
        <div className="nh-spaces-heading" data-reveal="up">
          <p className="nh-kicker">GATHER IN THE HILLS</p>
          <h2>Spaces for your occasion</h2>
          <p>From a celebration outdoors to a private gathering indoors, speak with our team to find the right setting and plan the details.</p>
        </div>
        <div className="nh-space-grid">
          {venueSpaces.map((space, index) => (
            <article className="nh-space-card" key={space.name} data-reveal="up" style={{ transitionDelay: `${index * 70}ms` }}>
              <img src={space.image} alt={space.alt} />
              <div className="nh-space-card-copy">
                <span>0{index + 1}</span>
                <h3>{space.name}</h3>
                <p>{space.description}</p>
                <button onClick={() => scrollTo('contact')} aria-label={`Enquire about ${space.name}`}>ENQUIRE <span aria-hidden="true">↗</span></button>
              </div>
            </article>
          ))}
        </div>
        <div className="nh-wedding-callout" id="weddings" data-reveal="up">
          <div>
            <p className="nh-kicker">A DAY TO REMEMBER</p>
            <h3>Weddings in the mountains</h3>
            <p>Share your plans with us and our team can help you explore the available spaces and arrangements.</p>
          </div>
          <button onClick={() => scrollTo('contact')} aria-label="Enquire about weddings">ENQUIRE ABOUT WEDDINGS <span aria-hidden="true">↗</span></button>
        </div>
      </section>

      <section className="nh-events" id="meetings" style={{ backgroundImage: `linear-gradient(90deg, rgba(9, 26, 25, .8), rgba(14, 34, 33, .18)), url("${meetingSlides[meetingIndex]}")` }}>
        <div className="nh-event-copy" data-reveal="left">
          <p className="nh-kicker">GATHER IN THE HIMALAYAS</p>
          <h2>Meetings &amp; events</h2>
          <p>Planning a meeting or special event? Let us handle it. Against a backdrop of stunning natural beauty, Norbu The Montanna offers a thoughtful setting for gatherings of all kinds.</p>
          <button className="nh-light-button" onClick={() => scrollTo('contact')}>TALK TO OUR TEAM <span aria-hidden="true">↗</span></button>
        </div>
        <div className="nh-event-controls">
          <span>0{meetingIndex + 1} <i>/ 05</i></span>
          <div>{meetingSlides.map((_, index) => <button key={index} aria-label={`Show event photo ${index + 1}`} aria-pressed={meetingIndex === index} className={meetingIndex === index ? 'is-active' : ''} onClick={() => setMeetingIndex(index)} />)}</div>
          <button className="nh-event-next" aria-label="Next event photo" onClick={() => setMeetingIndex((meetingIndex + 1) % meetingSlides.length)}>→</button>
        </div>
      </section>

      <footer className="nh-footer" id="contact">
        <div className="nh-footer-top">
          <div className="nh-footer-contact" data-reveal="up">
            <a className="nh-footer-logo" href="#home"><img src={`${media}/03/Recurso-2-300x106.png`} alt="Norbu The Montanna" /></a>
            <p className="nh-kicker">COME FIND YOUR MOUNTAIN</p>
            <a className="nh-footer-phone" href="tel:+918894055112">+91 8894055112</a>
            <address>Village Banordu,<br />Dharamshala,<br />Himachal Pradesh, 176052<br />India</address>
            <div className="nh-footer-links"><a href="mailto:hr@norbuhotels.com">Careers</a><a href="#hotel-policies">Hotel policies</a></div>
            <SocialLinks footer />
            <details className="nh-policy" id="hotel-policies">
              <summary>Hotel policies <span aria-hidden="true">＋</span></summary>
              <div className="nh-policy-copy">
                <h3>Reservations</h3>
                <p>Reservations must be secured by credit card, cash deposit, bank transfer or an approved credit facility. Contact the hotel directly to arrange an advance deposit or guarantee and to confirm the current payment details.</p>
                <h3>Cancellation and retention</h3>
                <p>For cancellations, the hotel’s published policy applies: 25% of the full-stay accommodation charge plus taxes within 15 days of arrival; 50% within 10 days; and 100% within 7 days.</p>
                <h3>Occupancy and additional guests</h3>
                <p>Rooms are designed for two adults. Rollaway beds are subject to availability. Up to two children below 6 years may stay at no extra charge using existing bedding. Children aged 6–12 are charged INR 5,000 plus taxes with an extra bed, subject to availability. Guests above 12 are charged INR 8,000 plus taxes with an extra bed, subject to availability.</p>
                <h3>Check-in and check-out</h3>
                <p>Check-in is from 2:00 pm and check-out is by 12:00 noon. Early arrival and late departure are subject to availability and may incur an additional charge.</p>
                <h3>Payments and visitors</h3>
                <p>A card may be pre-authorised for accommodation, taxes and INR 5,000 per day for incidentals. Currency exchange is available for in-house guests on presentation of passport and visa. Visitors must register at reception between 10:00 am and 8:00 pm; unregistered visitors are not permitted in guest rooms outside these hours.</p>
                <h3>Dining, smoking and consideration</h3>
                <p>Please use the hotel’s food and beverage facilities; outside food and drink are not permitted. Guest rooms, restaurants and public areas are non-smoking, including hookah, shisha and vaping. Smoking in a guest room may incur deep-cleaning charges. Narcotics are prohibited. Please keep music and noise at a considerate level.</p>
                <p className="nh-policy-note">Please confirm current charges and conditions with the hotel when booking, as policies may change.</p>
              </div>
            </details>
          </div>
          <div className="nh-contact-form" data-reveal="up" style={{ transitionDelay: '120ms' }}>
            <p className="nh-kicker">WE’RE HERE TO HELP</p>
            <h2>Get in touch</h2>
            <form onSubmit={submitMessage}>
              <label>Name <span>*</span><input name="name" autoComplete="name" required /></label>
              <div className="nh-form-row">
                <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required /></label>
                <label>Telephone <span>*</span><input name="telephone" type="tel" autoComplete="tel" required /></label>
              </div>
              <label>Your message to the mountain<textarea name="message" rows={3} /></label>
              <button className="nh-light-button" type="submit">SEND <span aria-hidden="true">↗</span></button>
              {sent && <p className="nh-form-note" role="status">Your enquiry isn’t sent online yet. Please call +91 8894055112 to reach our team.</p>}
            </form>
          </div>
        </div>
        <div className="nh-footer-bottom"><span>© {new Date().getFullYear()} Norbu The Montanna</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>

      {bookingOpen && (
        <div className="nh-booking-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
          <section className="nh-booking-dialog" role="dialog" aria-modal="true" aria-labelledby="nh-booking-title">
            <button className="nh-booking-close" aria-label="Close booking calendar" onClick={() => setBookingOpen(false)}>×</button>
            <p className="nh-kicker">PLAN YOUR STAY</p>
            <h2 id="nh-booking-title">Find your dates.</h2>
            <form onSubmit={continueBooking}>
              <div className="nh-booking-dates">
                <label>Check in<input type="date" min={todayDate || undefined} required value={checkIn} onChange={(event) => {
                  const nextCheckIn = event.target.value;
                  setCheckIn(nextCheckIn);
                  if (nextCheckIn && checkOut && checkOut <= nextCheckIn) {
                    const nextDay = new Date(`${nextCheckIn}T12:00:00`);
                    nextDay.setDate(nextDay.getDate() + 1);
                    const nextCheckout = `${nextDay.getFullYear()}-${`${nextDay.getMonth() + 1}`.padStart(2, '0')}-${`${nextDay.getDate()}`.padStart(2, '0')}`;
                    setCheckOut(nextCheckout);
                  }
                }} /></label>
                <label>Check out<input type="date" required min={checkIn || undefined} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
              </div>
              <div className="nh-booking-guests">
                <label>Rooms<select value={rooms} onChange={(event) => setRooms(event.target.value)}>{[1, 2, 3, 4].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'room' : 'rooms'}</option>)}</select></label>
                <label>Guests<select value={guests} onChange={(event) => setGuests(event.target.value)}>{[1, 2, 3, 4, 5, 6, 7, 8].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}</select></label>
              </div>
              <button className="nh-dark-button nh-booking-submit" type="submit">CHECK AVAILABILITY <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
