let overOnsCtx;
let circularText;

export default function overOnsInit() {
  const geschiedenisSection = $(".section.over-ons-geschiedenis");
  const geschiedenisText = $(".over-ons-geschiedenis-text")[0];

  circularText = new CircleType(geschiedenisText);

  overOnsCtx = gsap.context(() => {
    gsap
      .timeline({ repeat: -1, defaults: { ease: "none", duration: 10 } })
      .to(geschiedenisText, { rotate: 360 });
  }, geschiedenisSection);
}

export function overOnsDestroy() {
  overOnsCtx.revert();
  overOnsCtx = null;

  circularText.destroy.bind(circularText);
  circularText = null;
}
