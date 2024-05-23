export const searchOnGoogle = (query: string) => {
  window.open(`https://www.google.com/search?q=${query}`, '_blank');
};

export const searchOnDuckDuckGo = (query: string) => {
  window.open(`https://www.duckduckgo.com/?q=${query}`, '_blank');
};
