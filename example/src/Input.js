/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ label, value, onChange, help }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={label}
    >
      {label}
    </label>
    <input
      id={label}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      value={value}
      onChange={onChange}
    />
    {help && <em className="text-xs text-gray-500">{help}</em>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Input;
