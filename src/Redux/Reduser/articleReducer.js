import { ASYARTICLEALL, ASYARTICLEONEPAGE, ARTICLEFAVORITED } from '../Type/typeSearch';

const initialState = {
  articleALL: [{}],
  articleOnePage: [],
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case ASYARTICLEALL:
      return { ...state, articleALL: action.payload };
    case ASYARTICLEONEPAGE:
      return { ...state, articleOnePage: action.payload };
    case ARTICLEFAVORITED: {
      const articles = state.articleALL.articles.map((item, i) => {
        if (i === action.index) {
          if (item.favorited) {
            item.favorited = false;
            item.favoritesCount--;
          } else {
            item.favorited = true;
            item.favoritesCount++;
          }
        }
        return item;
      });
      return { ...state, articleALL: { ...state.articleALL, articles } };
    }

    default:
      return state;
  }
}
