import React, { useEffect } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { logOut, getOfLocalStorageUser } from '../../Redux/ActionCreater/accountActionCreater';

const Header = ({ account, app, getOfLocalStorageUser, logOut }) => {
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      getOfLocalStorageUser(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);

  function onClickLogOut() {
    localStorage.removeItem('userInfo');
    logOut();
  }

  const { username, image } = account.user;
  const { signIn, signUp, createArticle, authenticationLoading } = app;

  const classNameBtnSignIn = signIn ? 'header__btnSelected header__btnSignIn' : 'header__btnSignIn';
  const classNameBtnSignUp = signUp ? 'header__btnSelected header__btnSignUp' : 'header__btnSignUp';
  const classNameBtnCreateArticle = createArticle
    ? 'header__btnSelected header__btnCreateArticle'
    : 'header__btnCreateArticle';

  const unauthoried = (
    <>
      <Link to="/signIn">
        <button type="button" className={`${classNameBtnSignIn} btnStyle`}>
          Sign In
        </button>
      </Link>
      <Link to="/signUp">
        <button type="button" className={`${classNameBtnSignUp} btnStyle`}>
          Sign Up
        </button>
      </Link>
    </>
  );
  const authoried = (
    <>
      <Link to="/createArticle">
        <button type="button" className={`${classNameBtnCreateArticle} btnStyle`}>
          Create article
        </button>
      </Link>
      <Link to="/profileChange" className="header__avatar">
        <div className="header__name">{username}</div>
        <div className={image !== null ? 'header__img' : 'header__img noImg'}>
          <img src={image} alt="" />
        </div>
      </Link>
      <button type="button" className="header__btnLogOut" onClick={onClickLogOut}>
        Log Out
      </button>
    </>
  );
  const loding = (
    <div className="authenticationLoading">
      <Spin size="large" />
    </div>
  );

  const userAuthoried = username.length !== 0 ? authoried : unauthoried;

  const showAuthenticationLoading = authenticationLoading ? loding : userAuthoried;

  return (
    <header>
      <div className="header">
        <div className="header__items">
          <Link to="/" className="header__label">
            Realworld Blog
          </Link>
          <div className="header__btn">{showAuthenticationLoading}</div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    app: state.app,
  };
};

export default connect(mapStateToProps, { logOut, getOfLocalStorageUser })(Header);
