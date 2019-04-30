import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const passResetSchema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      minLength: 3,
      pattern:
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      messages: {
        pattern: 'Correo inválido! Ej) test@academy.com',
        required: 'Correo no puede estar vacío',
        minLength: 'Correo debe tener por lo menos 3 caracteres!',
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
};

class PassResetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitPassReset = this.submitPassReset.bind(this);
    this.validateSignIn = this.validateSignIn.bind(this);
    this.toggleLive = this.toggleLive.bind(this);
  }

  validateSignIn(formData, errors) {
    const { passResetError } = this.props;
    const { live } = this.state;
    if (
      live &&
      passResetError &&
      passResetError.code === 'auth/username-does-not-exist'
    ) {
      errors.username.addError('Este usuario no existe');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = passResetSchema.properties;
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

  submitPassReset(data) {
    this.setState({ live: true });
    this.props.passReset(data.formData);
  }

  toggleLive() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.togglePassReset();
  }

  render() {
    const { modalPassReset, loadingPassReset } = this.props;

    return (
      <Modal
        show={modalPassReset}
        onHide={this.toggleLive}
        className="roundedModal"
      >
        <Container>
          <Row>
            <ModalRightContainer className="col-12 text-center">
              <Row>
                <Col className="text-right">
                  <Button variant="danger" onClick={this.toggleLive}>
                    X
                  </Button>
                </Col>
                <ModalRightTitle className="col-12">
                  Restablecer Contraseña
                </ModalRightTitle>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) =>
                    this.setState({ formData, live: false })
                  }
                  onSubmit={this.submitPassReset}
                  schema={passResetSchema}
                  validate={this.validateSignIn}
                  uiSchema={uiSignInSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" variant="primary">
                    {loadingPassReset ? (
                      <i key="spin" className="fa fa-spinner fa-spin" />
                    ) : (
                      'Enviar correo'
                    )}
                  </Button>
                  <Button onClick={this.toggleLive} variant="danger">
                    Cerrar
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

PassResetModal.propTypes = {
  togglePassReset: PropTypes.func,
  modalPassReset: PropTypes.bool,
  passReset: PropTypes.func,
  passResetError: PropTypes.object,
  loadingPassReset: PropTypes.bool,
};

export default PassResetModal;
