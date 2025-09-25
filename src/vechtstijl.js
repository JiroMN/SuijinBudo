export default function vechtstijlInit() {
  // Selectors
  const heroHeading = $(".vechtstijl-hero-content-wrapper").find("h1");
  const subTitle = heroHeading.attr("data-subtitle");

  // Append Subtitle to title
  heroHeading.html(`${heroHeading.text()} – ${subTitle}`);
}
export function vechtstijlDestroy() {}
