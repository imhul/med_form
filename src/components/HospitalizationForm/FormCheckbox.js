/* FormCheckbox */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;
const checkboxRequesURL = 'https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue';
const checkboxRequestHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
};

class FormCheckbox extends Component {

    onChange(e) {

        this.props.uiActions.checkboxUpdate(e.target.value)

        const { data } = this.props.ui;
        const checkboxRequestBody = {
            'Owner':            data.question.Id,
            'Hospital':         data.hospitalization[0].Hospital,
            'Patient':          data.hospitalization[0].Patient,
            'Hospitalization':  data.hospitalization[0].Hospitalization,
            'Reception':        data.hospitalization[0].Reception,
            'Question':         data.question.Id,
            'Field':            data.question.Name,
            'Value':            data.question.Value,
        };
        const checkboxRequestOptions = {
            method: "POST",
            headers: checkboxRequestHeaders,
            body: JSON.stringify(checkboxRequestBody),
        };

        fetch(checkboxRequesURL, checkboxRequestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.info('checkbox fetched data: ', data)
            })
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const prefix = 'prefix';

        return (
            <FormItem
                label="Checkbox"
                {...formItemLayout}
            >
                <Checkbox onChange={uiActions.checkboxUpdate}>
                    {`${prefix} ${question.Value}`}
                </Checkbox>
            </FormItem>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(FormCheckbox);