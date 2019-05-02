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

class PassResetModal extends React.Component {
  constructor(props) {
    super(props);

    this.validatePassReset = this.validatePassReset.bind(this);
    this.toggleLive = this.toggleLive.bind(this);
  }

  validatePassReset(formData, errors, live) {
    const { passResetError, intl } = this.props;
    if (
      live &&
      passResetError &&
      passResetError.code === 'auth/user-not-found'
    ) {
      errors.email.addError(
        intl.formatMessage(messages.auth.emailNotRegistered),
      );
    }
    return errors;
  }

  toggleLive() {
    this.props.togglePassReset();
  }

  render() {
    const { modalPassReset, loadingPassReset, passReset } = this.props;

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
                  <FormattedMessage {...messages.auth.restorePass} />
                </ModalRightTitle>
                <SForm
                  submitFunc={passReset}
                  validateFunc={this.validatePassReset}
                  loading={loadingPassReset}
                  showUiLabels={false}
                  showPlaceHolder
                  requiredSchema={['email']}
                  schema={['email']}
                  submitBtnText="action.send"
                />
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
  intl: intlShape.isRequired,
};

export default injectIntl(PassResetModal);
