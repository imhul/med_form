import { typesUI as types } from './types';

export function loadData(payload) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_DATA,
      payload: payload,
    })
  }
};

export function checkboxUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.CHECKBOX_UPDATE,
      payload: payload.target,
    })
  }
};

export function radioUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.RADIO_BUTTON_UPDATE,
      payload: payload.target,
    })
  }
};

export function formUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.FORM_UPDATE,
      payload: payload.target,
    })
  }
};

export function formSubmit() {
  return (dispatch) => {
    dispatch({
      type: types.FORM_SUBMIT,
    })
  }
};

export function confirmPopupShow(nextPage) {
  return (dispatch) => {
    dispatch({
      type: types.CONFIRM_POPUP_SHOW,
      payload: nextPage,
    })
  }
};

export function confirmPopupHide() {
  return (dispatch) => {
    dispatch({
      type: types.CONFIRM_POPUP_HIDE,
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
