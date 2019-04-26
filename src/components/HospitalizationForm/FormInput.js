/* FormCheckbox */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class FormInput extends React.Component {

    onInputChange = (e) => {
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
        fetch("https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: DataStr
        })
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Помилка сервера: ' + response.status);
                    return;
                }

                response.json().then((data) => {
                    console.log(data);
                });
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            })
    }

    render() {
        const { question, isOpen } = this.props.ui;

        return (

            <FormItem
                label="Field A"
                {...formItemLayout}
            >

                <input
                    type='text'
                    id={question.Name}
                    className='InputField'
                    //onChange={this.onChangeHandler}
                    defaultValue={question.Checked ? question.Checked : ''}
                    //style={question.Width!==null ? {width: question.Width+"px"} : ''}
                    onChange={this.onInputChange}
                    owner={question.Owner}
                    placeholder='Введіть текст'
                />

                <Input placeholder="input placeholder" />

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