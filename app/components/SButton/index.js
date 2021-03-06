import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import SModal from '../SModal';

class SButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggle: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.functionSuccess !== nextProps.functionSuccess &&
      nextProps.functionSuccess
    ) {
      this.toggle();
    }
  }

  toggle() {
    const { modalToggle } = this.state;
    this.setState({
      modalToggle: !modalToggle,
    });
  }

  renderModal() {
    const {
      func,
      functionError,
      functionSuccess,
      loading,
      showUiLabels,
      modalTitleTextId,
      modalButtonTextId,
      requiredSchema,
      schema,
      customSchema,
      definitions,
      defaultValues,
      hiddenFormData,
      validateFunc,
    } = this.props;
    return (
      <SModal
        toggle={this.toggle}
        modalToggle={this.state.modalToggle}
        showUiLabels={showUiLabels}
        func={func}
        functionError={functionError}
        functionSuccess={functionSuccess}
        validateFunc={validateFunc}
        modalTitleTextId={modalTitleTextId}
        modalButtonTextId={modalButtonTextId}
        loading={loading}
        schema={schema}
        customSchema={customSchema}
        requiredSchema={requiredSchema}
        defaultValues={defaultValues}
        definitions={definitions}
        hiddenFormData={hiddenFormData}
      />
    );
  }

  renderButton() {
    const { buttonTextId, syncing } = this.props;
    const message = {
      id: buttonTextId,
    };
    if (!syncing) {
      return (
        <Button onClick={this.toggle}>
          <FormattedMessage {...message} />
        </Button>
      );
    }
    return (
      <div key="spin" className="text-center">
        <i className="fa fa-spinner fa-spin fa-pulse" />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderButton()}
        {this.renderModal()}
      </div>
    );
  }
}

SButton.propTypes = {
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  showUiLabels: PropTypes.bool,
  buttonTextId: PropTypes.string.isRequired,
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
  ),
  customSchema: PropTypes.object,
  definitions: PropTypes.object,
  defaultValues: PropTypes.object,
  hiddenFormData: PropTypes.object,
};

export default SButton;
