import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux/lib/reducer'
import {DIGITAL_START_LOADING,DIGITAL_END_LOADING,DIGITAL_END_PROFILE,DIGITAL_REQUEST_PROFILE,DIGITAL_UPDATE_PROFILE} from "./actions"


function global(initialState={ loading: true },action) {

  switch (action.type){

    case DIGITAL_START_LOADING:

      return Object.assign({},initialState,{loading:true});

    case DIGITAL_END_LOADING:

      return Object.assign({},initialState,{loading:false});

    default :

      return initialState;
  }
}

function profile(initialState ={data:{}},action) {

  switch (action.type){

    case DIGITAL_END_PROFILE :
      return Object.assign({},initialState,action.data);

    case DIGITAL_UPDATE_PROFILE:

          return Object.assign({},initialState,action.data);

    default:
          return initialState;

  }
}



export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    profile,
    global,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
