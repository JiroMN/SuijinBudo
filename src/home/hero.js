import { getHexCode } from "../helpers/getHexCode";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let heroCtx; // <-- module-scope context

export default function homeHeroInit() {
  // Scope op je hero-sectie zodat selectors en triggers hierbinnen blijven
  const sectionHero = $(".section.hero")[0];

  // Maak een context; alles binnen deze functie wordt eraan gekoppeld
  heroCtx = gsap.context(() => {
    let smoother = ScrollSmoother.get();

    const gradient = $(".hero-backdrop-gradient");
    const backdropCircle = $(".hero-backdrop-image-container");
    const heading = $(".hero-heading");
    const paragraph = $(".hero-paragraph");

    // Load-in
    gsap
      .timeline({
        delay: 0.75,
        onStart: () => {
          smoother.paused(true);
        },
        onComplete: () => smoother.paused(false),
      })
      .from(backdropCircle, {
        autoAlpha: 0,
        scale: 0,
        ease: "back.out",
        duration: 0.65,
      })
      .from(
        backdropCircle,
        {
          filter: "blur(15px)",
          duration: 0.5,
        },
        "<25%"
      )
      .from([heading, paragraph], {
        yPercent: 50,
        autoAlpha: 0,
        filter: "blur(8px)",
        duration: 0.75,
        stagger: 0.2,
      });

    // ScrollTrigger (ook binnen de context!)
    const circleGrowTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionHero,
        start: "top top",
        end: "top+=400px top",
        scrub: 1,
        once: true,
      },
      defaults: { ease: "power1.out" },
    });

    circleGrowTL
      .to(backdropCircle, {
        width: "75vw",
        height: "75vw",
        duration: 4,
      })
      .to(
        backdropCircle,
        {
          borderRadius: "0%",
          duration: 5,
        },
        "<50%"
      )
      .to(
        backdropCircle,
        {
          width: "100vw",
          height: "100vh",
          duration: 4,
        },
        "<"
      )
      .to(
        [heading, paragraph],
        {
          color: getHexCode("--colored--background"),
        },
        "<"
      )
      .to(gradient, { autoAlpha: 0, duration: 2 }, "<")
      .to(
        $("body, .page-wrapper"),
        {
          background: getHexCode("--colored--foreground"),
          duration: 5,
        },
        "<"
      );
  }, sectionHero); // <-- deze root beperkt de scope/selectors
}

export function homeHeroDestroy() {
  if (heroCtx) {
    heroCtx.revert();
    heroCtx = null;
    gsap.set($("body, .page-wrapper"), {
      background: getHexCode("--colored--background"),
      duration: 0,
    });
  }
}
