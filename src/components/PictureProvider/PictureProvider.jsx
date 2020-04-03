import React from 'react';
import PropTypes from 'prop-types';

export const PictureContext = React.createContext({});

const MapProvider = ({ options, children }) => (
  <PictureContext.Provider value={{ options }}>
    {children}
  </PictureContext.Provider>
);

MapProvider.propTypes = {
  options: PropTypes.object,
  children: PropTypes.object,
};

export default MapProvider;
