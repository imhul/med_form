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

export function checkboxUpdate(inputId) {
  return (dispatch) => {
    dispatch({
      type: types.CHECKBOX_UPDATE,
      payload: inputId,
    })
  }
};

export function radioUpdate(inputId) {
  return (dispatch) => {
    dispatch({
      type: types.RADIO_BUTTON_UPDATE,
      payload: inputId,
    })
  }
};

export function inputUpdate(inputId) {
  return (dispatch) => {
    dispatch({
      type: types.INPUT_UPDATE,
      payload: inputId,
    })
  }
};

export function textareaUpdate(inputId) {
  return (dispatch) => {
    dispatch({
      type: types.TEXTAREA_UPDATE,
      payload: inputId,
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
