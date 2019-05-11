import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';
import messages from './messages';

class SForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
      showExtraError: false,
    };
    this.submit = this.submit.bind(this);
  }

  notifyError = () => {
    const { intl } = this.props;
    return toast.error(intl.formatMessage(messages['error.happened']));
  };

  allModels = () => {
    const { intl, defaultValues } = this.props;
    return {
      email: {
        type: 'string',
        title: intl.formatMessage(messages[`model.email`]),
        default: defaultValues && defaultValues.email,
        pattern:
          '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        messages: {
          pattern: `${intl.formatMessage(
            messages[`model.email`],
          )} ${intl.formatMessage(
            messages[`error.invalid`],
          )} Ex) test@academy.com`,
          required: `${intl.formatMessage(
            messages[`model.email`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
        },
      },
      name: {
        type: 'string',
        title: intl.formatMessage(messages[`model.name`]),
        default: defaultValues && defaultValues.name,
        minLength: 2,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.name`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
          minLength: `${intl.formatMessage(messages[`error.minRequired`])} 2`,
        },
      },
      password: {
        type: 'string',
        title: intl.formatMessage(messages[`model.password`]),
        default: defaultValues && defaultValues.password,
        minLength: 6,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.password`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
          minLength: `${intl.formatMessage(messages[`error.minRequired`])} 6`,
        },
      },
      repeatPassword: {
        type: 'string',
        title: intl.formatMessage(messages[`model.repeatPassword`]),
        default: defaultValues && defaultValues.repeatPassword,
        messages: {
          required: `${intl.formatMessage(messages[`auth.repeatPassError`])}`,
        },
      },
      description: {
        type: 'string',
        title: intl.formatMessage(messages[`model.description`]),
        default: defaultValues && defaultValues.description,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.description`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
        },
      },
      price: {
        type: 'number',
        title: intl.formatMessage(messages[`model.price`]),
        default: defaultValues && defaultValues.price,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.price`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
        },
      },
      durationDays: {
        type: 'integer',
        title: intl.formatMessage(messages[`model.durationDays`]),
        default: defaultValues && defaultValues.durationDays,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.durationDays`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
        },
      },
      dailyFoodCount: {
        type: 'integer',
        title: intl.formatMessage(messages[`model.dailyFoodCount`]),
        default: defaultValues && defaultValues.dailyFoodCount,
        minimum: 1,
        messages: {
          required: `${intl.formatMessage(
            messages[`model.dailyFoodCount`],
          )} ${intl.formatMessage(messages[`error.required`])}`,
          minimum: `${intl.formatMessage(messages[`error.minimum`])} 1`,
        },
      },
    };
  };

  getSchema = () => {
    const { schema, requiredSchema } = this.props;
    const allModels = this.allModels();
    const newSchema = {};
    schema.forEach(element => {
      const { name } = element;
      newSchema[name] = allModels[name];
    });
    return {
      type: 'object',
      required: requiredSchema,
      properties: newSchema,
    };
  };

  getUiSchema = () => {
    const { intl, schema, showUiLabels, showPlaceHolder } = this.props;
    const newUiSchema = {};
    schema.forEach(element => {
      const { name, uiWidget, isReadOnly } = element;
      newUiSchema[name] = {};
      if (uiWidget) {
        newUiSchema[name]['ui:widget'] = uiWidget;
      }
      if (!showUiLabels) {
        newUiSchema[name]['ui:options'] = { label: false };
      }
      if (showPlaceHolder) {
        newUiSchema[name]['ui:placeholder'] = intl.formatMessage(
          messages[`model.${name}`],
        );
      }
      if (isReadOnly) {
        newUiSchema[name]['ui:readonly'] = true;
      }
    });
    return newUiSchema;
  };

  transformErrors = errors => {
    const { properties } = this.getSchema();
    return errors.map(error => {
      const errorProperty = error.property.replace('.', '');

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
  };

  submit(data) {
    const { hiddenFormData, submitFunc } = this.props;
    this.setState({ live: true, showExtraError: true });
    const newFormData = { ...data.formData, ...hiddenFormData };
    submitFunc(newFormData);
  }

  render() {
    const { idPrefix, loading, validateFunc, submitBtnText } = this.props;
    const { live, showExtraError } = this.state;
    return (
      <Form
        idPrefix={idPrefix}
        className="col-12  mt-2 mb-1"
        formData={this.state.formData}
        onChange={({ formData }) =>
          this.setState({ formData, showExtraError: false })
        }
        onSubmit={this.submit}
        schema={this.getSchema()}
        validate={(formData, errors) =>
          validateFunc(formData, errors, showExtraError)
        }
        uiSchema={this.getUiSchema()}
        transformErrors={this.transformErrors}
        showErrorList={false}
        noHtml5Validate
        liveValidate={live}
      >
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <i key="spin" className="fa fa-spinner fa-spin" />
          ) : (
            <FormattedMessage {...messages[submitBtnText]} />
          )}
        </Button>
      </Form>
    );
  }
}

SForm.propTypes = {
  submitFunc: PropTypes.func,
  validateFunc: PropTypes.func,
  loading: PropTypes.bool,
  showUiLabels: PropTypes.bool,
  showPlaceHolder: PropTypes.bool,
  requiredSchema: PropTypes.arrayOf(PropTypes.string),
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uiWidget: PropTypes.string,
      isReadOnly: PropTypes.bool,
    }),
  ).isRequired,
  submitBtnText: PropTypes.string,
  defaultValues: PropTypes.object,
  idPrefix: PropTypes.string,
  hiddenFormData: PropTypes.object,
  intl: intlShape.isRequired,
};

SForm.defaultProps = {
  idPrefix: null,
  loading: false,
  showUiLabels: false,
  showPlaceHolder: true,
  defaultValues: {},
  hiddenFormData: {},
  submitBtnText: 'action.submit',
  validateFunc: (formData, errors) => errors,
};

export default injectIntl(SForm);
