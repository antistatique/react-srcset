/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify';
import { curry, head, pipe, replace, match, __ } from 'ramda';
import { Picture, PictureProvider } from 'react-srcset';
import Highlight from 'react-highlight';

import Input from './Input';

const beautify = curry(html_beautify);

const options = {
  srcParameters: ['host', 'colors'],
  setSrc: ({ w, h, ext, host, colors }) =>
    `https://${host}/${w}x${h}/${colors}.${ext}`,
  minSize: 30, // square placeholder's width
  // Based on min-width
  breakpoints: {
    lg: 1280, // Desktops
    md: 768, // New smartphones / tablets
    sm: 0, // small/old smartphones
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

const PreviewPicture = () => {
  const [ratio, setRatio] = useState('16/10');
  const [sm, setSm] = useState('100');
  const [md, setMd] = useState('50');
  const [lg, setLg] = useState('25');
  const [alt, setAlt] = useState('Picture visual description');
  const [html, setHtml] = useState('');

  const beautifyOptions = {
    indent_size: 2,
    wrap_line_length: '80',
    max_preserve_newlines: 3,
  };

  useEffect(() => {
    const markup = pipe(
      renderToString,
      replace(/\sstyle="([^"]*)"/gm, ''),
      match(/<picture(.+|\n)+<\/picture>/gm),
      head,
      beautify(__, beautifyOptions),
    )(
      <PictureProvider options={options}>
        <Picture
          ratio={ratio}
          sm={sm}
          md={md}
          lg={lg}
          alt={alt}
          host="dummyimage.com"
          colors="81E6D9/1A202C"
        />
      </PictureProvider>,
    );

    setHtml(markup);
  }, [ratio, sm, md, lg, alt]);

  return (
    <PictureProvider options={options}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="flex mb-6">
          <div className="w-1/3 pr-3">
            <h3 className="text-lg font-medium mb-3">Props</h3>

            <Input
              label="ratio"
              value={ratio}
              onChange={e => setRatio(e.target.value)}
              help="don't forget the “/”"
            />

            <Input
              label="sm"
              value={sm}
              onChange={e => setSm(e.target.value)}
              help="width % for small/old smartphones"
            />

            <Input
              label="md"
              value={md}
              onChange={e => setMd(e.target.value)}
              help="width % for new smartphones or tablets"
            />

            <Input
              label="lg"
              value={lg}
              onChange={e => setLg(e.target.value)}
              help="width % for desktops"
            />

            <Input
              label="alt"
              value={alt}
              onChange={e => setAlt(e.target.value)}
            />
          </div>
          <div className="w-2/3 bg-gray-900 ml-3 p-3 rounded flex items-center">
            <Picture
              ratio={ratio}
              sm={sm}
              md={md}
              lg={lg}
              alt={alt}
              host="dummyimage.com"
              colors="81E6D9/1A202C"
            />
          </div>
        </div>

        <div className="text-sm">
          <h3 className="text-lg font-medium mb-3">JSX</h3>
          <Highlight className="javascript rounded mb-6">
            {`import React from 'react';
  import { Picture } from 'react-srcset';

  const MyPicture = () =>
    <Picture
      ratio="${ratio}"
      sm="${sm}"
      md="${md}"
      lg="${lg}"
      alt="${alt}"
      host="dummyimage.com"
      colors="81E6D9/1A202C"
    />;`}
          </Highlight>
          <h3 className="text-lg font-medium mb-3">HTML (result)</h3>{' '}
          <Highlight className="html rounded mb-2">{html}</Highlight>
          <em className="text-sm text-gray-700">
            Cool picture tag generator, right?
          </em>
        </div>
      </div>
    </PictureProvider>
  );
};
export default PreviewPicture;
