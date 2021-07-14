export default class Search {
 static async  getAllArticle(curentPage = 0) {
    const res = await fetch(`https://conduit.productionready.io/api/articles?offset=${curentPage}`);
    return res.json();
  }

  static async getAllArticle2(curentPage = 0, token = '') {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles?offset=${curentPage}`, {
      method: 'GET',
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static async getArticleOnePage(slug) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'GET',
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static postNewAccount(body = null) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`https://conduit.productionready.io/api/users`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static postAuthentication(body = null) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`https://conduit.productionready.io/api/users/login`, {
      method: 'POST',
      // mode: 'no-cors', // no-cors, *cors, same-origin
      body: JSON.stringify(body),
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static postArticle(body = null, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static  putAcation(body = null, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/user`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static putArticle(body = null, slug, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static  deleteArticle(slug, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'DELETE',

      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static postArticleFavorite(slug, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers,
    }).then((response) => {
      return response.json();
    });
  }

  static deleteArticleFavorite(slug, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers,
    }).then((response) => {
      return response.json();
    });
  }
}
