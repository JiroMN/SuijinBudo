import { getHexCode } from "../helpers/getHexCode";

// Autofill styling
const bgColor = getHexCode("--colored--foreground");
const fgColor = getHexCode("--colored--background");

// Flags
let isBusy = false;

// Link Hover
$(".footer-bottom-info a").on("mouseenter", function () {
  let tl = gsap
    .timeline({ paused: true, defaults: { ease: "none", duration: 0.5 } })
    .to($(this), { color: fgColor });

  gsap.to(tl, { time: tl.duration(), ease: "power2.out", overwrite: true });

  $(this).on("mouseleave", function () {
    gsap.to(tl, { time: 0, ease: "power2.out", overwrite: true });
  });
});

const autofillStyle = `
    .footer-form-input:-webkit-autofill,
    .footer-form-input:-webkit-autofill:hover,
    .footer-form-input:-webkit-autofill:focus {
      box-shadow: 0 0 0 1000px ${bgColor} inset !important;
      -webkit-text-fill-color: ${fgColor} !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    /* Firefox */
    .footer-form-input:autofill {
      box-shadow: 0 0 0 1000px ${bgColor} inset !important;
      -moz-text-fill-color: ${fgColor} !important;
    }

    .footer-form-input:focus {
      border-color: ${fgColor};
    }
  `;

$("<style>").text(autofillStyle).appendTo("head");

// Form Submission Bypass
$("[ms-code-submit-new]").on("click", function (e) {
  if ($(this).attr("[ms-code-submit-new]") == "ignore") return;
  e.preventDefault();
  if (isBusy) return;
  isBusy = true;

  // Loading Feedback
  gsap.to($(this), {
    autoAlpha: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  });

  const id = $(this).attr("ms-code-submit-new");
  const $oldBtn = $(`[ms-code-submit-old="${id}"]`);
  if ($oldBtn.length) {
    $oldBtn.trigger("click");
  } else {
    console.error("No matching old submit button for:", id);
  }

  setTimeout(() => {
    isBusy = false;
    gsap.timeline().to($(this), { autoAlpha: 0 });
    // .to($(this), { display: "none" })
  }, 1000);
});
