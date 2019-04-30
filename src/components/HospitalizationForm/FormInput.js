/* input */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Input } from 'antd';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const FormItem = Form.Item;

class FormInput extends Component {

    componentDidMount() {
        this.onInputUpdate = this.onInputUpdate.bind(this)
    };

    onInputUpdate(e) {
        this.props.uiActions.inputUpdate(e.target.value);
        // const { formData } = this.props.ui;

        // // Формируем список параметров для передачи на сервер
        // const inputRequestBody = {
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
        //     headers: requestHeader,
        //     body: requestBody( inputRequestBody )
        // })
        // .then( (response) => {  
        //         if (response.status !== 200) {  
        //             console.info(`input server error: ${response.status}`);  
        //             return
        //         };

        //         response.json().then( (data) => {  
        //             console.info(`input fetched data: ${data}`)  
        //         })
        //     }  
        // )  
        // .catch( (error) => {  
        //     console.info(`input fetch error: ${error}`)
        // })
    };

    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return (

            <FormItem
                label="Input"
                {...formItemLayout}
            >

                {/* <input
                    type='text'
                    id={question.Name}
                    className='InputField'
                    //style={question.Width!==null ? {width: question.Width+"px"} : ''}
                    
                    owner={question.Owner}
                    placeholder='Введіть текст'
                /> */}

                <Input id="" placeholder="input placeholder" onChange={this.onInputUpdate} />

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

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);