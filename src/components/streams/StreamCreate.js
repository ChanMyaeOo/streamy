import React from "react";
import { connect } from "react-redux";
import { createStreams } from "../../actions";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onFormSubmit = (formValues) => {
    this.props.createStreams(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title.";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(null, { createStreams })(formWrapped);
