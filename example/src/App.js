/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Highlight from 'react-highlight';

import PreviewPicture from './PreviewPicture';
import PreviewProvider from './PreviewProvider';

const App = () => {
  const [settings, setSettings] = useState({});

  return (
    <div>
      <h1 className="text-center font-medium text-3xl bg-gray-900 text-white py-4">
        react-<span className="text-teal-300">srcset</span>
      </h1>
      <div className="max-w-screen-md mx-auto px-5">
        <p className="text-lg py-12">
          “<code>react-srcset</code> is a set of pictures dedicated React
          components”.
        </p>

        <h2 className="text-2xl font-medium mb-2">Install</h2>

        <Highlight className="bash rounded mb-12">
          $ yarn add react-srcset
        </Highlight>

        <h2 className="text-2xl font-medium mb-2">PictureProvider</h2>

        <p className="mb-5">
          <code>&lt;PictureProvider/&gt;</code> is used to configure your
          pictures behaviours.
        </p>

        <div className="mb-12">
          <PreviewProvider settings={settings} onChange={setSettings} />
        </div>

        <h2 className="text-2xl font-medium mb-2">Picture</h2>

        <p className="mb-5">
          <code>&lt;Picture/&gt;</code> is the main component used to produce
          automatic and responsive pictures.
        </p>

        <div className="mb-6">
          <PreviewPicture />
        </div>

        <address className="text-center text-gray-700 my-12">
          Made with 💛 by{' '}
          <a
            href="https://antistatique.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline"
          >
            Antistatique
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/antistatique/react-srcset"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 underline"
          >
            Github
          </a>
        </address>
      </div>
      {/* <Preview /> */}
    </div>
  );
};

export default App;
