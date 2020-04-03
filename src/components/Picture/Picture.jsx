import React, { useContext } from 'react';
import { mergeDeepRight } from 'ramda';
import PropTypes from 'prop-types';

import measureImage from '../../utils/measureImage';
import parseRatio from '../../utils/parseRatio';
import defaultConfig from '../../config/default';
import { PictureContext } from '../PictureProvider/PictureProvider.jsx';

import {
  wrapperStyle,
  placeholderStyle,
  pictureStyle,
  imgStyle,
} from './Picture.styles.jsx';

const Picture = ({ ratio, sm, md, lg, alt }) => {
  const { options } = useContext(PictureContext);
  const [w, h] = parseRatio(ratio);
  const sizes = { sm, md, lg };
  const { breakpoints, max, minSize, setSrc } = mergeDeepRight(
    defaultConfig,
    options || {},
  );

  const regexExt = new RegExp(/(\.(gif|jpg|jpeg|tiff|png|webp))/g);
  const placeholder = setSrc(minSize, minSize).replace(regexExt, '.jpg');

  // Generate full path based on breakpoint and scale
  const getPath = (breakpoint, scale, ext, retina = false) => {
    const { width, height } = measureImage(breakpoint, scale, ratio);
    const dpi = retina && width * 2 <= max ? 2 : 1;

    return setSrc(width * dpi, height * dpi).replace(regexExt, `.${ext}`);
  };

  return (
    <div style={{ ...wrapperStyle, paddingTop: `${(100 * h) / w}%` }}>
      <div
        style={{
          ...placeholderStyle,
          ...pictureStyle,
          backgroundImage: `url('${placeholder}')`,
        }}
      />
      <picture style={pictureStyle}>
        {Object.keys(breakpoints).map(b => (
          <React.Fragment key={b}>
            <source
              media={`(min-width: ${breakpoints[b]}px)`}
              srcSet={`
    ${getPath(b, sizes[b], 'webp')} 1x,
    ${getPath(b, sizes[b], 'webp', true)} 2x`}
              type="image/webp"
            />
            <source
              media={`(min-width: ${breakpoints[b]}px)`}
              srcSet={`
    ${getPath(b, sizes[b], 'jpg')} 1x,
    ${getPath(b, sizes[b], 'jpg', true)} 2x`}
            />
            {'\n\n'}
          </React.Fragment>
        ))}
        <img
          style={imgStyle}
          src={`${getPath('md', sizes.md, 'jpg')}`}
          alt={alt}
        />
        {'\n'}
      </picture>
    </div>
  );
};

Picture.propTypes = {
  ratio: PropTypes.string,
  sm: PropTypes.string,
  md: PropTypes.string,
  lg: PropTypes.string,
  alt: PropTypes.string,
};

Picture.defaultProps = {
  ratio: '16/9',
  sm: '100',
  md: '100',
  lg: '100',
  alt: 'Alternative text; must describe the image',
};

export default Picture;
