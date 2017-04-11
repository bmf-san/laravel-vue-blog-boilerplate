import React, {Component, PropTypes} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import {
  createPost,
  fetchTags,
  suggestionTags,
  deleteCompleteTags,
  addCompleteTags,
  fetchCategories,
  updateMarkdown,
  initMarkdown,
  initCompleteTags
} from '../actions/index';
import {Link} from 'react-router';

require('../styles/markdown.css');
require('../styles/react_tags.css');

class NewPost extends Component {
  componentWillMount() {
    this.props.fetchTags();
    this.props.fetchCategories();
    this.props.initCompleteTags();
    this.props.initMarkdown();
  }

  onSubmit(props) {
    const {createPost, deleteCompleteTags, reset} = this.props;

    const data = {
      "title": props.title,
      "tags": this.props.tags.complete_tags,
      "category_id": props.category_id,
      "content": props.content,
      "publication_status": props.publication_status
    };

    return createPost(data).then((res) => {
      if (res.error) {
        const validation_msg = res.payload.response.data.messages

        throw new SubmissionError({
          title: [validation_msg.title],
          content: [validation_msg.content]
        });
      } else {
        const id = res.payload.data.id

        this.context.router.push(`/dashboard/edit-post/${id}`);
      }
    })
  }

  renderTitleField({
    input,
    label,
    type,
    meta: {
      touched,
      error
    }
  }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input {...input} placeholder={label} type={type} className={touched && ((error && "input is-danger")) || 'input'}/>{touched && ((error && <span className="help is-danger">{error}</span>))}
        </div>
      </div>
    )
  }

  renderMarkdownField() {
    const html = this.props.posts.markdown

    return (
      <div className="content markdown-area" dangerouslySetInnerHTML={{
        __html: html
      }}></div>
    )
  }

  renderContentField({
    input,
    label,
    markdownField,
    meta: {
      touched,
      error
    }
  }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <div className="columns">
            <div className="column">
              <textarea {...input} placeholder={label} className={touched && ((error && "input is-danger is-resizeless markdown-area")) || 'input is-resizeless markdown-area'}></textarea>{touched && ((error && <span className="help is-danger">{error}</span>))}
            </div>
            <div className="column">
              {markdownField}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCategoryField({
    input,
    label,
    meta: {
      touched,
      error
    }
  }) {
    return (
      <div className="field">
        <div className="control">
          {this.props.categories.all.map((category) => {
            return <label key={category.id} className="radio">
              <input type="radio" {...input} value={category.id} defaultChecked={category.id == input.value
                ? "checked"
                : ''}/> {category.name}
            </label>
          })}
        </div>
      </div>
    )
  }

  renderSubmitBtnField({input}) {
    return (
      <div className="field is-grouped is-pulled-right">
        <div className="control">
          <span className="select">
            <select {...input}>
              <option value="draft">Draft</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </span>
        </div>
        <div className="control">
          <button className="button is-primary">Submit</button>
        </div>
      </div>
    )
  }

  handleDelete(index) {
    const {deleteCompleteTags} = this.props;

    deleteCompleteTags(index);
  }

  handleAddition(props) {
    const {addCompleteTags} = this.props;

    addCompleteTags(props);
  }

  handleUpdateMarkdown(e) {
    const {updateMarkdown} = this.props;

    updateMarkdown(e.target.value);
  }

  render() {
    const {handleSubmit} = this.props

    const suggestions = this.props.tags.all.map((tag) => {
      return {id: tag.id, name: tag.name}
    })

    return (
      <section className="section">
        <div className="container">
          <div className="heading">
            <h1 className="title">NewPost</h1>
            <h2 className="subtitle">
              Here is perfomance infomation.
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" type="text" component={this.renderTitleField} placeholder="Title"/>
          <div>
            <label>Tag</label>
            <div>
              <ReactTags tags={this.props.tags.complete_tags} suggestions={suggestions} handleDelete={this.handleDelete.bind(this)} handleAddition={this.handleAddition.bind(this)} allowNew={true} autofocus={false}/>
            </div>
          </div>
          <Field label="Content" onChange={this.handleUpdateMarkdown.bind(this)} name="content" component={this.renderContentField} placeholder="Content" markdownField={this.renderMarkdownField()}/>
          <Field label="Categories" name="category_id" component={this.renderCategoryField.bind(this)} placeholder="Cateogory"/>
          <Field name="publication_status" component={this.renderSubmitBtnField}/>
        </form>
      </section>
    );
  }
}

NewPost.contextTypes = {
  router: PropTypes.object
}

const validate = props => {
  const errors = {}

  return errors;
}

const form = reduxForm({form: 'NewPostForm', validate})(NewPost)

function mapStateToProps(state) {
  return {
    posts: state.posts,
    tags: state.tags,
    categories: state.categories,
    initialValues: {
      category_id: 1,
      publication_status: 'draft'
    }
  }
}

export default connect(mapStateToProps, {
  createPost,
  fetchTags,
  deleteCompleteTags,
  addCompleteTags,
  fetchCategories,
  updateMarkdown,
  initMarkdown,
  initCompleteTags
})(form);
