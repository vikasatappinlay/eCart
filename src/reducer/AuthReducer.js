import * as Actions from './ActionTypes';
const user = {
  itemStore: [],
  liked: [],
};
const AuthReducer = (state = user, action) => {
  switch (action.type) {
    case Actions.ADD_COUNT:
      return {...state, itemStore: action.payload};
    case Actions.LIKED:
      return {...state, liked: action.payload};
    default:
      return state;
  }
};
export default AuthReducer;
