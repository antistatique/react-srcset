import defaultConfig from '../config/default';

import parseRatio from './parseRatio';

export default (breakpoint, scale, ratio) => {
  const [w, h] = parseRatio(ratio);
  const { widths } = defaultConfig;

  const full = widths[breakpoint].full || widths[breakpoint];
  const container = widths[breakpoint]['100'] || widths[breakpoint];

  // Format
  const factor = parseInt(scale, 10);
  const width = scale === 'full' ? full : (container * factor) / 100;
  const height = (width * h) / w;

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};
