import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../../redux/ui_actions';
import { Form, Radio } from 'antd';

// Helpers
import { formItemLayout, typeDetector } from '../../../helpers';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class RadioParent extends PureComponent {
    render() {
        const { inputData, ui } = this.props;
        // Filtering inputs by current value of pagination component
        const dataFilteredByPage = ui.formData.filter(item => item.Page == ui.currentPage);
        // Filtering children by parent Id
        const ownerDetector = (inputId) => {
            return dataFilteredByPage.filter( item => item.Owner == inputId )
        };
        const child = ownerDetector(inputData.Id);
        return (
            <FormItem 
                className={inputData.Owner === null ? "parent" : "child"}
                label={inputData.Title} 
                {...formItemLayout} 
                key={inputData.Id}
            >
                { inputData.TextBefore ? `${inputData.TextBefore} ` : null }
                <RadioGroup
                    key={`${inputData.Name}_${inputData.Id}`}
                    defaultValue={null}
                    name={inputData.Name}
                    id={inputData.Id}
                    buttonStyle="solid"
                    className={inputData.Owner === null ? "parent" : "child"}
                >
                    {
                        child.map(subitem => (
                            <RadioButton
                                key={subitem.Id}
                                id={subitem.Id} 
                                value={subitem.Value}
                                className={subitem.Owner === null ? "parent" : "child"}
                                title={subitem.Owner}
                            >
                                { subitem.Value }
                            </RadioButton>
                        ))
                    }
                    {
                        child.map(subitem => ownerDetector(subitem.Id).map(item => {
                            return subitem.Checked === true ? typeDetector(item, true) : null
                        }))
                    }
                </RadioGroup>
                { inputData.TextAfter ? ` ${inputData.TextAfter}` : null }
            </FormItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(RadioParent);