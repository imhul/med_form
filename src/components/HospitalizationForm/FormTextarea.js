/* FormTextarea */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class FormTextarea extends Component {

    onTextAreaChange(e) {
        const QuestionValue = e.target.value;

        // Формируем список параметров для передачи на сервер
        const data = {
            'Owner': QuestionId,
            'Hospital': Hospital,
            'Patient': Patient,
            'Hospitalization': Hospitalization,
            'Reception': Reception,
            'Question': QuestionId,
            'Field': QuestionName,
            'Value': QuestionValue
        };

        // Формируем URL строку с параметрами для отправки на сервер
        let DataStr = "";
        for (var key in data) {
            if (DataStr != "") {
                DataStr += "&";
            }
            DataStr += key + "=" + encodeURIComponent(data[key]);
        };

        // Отправляем данные на сервер
        fetch("https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue", 
            {
                method: 'post',  
                headers: {  
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },
                body: DataStr
            })
            .then(  
                function(response)
                {  
                    if (response.status !== 200)
                    {  
                        console.log('Помилка сервера: ' +  
                        response.status);  
                        return;  
                    }

                    response.json().then(function(data)
                    {  
                        console.log(data);  
                    });  
                }  
            )  
            .catch(function(err) {  
                console.log('Fetch Error :-S', err);  
            }
        )
    };


    render() {
        const { question, isOpen } = this.props
        return (

            <FormItem
                label="Field A"
                {...formItemLayout}
            >
                <TextArea
                    type='text'
                    id={question.Name}
                    className='InputField'
                    defaultValue={question.Checked ? question.Checked : ''}
                    onChange={this.onTextAreaChange}
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