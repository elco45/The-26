import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const ModalTextOpenSI = Styled.a`
  font-size: 12px;
  color: #69ABB7 !important;
  cursor: pointer;
`;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitSignIn = this.submitSignIn.bind(this);
    this.validateSignIn = this.validateSignIn.bind(this);
    this.toggleLiveSignIn = this.toggleLiveSignIn.bind(this);
    this.toggleLivePass = this.toggleLivePass.bind(this);
    this.toggleLiveSignUp = this.toggleLiveSignUp.bind(this);
    this.transformErrors = this.transformErrors.bind(this);
  }

  signInSchema = () => {
    const { intl } = this.props;
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          pattern:
            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          messages: {
            pattern: `${intl.formatMessage(
              messages.model.email,
            )} ${intl.formatMessage(
              messages.error.invalid,
            )} Ex) test@academy.com`,
            required: `${intl.formatMessage(
              messages.model.email,
            )} ${intl.formatMessage(messages.error.required)}`,
          },
        },
        password: {
          type: 'string',
          messages: {
            required: `${intl.formatMessage(
              messages.model.password,
            )} ${intl.formatMessage(messages.error.required)}`,
          },
        },
      },
    };
  };

  uiSignInSchema = () => {
    const { intl } = this.props;
    return {
      email: {
        'ui:widget': 'email',
        'ui:options': {
          label: false,
        },
        'ui:placeholder': intl.formatMessage(messages.model.email),
      },
      password: {
        'ui:widget': 'password',
        'ui:options': {
          label: false,
        },
        'ui:placeholder': intl.formatMessage(messages.model.password),
      },
    };
  };

  validateSignIn(formData, errors) {
    const { signInError, intl } = this.props;
    const { live } = this.state;

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

  transformErrors(errors) {
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');
      const { properties } = this.signInSchema();

      if (
        properties[errorProperty] &&
        properties[errorProperty].messages[error.name]
      ) {
        return {
          ...error,
          message: properties[errorProperty].messages[error.name],
        };
      }
      return error;
    });
  }

  submitSignIn(data) {
    this.setState({ live: true });
    this.props.signIn(data.formData);
  }

  toggleLiveSignIn() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggleSignIn();
  }

  toggleLiveSignUp() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggle();
  }

  toggleLivePass() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.togglePassReset();
  }

  render() {
    const { modalSignIn, loading } = this.props;

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
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) =>
                    this.setState({ formData, live: false })
                  }
                  onSubmit={this.submitSignIn}
                  schema={this.signInSchema()}
                  validate={this.validateSignIn}
                  uiSchema={this.uiSignInSchema()}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" variant="primary">
                    {loading ? (
                      <i key="spin" className="fa fa-spinner fa-spin" />
                    ) : (
                      <FormattedMessage {...messages.auth.enter} />
                    )}
                  </Button>
                </Form>
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
