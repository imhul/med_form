import { typesUI as type } from './types';

const initState = {
    isInit: false,
    formData: [],
    formOptions: [],
    currentPage: 1,
    isDataLoaded: false,
    isSubmitted: false,
    isPopupVisible: false,
    nextPage: null,
    isFormActivated: false,
};

export default (state = initState, action) => {
    switch (action.type) {

        case type.LOAD_DATA:
            return { 
                ...state,
                formData: action.payload.Data,
                formOptions: action.payload.Options,
                isDataLoaded: true,
                isInit: true,
            };

        case type.LOAD_ERROR:
            return { 
                ...state,
                isDataLoaded: false,
            };

        case type.SUBMIT_ERROR:
            return { 
                ...state,
                isSubmitted: false,
            };

        case type.DATE_UPDATE:
            state.formData.filter(items => items.Id === action.meta).map(item => {
                item.Value = action.payload;
                item.Checked = !action.payload.checked
            });
            return {
                ...state,
                isFormActivated: true,
            };

        case type.NUMBER_UPDATE:
            state.formData.filter(items => items.Id === action.meta).map(item => {
                item.Value = action.payload;
                item.Checked = !action.payload.checked
            });
            return {
                ...state,
                isFormActivated: true,
            };

        case type.SWITCH_UPDATE:
            state.formData.filter(items => items.Id === action.meta).map(item => {
                item.Value = action.payload;
                item.Checked = action.payload
            });
            return {
                ...state,
                isFormActivated: true,
            };

        case type.FORM_UPDATE:
            const target = state.formData.filter(items => items.Id === action.payload.id);
            const untargets = state.formData.filter(items => items.Id !== action.payload.id);
            const targetOwner = `${target.map(item => item.Owner)[0]}`;
            target.map(item => {
                if(item.Type !== 'radio' && item.Type !== 'checkbox') {
                    item.Value = action.payload.value;
                    item.Checked = !action.payload.checked
                } else {
                    item.Value = action.payload.value;
                    item.Checked = action.payload.checked
                }
            });

            untargets.filter(item => item.Owner === targetOwner).map(item => {
                untargets.filter(items => items.Owner === item.Id).map(subitem => {
                    subitem.Checked = false
                });

                if(item.Type === 'radio') {
                    item.Checked = false 
                } else if(item.Type !== 'checkbox') {
                    item.Checked = action.payload.checked
                }
            });
            return {
                ...state,
                isFormActivated: true,
            };

        case type.FORM_SUBMIT:
            return {
                ...state,
                isSubmitted: true,
            };

        case type.CONFIRM_POPUP_SHOW:
            return {
                ...state,
                isPopupVisible: true,
                nextPage: action.payload,
            };

        case type.CONFIRM_POPUP_HIDE:
            return {
                ...state,
                isPopupVisible: false,
            };

        case type.PAGINATION_UPDATE:
            return { 
                ...state,
                currentPage: action.payload,
                isFormActivated: false,
            };

        default:
            return state;
    }
};