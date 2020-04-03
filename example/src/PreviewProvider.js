/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Highlight from 'react-highlight';

const PreviewProvider = () => (
  <Highlight className="javascript rounded mb-6 text-sm">
    {`import React from 'react';
import { PictureProvider } from 'react-srcset';

const options = {
  // Extra Picture props used to generate picture URL
  srcParameters: ['host', 'colors'],

  // Source generation function
  setSrc: ({ w, h, ext, host, colors }) =>
    \`https://\${host}/\${w}x\${h}/\${colors}.\${ext}\`,

  // Square placeholder's width
  minSize: 30,

  // Breakpoints min widths (start from x)
  breakpoints: {
    lg: 1280, // Desktops
    md: 768, // New smartphones or tablets
    sm: 0, // Small/old smartphones
  },

  max: 2560, // Picture max width

  // Picture max width(s) for each breakpoint
  widths: {
    sm: 768,
    md: 1280,
    lg: {
      full: 2560,
      '100': 1280,
    },
  },
};

const MyApp = ({ children }) =>
  <PictureProvider options={options}>{children}</PictureProvider>;`}
  </Highlight>
);

export default PreviewProvider;
