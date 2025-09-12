// Selectors
const navbar = $(".navigation-bar");
const navbarButton = $(".navigation-bar-button-wrapper");
const emblems = $(".navigation-menu-info-emblem");

// Flags
let isOpen = true;

// Button Hover
navbarButton.on("mouseenter", function () {
  const $circle = $(this).find(".navigation-bar-button-circle");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
  });

  tl.to($circle, { scale: 1.35 });

  gsap.to(tl, { time: tl.duration(), duration: 0.3, ease: "power1.inOut" });

  $(this).on("mouseleave", function () {
    gsap.to(tl, { time: 0, duration: 0.3, ease: "power1.inOut" });
  });
});

// Toggling Menu

// Navigation Emblems

let alternatingEmblems = gsap.timeline({
  paused: true,
  repeat: -1,
  defaults: { duration: 1.5 },
});
alternatingEmblems
  .set(emblems, { autoAlpha: 0 })
  // Start
  .fromTo(
    emblems[0],
    { autoAlpha: 0, filter: "blur(8px)" },
    { autoAlpha: 1, filter: "blur(0px)" }
  )
  //   0 -> 1
  .fromTo(
    emblems[0],
    { autoAlpha: 1, filter: "blur(0px)" },
    { autoAlpha: 0, filter: "blur(8px)" },
    ">1"
  )
  .fromTo(
    emblems[1],
    { autoAlpha: 0, filter: "blur(8px)" },
    { autoAlpha: 1, filter: "blur(0px)" },
    "<"
  )
  //   1 -> 2
  .fromTo(
    emblems[1],
    { autoAlpha: 1, filter: "blur(0px)" },
    { autoAlpha: 0, filter: "blur(8px)" },
    ">1"
  )
  .fromTo(
    emblems[2],
    { autoAlpha: 0, filter: "blur(8px)" },
    { autoAlpha: 1, filter: "blur(0px)" },
    "<"
  )
  //   2 -> 3
  .fromTo(
    emblems[2],
    { autoAlpha: 1, filter: "blur(0px)" },
    { autoAlpha: 0, filter: "blur(8px)" },
    ">1"
  )
  .fromTo(
    emblems[3],
    { autoAlpha: 0, filter: "blur(8px)" },
    { autoAlpha: 1, filter: "blur(0px)" },
    "<"
  );

console.log(emblems);

if (isOpen) {
  alternatingEmblems.play();
}
