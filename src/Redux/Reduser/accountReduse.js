import { NEWNAME, NEWEMAIL, NEWPASSWORD, AUTHORIZEUSER, BIO, IMAGE, LOGOUT } from '../Type/typeAccount';

const initialState = {
  newAccount: {
    username: '',
    email: '',
    password: '',
    bio: '',
    image: '',
  },
  user: {
    username: '',
    email: '',
    password: '',
    bio: '',
    img: '',
    token: '',
  },
};

export default function accountReduse(state = initialState, action) {
  switch (action.type) {
    case NEWNAME:
      return { ...state, newAccount: { ...state.newAccount, username: action.payload } };
    case NEWEMAIL:
      return { ...state, newAccount: { ...state.newAccount, email: action.payload } };
    case NEWPASSWORD:
      return { ...state, newAccount: { ...state.newAccount, password: action.payload } };
    case BIO:
      return { ...state, newAccount: { ...state.newAccount, bio: action.payload } };
    case IMAGE:
      return { ...state, newAccount: { ...state.newAccount, image: action.payload } };
    case AUTHORIZEUSER:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
