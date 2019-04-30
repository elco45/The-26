import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const signUpSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      messages: {
        required: 'Nombre no puede estar vacío',
        minLength: 'Nombre debe tener por lo menos 2 caracteres!',
      },
    },
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
      minLength: 6,
      messages: {
        required: 'Contraseña no puede estar vacío',
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

const uiSignUpSchema = {
  name: {
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Nombre completo',
  },
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
  pass2: {
    'ui:widget': 'password',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Repita Contraseña',
  },
};

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

  notifyVerificationSent = () =>
    toast('Verification email sent.', {
      className: 'bg-success',
      bodyClassName: 'text-white',
      progressClassName: 'fancy-progress-bar',
    });

  validateSignUp(formData, errors) {
    const { signUpError } = this.props;
    const { live } = this.state;

    if (formData.password !== formData.pass2) {
      errors.pass2.addError('Contraseña no es similar al anterior');
    }
    if (
      live &&
      signUpError &&
      signUpError.code === 'auth/email-already-in-use'
    ) {
      errors.email.addError('Este correo ya esta siendo utilizado');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = signUpSchema.properties;
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
                <ModalRightTitle className="col-12">Academy</ModalRightTitle>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) =>
                    this.setState({ formData, live: false })
                  }
                  onSubmit={this.submitSignUp}
                  schema={signUpSchema}
                  validate={this.validateSignUp}
                  uiSchema={uiSignUpSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" variant="primary">
                    {loading ? (
                      <i key="spin" className="fa fa-spinner fa-spin" />
                    ) : (
                      'Registrarse'
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
};

export default SignUpModal;
