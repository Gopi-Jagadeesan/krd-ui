import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import ReactSelect from "react-select";
import Label from "./Label";
import Hint from "./Hint";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.setFieldValue = "";
    this.fieldValue = "";
  }
  validate(value) {
    const { label, placeholder, required, error } = this.props;

    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;

    if (!value && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }

    return errorMessage;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.defaultValue &&
      prevProps.defaultValue !== this.props.defaultValue &&
      this.props.defaultValue !== this.fieldValue
    ) {
      this.setFieldValue(this.props.name, this.props.defaultValue);
    }
  }

  renderInput({ field, form: { touched, errors, setFieldValue, values } }) {
    const {
      name,
      id,
      label,
      placeholder,
      options,
      isLoading,
      onOpen,
      onSearch,
      onInputChange,
      onRender,
      isDisabled,
      required,
      fontBolded,
      smallNotificationMessage,
      fullWidth,
      isClearable,
      defaultValue,
      isSearchable,
      handleOnChangeSubmit,
      textColor,
      width,
      marignBottom,
      color,
      onKeyDown,
      autoFocus,
      readOnly,
      hintText
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    this.setFieldValue = setFieldValue;
    if (defaultValue && field && field.value) {
      this.fieldValue = field.value;
    }

    let placeholderText;
    if (placeholder) {
      placeholderText = placeholder;
    } else if (label) {
      placeholderText = `Select ${label}`;
    }
    let style = {};
    if (textColor) {
      style.color = `${textColor}`;
    }
    const fieldSelect = (
      <FormGroup
        id={id || label}
        style={{
          position: "relative",
          width: fullWidth ? "100%" : width ? width : ""
        }}
        className={`${marignBottom ? "mb-0" : ""}`}
      >
        {label && (
          <Label
            id={inputId}
            required={required}
            className={`${fontBolded ? "font-weight-bold" : ""}`}
          >
            {label}
          </Label>
        )}
        <ReactSelect
          inputId={id}
          onFocus={autoFocus}
          name={name}
          isDisabled={isDisabled}
          defaultValue={
            field.value && field.value.value !== null ? field.value : null
          }
          value={
            field.value && field.value.value !== null
              ? field.value
              : defaultValue
              ? defaultValue
              : null
          }
          classNamePrefix="select"
          isClearable={isClearable ? isClearable : false}
          isSearchable={isSearchable ? isSearchable : false}
          components={
            readOnly && {
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null
            }
          }
          color={color}
          menuPlacement="auto"
          options={options}
          isLoading={isLoading}
          onMenuOpen={() => onOpen && onOpen()}
          placeholder={placeholderText}
          onKeyDown={onKeyDown}
          onChange={value => {
            setFieldValue(name, value);
            if (onInputChange) {
              values[name] = value;
              onInputChange({ setFieldValue, values });
            }
            this.props.handleChange && this.props.handleChange(value);
            if (handleOnChangeSubmit) {
              values[name] = value;
              handleOnChangeSubmit(values, name, value);
            }
          }}
          onBlur={() => field.onBlur({ target: { name } })}
          onInputChange={value => onSearch && onSearch(value)}
          styles={{
            valueContainer: provided => {
              const paddingTop = "4px";
              const paddingBottom = "4px";
              const fontSize = "14px";
              return Object.assign({}, provided, {
                paddingTop,
                paddingBottom,
                fontSize
              });
            },
            control: (provided, state) => {
              let boxShadow;
              let background;
              let borderColor = errorMessage
                ? "#f86c6b !important"
                : provided.borderColor;
              if (state.isFocused) {
                boxShadow = errorMessage
                  ? "0 0 0 0.2rem rgba(248, 108, 107, 0.25)"
                  : "0 0 0 0.2rem rgba(32, 168, 216, 0.25)";
                borderColor = errorMessage ? borderColor : "#8ad4ee !important";
              } else {
                background = errorMessage ? background : "#f3f3f4 !important";
                borderColor = errorMessage ? borderColor : "white !important";
              }
              return Object.assign({}, provided, {
                borderColor,
                boxShadow,
                background
              });
            }
          }}
        />
        {smallNotificationMessage && (
          <span className="d-block h7">{smallNotificationMessage}</span>
        )}
        <span
          className={`d-none form-control ${errorMessage ? "is-invalid" : ""}`}
        />

        {hintText && (
          <div style={{ position: "absolute", marginTop: "6px" }}>
            <Hint hintText={hintText} />
          </div>
        )}

        {errorMessage && (
          <FormFeedback style={{ position: "absolute", marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );

    if (!onRender) {
      return fieldSelect;
    }

    return onRender(values, (err, render) => (render ? fieldSelect : null));
  }

  render() {
    const { name, id } = this.props;

    return (
      <Field
        id={id || name}
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  onOpen: PropTypes.func,
  onSearch: PropTypes.func,
  onInputChange: PropTypes.func
};

export default Select;
