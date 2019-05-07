import { typesUI as types } from './types';
import testData from '../helpers/testData';

const initState = {

    isInit: false,
    formData: testData, // FOR TEST ONLY. NEEDED VALUE IS []
    currentPage: 1,
    formTextBefore: 'Тут має бути якийсь текст...',
    formTextAfter: 'Тут також має бути якийсь текст...',
    isSubmitted: false,
    isPopupVisible: false,
    nextPage: null,
};

export default (state = initState, action) => {
    switch (action.type) {

        case types.LOAD_DATA:
            return { 
                ...state,
                formData: action.payload,
                isInit: true,
            };

        case types.FORM_UPDATE:
            console.info("form reducer action.payload: ", action.payload);
            state.formData.filter(items => items.Id === action.payload.id).map(item => {
                if(item.Type !== 'radio' && item.Type !== 'checkbox') {
                    item.Value = action.payload.value
                } else {
                    item.Value = action.payload.value;
                    item.Checked = action.payload.checked
                }
            });
            state.formData.filter(items => items.Id !== action.payload.id).map(item => {
                if(item.Type === 'radio' || item.Type === 'checkbox') {
                    item.Checked = false
                }
            });
            return {
                ...state,
            };

        case types.FORM_SUBMIT:
            return {
                ...state,
                isSubmitted: true,
            };

        case types.CONFIRM_POPUP_SHOW:
            return {
                ...state,
                isPopupVisible: true,
                nextPage: action.payload,
            };

        case types.CONFIRM_POPUP_HIDE:
            return {
                ...state,
                isPopupVisible: false,
            };

        case types.PAGINATION_UPDATE:
            return { 
                ...state,
                currentPage: action.payload,
            };

        default:
            return state;
    }
};