const capitalizeFirstLetter = (
  [first, ...rest]: string,
  locale = navigator.language,
) => first.toLocaleUpperCase(locale) + rest.join("");

export default capitalizeFirstLetter;
