import { combineReducers } from 'redux';
import articleReducer from "./articleReducer";
import appReduser from "./appReduser";
import accountReduse from "./accountReduse";
import errorsReduse from "./errorsReduse";

const rootReducer = combineReducers({
  article: articleReducer,
  app: appReduser,
  account: accountReduse,
  errors: errorsReduse,
});
export default rootReducer;
