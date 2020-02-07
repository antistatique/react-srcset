import React from 'react';
import { renderToString } from 'react-dom/server';
import { html_beautify } from 'js-beautify';
import { Picture } from 'react-srcset';

const pictureTag = new RegExp(/<picture(.+|\n)+<\/picture>/gm);

const App = () => (
  <div>
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
  </div>
);
export default App;
