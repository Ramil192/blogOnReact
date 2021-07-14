import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import {newEmail,newPassword,putAccount,newImage,newBio} from '../../Redux/ActionCreater/accountActionCreater';

const ProfileChange = ({ userDate, newEmail, newPassword, putAccount, newBio, newImage }) => {
  const { register, handleSubmit, errors } = useForm();
  const { email, password, bio, image } = userDate.newAccount;
  const { token } = userDate.user;

  const onSubmit = (user) => {
    console.log({ user });
    putAccount({ user }, token);
  };

  function onChanhe(e) {
    console.log(e.target.value);
    if (e.target.name === 'email') {
      newEmail(e.target.value);
    } else if (e.target.name === 'password') {
      newPassword(e.target.value);
    } else if (e.target.name === 'bio') {
      newBio(e.target.value);
    } else {
      newImage(e.target.value);
    }
  }
  return (
    <>
      <div className="signUp">
        <div className="signUp__title">Profile Cgange</div>
        <span className="signUp__username signUp_textStyle">New email</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            onChange={onChanhe}
            value={email}
            name="email"
            type="email"
            className="signUp__inputEmailAddress signUp_inputStyle"
            placeholder="New Email address"
            ref={register}
          />

          <span className="signUp__password signUp_textStyle">BIO</span>
          <input
            onChange={onChanhe}
            defaultValue="Joker"
            name="bio"
            type="text"
            className="signUp__inputbio signUp_inputStyle"
            ref={register({ required: true, minLength: 5 })}
            placeholder="bio"
          />
          {errors.bio && <p className="signUp__error">Your bio needs to be at least 5 characters.</p>}

          <span className="signUp__password signUp_textStyle">New Img url</span>
          <input
            onChange={onChanhe}
            name="image"
            type="text"
            className="signUp__inputbio signUp_inputStyle"
            ref={register({ required: true })}
            placeholder="New Img url"
            defaultValue="https://cdn.join.chat/app/uploads/2020/01/icon-randomphone.png"
          />
          <button type="submit" className="signUp__btn">
            Accept
          </button>
        </form>
      </div>
    </>
  );
};

const mapToStateProps = (state) => {
  return {
    userDate: state.account,
  };
};

export default connect(mapToStateProps, {newEmail,newPassword,putAccount,newImage,newBio})(ProfileChange);
