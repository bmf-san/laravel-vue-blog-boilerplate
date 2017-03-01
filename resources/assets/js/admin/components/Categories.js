import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { createCategory, fetchCategories } from '../actions/index';
import { Link } from 'react-router';

class Categories extends Component {
  onSubmit(props) {
    this.props.createCategory(props)
      .then(() => {
        this.context.router.push('/admin/dashboard/categories');
      })
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    return this.props.categories.map((category) => {
      return (
        <li key={category.id}>
          {category.name}
        </li>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="name"
            component={name =>
              <div>
                <label>Category</label>
                <input type="text" {...name} />
              </div>
            }/>
          <button type="submit">Submit</button>
        </form>
        {this.renderCategories()}
      </div>
    );
  }
}

Categories.contextTypes = {
  router: PropTypes.object
}

const form = reduxForm({
  form: 'CategoryForm'
})(Categories)

function mapStateToProps(state) {
  return {
    categories: state.categories.all
  };
}

export default connect(mapStateToProps, { createCategory, fetchCategories })(form);