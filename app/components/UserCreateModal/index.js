import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
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

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitSignUp = this.submitSignUp.bind(this);
    this.validateSignUp = this.validateSignUp.bind(this);
    this.toggleLiveSignUp = this.toggleLiveSignUp.bind(this);
    this.toggleLiveSignIn = this.toggleLiveSignIn.bind(this);
    this.transformErrors = this.transformErrors.bind(this);
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

  signUpSchema = () => {
    const { intl } = this.props;
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          minLength: 2,
          messages: {
            required: `${intl.formatMessage(
              messages.model.fullName,
            )} ${intl.formatMessage(messages.error.required)}`,
            minLength: `${intl.formatMessage(messages.error.minRequired)} 2`,
          },
        },
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
          minLength: 6,
          messages: {
            required: `${intl.formatMessage(
              messages.model.password,
            )} ${intl.formatMessage(messages.error.required)}`,
            minLength: 'Contraseña debe tener por lo menos 6 caracteres!',
          },
        },
        pass2: {
          type: 'string',
          minLength: 6,
          messages: {
            minLength: 'Contraseña debe tener por lo menos 6 caracteres!',
          },
        },
      },
    };
  };

  uiSignUpSchema = () => {
    const { intl } = this.props;
    return {
      name: {
        'ui:options': {
          label: false,
        },
        'ui:placeholder': intl.formatMessage(messages.model.fullName),
      },
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
      pass2: {
        'ui:widget': 'password',
        'ui:options': {
          label: false,
        },
        'ui:placeholder': intl.formatMessage(messages.model.password),
      },
    };
  };

  notifyVerificationSent = () => {
    const { intl } = this.props;
    return toast(intl.formatMessage(messages.auth.verificationSent), {
      className: 'bg-success',
      bodyClassName: 'text-white',
      progressClassName: 'fancy-progress-bar',
    });
  };

  validateSignUp(formData, errors) {
    const { signUpError, intl } = this.props;
    const { live } = this.state;

    if (formData.password !== formData.pass2) {
      errors.pass2.addError('Contraseña no es similar al anterior');
    }
    if (
      live &&
      signUpError &&
      signUpError.code === 'auth/email-already-in-use'
    ) {
      errors.email.addError(intl.formatMessage(messages.auth.emailTaken));
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');
      const { properties } = this.signUpSchema();

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

  submitSignUp(data) {
    this.setState({ live: true });
    this.props.signUp(data.formData);
  }

  toggleLiveSignUp() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggleSignUp();
  }

  toggleLiveSignIn() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggle();
  }

  render() {
    const { modalSignUp, loading } = this.props;

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
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) =>
                    this.setState({ formData, live: false })
                  }
                  onSubmit={this.submitSignUp}
                  schema={this.signUpSchema()}
                  validate={this.validateSignUp}
                  uiSchema={this.uiSignUpSchema()}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" variant="primary">
                    {loading ? (
                      <i key="spin" className="fa fa-spinner fa-spin" />
                    ) : (
                      <FormattedMessage {...messages.action.add} />
                    )}
                  </Button>
                </Form>
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
