import React from 'react';
import './articleList.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteArticleFavorite,articleFavotiter,postArticleFavorite } from '../../Redux/ActionCreater/articleActionCreater';

const ArticleList = ({ item, account, postArticleFavorite, index, articleFavotiter, deleteArticleFavorite }) => {
  const { title, description, author, createdAt, favoritesCount, tagList, slug, favorited } = item;

  const date = new Date(createdAt);
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
  const { token } = account.user;
  const classNameFavorited = favorited ? 'articleOne__likeTrue' : 'articleOne__like';

  const elemet = tagList.map((items, i) => {
    return (
      <React.Fragment key={i}>
        <div className="article__tag">{items}</div>
      </React.Fragment>
    );
  });

  function onClickLicke() {
    if (token) {
      articleFavotiter(index);
      if (favorited) {
        deleteArticleFavorite(slug, token);
      } else {
        console.log('');
        postArticleFavorite(slug, token);
      }
    }
  }

  function onClickTitle() {
    console.log('dd');
  }

  return (
    <>
      <div className="article__items">
        <div className="article__leftColum">
          <div className="article__titleItems">
            <Link to={`/articles/${slug}`} className="article__title" onClick={onClickTitle}>
              {title}
            </Link>
            {token ? (
              <button type="button" className={classNameFavorited} onClick={onClickLicke}>
                {favoritesCount}
              </button>
            ) : (
              <Link to="/signIn" className={classNameFavorited}>
                {favoritesCount}
              </Link>
            )}
          </div>
          <div className="article__tagItems">
            {elemet.length !== 0 ? elemet : <div className="article__tag">No tag</div>}
          </div>
          <div className="article__text">{description}</div>
        </div>
        <div className="article__rigthColum">
          <div className="article__nameAndDate">
            <div className="article__name">{author.username}</div>
            <div className="article__date">
              {`${month[date.getMonth()]  } ${  date.getDate()  }, ${  date.getFullYear()}`}
            </div>
          </div>
          <div className="article__avatar">
            <img src={author.image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    article: state.article,
  };
};

export default connect(mapStateToProps, {deleteArticleFavorite,articleFavotiter,postArticleFavorite })(ArticleList);
