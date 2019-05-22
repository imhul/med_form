import React from 'react';
import { Form, Switch } from 'antd';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;

const SwitchInput = (inputData) => { 
    const SwitchChild = () => (
        <Switch 
            checked={inputData.Value} // boolean
            checkedChildren={inputData.Mode.TextChecked} // 'Так'
            unCheckedChildren={inputData.Mode.TextUnchecked} // 'Ні'
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
                <SwitchChild />
                { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
            </FormItem>
        )
    } else return (
        <div className="child" style={{display: "inline"}}>
            { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
            <SwitchChild />
            { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
        </div>
    )
};

export default SwitchInput;