gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

let smoother;

smoother = ScrollSmoother.create({
  wrapper: "#ScrollWrapper",
  content: "#ScrollContent",
  smooth: 1.25,
  smoothTouch: 0.5,
  effects: true,
});

window.disableScroll = function () {
  if (smoother) {
    smoother.paused(true);
    console.log("Pausing with smoother");
  } else {
    $("body").css("overflow", "hidden");
    console.log("Setting Overflow to hidden");
  }
};

window.enableScroll = function () {
  if (smoother) {
    smoother.paused(false);
    console.log("Resuming with smoother");
  } else {
    $("body").css("overflow", "auto");
    console.log("Setting Overflow to auto");
  }
};

window.preventDefault = function (e) {
  e.preventDefault();
};
