import { typesUI as types } from './types';
import testData from '../helpers/testData';

const initState = { 

    isInit: false,
    formData: testData, // FOR TEST ONLY. NEEDED VALUE IS []
    isCheckboxChecked: false,
    currentPage: 1,
    textBefore: 'textBefore',
    textAfter: 'textAfter',
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
                isCheckboxChecked: action.payload,
            };

        // TODO: разобраться, что делать при изменении конкретного инпута
        // case types.RADIO_BUTTON_UPDATE:
        //     return { 
        //         ...state,
        //         isRadioChecked: action.payload,
        //     };

        // case types.INPUT_UPDATE:
        //     return { 
        //         ...state,
        //         isInputUpdated: action.payload,
        //     };

        // case types.TEXTAREA_UPDATE:
        //     return { 
        //         ...state,
        //         isCheckboxChecked: action.payload,
        //     };

        case types.PAGINATION_UPDATE:
            return { 
                ...state,
                currentPage: action.payload,
            };

        default:
            return state;
    }
};