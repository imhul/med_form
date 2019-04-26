import { typesUI as types } from './types';

const initState = { 

    isInit: false,
    formData: [],
    isCheckboxChecked: false,
    // formData: null,
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

        // case types.FORM_UPDATE:
        //     return { 
        //         ...state,
        //         formData: action.payload,
        //     };

        default:
            return state;
    }
};