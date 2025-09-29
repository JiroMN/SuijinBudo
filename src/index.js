import barba from "@barba/core";

gsap.registerPlugin(ScrollSmoother);

// --- Helper ---
import { handleMenuToggle } from "./globalComponents/navigation";

// --- Home modules ---
import homeHeroInit, { homeHeroDestroy } from "./home/hero";
import homeAboutInit, { homeAboutDestroy } from "./home/about";

// --- Vechtstijl modules ---
import vechtstijlInit, { vechtstijlDestroy } from "./vechtstijl";

// --- Over Ons modules ---
import overOnsInit, { overOnsDestroy } from "./overOns";

// --- Prices modules ---
import pricesInit from "./prices";

// Registry: namespace -> object with init and destroy arrays
const PAGE = {
  home: {
    init: [homeHeroInit, homeAboutInit],
    destroy: [homeHeroDestroy, homeAboutDestroy], // add destroys here later
  },
  vechtstijl: {
    init: [vechtstijlInit],
    destroy: [vechtstijlDestroy],
  },
  overOns: {
    init: [overOnsInit],
    destroy: [overOnsDestroy],
  },
  prices: {
    init: [pricesInit],
    destroy: [],
  },
};

// Run all initializers or destroyers for a namespace
function runAll(ns, mode = "init") {
  const section = PAGE[ns];
  if (!section) return;
  const fns = section[mode];
  if (!Array.isArray(fns)) return;
  for (const fn of fns) {
    if (typeof fn === "function") {
      try {
        fn();
        console.log(`Running '${mode}' for '${ns}'`);
      } catch (e) {
        console.warn(`[${ns}] ${mode} error`, e);
      }
    }
  }
}

gsap.set(".page-transition", { opacity: 1 });
gsap.set(".page-transition-col.left", { xPercent: -100 });
gsap.set(".page-transition-col.right", { xPercent: 100 });

// -- ScrollSmoother --
let smoother;

function killScrollSmoother() {
  ScrollSmoother?.get()?.kill();
  smoother = null;
}

function createScrollSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: "#ScrollWrapper",
    content: "#ScrollContent",
    smooth: 1.25,
    smoothTouch: 0.5,
    effects: true,
  });
}

function globalRefresh() {}

barba.hooks.afterEnter(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
  return globalRefresh();
});

barba.hooks.once(() => {
  return createScrollSmoother();
});

barba.hooks.beforeLeave(() => {
  handleMenuToggle("close");
  return killScrollSmoother();
});

barba.hooks.beforeEnter(() => {
  return createScrollSmoother();
});

// --- Timelines ---
let slideOpen = gsap
  .timeline({ paused: true, defaults: { ease: "power2.inOut", duration: 0.6 } })
  .to(".page-transition-col.left", {
    xPercent: -100,
  })
  .to(
    ".page-transition-col.right",
    {
      xPercent: 100,
    },
    "<"
  );

let slideClose = gsap
  .timeline({ paused: true, defaults: { ease: "power2.inOut", duration: 0.6 } })
  .to(".page-transition-col.left", {
    xPercent: 0,
  })
  .to(
    ".page-transition-col.right",
    {
      xPercent: 0,
    },
    "<"
  );

barba.init({
  debug: false,
  sync: false,
  prevent: ({ el, href }) => href == "#",
  transitions: [
    {
      name: "slide",
      beforeLeave() {
        return gsap
          .timeline()
          .set(".page-transition-col.left", { xPercent: -100 })
          .set(".page-transition-col.right", { xPercent: 100 });
      },
      leave() {
        return slideClose.restart();
      },
      beforeEnter() {
        return gsap
          .timeline({ defaults: { ease: "power2.inOut", duration: 0.6 } })
          .set(".page-transition-col.left", { xPercent: 0 })
          .set(".page-transition-col.right", { xPercent: 0 });
      },
      enter() {
        // Open the lid after swap
        setTimeout(function () {
          return slideOpen.restart();
        }, 250);
      },
    },
  ],

  views: [
    {
      namespace: "home",
      beforeLeave() {
        runAll("home", "destroy");
      },
      beforeEnter() {
        runAll("home", "init");
      },
    },
    {
      namespace: "vechtstijl",
      beforeLeave() {
        runAll("vechtstijl", "destroy");
      },
      beforeEnter() {
        runAll("vechtstijl", "init");
      },
    },
    {
      namespace: "over-ons",
      beforeLeave() {
        runAll("overOns", "destroy");
      },
      beforeEnter() {
        runAll("overOns", "init");
      },
    },
    {
      namespace: "onze-geschiedenis",
      beforeLeave() {
        return;
      },
      beforeEnter() {
        return;
      },
    },
    {
      namespace: "prices",
      beforeLeave() {
        return;
      },
      beforeEnter() {
        runAll("prices", "init");
      },
    },
  ],
});
