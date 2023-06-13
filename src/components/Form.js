import React from "react";
import PropTypes from "prop-types";
import { Formik, Form as FormikForm } from "formik";

class Form extends React.Component {
  render() {
    const {
      initialValues,
      enableReinitialize,
      onSubmit,
      children,
      onReset,
      id,
    } = this.props;
    
    return (
      <Formik
        id={id || children}
        initialValues={initialValues}
        enableReinitialize={enableReinitialize}
        onSubmit={(values) => onSubmit(values)}
        onReset={onReset}
      >
        {() => <FormikForm>{children}</FormikForm>}
      </Formik>
    );
  }
}

Form.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Form;
