import React from 'react';
import PropTypes from 'prop-types';

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <button type="button" className="btn" onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
};

export default CustomToggle;
