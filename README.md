# 📐🖼️ react-srcset

> Pictures dedicated React components

[![NPM](https://img.shields.io/npm/v/react-srcset.svg)](https://www.npmjs.com/package/react-srcset) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-srcset
// or
npm install --save react-srcset
```

## Usage

```jsx
import React, { Component } from 'react'

import { PictureProvider, Picture } from 'react-srcset'

const options = {
  srcParameters: ['host'],
  setSrc: ({ w, h, ext, host }) => `https://${host}/${w}x${h}.${ext}`,
};

const MyComponent = () => (
  <PictureProvider options={options}>
    <Picture
      ratio={ratio}
      sm={sm}
      md={md}
      lg={lg}
      alt={alt}
      host="via.placeholder.com"
    />
  </PictureProvider>
);
```



For (a lot) more information, 📗 **[read the interactive documentation](https://antistatique.github.io/react-srcset)**



## Contribute

First, install all dependencies:

```bash
$ yarn
$ cd ./example && yarn
```

To ease both module and example contributions, start the following commands in paralel.

```bash
$ yarn start
# AND
$ cd ./example && yarn start
```

## License

MIT © [Antistatique](https://github.com/Antistatique)

---

This library is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
