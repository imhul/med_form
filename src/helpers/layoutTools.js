import React from 'react';

// Components
import { 
    SwitchInput,
    DateInput,
    TextInput,
    TextareaInput,
    NumberInput,
    CheckboxInput,
    RadioParent,
    ParentTitle,

} from '../components/HospitalizationForm/Inputs';

// Decorative options
export const buttonItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

// Inputs initialization by types
export const typeDetector = (inputData, isChild) => {
    switch (inputData.Type) {
        case 'date':
            if(isChild) {
                return <DateInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        case 'text':
            if(isChild) {
                return <TextInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        case 'textarea':
            if(isChild) {
                return <TextareaInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        case 'number':
            if(isChild) {
                return <NumberInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        case 'switch':
            if(isChild) {
                return <SwitchInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        case 'checkbox':
            if(isChild) {
                return <CheckboxInput inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };

        case 'parent-radio':
            return <RadioParent inputData={inputData} key={inputData.Id} />;
            
        case 'parent':
            if(isChild) {
                return <ParentTitle inputData={inputData} key={inputData.Id} />;
            } else {
                return null
            };
        default:
            return null
    }
};