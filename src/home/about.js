import { getHexCode } from "../helpers/getHexCode";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Selectors
const aboutSection = $(".section.about");
const aboutParagraph = $(".about-paragraph");
const aboutParagraphWrapper = $(".about-paragraph-wrapper");

// Basestates
gsap.set(aboutParagraph, { color: getHexCode("--colored--background") });

// Split Text
// split elements with the class "split" into words and characters
// let split = SplitText.create(aboutParagraph, { type: "lines" });

// Scrolltrigger
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: aboutSection,
    pin: aboutParagraphWrapper,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});

tl.from(aboutParagraph[0], {
  yPercent: 100,
  autoAlpha: 0,
  filter: "blur(15px)",
  duration: 2,
})
  .to(
    aboutParagraph[0],
    {
      yPercent: -100,
      autoAlpha: 0,
      filter: "blur(15px)",
      duration: 2,
    },
    ">"
  )
  .from(
    aboutParagraph[1],
    {
      yPercent: 100,
      autoAlpha: 0,
      filter: "blur(15px)",
      duration: 2,
    },
    "<"
  )
  .to(
    aboutParagraph[1],
    {
      yPercent: -100,
      autoAlpha: 0,
      filter: "blur(15px)",
      duration: 2,
    },
    ">"
  )
  .from(
    aboutParagraph[2],
    {
      yPercent: 100,
      autoAlpha: 0,
      filter: "blur(15px)",
      duration: 2,
    },
    "<"
  )
  .to(
    aboutParagraph[2],
    {
      yPercent: -100,
      autoAlpha: 0,
      filter: "blur(15px)",
      duration: 2,
    },
    ">"
  )
  .to(
    $("body"),
    { background: getHexCode("--colored--background"), duration: 4 },
    "<"
  )
  .to(
    aboutParagraph[2],
    { color: getHexCode("--colored--foreground"), duration: 4 },
    "<"
  );
