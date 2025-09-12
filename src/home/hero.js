import { getHexCode } from "../helpers/getHexCode";

gsap.registerPlugin(ScrollTrigger);
// Selectors
const sectionHero = $(".section.hero");
const gradient = $(".hero-backdrop-gradient");
const backdropCircle = $(".hero-backdrop-image-container");
const heading = $(".hero-heading");
const paragraph = $(".hero-paragraph");

// Load In
gsap
  .timeline({
    delay: 0.4,
    onStart: () => disableScroll(),
    onComplete: () => enableScroll(),
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

//   ScrollTrigger
let circleGrowTL = gsap.timeline({
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
    width: "125vw",
    height: "125vw",
    duration: 8,
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
