// import Search from '../Search/search';
// import { ASYARTICLEALL, ASYARTICLEONEPAGE, ARTICLEFAVORITED } from "./Type/typeSearch";
// import {
//   EMAILORPASSWORDISINVALID,
//   EMAILHASALREADYBEENTAKEN,
//   USERNAMEHASALREADYBEENTAKEN,
// } from "./Type/typeErrors";
// import {
//   NEWCARENTPAGE,
//   SWITCHLOADING,
//   SIGNIN,
//   SIGNUP,
//   CREATEARTICLE,
//   DELETEARTICLE,
//   TAG,
//   AUTHENTICATIONLOADING,
//   AUTHENTICATION,
//   NEWARTICLELOADING,
//   NEWACCOUNT,
// } from "./Type/typeApp";
// import { NEWNAME, NEWEMAIL, NEWPASSWORD, AUTHORIZEUSER, BIO, IMAGE, LOGOUT } from "./Type/typeAccount";



// export function getAllArticleUnauthoried(page) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       Search
//         .getAllArticle(page)
//         .then((articles) => {
//           dispatch({ type: ASYARTICLEALL, payload: articles });
//           dispatch({ type: SWITCHLOADING, payload: false });
//         })
//         .catch(() => repeatedRequest(dispatch));
//     });
//   };
// }

// export function getAllArticleAuthoried(page, token) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       Search
//         .getAllArticle2(page, token)
//         .then((articles) => {
//           dispatch({ type: ASYARTICLEALL, payload: articles });
//           dispatch({ type: SWITCHLOADING, payload: false });
//         })
//         .catch(() => repeatedRequest(dispatch));
//     });
//   };
// }

// export function getArticleOnePage(slug) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       Search
//         .getArticleOnePage(slug)
//         .then((articles) => {
//           dispatch({ type: ASYARTICLEONEPAGE, payload: articles });
//           dispatch({ type: SWITCHLOADING, payload: false });
//           dispatch({ type: TAG, payload: articles.article.tagList });
//         })
//         .catch(() => repeatedRequest(dispatch));
//     }, 1000);
//   };
// }

// export function postNewAccount(account) {
//   return function repeatedRequest(dispatch) {
//     dispatch({ type: EMAILHASALREADYBEENTAKEN, payload: false });
//     dispatch({ type: USERNAMEHASALREADYBEENTAKEN, payload: false });
//     setTimeout(() => {
//       Search
//         .postNewAccount(account)
//         .then((articles) => {
//           console.log(articles.user);
//           if (articles.user) {
//             console.log('++');
//             dispatch({ type: NEWACCOUNT, payload: true });
//           } else {
//             if (articles.errors.email) {
//               dispatch({ type: EMAILHASALREADYBEENTAKEN, payload: true });
//             }
//             if (articles.errors.username) {
//               dispatch({ type: USERNAMEHASALREADYBEENTAKEN, payload: true });
//             }
//           }
//         })
//         .catch(() => repeatedRequest(dispatch));
//     }, 300);
//   };
// }
// export function newAccountflag(value) {
//   return {
//     type: NEWACCOUNT,
//     payload: value,
//   };
// }

// export function putAccount(account, token) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       Search
//         .putAcation(account, token)
//         .then((articles) => {
//           console.log(articles);
//         })
//         .catch(() => repeatedRequest(dispatch));
//     }, 1000);
//   };
// }

// export function putActicle(article, slug, token) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       Search
//         .putArticle(article, slug, token)
//         .then((articles) => {
//           console.log(articles);
//         })
//         .catch(() => repeatedRequest(dispatch));
//     });
//   };
// }

// export function deleteActicle(slug, token) {
//   return function (dispatch) {
//     Search.deleteArticle(slug, token).then((respone) => {
//       console.log(respone);
//     });
//   };
// }

// export function postArticleFavorite(slug, token) {
//   return function repeatedReques(dispatch) {
//     setTimeout(() => {
//       Search
//         .postArticleFavorite(slug, token)
//         .then(() => console.log('true like'))
//         .catch(() => repeatedReques(dispatch));
//     });
//   };
// }

// export function deleteArticleFavorite(slug, token) {
//   return function repeatedReques(dispatch) {
//     setTimeout(() => {
//       Search
//         .deleteArticleFavorite(slug, token)
//         .then(() => console.log('false like'))
//         .catch(() => repeatedReques(dispatch));
//     });
//   };
// }

// export function postAuthentication(account) {
//   return function repeatedRequest(dispatch) {
//     setTimeout(() => {
//       dispatch({ type: AUTHENTICATIONLOADING, payload: true });
//       Search
//         .postAuthentication(account)
//         .then((authorizedUser) => {
//           if (authorizedUser.errors) {
//             dispatch({ type: EMAILORPASSWORDISINVALID, payload: true });
//           } else {
//             dispatch({ type: AUTHORIZEUSER, payload: authorizedUser });
//             dispatch({ type: EMAILORPASSWORDISINVALID, payload: false });
//             dispatch({ type: AUTHENTICATIONLOADING, payload: false });
//             dispatch({ type: AUTHENTICATION, payload: true });
//             localStorage.setItem('userInfo', JSON.stringify(authorizedUser));
//           }
//         })
//         .catch(() => repeatedRequest(dispatch));
//     });
//   };
// }

// export function getOfLocalStorageUser(user) {
//   return {
//     type: AUTHORIZEUSER,
//     payload: user,
//   };
// }

// export function logOut() {
//   return {
//     type: LOGOUT,
//   };
// }

// export function postArticle(article,token) {
//   return function repeatedRequest(dispatch) {
//     dispatch({ type: NEWARTICLELOADING, payload: true });
//     setTimeout(() => {
//       Search
//         .postArticle(article,token)
//         .then((article) => {
//           console.log('new article true');
//           dispatch({ type: NEWARTICLELOADING, payload: false });
//         })
//         .catch(() => repeatedRequest(dispatch));
//     });
//   };
// }

// export function newCarentPage(page) {
//   return {
//     type: NEWCARENTPAGE,
//     payload: page,
//   };
// }

// export function deleteArticleFn(value) {
//   return {
//     type: DELETEARTICLE,
//     payload: value,
//   };
// }

// export function switcherSignIn(value) {
//   return {
//     type: SIGNIN,
//     payload: value,
//   };
// }

// export function switcherCreaterArticle(value) {
//   return {
//     type: CREATEARTICLE,
//     payload: value,
//   };
// }
// export function switcherSignUp(value) {
//   return {
//     type: SIGNUP,
//     payload: value,
//   };
// }

// export function switchLoading(value) {
//   return {
//     type: SWITCHLOADING,
//     payload: value,
//   };
// }

// export function newName(value) {
//   return {
//     type: NEWNAME,
//     payload: value,
//   };
// }

// export function newEmail(value) {
//   return {
//     type: NEWEMAIL,
//     payload: value,
//   };
// }

// export function newPassword(value) {
//   return {
//     type: NEWPASSWORD,
//     payload: value,
//   };
// }

// export function newBio(value) {
//   return {
//     type: BIO,
//     payload: value,
//   };
// }

// export function newImage(value) {
//   return {
//     type: IMAGE,
//     payload: value,
//   };
// }

// export function Tag(value) {
//   return {
//     type: TAG,
//     payload: value,
//   };
// }

// export function articleFavotiter(i) {
//   return {
//     type: ARTICLEFAVORITED,
//     index: i,
//   };
// }
