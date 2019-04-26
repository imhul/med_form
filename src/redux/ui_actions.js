import { typesUI as types } from './types';

export function initialize() {
  return (dispatch) => {
    dispatch({
      type: types.INITIALIZE,
    })
  }
};

export function loadData(payload) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_DATA,
      payload: payload,
    })
  }
};

export function checkboxUpdate() {
  return (dispatch) => {
    dispatch({
      type: types.CHECKBOX_UPDATE,
    })
  }
};

export function formUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.FORM_UPDATE,
      payload: payload,
    })
  }
};
