import React, { useEffect } from 'react';
import './createArticle.scss';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { postArticle } from '../../Redux/ActionCreater/articleActionCreater';
import { Tag, switcherCreaterArticle } from '../../Redux/ActionCreater/appActionCreater';

const CreateArticle = ({ app, postArticle, switcherCreaterArticle, Tag, account, article }) => {
  useEffect(() => {
    switcherCreaterArticle(true);
    return () => {
      switcherCreaterArticle(false)
      Tag([''])
    };
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const { tags, newArticleLoading, successfulRequest } = app;
  const { token } = account.user;



  const onSubmit = (article) => {
    const tagList = [];
    for (let i = 0; i < tags.length; i++) {
      if (article[`tag${i}`].length !== 0) {
        tagList.push(article[`tag${i}`]);
        delete article[`tag${i}`];
      }
    }
    article = { ...article, tagList };
    postArticle({ article }, token);
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
        <div className="createArticle__tageItem" index={i} key={i}>
          <input
            type="text"
            className="createArticle__tageInput createArticleInputStyle"
            placeholder="Tag"
            name={`tag${i}`}
            ref={register}
            onChange={onChangeTag}
            id={i}
            value={tags[i]}
          />
          <button type="button" className="createArticle__tagebtnDelete" onClick={onClickDeletTag} id={i}>
            Delete
          </button>
          <button type="button" className="createArticle__tagebtnAddTag" onClick={onClickAddtag} id={i}>
            Add tag
          </button>
        </div>
      );
    } else {
      tag.push(
        <div className="createArticle__tageItem" index={i} key={i}>
          <input
            type="text"
            className="createArticle__tageInput createArticleInputStyle"
            placeholder={`tag${i}`}
            ref={register}
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

  const loding = (
    <div className="createArticleLoading">
      <Spin size="large" />
    </div>
  );

  if (successfulRequest[1]) {
    return <Redirect to={`/articles/${successfulRequest[0]}`} />;
  }

  if (newArticleLoading) {
    return <div className="createArticle">{loding}</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="createArticle">
          <span className="createArticle__header ">Create new article</span>

          <span className="createArticle__title">Title</span>
          <input
            defaultValue="dd"
            type="text"
            className="createArticle__titleInput createArticleInputStyle"
            placeholder="Title"
            name="title"
            ref={register({ required: true, minLength: 1 })}
          />
          {errors.title && <p className="signUp__error">Your user name needs to be at least 1 characters.</p>}

          <span className="createArticle__shortDescription">Short description</span>
          <input
            defaultValue="dd"
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
            defaultValue="dd"
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
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    account: state.account,
    article: state.article,
  };
};

export default connect(mapStateToProps, { postArticle, Tag, switcherCreaterArticle })(CreateArticle);
