import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../../redux/ui_actions';
import { Form, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/uk_UA';

// Helpers
import { formItemLayout } from '../../../helpers';

const FormItem = Form.Item;

class DateInput extends PureComponent {
    render() {
        const { inputData, uiActions } = this.props;
        const DateInputChild = () => (
            <DatePicker 
                onChange={(date, dateString) => uiActions.dateUpdate(date, dateString, inputData.Id)}
                onPanelChange={(date, mode) => uiActions.dateUpdate(date, mode, inputData.Id)}
                className={`${inputData.Mode.Mode}-picker`}
                placeholder={inputData.Placeholder}
                showTime={inputData.Mode.ShowTime}
                format={inputData.Mode.Format}
                mode={inputData.Mode.Mode}
                value={inputData.Value !== "" ? inputData.Value : null }
                id={inputData.Id}
                locale={locale}
            />
        );
        if(inputData.Owner === null) {
            return (
                <FormItem 
                    label={inputData.Title} {...formItemLayout}
                    className={inputData.Owner === null ? "parent" : "child"}
                >
                    { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                    <DateInputChild />
                    { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
                </FormItem>
            )
        } else return (
            <div className="child" style={{display: "inline-block"}}>
                { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                    <DateInputChild />
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

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);