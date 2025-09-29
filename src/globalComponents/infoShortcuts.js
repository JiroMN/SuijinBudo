import { getHexCode } from "../helpers/getHexCode";

const infoShortcut = $(".info-shortcut");
// Base States
gsap.set(".info-shortcut-icon.clicked", {
  autoAlpha: 0,
  yPercent: 100,
});

// Click Handler
infoShortcut.on("click", function () {
  const $shownIcon = $(this).find(".info-shortcut-icon.shown");
  const $hiddenIcon = $(this).find(".info-shortcut-icon.clicked");
  const $text = $(this).find(".info-shortcut-text");
  const $currTextValue = $text.text();
  const $isExternalLink = $(this).attr("target") == "_blank";

  gsap
    .timeline({})
    .to($shownIcon, { autoAlpha: 0, yPercent: -100 })
    .to($hiddenIcon, { autoAlpha: 1, yPercent: 0 }, "<")
    .to($text, { autoAlpha: 0, yPercent: -100 }, "<")
    .add(() => {
      $text.text($isExternalLink ? "GEOPEND" : "GEKOPIEERD");
    }, "<")
    .fromTo(
      $text,
      { autoAlpha: 0, yPercent: 100 },
      { autoAlpha: 1, yPercent: 0 },
      "<"
    )
    // Reset
    .to($shownIcon, { autoAlpha: 1, yPercent: 0 }, "<2")
    .to($hiddenIcon, { autoAlpha: 0, yPercent: 100 }, "<")
    .to($text, { autoAlpha: 0, yPercent: 100 }, "<")
    .add(() => {
      $text.text($currTextValue);
    }, "<")
    .fromTo(
      $text,
      { autoAlpha: 0, yPercent: -100 },
      { autoAlpha: 1, yPercent: 0 },
      "<"
    );
});

// Hover Handler
infoShortcut.on("mouseenter", function () {
  const $children = $(this).find(".info-shortcut-text, .info-shortcut-icon");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
  });

  tl.to($children, {
    color: getHexCode("--colored--background"),
  });

  gsap.to(tl, { time: tl.duration(), ease: "power1.out" });

  $(this).on("mouseleave", function () {
    gsap.to(tl, { time: 0, ease: "power1.out" });
  });
});
