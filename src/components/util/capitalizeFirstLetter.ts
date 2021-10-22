export default function capitalizeFirstLetter(
  [first, ...rest]: string,
  locale = navigator.language
): string {
  return first.toLocaleUpperCase(locale) + rest.join('');
}
