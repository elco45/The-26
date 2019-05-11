import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import SForm from '../SForm';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const SModal = ({
  modalToggle,
  loading,
  showUiLabels,
  func,
  validateFunc,
  toggle,
  modalTitleTextId,
  modalButtonTextId,
  requiredSchema,
  schema,
  defaultValues,
  hiddenFormData,
}) => {
  const modalTitleText = {
    id: modalTitleTextId,
  };
  return (
    <Modal show={modalToggle} onHide={toggle}>
      <Container>
        <Row>
          <ModalRightContainer className="col-12">
            <Row>
              <Col className="text-right">
                <Button variant="danger" onClick={toggle}>
                  X
                </Button>
              </Col>
              <ModalRightTitle className="col-12 text-center">
                <FormattedMessage {...modalTitleText} />
              </ModalRightTitle>
              <SForm
                submitFunc={func}
                validateFunc={validateFunc}
                loading={loading}
                showUiLabels={showUiLabels}
                showPlaceHolder
                requiredSchema={requiredSchema}
                schema={schema}
                defaultValues={defaultValues}
                submitBtnText={modalButtonTextId}
                hiddenFormData={hiddenFormData}
              />
            </Row>
          </ModalRightContainer>
        </Row>
      </Container>
    </Modal>
  );
};

SModal.propTypes = {
  loading: PropTypes.bool,
  toggle: PropTypes.func,
  showUiLabels: PropTypes.bool,
  modalToggle: PropTypes.bool,
  functionSuccess: PropTypes.bool,
  functionError: PropTypes.object,
  func: PropTypes.func.isRequired,
  validateFunc: PropTypes.func,
  modalTitleTextId: PropTypes.string.isRequired,
  modalButtonTextId: PropTypes.string.isRequired,
  requiredSchema: PropTypes.arrayOf(PropTypes.string),
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uiWidget: PropTypes.string,
    }),
  ).isRequired,
  defaultValues: PropTypes.object,
  hiddenFormData: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(SModal);
