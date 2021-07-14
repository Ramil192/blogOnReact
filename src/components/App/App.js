import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/header';
import './app.scss';
import ArticleItems from '../ArticleItems/ArticleItems';
import ArticleOnePage from '../ArticleOnePage/ArticleOnePage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import CreateArticle from '../CreateArticle/CreateArticle';
import ProfileChange from '../ProfileChange/ProfileChange';
import EditArticle from '../EditArticle/EditArticle';
import { getAllArticleUnauthoried, getAllArticleAuthoried } from '../../Redux/ActionCreater/articleActionCreater';

const App = ({ getAllArticleUnauthoried, getAllArticleAuthoried, app }) => {
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      getAllArticleAuthoried(0, JSON.parse(localStorage.getItem('userInfo')).user.token);
    } else {
      getAllArticleUnauthoried();
    }
  }, []);


  useEffect(() => {
    if (app.successfulRequest[1]) {
      if (localStorage.getItem('userInfo')) {
        getAllArticleAuthoried(0, JSON.parse(localStorage.getItem('userInfo')).user.token);
      } else {
        getAllArticleUnauthoried();
      }
    }
  }, [app.successfulRequest[1]])


  return (
    <div className="wrapper">
      <Router>
        <Header />
        <Route path="/" exact component={ArticleItems} />
        <Route path="/articles" exact component={ArticleItems} />

        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticleOnePage slug={slug} />;
          }}
        />

        <Route
          path="/editArticle/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <EditArticle slug={slug} />;
          }}
        />

        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/profileChange" component={ProfileChange} />
        <Route path="/createArticle" component={CreateArticle} />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps, { getAllArticleUnauthoried, getAllArticleAuthoried })(App);
