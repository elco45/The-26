import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
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

const MealPlanDescription = Styled.p`
  font-size: 16px;
  text-align: center;
`;

const ModalTextOpenSI = Styled.a`
  font-size: 12px;
  color: #69ABB7 !important;
  cursor: pointer;
`;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.validateSignIn = this.validateSignIn.bind(this);
    this.toggleLiveSignIn = this.toggleLiveSignIn.bind(this);
    this.toggleLivePass = this.toggleLivePass.bind(this);
    this.toggleLiveSignUp = this.toggleLiveSignUp.bind(this);
  }

  validateSignIn(formData, errors, live) {
    const { signInError, intl } = this.props;

    if (live && signInError && signInError.code === 'auth/user-not-found') {
      errors.password.addError(
        intl.formatMessage(messages.auth.invalidEmailOrPass),
      );
    }
    if (live && signInError && signInError.code === 'auth/wrong-password') {
      errors.password.addError(
        intl.formatMessage(messages.auth.invalidEmailOrPass),
      );
    }
    if (live && signInError && signInError.code === 'auth/user-not-verified') {
      errors.password.addError(intl.formatMessage(messages.auth.verifyEmail));
    }
    return errors;
  }

  toggleLiveSignIn() {
    this.props.toggleSignIn();
  }

  toggleLiveSignUp() {
    this.props.toggle();
  }

  toggleLivePass() {
    this.props.togglePassReset();
  }

  render() {
    const { modalSignIn, loading, signIn } = this.props;
    const loginSchema = [
      {
        name: 'email',
        uiWidget: 'email',
      },
      {
        name: 'password',
        uiWidget: 'password',
      },
    ];
    return (
      <Modal
        show={modalSignIn}
        className="roundedModal"
        onHide={this.toggleLiveSignIn}
      >
        <Container>
          <Row>
            <ModalRightContainer className="col-12 text-center">
              <Row>
                <Col className="text-right">
                  <Button variant="danger" onClick={this.toggleLiveSignIn}>
                    X
                  </Button>
                </Col>
                <ModalRightTitle className="col-12">
                  <FormattedMessage {...messages.auth.login} />
                </ModalRightTitle>
                <MealPlanDescription className="col-12">
                  <FormattedMessage {...messages.auth.getMealPlan} />
                </MealPlanDescription>
                <SForm
                  submitFunc={signIn}
                  validateFunc={this.validateSignIn}
                  loading={loading}
                  showUiLabels={false}
                  showPlaceHolder
                  requiredSchema={['email', 'password']}
                  schema={loginSchema}
                  submitBtnText="auth.enter"
                />
                <Col>
                  <div className="float-left">
                    <ModalTextOpenSI onClick={this.toggleLivePass}>
                      {' '}
                      <FormattedMessage {...messages.auth.forgotPass} />
                    </ModalTextOpenSI>
                  </div>
                </Col>
              </Row>
            </ModalRightContainer>
          </Row>
        </Container>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  toggle: PropTypes.func,
  togglePassReset: PropTypes.func,
  toggleSignIn: PropTypes.func,
  modalSignIn: PropTypes.bool,
  signIn: PropTypes.func,
  signInError: PropTypes.object,
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SignInModal);
