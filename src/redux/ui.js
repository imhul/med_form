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

        case types.INITIALIZE:
            return { 
                ...state,
                isInit: true,
            };

        case types.LOAD_DATA:
            return { 
                ...state,
                formData: action.payload,
            };

        case types.CHECKBOX_UPDATE:
            state.formData.filter(items => items.Id === action.payload.id).map(item => {
                item.Checked = !item.Checked;
                item.Value = action.payload.value
            });
            return {
                ...state,
            };
        
        case types.RADIO_BUTTON_UPDATE:
            console.info("radio reducer action.payload: ", action.payload);
            
            state.formData.filter(items => (items.Id === action.payload.id) && (items.Type === 'radio')).map(item => {
                item.Checked = action.payload.checked;
                item.Value = action.payload.value
            });
            return {
                ...state,
            };

        // case types.INPUT_UPDATE:
        //     return {
        //         ...state,
        //         ...action.paylod,
        //     };

        // case types.TEXTAREA_UPDATE:
        //     return {
        //         ...state,
        //         ...action.paylod,
        //     };

        case types.FORM_UPDATE:
            console.info("form reducer action.payload: ", action.payload);
            state.formData.filter(items => items.Id === action.payload.id).map(item => {
                if(item.Type !== 'radio' && item.Type !== 'checkbox') {
                    item.Value = action.payload.value
                } else {
                    item.Checked = action.payload.checked;
                    item.Value = action.payload.value
                }
                // item.Value = action.payload.value;
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
            console.info("PAGINATION_UPDATE payload: ", action.payload);
            return { 
                ...state,
                currentPage: action.payload,
            };

        default:
            return state;
    }
};