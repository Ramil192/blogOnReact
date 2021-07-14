import {
  NEWCARENTPAGE,
  SWITCHLOADING,
  COUNTTAG,
  SIGNIN,
  SIGNUP,
  CREATEARTICLE,
  DELETEARTICLE,
  TAG,
  AUTHENTICATIONLOADING,
  AUTHENTICATION,
  NEWARTICLELOADING,
  NEWACCOUNT,
  SUCCESSFULREQUEST,
} from '../Type/typeApp';

const initialState = {
  currentPage: 1,
  loading: true,
  signIn: false,
  signUp: false,
  counterTag: 1,
  tags: [''],
  createArticle: false,
  deleteArticle: false,
  authenticationLoading: false,
  newArticleLoading: false,
  authentication: false,
  newAccount: false,
  successfulRequest:['',false]
};

export default function appReduser(state = initialState, action) {
  switch (action.type) {
    case NEWCARENTPAGE:
      return { ...state, currentPage: action.payload };
    case SWITCHLOADING:
      return { ...state, loading: action.payload };
    case COUNTTAG:
      return { ...state, counterTag: action.payload };
    case SIGNIN:
      return { ...state, signIn: action.payload };
    case SIGNUP:
      return { ...state, signUp: action.payload };
    case CREATEARTICLE:
      return { ...state, createArticle: action.payload };
    case DELETEARTICLE:
      return { ...state, deleteArticle: action.payload };
    case AUTHENTICATIONLOADING:
      return { ...state, authenticationLoading: action.payload };
    case AUTHENTICATION:
      return { ...state, authentication: action.payload };
    case TAG:
      return { ...state, tags: action.payload };
    case NEWARTICLELOADING:
      return { ...state, newArticleLoading: action.payload };
    case NEWACCOUNT:
      return { ...state, newAccount: action.payload };
    case SUCCESSFULREQUEST:
      return { ...state, successfulRequest: action.payload };
    default:
      return state;
  }
}
