import React from 'react';
import PropTypes from 'prop-types';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className="btn"
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

CustomToggle.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
};

export default CustomToggle;
