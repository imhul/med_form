import { typesUI as types } from './types';
import testData from '../helpers/testData';

const initState = {

    isInit: false,
    formData: testData, // FOR TEST ONLY. NEEDED VALUE IS []
    isCheckboxChecked: false,
    currentPage: 1,
    formTextBefore: 'formTextBefore',
    formTextAfter: 'formTextAfter',
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
            const checkboxResult = state.formData.map(currentInput => {
                if (currentInput.Id === action.id) {
                return action.payload;
                }
                return currentInput;
            });
            return checkboxResult;
        
        case types.RADIO_BUTTON_UPDATE:
            const radioResult = state.formData.map(currentInput => {
                if (currentInput.Id === action.id) {
                    return action.payload;
                }
                return currentInput;
            });
            return radioResult;

        case types.INPUT_UPDATE:
            const inputResult = state.formData.map(currentInput => {
                if (currentInput.Id === action.id) {
                    return action.payload;
                }
                return currentInput;
            });
            return inputResult;

        case types.TEXTAREA_UPDATE:
            const textareaResult = state.formData.map(currentInput => {
                if (currentInput.Id === action.id) {
                    return action.payload;
                }
                return currentInput;
            });
            return {
                ...state,
                formData: textareaResult,
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