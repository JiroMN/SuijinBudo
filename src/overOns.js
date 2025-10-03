gsap.registerPlugin(ScrollTrigger);
let overOnsCtx;
let circularText;

export default function overOnsInit() {
  const geschiedenisSection = $(".section.over-ons-geschiedenis");
  const geschiedenisText = $(".over-ons-geschiedenis-text")[0];
  const personImage = $(".over-ons-person-image");

  circularText = new CircleType(geschiedenisText);

  overOnsCtx = gsap.context(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 568px)", () => {
      const personImagesArr = gsap.utils.toArray(personImage);
      personImagesArr.forEach((img) => {
        const sibling = $(img).siblings()[0];
        gsap.set(img, { willChange: "transform" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: "none" })
          .fromTo(
            sibling,
            { yPercent: -50 },
            { yPercent: 50, ease: "none" },
            "<"
          );
      });
    });

    gsap
      .timeline({ repeat: -1, defaults: { ease: "none", duration: 10 } })
      .to(geschiedenisText, { rotate: 360 });
  }, geschiedenisSection);
}

export function overOnsDestroy() {
  overOnsCtx.revert();
  overOnsCtx = null;

  if (circularText) {
    circularText.destroy();
  }
  circularText = null;
}
