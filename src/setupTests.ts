import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {
        return;
      },
      removeListener: () => {
        return;
      },
      addEventListener: () => {
        return;
      },
      removeEventListener: () => {
        return;
      },
      dispatchEvent: () => false,
    };
  }) as unknown as typeof window.matchMedia;
}

window.scrollTo = () => {
  return;
};
