import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../../redux/ui_actions';
import { Form, InputNumber } from 'antd';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;

class NumberInput extends PureComponent {
    render() {
        const { inputData, uiActions } = this.props;
        const NumberInputChild = () => (
            <InputNumber
                defaultValue={ inputData.Value !== null ? inputData.Value : 0 }
                step={+inputData.Mode.Step}
                min={+inputData.Mode.Min} 
                max={+inputData.Mode.Max}
                onChange={(value) => uiActions.numberUpdate(value, inputData.Id)}
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
                    <NumberInputChild />
                    { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
                </FormItem>
            )
        } else return (
            <div className="child" style={{display: "inline"}}>
                { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                <NumberInputChild />
                { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(UI_ACTIONS, dispatch),
    }
};

function mapStateToProps(state) {
    return {
        ui: state.ui,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberInput);