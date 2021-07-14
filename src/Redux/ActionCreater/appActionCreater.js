import {
	NEWCARENTPAGE,
	SWITCHLOADING,
	SIGNIN,
	SIGNUP,
	CREATEARTICLE,
	TAG,
	NEWACCOUNT,
	SUCCESSFULREQUEST
 } from "../Type/typeApp";

export function switcherSignIn(value) {
	return {
	  type: SIGNIN,
	  payload: value,
	};
 }
 export function switcherCreaterArticle(value) {
	return {
	  type: CREATEARTICLE,
	  payload: value,
	};
 }
 export function switcherSignUp(value) {
	return {
	  type: SIGNUP,
	  payload: value,
	};
 }
 export function switchLoading(value) {
	return {
	  type: SWITCHLOADING,
	  payload: value,
	};
 }
 export function newCarentPage(page) {
	return {
	  type: NEWCARENTPAGE,
	  payload: page,
	};
 }
 export function Tag(value) {
	return {
	  type: TAG,
	  payload: value,
	};
 }
 export function newAccountflag(value) {
	return {
	  type: NEWACCOUNT,
	  payload: value,
	};
 }
 export function successfulRequestFn(value) {
	return {
	  type: SUCCESSFULREQUEST,
	  payload: value,
	};
 }