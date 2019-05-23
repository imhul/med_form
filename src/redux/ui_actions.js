import { typesUI as types } from './types';

export function loadData(payload) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_DATA,
      payload: payload,
    })
  }
};

export function dateUpdate(payload, mode, id) {
  return (dispatch) => {
    dispatch({
      type: types.DATE_UPDATE,
      payload: payload,
      meta: id,
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

export function numberUpdate(payload, id) {
  return (dispatch) => {
    dispatch({
      type: types.NUMBER_UPDATE,
      payload: payload,
      meta: id,
    })
  }
};

export function switchUpdate(checked, id) {
  return (dispatch) => {
    dispatch({
      type: types.SWITCH_UPDATE,
      payload: checked,
      meta: id,
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
