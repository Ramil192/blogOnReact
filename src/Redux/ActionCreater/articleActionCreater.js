import Search from '../../Search/search';
import { ASYARTICLEALL, ASYARTICLEONEPAGE, ARTICLEFAVORITED, } from "../Type/typeSearch";
import { SWITCHLOADING, TAG, NEWARTICLELOADING, DELETEARTICLE, SUCCESSFULREQUEST } from "../Type/typeApp";


export function getAllArticleUnauthoried(page) {
	return function repeatedRequest(dispatch) {
		setTimeout(() => {
			Search
				.getAllArticle(page)
				.then((articles) => {
					dispatch({ type: ASYARTICLEALL, payload: articles });
					dispatch({ type: SWITCHLOADING, payload: false });
				})
				.catch(() => repeatedRequest(dispatch));
		});
	};
}

export function getAllArticleAuthoried(page, token) {
	return function repeatedRequest(dispatch) {
		setTimeout(() => {
			Search
				.getAllArticle2(page, token)
				.then((articles) => {
					dispatch({ type: ASYARTICLEALL, payload: articles });
					dispatch({ type: SWITCHLOADING, payload: false });
				})
				.catch(() => repeatedRequest(dispatch));
		});
	};
}

export function getArticleOnePage(slug) {
	return function repeatedRequest(dispatch) {
		setTimeout(() => {
			Search
				.getArticleOnePage(slug)
				.then((articles) => {
				
					dispatch({ type: ASYARTICLEONEPAGE, payload: articles });
					dispatch({ type: SWITCHLOADING, payload: false });
					if (articles.article.tagList.length !== 0) {
						dispatch({ type: TAG, payload: articles.article.tagList });
					} else {
						dispatch({ type: TAG, payload: [''] });
					}
				})
				.catch(() => repeatedRequest(dispatch));
		}, 1000);
	};
}

export function putActicle(article, slug, token) {
	return function repeatedRequest(dispatch) {
		setTimeout(() => {
			Search
				.putArticle(article, slug, token)
				.then((articles) => {

					dispatch({ type: SUCCESSFULREQUEST, payload: [articles.article.slug, true] })
					setTimeout(() => dispatch({ type: SUCCESSFULREQUEST, payload: ['', false] }), 100)
				})
				.catch(() => repeatedRequest(dispatch));
		});
	};
}

export function deleteActicle(slug, token) {
	return function (dispatch) {
		Search
			.deleteArticle(slug, token)
			.then(() => {
				dispatch({ type: SUCCESSFULREQUEST, payload: ['', true] })
				setTimeout(() => dispatch({ type: SUCCESSFULREQUEST, payload: ['', false] }), 100)
			});
	};
}

export function postArticleFavorite(slug, token) {
	return function repeatedReques(dispatch) {
		setTimeout(() => {
			Search
				.postArticleFavorite(slug, token)
				.then(() => console.log('true like'))
				.catch(() => repeatedReques(dispatch));
		});
	};
}

export function deleteArticleFavorite(slug, token) {
	return function repeatedReques(dispatch) {
		setTimeout(() => {
			Search
				.deleteArticleFavorite(slug, token)
				.then(() => console.log('false like'))
				.catch(() => repeatedReques(dispatch));
		});
	};
}
export function articleFavotiter(i) {
	return {
		type: ARTICLEFAVORITED,
		index: i,
	};
}
export function postArticle(article, token) {
	return function repeatedRequest(dispatch) {
		dispatch({ type: NEWARTICLELOADING, payload: true });
		setTimeout(() => {
			Search
				.postArticle(article, token)
				.then((article) => {
					dispatch({ type: NEWARTICLELOADING, payload: false });
					dispatch({ type: SUCCESSFULREQUEST, payload: [article.article.slug, true] })
					setTimeout(() => dispatch({ type: SUCCESSFULREQUEST, payload: ['', false] }), 100)
				})
				.catch(() => repeatedRequest(dispatch));
		});
	};
}
export function deleteArticleFn(value) {
	return {
		type: DELETEARTICLE,
		payload: value,
	};
}