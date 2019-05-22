import React from 'react';
import { Form, Input, Icon } from 'antd';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;

const TextInput = (inputData) => {
    const TextInputChild = () => (
        <Input
            id={inputData.Id}
            placeholder={inputData.Placeholder}
            addonAfter={inputData.TextAfter}
            addonBefore={<Icon type="form" />}
        />
    );
    if(inputData.Owner === null) {
        return (
            <FormItem 
                className="parent"
                label={inputData.Title} 
                {...formItemLayout} 
            >
                { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                <TextInputChild />
                { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
            </FormItem>
        )
    } else return (
        <div className="child" style={{display: "inline"}}>
            { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
            <TextInputChild />
            { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
        </div>
    )
};

export default TextInput;