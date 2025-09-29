import { getHexCode } from "./helpers/getHexCode";

// Helpers
function formatPrices() {
  const priceElements = $("[data-table-row-entry-price]");
  priceElements.each(function () {
    const text = $(this).text().trim();
    const value = parseFloat(text);
    if (isNaN(value)) {
      return;
    }
    const fixed = value.toFixed(2);
    const [integer, decimals] = fixed.split(".");
    if (decimals === "00") {
      $(this).text(`${integer},-`);
    } else {
      $(this).text(`${integer},${decimals}`);
    }
  });
}

function styleFilterSelectors(el) {
  gsap
    .timeline({})
    // Reset All
    .to(".prijzen-filter-selector-item", {
      backgroundColor: "transparent",
    })
    .to(
      ".prijzen-filter-selector-item > *",
      {
        color: getHexCode("--background-tones--75"),
      },
      "<"
    )
    // Set clicked element
    .to(
      el,
      {
        backgroundColor: getHexCode("--colored--background"),
        overwrite: true,
      },
      "<"
    )
    .to(
      el.children(),
      {
        color: getHexCode("--colored--foreground"),
        overwrite: true,
      },
      "<"
    );
}

function animateViews(filter) {
  const el = $(`[data-linked-price-filter=${filter}]`);
  gsap
    .timeline({ defaults: { duration: 0.35 } })
    .to(".prijzen-table-col-wrapper, .location-time-view", {
      autoAlpha: 0,
    })
    .fromTo(
      el,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        overwrite: true,
      },
      "<"
    )
    .set(el, { position: "relative" }, ">")
    .set(
      $(".prijzen-table-col-wrapper, .location-time-view").not(el),
      { position: "absolute" },
      "<"
    );
}

export default function pricesInit() {
  gsap.set(".prijzen-table-col-wrapper.absolute", {
    display: "block",
    autoAlpha: 0,
  });
  gsap.set(".location-time-view", {
    display: "flex",
    autoAlpha: 0,
  });

  styleFilterSelectors($("[data-isactive-filter=true]"));

  $(document).on("click", ".prijzen-filter-selector-item", function () {
    const $filterValue = $(this).attr("data-price-filter");
    animateViews($filterValue);
    styleFilterSelectors($(this));
  });

  formatPrices();
}
