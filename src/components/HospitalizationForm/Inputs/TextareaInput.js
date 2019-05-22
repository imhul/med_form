import React from 'react';
import { Form, Input } from 'antd';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;
const { TextArea } = Input;

const TextareaInput = (inputData) => {
    const TextAreaInputChild = () => (
        <TextArea
            id={inputData.Id}
            placeholder={inputData.Placeholder}
        />
    );
    if(inputData.Owner === null) {
        return (
            <FormItem 
                className={inputData.Owner === null ? "parent" : "child"}
                label={inputData.Title} 
                {...formItemLayout} 
            >
                { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                <TextAreaInputChild />
                { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
            </FormItem>
        )
    } else return ( 
        <div className="child" style={{display: "inline"}}>
            <TextAreaInputChild />
        </div>
    )
};

export default TextareaInput;