import { typesUI as types } from './types';
import testData from '../helpers/testData';

const initState = {

    isInit: false,
    formData: testData, // FOR TEST ONLY. NEEDED VALUE IS []
    isCheckboxChecked: false,
    currentPage: 1,
    formTextBefore: 'formTextBefore',
    formTextAfter: 'formTextAfter',
    newFormData: [],
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
            return {
                ...state,
                ...action.paylod,
            };
        
        case types.RADIO_BUTTON_UPDATE:
            return {
                ...state,
                ...action.paylod,
            };

        case types.INPUT_UPDATE:
            return {
                ...state,
                ...action.paylod,
            };

        case types.TEXTAREA_UPDATE:
            return {
                ...state,
                ...action.paylod,
            };

        case types.FORM_UPDATE:
            console.log("reducer: action.payload", action.payload);
            const newData = state.formData.filter(item => item.Id == action.payload.id);
            console.log("reducer: newData", newData);
            newData.map(item => {
                item.Value = action.payload.value
            });
            return {
                ...state,
                newFormData: newData,
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