import propTypes from 'prop-types';
import React from 'react';

export default function MessageBox({ variant, children }) {
  return (
    <div className={`alert alert-${variant}`}>
      {children}
    </div>
  );
}

MessageBox.propTypes = {
  variant: propTypes.string,
  children: propTypes.element.isRequired,
};

MessageBox.defaultProps = {
  variant: 'info',
};
