/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderToString } from 'react-dom/server';
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify';
import { Picture, PictureProvider } from 'react-srcset';

const pictureTag = new RegExp(/<picture(.+|\n)+<\/picture>/gm);

const App = () => (
  <PictureProvider options={{}}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Picture ratio="16/5" />

      <pre>{`<Picture ratio="16/5" />`}</pre>
      <hr />
      <pre>
        {html_beautify(
          pictureTag.exec(
            renderToString(<Picture ratio="16/5" />).replace(
              /\sstyle="([^"]*)"/gm,
              ''
            )
          )[0],
          {
            indent_size: 2,
            wrap_line_length: '80',
            max_preserve_newlines: 3,
          }
        )}
      </pre>
    </div>
  </PictureProvider>
);
export default App;
