// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, DatePicker, Radio, Input, Button, Pagination } from 'antd';

// Components
// import FormCheckbox from './FormCheckbox';
// import FormInput from './FormInput';
// import FormRadio from './FormRadio';
// import FormTextarea from './FormTextarea';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

class HospitalizationForm extends Component {

    loadAllData(currentPage) {

        // Формируем список параметров для передачи на сервер
        const mainRequestURL = 'https://med.uax.co/API.php?Unit=Hospital&Section=HospitalPatients&Special=HospitalizationReception&Patient=2190&Hospitalization=8&Thread=Call&Object=Hospitalization&Method=GetQuestionnaireQuestions';
        const data = {
            'Hospital': 1,
            'Patient': 2190,
            'Hospitalization': 8,
            'Reception': 6,
            'Page': currentPage,
        };

        // Отправляем данные на сервер
       fetch(mainRequestURL, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: requestBody(data)
        })
        .then((response) => response.json() )
        .then((data) => {
            console.info("main response data: ", data)
        })
        .catch((error) => {
            console.info('main fetch error: ', error)
        })
    };

    componentDidMount() {
        // this.onRadioUpdate = this.onRadioUpdate.bind(this);
        // this.onInputUpdate = this.onInputUpdate.bind(this);
        // this.onCheckboxUpdate = this.onCheckboxUpdate.bind(this);
        // this.onTextAreaUpdate = this.onTextAreaUpdate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onPaginationUpdate = this.onPaginationUpdate.bind(this);
        this.props.uiActions.initialize();
        // this.loadAllData(1); // First data loading
    };

    onPaginationUpdate(page) {
        this.props.uiActions.paginationUpdate(page)
        // this.loadAllData(this.props.ui.currentPage) // data reloading
    };

    onFormSubmit(e) {
        console.info("onFormUpdate event: ", e);
        console.info("onFormUpdate event.target: ", e.target);
        console.info("onFormUpdate event.target.value: ", e.target.value);
        // this.props.uiActions.formUpdate(e.target.value);
    };

    render() {
        const { formData, currentPage, formTextBefore, formTextAfter, } = this.props.ui;

        console.info("formData: ", formData);

        const buttonItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const textInputPlaceholder = "Введіть текст";

        return (
            <div className="flex-container">
                <Form className="HospitalizationForm" onSubmit={this.onFormSubmit}>
                    { formTextBefore }

                    {
                        formData.map(item => {
                            
                            switch (item.Type) {
                                case 'date':
                                    return (
                                        <FormItem label={ item.TextBefore } { ...formItemLayout } key={ item.Id }>
                                            <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
                                        </FormItem> 
                                    );


                                case 'text':
                                    return ( 
                                        <FormItem label={ item.TextBefore } { ...formItemLayout } key={ item.Id }>
                                            <Input 
                                                id={ item.Name } 
                                                placeholder={ textInputPlaceholder } 
                                                // onChange={ this.onInputUpdate }
                                                />
                                                { item.textAfter }
                                        </FormItem> 
                                    );

                                case 'textarea':
                                    return ( 
                                        <FormItem label={ item.TextBefore } { ...formItemLayout } key={ item.Id }>
                                            <TextArea
                                                id={ item.Id }
                                                className={ `text-area ${item.Name }` }
                                                // onChange={ this.onTextAreaUpdate }
                                                placeholder='Введіть текст'
                                            />
                                            { item.textAfter }
                                        </FormItem>
                                    );

                                case 'radio':
                                    return (
                                        <FormItem label={ item.TextBefore } { ...formItemLayout } key={ item.Id }>
                                            <RadioGroup 
                                                key={ item.Id }
                                                defaultValue={ 0 }
                                                name={ item.Name }
                                                // onChange={ uiActions.radioUpdate }
                                            >
                                                
                                                { 
                                                    item.Options.map(subitem => (
                                                        <RadioButton key={ subitem.Id }>
                                                            { subitem.Value }
                                                        </RadioButton>
                                                    )) 
                                                }
                                            </RadioGroup>
                                            { item.textAfter }
                                        </FormItem>
                                    );
                                        

                                case 'checkbox':
                                    return (
                                        <FormItem label={ item.TextBefore } { ...buttonItemLayout } key={ item.Id }>
                                            <FormCheckbox id={ item.Name } />
                                            { item.textAfter }
                                        </FormItem>
                                    );

                                default:
                                    return <span key="error" style={{ 'display':'block' }}>field type is empty!</span>
                            }
                        })
                    }

                    { formTextAfter }

                    <FormItem { ...buttonItemLayout }>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                    <Pagination 
                        defaultCurrent={ currentPage } 
                        total={ 500 } 
                        pageSize={ 10 } 
                        onChange={ this.onPaginationUpdate } 
                    />
                </Form>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationForm);