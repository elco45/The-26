import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Nav, Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import avatarProfileAlt from '../../images/icon-72x72.png';

const AvatarImage = Styled.img`
  height: 25px;
  width: 25px;
  margin-right: 5px;
`;

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen,
    });
  }

  render() {
    const { user, signOut } = this.props;

    return (
      <Nav.Item>
        <Dropdown alignRight>
          <Dropdown.Toggle>
            <AvatarImage
              className="rounded-circle"
              src={(user.profile && user.profile.photoURL) || avatarProfileAlt}
              alt={user.profile && user.profile.name}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <FormattedMessage {...messages.profile} />
            </Dropdown.Item>
            <Dropdown.Item onClick={signOut}>
              <FormattedMessage {...messages.logout} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }
}

CurrentUser.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  signOut: PropTypes.func.isRequired,
};

export default CurrentUser;
