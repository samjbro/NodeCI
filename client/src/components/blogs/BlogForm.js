import {map, each} from 'lodash'
import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Link} from 'react-router-dom'
import formFields from './formFields'
import BlogField from './BlogField'

class BlogForm extends Component {
  renderFields() {
    return map(formFields, ({label, name}) => {
      return (
        <Field
          key={name}
          component={BlogField}
          type="text"
          label={label}
          name={name}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/blogs" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}
  each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })
  return errors
}

export default reduxForm({
  form: 'blogForm',
  validate,
  destroyOnUnmount: false
})(BlogForm)
