import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteArticleFn, postArticleFavorite, getArticleOnePage, deleteActicle } from '../../Redux/ActionCreater/articleActionCreater';
import ReactMarkdown from 'react-markdown'
import './articleOnePage.scss';
import { Link , Redirect } from 'react-router-dom';


const ArticleOnePage = ({
  app,
  slug,
  getArticleOnePage,
  article,
  account,
  deleteArticleFn,
  deleteActicle,
  postArticleFavorite,
  item,
}) => {
  useEffect(() => {
    getArticleOnePage(slug);
  }, []);

  let element = [];
  let tagAll = [];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  function onCliclDelete() {
    deleteArticleFn(true);
  }
  function onCliclDeleteYes() {
    deleteActicle(slug, account.user.token);
    deleteArticleFn(false);
  }
  function onCliclDeleteNo() {
    deleteArticleFn(false);
  }
  function onClickLicke() {
    postArticleFavorite(slug, account.user.token);
  }
  if (article.articleOnePage.length !== 0) {
    const { title, body, author, createdAt, favoritesCount, tagList, description } = article.articleOnePage.article;
    const { deleteArticle, successfulRequest } = app;
    const date = new Date(createdAt);

    let btnEditAndEdit = <div />;

    if (author.username === account.user.username) {
      btnEditAndEdit = (
        <div className="articleOne__descriptionBtns">
          <button type="button" className="articleOne__descriptionBtnDelete" onClick={onCliclDelete}>
            Delete
          </button>
          <Link to={`/editArticle/${slug}`} type="button" className="articleOne__descriptionBtnEdit">
            Edit
          </Link>
          {deleteArticle && (
            <div className="articleOne__descriptionBtnDeleteYesNo">
              <div className="articleOne__descriptionBtnDeleteYesNoText">Are you sure to delete this article?</div>
              <div className="articleOne__descriptionBtnDeleteYesNoBtns">
                <button className="articleOne__descriptionBtnDeleteYesNoBtn" type="button" onClick={onCliclDeleteNo}>
                  No
                </button>
                <button className="articleOne__descriptionBtnDeleteYesNoBtn" type="button" onClick={onCliclDeleteYes}>
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    tagAll = tagList.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <div className="articleOne__tag">{item}</div>
        </React.Fragment>
      );
    });

    if (successfulRequest[1] && successfulRequest[0] === '') {
      return <Redirect to="/articles" />;
    }

    element = (
      <div className="articleOne">
        <div className="articleOne__items">
          <div className="articleOne__header">
            <div className="articleOne__leftColum">
              <div className="articleOne__titleHeader">
                <div className="articleOne__title">{title}</div>
                <button className="articleOne__like" onClick={onClickLicke}>
                  {favoritesCount}
                </button>
              </div>
              <div className="articleOne__tagHeader">
                {tagAll.length !== 0 ? tagAll : <div className="articleOne__tag">No tag</div>}
              </div>
              <div className="articleOne__descriptionHeader">
                <div className="articleOne__description">{description}</div>
              </div>
            </div>
            <div className="articleOne__rigthColum">
              <div className="articleOne__avatarInfo">
                <div className="articleOne__nameAndDate">
                  <div className="articleOne__name">{author.username}</div>
                  <div className="articleOne__date">
                    {`${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                  </div>
                </div>
                <div className="articleOne__avatar">
                  <img src={author.image} alt="" />
                </div>
              </div>
              {btnEditAndEdit}
            </div>
          </div>
          <ReactMarkdown source={body} />
        </div>
      </div>
    );
  } else {
    element = <div>Loading</div>;
  }
  return element;
};

const mapStateToProps = (state) => {
  return {
    article: state.article,
    app: state.app,
    account: state.account,
  };
};

export default connect(mapStateToProps, { deleteArticleFn, postArticleFavorite, getArticleOnePage, deleteActicle })(ArticleOnePage);
