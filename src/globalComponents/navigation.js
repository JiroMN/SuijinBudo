import { getHexCode } from "../helpers/getHexCode";
// Selectors
const navbar = $(".navigation-bar");
const navMenu = $(".navigation-menu");
const navbarButton = $(".navigation-bar-button-wrapper");

const linkWrapper = $(".navigation-menu-link-list-item");

// State (single source of truth in DOM)
navMenu.attr("data-navmenu-state", "closed");
const isOpen = () => navMenu.attr("data-navmenu-state") === "open";

// Base States
gsap.set(navMenu, { display: "flex", autoAlpha: 0 });

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

// Links hover handlers
linkWrapper.on("mouseenter", function () {
  const $elem = $(this);
  const $shown = $elem.find(".shown");
  const $hidden = $elem.find(".hidden");
  const $counter = $elem.find(".navigation-menu-link-list-item-counter");

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none", duration: 0.3 },
  });
  tl.fromTo(
    $shown,
    { autoAlpha: 1, yPercent: 0 },
    { autoAlpha: 0, yPercent: -50 }
  )
    .fromTo(
      $hidden,
      {
        autoAlpha: 0,
        yPercent: 50,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
      },
      "<"
    )
    .fromTo(
      $counter,
      { backgroundColor: getHexCode("--colored--secondary") },
      { backgroundColor: getHexCode("--colored--accent") },
      "<"
    );

  gsap.to(tl, { time: tl.duration(), ease: "power2.out", overwrite: true });

  $elem.on("mouseleave", function () {
    gsap.to(tl, { time: 0, ease: "power2.out", overwrite: true });
  });
});

// Toggling Menu
export function handleMenuToggle(desiredState) {
  const $menuBar = $(".navigation-menu-bar");
  const $menuLinksRow = $(".navigation-menu-row.links");
  const $menuInfoRow = $(".navigation-menu-row.info");

  // Guards based on DOM state
  if (desiredState === "open" && isOpen()) return;
  if (desiredState === "close" && !isOpen()) return;

  if (desiredState === "open" && !isOpen()) {
    const openTL = gsap.timeline({
      defaults: { duration: 0.75 },
      onStart: () => {
        navMenu.attr("data-navmenu-state", "open");
      },
    });

    openTL
      .set(navMenu, { autoAlpha: 1 })
      .fromTo($menuLinksRow, { xPercent: -100 }, { xPercent: 0 }, "<")
      .fromTo($menuInfoRow, { xPercent: 100 }, { xPercent: 0 }, "<")
      .fromTo($menuBar, { yPercent: -100 }, { yPercent: 0 }, "<50%");
  } else if (desiredState === "close" && isOpen()) {
    const closeTL = gsap.timeline({
      defaults: { duration: 0.75 },
      onStart: () => {
        navMenu.attr("data-navmenu-state", "closed");
      },
    });

    closeTL
      .fromTo($menuBar, { yPercent: 0 }, { yPercent: -100 })
      .fromTo($menuLinksRow, { xPercent: 0 }, { xPercent: -100 }, "<")
      .fromTo($menuInfoRow, { xPercent: 0 }, { xPercent: 100 }, "<")
      .fromTo(navMenu, { autoAlpha: 1 }, { autoAlpha: 0 });
  } else {
    // geen actie: ofwel dezelfde state gevraagd, of ongeldig desiredState
    return;
  }
}

navbarButton.on("click", function () {
  const $btn = $(this);
  if ($btn.attr("menu-toggle") === "open") {
    handleMenuToggle("open");
  } else if ($btn.attr("menu-toggle") === "close") {
    handleMenuToggle("close");
  }
});
