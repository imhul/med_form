// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import {
    Form,
    DatePicker,
    Radio,
    Input,
    Button,
    Pagination,
    Row,
    Col,
} from 'antd';

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
        const mainRequestURL = 'https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=GetOptions';
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
            .then((response) => response.json())
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

    // onRadioUpdate(e) {
    //     this.props.uiActions.radioUpdate(e.target.value)
    // };
    // onInputUpdate(e) {
    //     this.props.uiActions.inputUpdate(e.target.value)
    // };
    // onCheckboxUpdate(e) {
    //     this.props.uiActions.checkboxUpdate(e.target.value)
    // };
    // onTextAreaUpdate(e) {
    //     this.props.uiActions.textareaUpdate(e.target.value)
    // };

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
        const { formData, currentPage, formTextBefore, formTextAfter, newFormData, } = this.props.ui;
        const { uiActions } = this.props;

        console.info("formData: ", formData);
        console.info("newformData: ", newFormData);

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
        const filteredByPage = formData.filter(item => item.Page == currentPage);

        return (
            <div className="flex-container">
                <Form 
                    className="HospitalizationForm" 
                    onSubmit={ this.onFormSubmit } 
                    onChange={ uiActions.formUpdate }>

                    {formTextBefore}

                    {
                        filteredByPage.map(inputData => {

                            const ownerDetect = (inputId) => {
                                return filteredByPage.filter(item => item.Owner == inputId)
                            };

                            switch (inputData.Type) {
                                case 'date':
                                    return (
                                        <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                                            <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
                                        </FormItem>
                                    );

                                case 'text':
                                    return (
                                        <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                                            <Input
                                                id={inputData.Name}
                                                placeholder={textInputPlaceholder}
                                                // onChange={ uiActions.inputUpdate }
                                            />
                                            {inputData.textAfter}
                                        </FormItem>
                                    );

                                case 'textarea':
                                    return (
                                        <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                                            <TextArea
                                                id={inputData.Id}
                                                className={`text-area ${inputData.Name}`}
                                                // onChange={ uiActions.textAreaUpdate }
                                                placeholder='Введіть текст'
                                            />
                                            {inputData.textAfter}
                                        </FormItem>
                                    );

                                case 'parent-radio':
                                    return (
                                        <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                                            <RadioGroup
                                                defaultValue={0}
                                                name={inputData.Name}
                                                // onChange={ uiActions.radioUpdate }
                                            >

                                                {
                                                    ownerDetect(inputData.Id).map(subitem => (
                                                        <RadioButton key={subitem.Id}>
                                                            {subitem.Value}
                                                        </RadioButton>
                                                    ))
                                                }
                                            </RadioGroup>
                                            {inputData.textAfter}
                                        </FormItem>
                                    );


                                case 'parent-checkbox':
                                    return (
                                        <FormItem label={inputData.Title} {...buttonItemLayout} key={inputData.Id}>
                                            <FormCheckbox id={inputData.Name} />
                                            {inputData.textAfter}
                                        </FormItem>
                                    );

                                case 'checkbox', 'radio': 
                                    return null;

                                default:
                                    return <span key="error" style={{ 'display': 'block' }}>field type is empty or have another type: {inputData.Type}!</span>
                            }
                        })
                    }

                    {formTextAfter}

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                    <Pagination
                        defaultCurrent={currentPage}
                        total={500}
                        pageSize={10}
                        onChange={this.onPaginationUpdate}
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