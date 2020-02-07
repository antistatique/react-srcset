export default {
  minSize: 30, // square placeholder's width
  // Based on min-width
  breakpoints: {
    lg: 1280, // Desktops
    md: 768, // New smartphones / tablets
    sm: 0, // Old/small smartphones
  },
  max: 2560,
  widths: {
    sm: 768,
    md: 1280,
    lg: {
      full: 2560,
      '100': 1280,
    },
  },
};
