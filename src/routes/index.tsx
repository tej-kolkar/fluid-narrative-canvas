import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    tab: "Brand Launch",
    title: "BRAND\nLAUNCH",
    subtitle: "Make your first arrival unforgettable.",
    body: "We build focused brand systems that enter the market with clarity, confidence, and a point of view people remember.",
  },
  {
    tab: "Brand Repositioning",
    title: "BRAND\nREPOSITIONING",
    subtitle: "Reconnect with your future customers.",
    body: "We sharpen what makes you distinct, then translate it into a digital presence built for where your business is going.",
  },
  {
    tab: "Brand Reinvention",
    title: "BRAND\nREINVENTION",
    subtitle: "Rewrite what your future demands.",
    body: "We separate the essential from the expected, transform every layer, and reassemble a brand ready for its next chapter.",
  },
  {
    tab: "Brand Elevation",
    title: "BRAND\nELEVATION",
    subtitle: "Rise to the level your business has earned.",
    body: "We extend a proven identity across screens and campaigns, creating a consistent experience at every client touchpoint.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Four Ways to Build Your Brand" },
      { name: "description", content: "A scroll-led brand transformation experience across launch, repositioning, reinvention, and elevation." },
      { property: "og:title", content: "Four Ways to Build Your Brand" },
      { property: "og:description", content: "Explore four connected stages of brand transformation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandServices,
});

function BrandServices() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeService = services[active] ?? services[0];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      setActive(Math.min(3, Math.floor(progress * 4)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const selectService = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    setActive(index);
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: section.offsetTop + (travel * index) / 3, behavior: "smooth" });
  };

  return (
    <main className="brand-page">
      <section ref={sectionRef} className="service-scroll" aria-label="Brand services">
        <div className="service-sticky">
          <header className="service-header">
            <a className="brand-mark" href="#top" aria-label="Studio home">
              <span>F</span><i />
            </a>
            <nav className="service-tabs" aria-label="Choose a brand service">
              {services.map((service, index) => (
                <button
                  key={service.tab}
                  type="button"
                  className="service-tab"
                  data-active={active === index}
                  aria-pressed={active === index}
                  onClick={() => selectService(index)}
                >
                  <span>{service.tab}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </button>
              ))}
            </nav>
            <button className="menu-button" type="button" aria-label="Open menu"><span /><span /></button>
          </header>

          <div className="service-layout" id="top">
            <div className="service-copy" aria-live="polite">
              <p className="service-count">0{active + 1} / 04</p>
              <div key={active} className="copy-enter">
                <h1>{activeService.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
                <h2>{activeService.subtitle}</h2>
                <p>{activeService.body}</p>
              </div>
              <button className="inquiry-link" type="button">Start a conversation <span aria-hidden="true">↗</span></button>
            </div>

            <LaptopSequence stage={active} />
          </div>

          <footer className="service-footer">
            <span>Strategic brand transformation</span>
            <div className="progress-track"><i style={{ width: `${(active + 1) * 25}%` }} /></div>
            <span>Scroll to explore</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

function LaptopSequence({ stage }: { stage: number }) {
  const activeService = services[stage] ?? services[0];

  return (
    <div className="device-stage" data-stage={stage} aria-label={`${activeService.tab} visual`}>
      <div className="campaign campaign-a"><small>DESIGNED TO</small><strong>MOVE</strong><span>Campaign 01</span></div>
      <div className="campaign campaign-b"><small>BUILT FOR</small><strong>NEXT</strong><span>Campaign 02</span></div>

      <div className="laptop">
        <div className="laptop-lid">
          <div className="laptop-screen">
            <div className="launch-screen"><span>YOUR</span><strong>BRAND</strong><i /></div>
            <div className="site-screen">
              <div className="site-nav"><b>YOUR BRAND</b><span>Work&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
              <div className="site-hero"><small>MAKE YOUR MARK</small><strong>Built to be<br />remembered.</strong><i /></div>
              <div className="site-row"><span /><span /><span /></div>
            </div>
            <div className="interface-layer layer-one"><b>01</b><span>POSITION</span></div>
            <div className="interface-layer layer-two"><b>02</b><span>IDENTITY</span></div>
            <div className="interface-layer layer-three"><b>03</b><span>EXPERIENCE</span></div>
          </div>
        </div>
        <div className="laptop-base"><i /></div>
      </div>

      <div className="phone">
        <div className="phone-screen"><small>YOUR</small><strong>BRAND</strong><i /><span>Explore</span></div>
      </div>
      <div className="device-shadow" />
    </div>
  );
}