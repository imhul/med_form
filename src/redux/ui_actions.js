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

export function radioUpdate() {
  return (dispatch) => {
    dispatch({
      type: types.RADIO_BUTTON_UPDATE,
    })
  }
};

export function inputUpdate() {
  return (dispatch) => {
    dispatch({
      type: types.INPUT_UPDATE,
    })
  }
};

export function textareaUpdate() {
  return (dispatch) => {
    dispatch({
      type: types.TEXTAREA_UPDATE,
    })
  }
};

export function paginationUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.PAGINATION_UPDATE,
      payload: payload,
    })
  }
};
