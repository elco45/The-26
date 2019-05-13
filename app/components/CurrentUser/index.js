import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Nav, Dropdown, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import CustomToggle from '../CustomToggle';
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

  logout() {
    const { signOut, closeNav } = this.props;
    signOut();
    closeNav('/');
  }

  render() {
    const { user, closeNav } = this.props;

    return (
      <Nav.Item>
        <Dropdown alignRight>
          <Dropdown.Toggle as={CustomToggle}>
            <Row>
              <Col>
                <AvatarImage
                  className="rounded-circle"
                  src={
                    (user.profile && user.profile.photoURL) || avatarProfileAlt
                  }
                  alt={user.profile && user.profile.name}
                />
                <i className="fa fa-caret-down text-white" />
              </Col>
            </Row>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => closeNav('/profile')}>
              <FormattedMessage {...messages.profile} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.logout()}>
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
    displayName: PropTypes.string,
    uid: PropTypes.string,
    profile: PropTypes.shape({
      roles: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  signOut: PropTypes.func.isRequired,
  closeNav: PropTypes.func,
  history: PropTypes.object,
};

export default CurrentUser;
