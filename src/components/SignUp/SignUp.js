import React, { useEffect } from 'react';
import './SignUp.scss';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import {newName, newEmail, newPassword, postNewAccount} from '../../Redux/ActionCreater/accountActionCreater';
import {switcherSignUp} from '../../Redux/ActionCreater/appActionCreater';

const SignUp = ({ user, error, newName, newEmail, newPassword, postNewAccount, switcherSignUp, app }) => {
  useEffect(() => {
    switcherSignUp(true);
    return () => switcherSignUp(false);
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const { username, email, password } = user.newAccount;
  const { emailHasAlreadyBeenTaken, usernameHasAlreadyBeenTaken } = error;
  const { newAccount } = app;
  const onSubmit = (user) => {
    postNewAccount({ user });
  };

  function onChanhe(e) {
    console.log(e.target.value);
    if (e.target.name === 'username') {
      newName(e.target.value);
    } else if (e.target.name === 'email') {
      newEmail(e.target.value);
    } else if (e.target.name === 'password') {
      newPassword(e.target.value);
    }
  }

  if (newAccount) {
    return <Redirect to="/signIn" />;
  }

  return (
    <>
      <div className="signUp">
        <div className="signUp__title">Create new user</div>
        <span className="signUp__username signUp_textStyle">Username</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            onChange={onChanhe}
            name="username"
            value={username}
            className="signUp__inputusername signUp_inputStyle"
            ref={register({ required: true, minLength: 3 })}
            placeholder="username"
          />
          {errors.username && <p className="signUp__error">Your user name needs to be at least 3 characters.</p>}
          {usernameHasAlreadyBeenTaken && <div className="signUp__error">Username has already been taken </div>}

          <span className="signUp__emailAddress signUp_textStyle">Email address</span>
          <input
            onChange={onChanhe}
            value={email}
            name="email"
            type="email"
            className="signUp__inputEmailAddress signUp_inputStyle"
            placeholder="Email address"
            ref={register}
          />
          {emailHasAlreadyBeenTaken && <div className="signUp__error">email has already been taken</div>}

          <span className="signUp__password signUp_textStyle">Password</span>
          <input
            onChange={onChanhe}
            value={password}
            name="password"
            type="password"
            className="signUp__inputPassword signUp_inputStyle"
            ref={register({ required: true, minLength: 8 })}
            placeholder="Password"
          />
          {errors.password && <p className="signUp__error">Your password needs to be at least 8 characters.</p>}

          <span className="signUp__repeatPassword signUp_textStyle">Repeat Password</span>
          <input
            onChange={onChanhe}
            name="repeatPassword"
            type="password"
            className="signUp__inputRepeatPassword signUp_inputStyle"
            placeholder="Repeat Password"
            ref={register({
              validate: (value) => value === password,
            })}
          />
          {errors.repeatPassword && <p className="signUp__error">Passwords must match</p>}

          <label htmlFor="1" className="signUp__checkboxItems">
            <input
              name="checkBox"
              className="signUp__checkbox"
              type="checkbox"
              id="1"
              ref={register({ required: true })}
            />
            <span className="signUp__checkboxText"> I agree to the processing of my personal information</span>
            {errors.checkBox && <p className="signUp__error">check the box</p>}
          </label>
          <button type="submit" className="signUp__btn">
            Create
          </button>
        </form>

        <div className="signUp__qustionSignInItems">
          <div className="signUp__qustionSignIn">Already have an user? </div>
          <Link to="/signIn">
            <button className="signUp__qustionSignInBtn">Sign In.</button>
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

export default connect(mapToStateProps, {newName, newEmail, newPassword, postNewAccount,switcherSignUp})(SignUp);
