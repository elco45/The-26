import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Button, Modal } from 'react-bootstrap';

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

const signInSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      pattern:
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      messages: {
        pattern: 'Correo inválido! Ej) test@academy.com',
        required: 'Correo no puede estar vacío',
      },
    },
    password: {
      type: 'string',
      messages: {
        required: 'Contraseña no puede estar vacío',
      },
    },
  },
};

const uiSignInSchema = {
  email: {
    'ui:widget': 'email',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Correo Electrónico',
  },
  password: {
    'ui:widget': 'password',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Contraseña',
  },
};

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
  }

  validateSignIn(formData, errors) {
    const { signInError } = this.props;
    const { live } = this.state;

    if (live && signInError && signInError.code === 'auth/user-not-found') {
      errors.password.addError('Correo o contraseña inválido.');
    }
    if (live && signInError && signInError.code === 'auth/wrong-password') {
      errors.password.addError('Correo o contraseña inválido.');
    }
    if (live && signInError && signInError.code === 'auth/user-not-verified') {
      errors.password.addError('Please verify your email.');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = signInSchema.properties;
      if (
        schemaProperty[errorProperty] &&
        schemaProperty[errorProperty].messages[error.name]
      ) {
        return {
          ...error,
          message: schemaProperty[errorProperty].messages[error.name],
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
        <div className="container">
          <div className="row">
            <ModalRightContainer className="col-12 text-center">
              <div className="row">
                <div className="col-12 text-right">
                  <button
                    type="button"
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggleLiveSignIn}
                  >
                    X
                  </button>
                </div>
                <ModalRightTitle className="col-12">
                  Iniciar Sesión
                </ModalRightTitle>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) =>
                    this.setState({ formData, live: false })
                  }
                  onSubmit={this.submitSignIn}
                  schema={signInSchema}
                  validate={this.validateSignIn}
                  uiSchema={uiSignInSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" variant="primary">
                    {loading ? (
                      <i key="spin" className="fa fa-spinner fa-spin" />
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </Form>
                <div className="col-12">
                  <div className="float-left">
                    <ModalTextOpenSI onClick={this.toggleLivePass}>
                      {' '}
                      Se me olvidó la contraseña...
                    </ModalTextOpenSI>
                  </div>
                </div>
              </div>
            </ModalRightContainer>
          </div>
        </div>
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
};

export default SignInModal;
