/**
 * Created by kukuchong on 2017/5/20.
 */

export const DIGITAL_SET_STORAGE = "DIGITAL_SET_STORAGE"

export const DIGITAL_GET_STORAGE = "DIGITAL_GET_STORAGE"

export const DIGITAL_DELETE_STORAGE = "DIGITAL_DELETE_STORAGE"

export const DIGITAL_START_LOADING = "DIGITAL_START_LOADING"

export const DIGITAL_END_LOADING = "DIGITAL_END_LOADING"

export const DIGITAL_REQUEST_PROFILE = "DIGITAL_REQUEST_PROFILE"

export const DIGITAL_END_PROFILE = "DIGITAL_END_PROFILE"

export const DIGITAL_UPDATE_PROFILE = "DIGITAL_UPDATE_PROFILE"

import {currentUserUrl} from '../api'

export function digitalSetStorage({token} = data ,remember) {
  if(remember){
    localStorage.setItem('token',token)
    localStorage.setItem('d',Math.round(Math.random()*100)+""+new Date().getTime() )
  }else {
    sessionStorage.setItem('token',token)
  }
}

export function digitalGetStorage(key) {
  if(localStorage.getItem('d')){
    let last=(+localStorage.getItem('d').toString().slice(2))
    if(new Date().getTime()-last>10*24*60*60*1000){
      deleteLocalStorage()
      return false
    }else {
      return localStorage.getItem('token')
    }
  }else{
    deleteLocalStorage();
    return sessionStorage.getItem(key)
  }

}

export function digitalClearStorage(key) {
  deleteLocalStorage(key);
  deleteSessionStorage(key)
}

function deleteLocalStorage(key) {
  if(key){

    localStorage.removeItem(key)

  }else{

    localStorage.clear()
  }
}
function deleteSessionStorage (key) {
  if(key){
    sessionStorage.removeItem(key)
  }else{
    sessionStorage.clear()
  }
}


export function endProfile(data) {
  return {

    type: DIGITAL_END_PROFILE,

    data
  }
}


export function requestProfile(profile,action) {

  return (dispatch,getState)=>{

    dispatch(digitalStartLoading());

    window.fetchData(currentUserUrl,(res)=>{
      dispatch(digitalEndLoading())
      dispatch(endProfile(res));

    })
  }
}

/*export function digitalGetMenu() {

  return (dispatch,getState){

  }

}*/
export function digitalStartLoading() {

  return {

    type: DIGITAL_START_LOADING,

    loading :true

  }
}



export function digitalEndLoading() {

  return {

    type: DIGITAL_END_LOADING,

    loading :false
  }
}


