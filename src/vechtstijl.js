let counterLogging;
export default function vechtstijlInit() {
  console.log("Vechtstijl");
  // Selectors
  const heroHeading = $(".vechtstijl-hero-content-wrapper").find("h1");
  const subTitle = heroHeading.attr("data-subtitle");

  // Append Subtitle to title
  heroHeading.html(`${heroHeading.text()} – ${subTitle}`);

  let count = 0;
  counterLogging = setInterval(() => {
    // console.log(++count);
  }, 1000);
}
export function vechtstijlDestroy() {
  console.log("Destroying Counter (vechtstijl)");
  clearInterval(counterLogging);
}
