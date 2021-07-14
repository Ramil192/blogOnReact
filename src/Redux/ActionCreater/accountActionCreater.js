import Search from '../../Search/search';
import {
	EMAILORPASSWORDISINVALID,
	EMAILHASALREADYBEENTAKEN,
	USERNAMEHASALREADYBEENTAKEN,
 } from "../Type/typeErrors";
 import {
	NEWCARENTPAGE,
	SWITCHLOADING,
	SIGNIN,
	SIGNUP,
	CREATEARTICLE,
	DELETEARTICLE,
	TAG,
	AUTHENTICATIONLOADING,
	AUTHENTICATION,
	NEWARTICLELOADING,
	NEWACCOUNT,
 } from "../Type/typeApp";
import { NEWNAME, NEWEMAIL, NEWPASSWORD, AUTHORIZEUSER, BIO, IMAGE, LOGOUT } from "../Type/typeAccount";

export function postNewAccount(account) {
	return function repeatedRequest(dispatch) {
	  dispatch({ type: EMAILHASALREADYBEENTAKEN, payload: false });
	  dispatch({ type: USERNAMEHASALREADYBEENTAKEN, payload: false });
	  setTimeout(() => {
		 Search
			.postNewAccount(account)
			.then((articles) => {
			  console.log(articles.user);
			  if (articles.user) {
				 console.log('++');
				 dispatch({ type: NEWACCOUNT, payload: true });
			  } else {
				 if (articles.errors.email) {
					dispatch({ type: EMAILHASALREADYBEENTAKEN, payload: true });
				 }
				 if (articles.errors.username) {
					dispatch({ type: USERNAMEHASALREADYBEENTAKEN, payload: true });
				 }
			  }
			})
			.catch(() => repeatedRequest(dispatch));
	  }, 300);
	};
 }
 export function newAccountflag(value) {
	return {
	  type: NEWACCOUNT,
	  payload: value,
	};
 }
 
 export function putAccount(account, token) {
	return function repeatedRequest(dispatch) {
	  setTimeout(() => {
		 Search
			.putAcation(account, token)
			.then((articles) => {
			  console.log(articles);
			})
			.catch(() => repeatedRequest(dispatch));
	  }, 1000);
	};
 }
 export function logOut() {
	return {
	  type: LOGOUT,
	};
 }
 export function newName(value) {
	return {
	  type: NEWNAME,
	  payload: value,
	};
 }
 
 export function newEmail(value) {
	return {
	  type: NEWEMAIL,
	  payload: value,
	};
 }
 
 export function newPassword(value) {
	return {
	  type: NEWPASSWORD,
	  payload: value,
	};
 }
 
 export function newBio(value) {
	return {
	  type: BIO,
	  payload: value,
	};
 }
 
 export function newImage(value) {
	return {
	  type: IMAGE,
	  payload: value,
	};
 }
 export function getOfLocalStorageUser(user) {
	return {
	  type: AUTHORIZEUSER,
	  payload: user,
	};
 }
 export function postAuthentication(account) {
	return function repeatedRequest(dispatch) {
	  setTimeout(() => {
		 dispatch({ type: AUTHENTICATIONLOADING, payload: true });
		 Search
			.postAuthentication(account)
			.then((authorizedUser) => {
			  if (authorizedUser.errors) {
				 dispatch({ type: EMAILORPASSWORDISINVALID, payload: true });
			  } else {
				 dispatch({ type: AUTHORIZEUSER, payload: authorizedUser });
				 dispatch({ type: EMAILORPASSWORDISINVALID, payload: false });
				 dispatch({ type: AUTHENTICATIONLOADING, payload: false });
				 dispatch({ type: AUTHENTICATION, payload: true });
				 localStorage.setItem('userInfo', JSON.stringify(authorizedUser));
			  }
			})
			.catch(() => repeatedRequest(dispatch));
	  });
	};
 }
 