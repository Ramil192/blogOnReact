import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Tag, successfulRequestFn } from '../../Redux/ActionCreater/appActionCreater';
import { putActicle, getArticleOnePage } from '../../Redux/ActionCreater/articleActionCreater';


const EditArticle = ({ slug, app, article, putActicle, getArticleOnePage, Tag, account }) => {
  useEffect(() => {
    getArticleOnePage(slug);
  }, []);

  const { register, handleSubmit, errors } = useForm();

  if (article.articleOnePage.length !== 0) {
    const { tags, successfulRequest } = app;
    const { title, body, description, tagList } = article.articleOnePage.article;
    const { token } = account.user;

    const onSubmit = (article) => {
      for (let i = 0; i < tags.length; i++) {
        delete article[`tag${i}`];
      }
      const tagList = tags;
      article = { ...article, tagList };
      console.log(article);
      putActicle({ article }, slug, token);
    };

    const tag = [];

    function onClickAddtag() {
      Tag([...tags, '']);
    }

    function onClickDeletTag(e) {
      if (tags.length !== 1) {
        const temp = tags;
        temp.splice(e.target.id, 1);
        Tag(temp);
      }
    }

    function onChangeTag(e) {
      const temp = tags;
      temp[e.target.id] = e.target.value;
      Tag(tags);
    }

    for (let i = 0; i < tags.length; i++) {
      if (i === tags.length - 1) {
        tag.push(
          <div className="createArticle__tageItem" key={i}>
            <input
              type="text"
              className="createArticle__tageInput createArticleInputStyle"
              placeholder="Tag"
              name={`tag${i}`}
              ref={register}
              defaultValue={tags[i]}
              onChange={onChangeTag}
              id={i}
              value={tags[i]}
            />
            <button type="button" className="createArticle__tagebtnDelete" onClick={onClickDeletTag} id={i}>
              Delete
            </button>
            <button type="button" className="createArticle__tagebtnAddTag" onClick={onClickAddtag}>
              Add tag
            </button>
          </div>
        );
      } else {
        tag.push(
          <div className="createArticle__tageItem" key={i}>
            <input
              type="text"
              className="createArticle__tageInput createArticleInputStyle"
              placeholder={`tag${i}`}
              ref={register}
              defaultValue={tags[i]}
              onChange={onChangeTag}
              id={i}
              value={tags[i]}
            />
            <button type="button" className="createArticle__tagebtnDelete" onClick={onClickDeletTag} id={i}>
              Delete
            </button>
          </div>
        );
      }
    }

    if (successfulRequest[1]) {
      return <Redirect to={`/articles/${successfulRequest[0]}`} />;
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="createArticle">
            <span className="createArticle__header ">Edit article</span>

            <span className="createArticle__title">Title</span>
            <input
              defaultValue={title}
              type="text"
              className="createArticle__titleInput createArticleInputStyle"
              placeholder="Title"
              name="title"
              ref={register({ required: true, minLength: 1 })}
            />
            {errors.title && <p className="signUp__error">Your user name needs to be at least 1 characters.</p>}

            <span className="createArticle__shortDescription">Short description</span>
            <input
              defaultValue={description}
              type="text"
              className="createArticle__shortDescriptionInput createArticleInputStyle"
              placeholder="Short description"
              name="description"
              ref={register({ required: true, minLength: 1 })}
            />
            {errors.description && (
              <p className="signUp__error">Your user short description needs to be at least 1 characters.</p>
            )}

            <span className="createArticle__text">Text</span>
            <textarea
              defaultValue={body}
              rows="5"
              className="createArticle__textInput createArticleInputStyle"
              placeholder="Text"
              name="body"
              ref={register({ required: true, minLength: 1 })}
            />
            {errors.body && <p className="signUp__error">Your user text needs to be at least 1 characters.</p>}

            <span className="createArticle__tags">Tags</span>
            <div className="createArticle__tageItems">{tag}</div>
            <button type="onSubmit" className="createArticle__btnAddSend">
              Send
            </button>
          </div>
        </form>
      </>
    );
  }
  return <div>Loading</div>;
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    article: state.article,
    account: state.account,
  };
};

export default connect(mapStateToProps, { putActicle, getArticleOnePage, Tag, successfulRequestFn })(EditArticle);
