import {combineReducers, createStore} from 'redux';
import AuthReducer from './AuthReducer';

const AppReducers = combineReducers({
  AuthReducer,
  //add more
});
const rootReducer = (state, action) => {
  return AppReducers(state, action);
};
let store = createStore(AuthReducer);
export default store;
