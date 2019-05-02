import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import SForm from '../SForm';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.validateSignUp = this.validateSignUp.bind(this);
    this.toggleLiveSignUp = this.toggleLiveSignUp.bind(this);
    this.toggleLiveSignIn = this.toggleLiveSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.signUpSuccess !== nextProps.signUpSuccess &&
      nextProps.signUpSuccess
    ) {
      this.toggleLiveSignUp();
      this.notifyVerificationSent();
    }
  }

  notifyVerificationSent = () => {
    const { intl } = this.props;
    return toast(intl.formatMessage(messages.auth.verificationSent), {
      className: 'bg-success',
      bodyClassName: 'text-white',
      progressClassName: 'fancy-progress-bar',
    });
  };

  validateSignUp(formData, errors, live) {
    const { signUpError, intl } = this.props;
    if (
      live &&
      signUpError &&
      signUpError.code === 'auth/email-already-in-use'
    ) {
      errors.email.addError(intl.formatMessage(messages.auth.emailTaken));
    }
    return errors;
  }

  toggleLiveSignUp() {
    this.props.toggleSignUp();
  }

  toggleLiveSignIn() {
    this.props.toggle();
  }

  render() {
    const { modalSignUp, loading, signUp } = this.props;

    return (
      <Modal show={modalSignUp} onHide={this.toggleLiveSignUp}>
        <Container>
          <Row>
            <ModalRightContainer className="col-12 text-center">
              <Row>
                <Col className="text-right">
                  <Button variant="danger" onClick={this.toggleLiveSignUp}>
                    X
                  </Button>
                </Col>
                <ModalRightTitle className="col-12">
                  <FormattedMessage {...messages.auth.addUser} />
                </ModalRightTitle>
                <SForm
                  submitFunc={signUp}
                  validateFunc={this.validateSignUp}
                  loading={loading}
                  showUiLabels={false}
                  showPlaceHolder
                  requiredSchema={['name', 'email', 'password']}
                  schema={['name', 'email', 'password']}
                  submitBtnText="action.add"
                />
              </Row>
            </ModalRightContainer>
          </Row>
        </Container>
      </Modal>
    );
  }
}

SignUpModal.propTypes = {
  toggle: PropTypes.func,
  toggleSignUp: PropTypes.func,
  modalSignUp: PropTypes.bool,
  signUp: PropTypes.func,
  signUpError: PropTypes.object,
  signUpSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SignUpModal);
