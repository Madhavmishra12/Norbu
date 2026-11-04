'use client';

import { FormEvent, useEffect, useState } from 'react';

const media = 'https://www.norbuhotels.com/wp-content/uploads/2022';
const heroSlides = [
  `${media}/06/Home.webp`,
  `${media}/06/Gallery-1a-scaled.webp`,
  `${media}/06/gallery-1b-scaled.webp`,
  `${media}/06/Gallery-1c-scaled.webp`,
  `${media}/06/meetings-solo-ilustra-scaled-1-scaled.webp`,
];

const suites = [
  {
    name: "Yeti's Abode",
    description: 'Live it up yeti-style in our stunning presidential suite. Luxurious interiors, a deep soak tub, panoramic mountain views, a private bar, a large terrace and your personal butler.',
    image: `${media}/04/yetisabode.jpg`,
    anchor: 'yetisab',
  },
  {
    name: "Yeti's A-pha",
    description: 'Discover a sumptuous one-bedroom sanctuary wrapped in views of majestic valleys, with a bar, private terrace and a glass-walled shower area.',
    image: `${media}/04/yestiapha1.jpg`,
    anchor: 'yetisap',
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
];

const gallerySlides = [
  `${media}/06/Gallery-1a-scaled.webp`,
  `${media}/06/gallery-1b-scaled.webp`,
  `${media}/06/Gallery-1c-scaled.webp`,
  `${media}/06/Gallery-1d-scaled.webp`,
  `${media}/06/Gallery-1e-scaled.webp`,
];

const meetingSlides = [
  `${media}/06/meetings-solo-ilustra-scaled-1-scaled.webp`,
  `${media}/05/met02y03.webp`,
  `${media}/05/met03y04.webp`,
  `${media}/05/met04y05.webp`,
  `${media}/05/met05y06.webp`,
];

const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.link/2s1udm', mark: 'wa' },
  { label: 'Instagram', href: 'https://www.instagram.com/norbuhotels/', mark: 'ig' },
  { label: 'Facebook', href: 'https://www.facebook.com/Norbu-Hotels-102476561129707', mark: 'f' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCdkMlfsz8WOM_B9iQ6PeGBQ', mark: '▶' },
  { label: 'Twitter', href: 'https://twitter.com/HotelsNorbu', mark: '𝕏' },
];

function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`nh-social${footer ? ' nh-social-footer' : ''}`} aria-label="Norbu on social media">
      {socialLinks.map((item) => (
        <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">
          {item.mark}
        </a>
      ))}
    </div>
  );
}

