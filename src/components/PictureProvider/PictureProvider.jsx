import React from 'react';
import PropTypes from 'prop-types';

export const PictureContext = React.createContext({});

const PictureProvider = ({ options, children }) => (
  <PictureContext.Provider value={{ options }}>
    {children}
  </PictureContext.Provider>
);

PictureProvider.propTypes = {
  options: PropTypes.object,
  children: PropTypes.object,
};

export default PictureProvider;
