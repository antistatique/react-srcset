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
    )(<Picture ratio={ratio} sm={sm} md={md} lg={lg} alt={alt} />);

    setHtml(markup);
  }, [ratio, sm, md, lg, alt]);

  return (
    <PictureProvider options={{}}>
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
            <Picture ratio={ratio} sm={sm} md={md} lg={lg} alt={alt} />
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
  />;`}
          </Highlight>
          <h3 className="text-lg font-medium mb-3">HTML (result)</h3>{' '}
          <Highlight className="html rounded mb-2">{html}</Highlight>
          <em className="text-sm text-gray-700">
            Nice picture tag generator, right?
          </em>
        </div>
      </div>
    </PictureProvider>
  );
};
export default PreviewPicture;
