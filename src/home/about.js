import { getHexCode } from "../helpers/getHexCode";

export default function homeAboutInit() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  console.log("Home About");

  // Selectors
  const aboutSection = $(".section.about");
  const aboutParagraph = $(".about-paragraph");
  const aboutParagraphWrapper = $(".about-paragraph-wrapper");

  // Basestates
  gsap.set(aboutParagraph, { color: getHexCode("--colored--background") });

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
        duration: 4,
      },
      ">"
    )
    .from(
      aboutParagraph[1],
      {
        yPercent: 100,
        autoAlpha: 0,
        filter: "blur(15px)",
        duration: 4,
      },
      "<"
    )
    .to(
      aboutParagraph[1],
      {
        yPercent: -100,
        autoAlpha: 0,
        filter: "blur(15px)",
        duration: 4,
      },
      ">"
    )
    .from(
      aboutParagraph[2],
      {
        yPercent: 100,
        autoAlpha: 0,
        filter: "blur(15px)",
        duration: 4,
      },
      "<"
    )
    .to(
      aboutParagraph[2],
      {
        yPercent: -100,
        autoAlpha: 0,
        filter: "blur(15px)",
        duration: 4,
      },
      ">"
    )
    .to(
      $("body, .page-wrapper"),
      { background: getHexCode("--colored--background"), duration: 4 },
      "<"
    )
    .to(
      aboutParagraph[2],
      { color: getHexCode("--colored--foreground"), duration: 1 },
      "<"
    );
}
