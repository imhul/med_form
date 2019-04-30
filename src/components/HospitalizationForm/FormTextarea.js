/* Textarea */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Input } from 'antd';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const FormItem = Form.Item;
const { TextArea } = Input;

class FormTextarea extends Component {

    componentDidMount() {
        this.onTextAreaUpdate = this.onTextAreaUpdate.bind(this)
    };

    onTextAreaUpdate(e) {
        this.props.uiActions.textareaUpdate(e.target.value);
        // const { formData } = this.props.ui;

        // // Формируем список параметров для передачи на сервер
        // const textareaRequestBody = {
        //     'Owner':            formData.question.Id,
        //     'Hospital':         formData.hospitalization[0].Hospital,
        //     'Patient':          formData.hospitalization[0].Patient,
        //     'Hospitalization':  formData.hospitalization[0].Hospitalization,
        //     'Reception':        formData.hospitalization[0].Reception,
        //     'Question':         formData.question.Id,
        //     'Field':            formData.question.Name,
        //     'Value':            formData.question.Value,
        // };

        // // Отправляем данные на сервер
        // fetch( requestURL, {
        //     method: 'post',  
        //     headers: requestHeader ,
        //     body: requestBody( textareaRequestBody )
        // })
        // .then( (response) => {  
        //         if (response.status !== 200) {  
        //             console.info(`textarea server error: ${response.status}`);  
        //             return
        //         };

        //         response.json().then( (data) => {  
        //             console.info(`textarea fetched data: ${data}`)  
        //         })
        //     }  
        // )  
        // .catch( (error) => {  
        //     console.info(`textarea fetch error: ${error}`)
        // })
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        
        return (

            <FormItem
                label="TextArea"
                {...formItemLayout}
            >
                <TextArea
                    id="TextArea_1"
                    className='InputField'
                    onChange={this.onTextAreaUpdate}
                    placeholder='Введіть текст'
                />

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

export default connect(mapStateToProps, mapDispatchToProps)(FormTextarea);