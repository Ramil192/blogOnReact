import { EMAILORPASSWORDISINVALID, EMAILHASALREADYBEENTAKEN, USERNAMEHASALREADYBEENTAKEN } from '../Type/typeErrors';

const initialState = {
  emailOrPasswordIsInvalid: false,
  emailHasAlreadyBeenTaken: false,
  usernameHasAlreadyBeenTaken: false,
};

export default function errorsReduser(state = initialState, action) {
  switch (action.type) {
    case EMAILORPASSWORDISINVALID:
      return { ...state, emailOrPasswordIsInvalid: action.payload };
    case EMAILHASALREADYBEENTAKEN:
      return { ...state, emailHasAlreadyBeenTaken: action.payload };
    case USERNAMEHASALREADYBEENTAKEN:
      return { ...state, usernameHasAlreadyBeenTaken: action.payload };
    default:
      return state;
  }
}
