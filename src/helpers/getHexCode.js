export function getHexCode(varName) {
  try {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  } catch (err) {
    console.error(err);
    return;
  }
}
