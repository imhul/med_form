import { typesUI as types } from './types';

export function loadData(payload) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_DATA,
      payload: payload,
    })
  }
};

export function loadError(text) {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_ERROR,
      payload: text,
    })
  }
};

export function submitError(text) {
  return (dispatch) => {
    dispatch({
      type: types.SUBMIT_ERROR,
      payload: text,
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

export function paginationUpdate(payload) {
  return (dispatch) => {
    dispatch({
      type: types.PAGINATION_UPDATE,
      payload: payload,
    })
  }
};

export function pageReset() {
  return (dispatch) => {
    dispatch({
      type: types.RESET_PAGE,
    })
  }
};
