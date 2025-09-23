gsap.defaults({
  ease: "expo.out",
  duration: 0.35,
});

$("[copy-to-clipboard]").on("click", function () {
  const $value = $(this).attr("copy-to-clipboard");

  navigator.clipboard.writeText($value);
});
