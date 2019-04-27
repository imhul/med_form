/* Radio Button */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Radio } from 'antd';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const FormItem = Form.Item;

class FormRadio extends Component {

    componentDidMount() {
        this.onRadioUpdate = this.onRadioUpdate.bind(this)
    };

    onRadioUpdate(e) {
        this.props.uiActions.radioUpdate(e.target.value);
        const { formData } = this.props.ui;

        // Формируем список параметров для передачи на сервер
        const radioRequestBody = {
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
            body: requestBody( radioRequestBody )
        })
        .then( (response) => {  
                if (response.status !== 200) {  
                    console.info(`radio server error: ${response.status}`);  
                    return
                };

                response.json().then( (data) => {  
                    console.info(`radio fetched data: ${data}`)  
                })
            }  
        )  
        .catch( (error) => {  
            console.info(`radio fetch error: ${error}`)
        })
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
 
        return (
            <span>

                <FormItem
                    label="Form Layout"
                    {...formItemLayout}
                >
                    <Radio.Group defaultValue="horizontal" >
                        <Radio.Button value="horizontal">Horizontal</Radio.Button>
                        <Radio.Button value="vertical">Vertical</Radio.Button>
                        <Radio.Button value="inline">Inline</Radio.Button>
                    </Radio.Group>
                </FormItem>


                <input
                    type='radio'
                    id={question.Name + '_' + question.Id}
                    name={question.Name}
                    value={question.Value}
                    owner={question.Owner}
                    defaultChecked={question.Value === question.Checked}
                    onClick={this.handleClick.bind(this)}
                />
                <label htmlFor={question.Name + '_' + question.Id}>{question.Value}</label>
                {question.Value === question.Checked ? '' : ''}
                {this.state.showChild && FieldsOut}
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormRadio);