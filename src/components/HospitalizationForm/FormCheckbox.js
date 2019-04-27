/* Checkbox */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Checkbox } from 'antd';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const FormItem = Form.Item;

class FormCheckbox extends Component {

    componentDidMount() {
        this.onCheckboxUpdate = this.onCheckboxUpdate.bind(this)
    };

    onCheckboxUpdate(e) {
        this.props.uiActions.checkboxUpdate(e.target.value);
        const { formData } = this.props.ui;

        // Формируем список параметров для передачи на сервер
        const checkboxRequestBody = {
            'Owner':            formData.question.Id,
            'Hospital':         formData.hospitalization[0].Hospital,
            'Patient':          formData.hospitalization[0].Patient,
            'Hospitalization':  formData.hospitalization[0].Hospitalization,
            'Reception':        formData.hospitalization[0].Reception,
            'Question':         formData.question.Id,
            'Field':            formData.question.Name,
            'Value':            formData.question.Value,
        };

        // Отправляем данные на сервер
        fetch( requestURL, {
            method: 'post',  
            headers: requestHeader,
            body: requestBody( checkboxRequestBody )
        })
        .then( (response) => {  
                if (response.status !== 200) {  
                    console.info(`checkbox server error: ${response.status}`);  
                    return
                };

                response.json().then( (data) => {  
                    console.info(`checkbox fetched data: ${data}`)  
                })
            }  
        )  
        .catch( (error) => {  
            console.info(`checkbox fetch error: ${error}`)
        })
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const prefix = 'prefix';

        return (
            <FormItem label="Checkbox" {...formItemLayout}>
                <Checkbox onChange={this.onCheckboxUpdate}>
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