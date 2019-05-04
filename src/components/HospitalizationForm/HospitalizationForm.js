// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import {
    Form,
    DatePicker,
    Checkbox,
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
    };

    onFormSubmit(e) {
        e.preventDefault();
        this.formSubmit(this.props.ui.formData)
    };

    formSubmit(newData) {
        console.info("newData object for submit: ", newData);
        // Тут будет функция отправки новых данных формы, внутри которой 
        // будет вызываться action, указывающий на изменение состояния isSubmitted,
        // в случае успешной отправки формы на сервер
    };

    render() {
        // Props to constants
        const { formData, currentPage, formTextBefore, formTextAfter, } = this.props.ui;
        const { uiActions } = this.props;
        // Decorative options
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
        // Filtering inputs by current value of pagination component
        const dataFilteredByPage = formData.filter(item => item.Page == currentPage);
        console.info("dataFilteredByPage: ", dataFilteredByPage);
        // Inputs initialization by types
        const typeDetector = (inputData) => {
            switch (inputData.Type) {
                case 'date':
                    return dateInput(inputData);
                case 'text':
                    return textInput(inputData);
                case 'textarea':
                    return textareaInput(inputData);
                case 'parent-radio':
                    return radioGroup(inputData);
                case 'parent-checkbox':
                    return checkboxGroup(inputData);
                case 'checkbox':
                    return checkboxInput(inputData);
                case 'radio': 
                    return radioInput(inputData);
                default:
                    return console.warn(`unknown field type: ${inputData.Type}!`)
            }
        };
        // Filtering children by parent Id
        const ownerDetector = (inputId) => {
            return dataFilteredByPage.filter(item => item.Owner == inputId)
        };
        // Inputs
        const dateInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                <DatePicker mode="year" format="YYYY" />
                {/* <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" /> */}
                {/* TODO: Определиться с типами инпутов для ввода даты и времени */}
            </FormItem>
        );
        const textInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                <Input
                    id={inputData.Name}
                    placeholder={textInputPlaceholder}
                />
                {inputData.textAfter}
            </FormItem>
        );
        const textareaInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                <TextArea
                    id={inputData.Id}
                    className={`text-area ${inputData.Name}`}
                    placeholder='Введіть текст'
                />
                {inputData.textAfter}
            </FormItem>
        );
        const radioInput = (inputData) => { 
            const filteredByOwner = inputData.filter(item => item.Owner !== null);
            // TODO:
            return ( <RadioButton
                key={filteredByOwner.Id} 
                id={filteredByOwner.Id} 
                buttonStyle="solid"
                value={filteredByOwner.Value}
            >
                { filteredByOwner.Value }
            </RadioButton>
        )};
        const radioGroup = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                <RadioGroup
                    
                    defaultValue={null}
                    name={inputData.Name}
                    id={inputData.Id}
                    // onChange={ uiActions.radioUpdate }
                >
                    {
                        ownerDetector(inputData.Id).map(subitem => typeDetector(subitem))
                    }
                </RadioGroup>
                {inputData.textAfter}
            </FormItem>
        );
        const checkboxInput = (inputData) => (
            <Checkbox key={inputData.Id} id={inputData.Id}>
                    {`...`}
            </Checkbox>
        );
        const checkboxGroup = (inputData) => (
            <FormItem label={inputData.Title} {...buttonItemLayout} key={inputData.Id}>
                <FormCheckbox id={inputData.Name} />
                {inputData.textAfter}
            </FormItem>
        );

        return (
            <div className="flex-container">
                <Form 
                    className="HospitalizationForm" 
                    onSubmit={ this.onFormSubmit } 
                    onChange={ uiActions.formUpdate }
                >
                    <FormItem label={formTextBefore} {...formItemLayout} />

                    {
                        dataFilteredByPage.map(inputData => typeDetector(inputData))
                    }

                    <FormItem label={formTextAfter} {...formItemLayout} />
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