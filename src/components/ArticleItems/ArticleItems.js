import React from 'react';
import { connect } from 'react-redux';
import { Spin , Pagination } from 'antd';
import ArticleList from '../ArticleList/ArticleList';
import './articleIItems.scss';
import {getAllArticleUnauthoried } from '../../Redux/ActionCreater/articleActionCreater';
import {switchLoading,newCarentPage } from '../../Redux/ActionCreater/appActionCreater';
import 'antd/dist/antd.css';

const ArticleItems = ({ article, app, getAllArticleUnauthoried, newCarentPage, switchLoading }) => {
  let element = [];
  const { articles, articlesCount } = article.articleALL;
  const loding = (
    <div className="loding">
      <Spin size="large" />
    </div>
  );

  if (articles) {
    element = articles.map((item, index) => {
      return (
        <React.Fragment key={item.slug}>
          <ArticleList item={item} index={index} />
        </React.Fragment>
      );
    });
  }

  function pageClick(page) {
    switchLoading(true);
    getAllArticleUnauthoried(`${page  }0` - 10);
    newCarentPage(page);
  }

  return (
    <>
      <div className="article">{app.loading ? loding : element}</div>
      <div className="paginatorItem">
        <Pagination
          current={app.currentPage}
          showSizeChanger={false}
          onChange={pageClick}
          total={articlesCount}
          defaultPageSize={20}
          pageSizeOptions={[20]}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    article: state.article,
    app: state.app,
  };
};

export default connect(mapStateToProps, {getAllArticleUnauthoried,switchLoading,newCarentPage})(ArticleItems);
