import barba from "@barba/core";

gsap.registerPlugin(ScrollSmoother);

// Helpers
// import { getHexCode } from "./helpers/getHexCode";

// --- Globals ---
// import { refreshScrollSmoother } from "./global/scrollSmoother";

// --- Home modules ---
import homeHeroInit from "./home/hero";
import homeAboutInit from "./home/about";

// --- Vechtstijl modules ---
import vechtstijlInit, { vechtstijlDestroy } from "./vechtstijl";

// Registry: namespace -> object with init and destroy arrays
const PAGE = {
  home: {
    init: [homeHeroInit, homeAboutInit],
    destroy: [], // add destroys here later
  },
  vechtstijl: {
    init: [vechtstijlInit],
    destroy: [vechtstijlDestroy],
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
      } catch (e) {
        console.warn(`[${ns}] ${mode} error`, e);
      }
    }
  }
}

gsap.set(".page-transition", { yPercent: -100, opacity: 1 });

// -- ScrollSmoother --
let smoother;

function killScrollSmoother() {
  ScrollSmoother?.get()?.kill();
  smoother = null;
  console.log("[killScrollSmoother()]", ScrollSmoother.get());
}

function createScrollSmoother() {
  console.log("[createScrollSmoother()] Before Creation", ScrollSmoother.get());
  smoother = ScrollSmoother.create({
    wrapper: "#ScrollWrapper",
    content: "#ScrollContent",
    smooth: 1.25,
    smoothTouch: 0.5,
    effects: true,
  });
  console.log("[createScrollSmoother()] After Creation", ScrollSmoother.get());
}

function globalRefresh() {
  // refreshScrollSmoother();
  // let triggers = ScrollTrigger.getAll();
  // triggers.forEach((trigger) => {
  //   trigger.kill();
  // });
}
barba.hooks.afterEnter(() => {
  return globalRefresh();
});

barba.hooks.once(() => {
  return createScrollSmoother();
});

barba.hooks.beforeLeave(() => {
  return killScrollSmoother();
});

barba.hooks.beforeEnter(() => {
  return createScrollSmoother();
});

barba.init({
  debug: true,
  sync: false,
  prevent: ({ el, href }) => href == "#",
  transitions: [
    {
      name: "slide",
      beforeLeave() {
        gsap.set(".page-transition", { yPercent: -100 });
      },
      leave() {
        return gsap.to(".page-transition", {
          yPercent: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
      beforeEnter() {
        return gsap.set(".page-transition", { yPercent: 0 });
      },
      enter() {
        // Open the lid after swap
        setTimeout(function () {
          return gsap.to(".page-transition", {
            yPercent: 100,
            duration: 0.6,
            ease: "power2.inOut",
          });
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
  ],
});