function PhotoRail({
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
  const leftIndex = index;
  const rightIndex = (index + 1) % images.length;
  const advance = (step: number) => onChange((index + step + images.length) % images.length);
  return (
    <div className="nh-photo-rail" aria-label={label} data-reveal="up">
      <div className="nh-photo-pair" aria-live="polite">
        <img src={images[leftIndex]} alt={`${label} view ${leftIndex + 1}`} />
        <img src={images[rightIndex]} alt={`${label} view ${rightIndex + 1}`} />
      </div>
      <button className="nh-round-arrow nh-rail-prev" onClick={() => advance(-1)} aria-label={`Previous ${label.toLowerCase()} photos`}>
        <span aria-hidden="true">←</span>
      </button>
      <button className="nh-round-arrow nh-rail-next" onClick={() => advance(1)} aria-label={`Next ${label.toLowerCase()} photos`}>
        <span aria-hidden="true">→</span>
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
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [meetingIndex, setMeetingIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const site = document.querySelector('.norbu-site');
    if (!site) return;

    const revealThreshold = 0.16;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= revealThreshold) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: revealThreshold, rootMargin: '0px 0px -20px 0px' });

    const observeRevealItems = (node: ParentNode) => {
      node.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((element) => revealObserver.observe(element));
    };

    site.classList.add('nh-motion-ready');
    observeRevealItems(site);
    const contentObserver = new MutationObserver((changes) => {
      changes.forEach((change) => change.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches('[data-reveal]:not(.is-visible)')) revealObserver.observe(node);
          observeRevealItems(node);
        }
      }));
    });
    contentObserver.observe(site, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      contentObserver.disconnect();
      site.classList.remove('nh-motion-ready');
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
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
          <button className="nh-header-link nh-table-link" onClick={() => scrollTo('dining')}>BOOK A TABLE</button>
          <a href="#home" className="nh-logo" aria-label="Norbu The Montanna home">
            <img src={`${media}/03/Recurso-2-300x106.png`} alt="Norbu The Montanna" />
          </a>
          <button className="nh-header-link nh-room-link" onClick={() => scrollTo('suites')}>BOOK A ROOM</button>
          <span className="nh-header-spacer" aria-hidden="true" />
        </header>
        {menuOpen && (
          <nav className="nh-menu-panel" aria-label="Main navigation">
            <button onClick={() => scrollTo('discover')}>Discover</button>
            <button onClick={() => scrollTo('suites')}>Suites</button>
            <button onClick={() => scrollTo('dining')}>Dining</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('experiences')}>Experiences</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
        )}
        <div className="nh-hero-center" data-reveal="up">
          <img className="nh-hero-seal" src={`${media}/04/NNARANJA.png`} alt="" />
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
          <img className="nh-discover-mark" src={`${media}/04/NNARANJA.png`} alt="" />
          <img className="nh-discover-leaves" src={`${media}/04/naranjahojas.png`} alt="" />
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
          <p>Six considered hideaways, each with its own way of bringing the mountains close. Find the space that feels like yours.</p>
        </div>
        <div className="nh-suite-carousel" aria-roledescription="carousel" aria-label="Norbu rooms and suites">
          <div className="nh-suite-track">
            {visibleSuites.map((suite, slot) => (
              <article className={`nh-suite-card nh-suite-card-${slot}`} key={`${suite.anchor}-${slot}`} data-reveal="up" style={{ transitionDelay: `${slot * 90}ms` }}>
                <img src={suite.image} alt={suite.name} />
                <div className="nh-suite-shade" />
                <div className="nh-suite-card-copy">
                  <span className="nh-suite-count">0{(suites.indexOf(suite) + 1).toString()} <i>/ 06</i></span>
                  <h3>{suite.name}</h3>
                  <p>{suite.description}</p>
                  <button onClick={() => scrollTo('contact')}>EXPLORE <span aria-hidden="true">↗</span></button>
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
          <img className="nh-dining-plate" src={`${media}/04/platonamak.png`} alt="A selection of dishes from Namak restaurant" />
          <img className="nh-dining-flower" src={`${media}/04/floresamarillas-1.png`} alt="" />
          <span className="nh-dining-stamp">GATHER<br />AROUND<br />THE TABLE</span>
        </div>
        <div className="nh-dining-copy" data-reveal="right">
          <p className="nh-kicker">FLAVOURS OF THE HILLS</p>
          <img className="nh-namak-logo" src={`${media}/04/namak-300x56.png`} alt="Namak" />
          <h2>Good food.<br />Good company.</h2>
          <p>Namak is the word for salt, and in our kitchen we use varieties. Choose from a selection of Indian, Tibetan and international cuisine, or find a new delight in the chef’s special menu. All-day dining that’s worth its salt.</p>
          <button className="nh-dark-button" onClick={() => scrollTo('contact')}>BOOK A TABLE <span aria-hidden="true">↗</span></button>
        </div>
      </section>

      <section className="nh-gallery" id="gallery">
        <div className="nh-gallery-heading" data-reveal="up">
          <p className="nh-kicker">A CLOSER LOOK</p>
          <h2>Moments in the mountains</h2>
        </div>
        <PhotoRail images={gallerySlides} index={galleryIndex} onChange={setGalleryIndex} label="Gallery" />
        <div className="nh-gallery-note"><span>DHARAMSHALA, AT YOUR OWN PACE</span><span>0{galleryIndex + 1} <i>/ 05</i></span></div>
      </section>

      <section className="nh-experiences" id="experiences">
        <div className="nh-experience-copy" data-reveal="left">
          <p className="nh-kicker">EXPERIENCES</p>
          <h2>Do D’shala<br />in style.</h2>
          <p>Discover the quiet splendour of the hills. Cedar forests, Tibetan culture and fresh mountain air set the scene for days that can be as restful or adventurous as you like.</p>
          <button className="nh-text-link" onClick={() => scrollTo('meetings')}>FIND YOUR MOUNTAIN MOMENT <span aria-hidden="true">↗</span></button>
        </div>
        <div className="nh-experience-image" data-reveal="right">
          <img src={gallerySlides[experienceIndex]} alt="A view of Norbu and its mountain setting" />
          <div className="nh-image-caption"><span>0{experienceIndex + 1} / 05</span><p>Make time for the view.</p></div>
          <button className="nh-round-arrow nh-exp-prev" aria-label="Previous experience view" onClick={() => setExperienceIndex((experienceIndex - 1 + gallerySlides.length) % gallerySlides.length)}>←</button>
          <button className="nh-round-arrow nh-exp-next" aria-label="Next experience view" onClick={() => setExperienceIndex((experienceIndex + 1) % gallerySlides.length)}>→</button>
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
            <div className="nh-footer-links"><a href="mailto:careers@norbuhotels.com">Careers</a><a href="#contact">Hotel policies</a></div>
            <SocialLinks footer />
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
    </main>
  );
}
