import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {newEmail,newPassword,postAuthentication} from '../../Redux/ActionCreater/accountActionCreater';
import {switcherSignIn,newAccountflag} from '../../Redux/ActionCreater/appActionCreater';

const SignIn = ({ user, error, newEmail, newPassword, postAuthentication, switcherSignIn, app, newAccountflag }) => {
  useEffect(() => {
    switcherSignIn(true);
    newAccountflag(false);
    return () => switcherSignIn(false);
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const { email, password, username } = user.newAccount;
  const { emailOrPasswordIsInvalid } = error;
  const { authentication } = app;

  const onSubmit = (user) => {
    postAuthentication({ user });
  };

  function onChanhe(e) {
    console.log(e.target.value);
    if (e.target.name === 'email') {
      newEmail(e.target.value);
    } else {
      newPassword(e.target.value);
    }
  }

  if (authentication) {
    return <Redirect to="/articles" />;
  }

  return (
    <>
      <div className="signUp">
        <div className="signUp__title">Sign In</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {emailOrPasswordIsInvalid && <div className="signUp__error">Password or Email is invalid </div>}
          <span className="signUp__emailAddress signUp_textStyle">Email address</span>
          <input
            onChange={onChanhe}
            name="email"
            type="email"
            className="signUp__inputEmailAddress signUp_inputStyle"
            value={email}
            ref={register({ required: true })}
          />

          <span className="signUp__password signUp_textStyle">Password</span>
          <input
            onChange={onChanhe}
            name="password"
            type="password"
            className="signUp__inputPassword signUp_inputStyle"
            value={password}
            ref={register({
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && <p className="signUp__error">Password or Email is invalid</p>}

          <button type="submit" className="signUp__btn">
            Login
          </button>
        </form>
        <div className="signUp__qustionSignInItems">
          <div className="signUp__qustionSignIn">Don’t have an user?</div>

          <Link to="/signUp">
            <button type="button" className="signUp__qustionSignInBtn">
              Sign Up.
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapToStateProps = (state) => {
  return {
    user: state.account,
    error: state.errors,
    app: state.app,
  };
};

export default connect(mapToStateProps, {newEmail,newPassword,postAuthentication,switcherSignIn,newAccountflag})(SignIn);
