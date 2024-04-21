// From https://gist.github.com/sandgraham/1ee713da09f7e0d10548cf9ad8c399cb
export const iso2FlagEmoji = (iso: string) =>
  String.fromCodePoint(
    ...[...Array.from(iso.toUpperCase())].map(
      (char) => char.charCodeAt(0) + 127397,
    ),
  );
