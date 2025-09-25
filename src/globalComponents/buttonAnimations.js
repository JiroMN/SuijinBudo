import { getHexCode } from "../helpers/getHexCode";
// Selectors
const button = $(".button");
const buttonTextShown = $(".button-text.shown");
const buttonTextHidden = $(".button-text.hidden");

// BaseState
gsap.set(buttonTextHidden, { opacity: 100, yPercent: 100, autoAlpha: 0 });

$(document).on("mouseenter", ".button", function () {
  const $btn = $(this);
  const $shownText = $btn.find(".shown");
  const $hiddenText = $btn.find(".hidden");

  let tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  tl.to($btn, { backgroundColor: getHexCode("--colored--accent") })
    .fromTo(
      $shownText,
      { yPercent: 0, autoAlpha: 1 },
      { yPercent: -100, autoAlpha: 0 },
      "<"
    )
    .fromTo(
      $hiddenText,
      { yPercent: 100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1 },
      "<"
    );
  gsap.to(tl, {
    time: tl.duration(),
    overwrite: "auto",
  });

  $btn.on("mouseleave", function () {
    gsap.to(tl, {
      time: 0,
      overwrite: "auto",
    });
  });
});
