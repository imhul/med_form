import React from 'react';
import { Form, Switch } from 'antd';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;

const SwitchInput = (data) => { 
    console.log("SwitchInput data: ", data.inputData);
    if(data.inputData.Owner === null) {
        return (
            <FormItem 
                className={data.inputData.Owner === null ? "parent" : "child"}
                label={data.inputData.Title} 
                {...formItemLayout} 
            >
                { data.inputData.TextBefore ? `${data.inputData.TextBefore} ` : null }
                <Switch 
                    checked={data.inputData.Value} // boolean
                    checkedChildren={data.inputData.Mode.TextChecked} // 'Так'
                    unCheckedChildren={data.inputData.Mode.TextUnchecked} // 'Ні'
                />
                { data.inputData.TextAfter ? ` ${data.inputData.TextAfter}` : null }
            </FormItem>
        )
    } else return (
        <div 
            className="child" 
            style={ data.isChild ? {display: "inline-block"} : {display: "none"} }
        >
            { data.inputData.TextBefore ? `${data.inputData.TextBefore} ` : null }
            <Switch 
                checked={data.inputData.Value} // boolean
                checkedChildren={data.inputData.Mode.TextChecked} // 'Так'
                unCheckedChildren={data.inputData.Mode.TextUnchecked} // 'Ні'
            />
            { data.inputData.TextAfter ? ` ${data.inputData.TextAfter}` : null }
        </div>
    )
};

export default SwitchInput;