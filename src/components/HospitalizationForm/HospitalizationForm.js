// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/uk_UA';
import 'moment/locale/uk';
import {
    Form,
    DatePicker,
    Checkbox,
    Radio,
    Input,
    InputNumber,
    Switch,
    Button,
    Pagination,
    Popconfirm,
    Icon,
} from 'antd';

// Helpers
import { requestBody, requestURL, requestHeader } from '../../helpers/requestBody';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const editIcon = <Icon type="form" />;

class HospitalizationForm extends Component {

    loadAllData() {

        // Формируем список параметров для передачи на сервер
        const mainRequestURL = 'https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=GetOptions';
        const data = {
            'Hospital': 1,
            'Patient': 2190,
            'Hospitalization': 8,
            'Reception': 6,
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
                this.props.uiActions.loadData(data);
            })
            .catch((error) => {
                console.warn('main fetch error: ', error)
            })
    };

    componentDidMount() {
        this.loadAllData = this.loadAllData.bind(this);
        this.onPopupConfirm = this.onPopupConfirm.bind(this);
        this.onPopupCancel = this.onPopupCancel.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onPaginationUpdate = this.onPaginationUpdate.bind(this);
        // this.loadAllData(); // First data loading
    };

    onPaginationUpdate(page) {
        const { uiActions, ui } = this.props;
        switch(ui.isSubmitted) {
            case true: uiActions.paginationUpdate(page);
            case false: uiActions.confirmPopupShow(page);
        }
    };

    onFormSubmit(e) {
        e.preventDefault();
        this.formSubmit(this.props.ui.formData)
    };

    formSubmit(newData) {
        console.info("newData object for submit: ", newData);
        // Тут будет функция отправки новых данных формы(newData), 
        // внутри которой будет вызван action formSubmit(),
        // указывающий на изменение состояния isSubmitted,
        // в случае успешной отправки формы на сервер: 
        this.props.uiActions.formSubmit()
    };

    onPopupCancel() {
        const { uiActions, ui } = this.props;
        uiActions.confirmPopupHide();
        uiActions.paginationUpdate(ui.currentPage);
    };

    onPopupConfirm() {
        const { uiActions, ui } = this.props;
        uiActions.confirmPopupHide();
        uiActions.paginationUpdate(ui.nextPage);
    };

    render() {
        // Props to constants
        const { formData, currentPage, formTextBefore, formTextAfter, isSubmitted, isPopupVisible, } = this.props.ui;
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
        // Filtering inputs by current value of pagination component
        const dataFilteredByPage = formData.filter(item => item.Page == currentPage);
        // Inputs initialization by types
        const typeDetector = (inputData) => {
            switch (inputData.Type) {
                case 'date':
                    return dateInput(inputData);
                case 'text':
                    return textInput(inputData);
                case 'textarea':
                    return textareaInput(inputData);
                case 'number':
                    return numberInput(inputData);
                case 'switch':
                    return switchInput(inputData);
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
            return dataFilteredByPage.filter( item => item.Owner == inputId )
        };
        // Inputs
        const dateInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <DatePicker 
                    id={inputData.Id}
                    showTime={inputData.Mode.ShowTime} // boolean
                    mode={inputData.Mode.Mode} 
                    format={inputData.Mode.Format}
                    placeholder={inputData.Placeholder} // Наприклад, 'введіть рік' або 'введіть дату'
                    locale={locale}
                />
                {inputData.textAfter}
            </FormItem>
        );
        const textInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <Input
                    id={inputData.Id}
                    placeholder={inputData.Placeholder}
                    addonAfter={inputData.TextAfter}
                    addonBefore={editIcon}
                />
                {inputData.textAfter}
            </FormItem>
        );
        const textareaInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <TextArea
                    id={inputData.Id}
                    placeholder={inputData.Placeholder}
                />
                {inputData.textAfter}
            </FormItem>
        );
        const radioInput = (inputData) => { 
            ownerDetector(inputData.Id).map(subitem => ( 
                <RadioButton
                    key={subitem.Id} 
                    id={subitem.Id} 
                    buttonStyle="solid"
                    value={subitem.Value}
                >
                    { subitem.Value }
                </RadioButton>
            ))
        };
        const radioGroup = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <RadioGroup
                    defaultValue={null}
                    name={inputData.Name}
                    id={inputData.Id}
                >
                    {
                        ownerDetector(inputData.Id).map(subitem => ( 
                            <RadioButton
                                key={subitem.Id} 
                                id={subitem.Id} 
                                buttonStyle="solid"
                                value={subitem.Value}
                            >
                                { subitem.Value }
                            </RadioButton>
                        ))
                    }

                    {
                        ownerDetector(inputData.Id).map(subitem => typeDetector(subitem))
                    }
                </RadioGroup>
                {inputData.textAfter}
            </FormItem>
        );

        const checkboxInput = (inputData) => <Checkbox key={inputData.Id} id={inputData.Id} />;
        const checkboxGroup = (inputData) => {
            const plainOptions = ownerDetector(inputData.Id).
                map(subitem => <Checkbox 
                    key={subitem.Id} 
                    id={subitem.Id} 
                    label={subitem.Value}
                    value={subitem.Value}
                    /> 
                );
            return (
                <FormItem label={inputData.Title} {...buttonItemLayout} key={inputData.Id}>
                    {inputData.TextBefore}
                    <CheckboxGroup 
                        id={inputData.Id} 
                        options={plainOptions} 
                    />
                    {inputData.textAfter}
                </FormItem>
            )
        };

        const numberInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <Input
                    id={inputData.Id}
                    placeholder={inputData.Placeholder}
                    addonAfter={inputData.TextAfter}
                    addonBefore={editIcon}
                />
                {/* <InputNumber
                    defaultValue={ inputData.Value !== null ? inputData.Value : 0 }
                    formatter={value => `${inputData.Mode.Prefix}${value}${inputData.Mode.Suffix}`.replace(inputData.Mode.Format, ',')}
                    parser={value => value.replace(inputData.Mode.Prefix, '').replace(inputData.Mode.Suffix, '')}
                    step={inputData.Mode.Step}
                    min={inputData.Mode.Min} 
                    max={inputData.Mode.Max}
                /> */}
                {inputData.textAfter}
            </FormItem>
        );

        const switchInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                <Switch 
                    checked={inputData.Value} // boolean
                    checkedChildren={inputData.Mode.TextChecked} // 'Так'
                    unCheckedChildren={inputData.Mode.TextUnchecked} // 'Ні'
                />
                {inputData.textAfter}
            </FormItem>
        );

        return (
            <div className="flex-container">
                <Form 
                    className="HospitalizationForm" 
                    onSubmit={ this.onFormSubmit } 
                    onChange={ uiActions.formUpdate }
                >   <Icon type="solution" className="form-icon" />
                    <FormItem className="form-text-before" label={formTextBefore} />

                    { dataFilteredByPage.map(inputData => typeDetector(inputData)) }

                    <FormItem className="form-text-after" label={formTextAfter} />
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">Зберегти</Button>
                    </FormItem>

                    <Popconfirm 
                        title="Внесені дані не були збережені. Ви впевнені, що хочете перейти на іншу сторінку?" 
                        onConfirm={ this.onPopupConfirm } 
                        onCancel={ this.onPopupCancel }
                        okText="Так" 
                        cancelText="Hі"
                        visible={ !isSubmitted && isPopupVisible }
                        icon={<Icon type="alert" theme="twoTone" twoToneColor="#faad14" style={{fontSize: '40px'}} />}
                    >

                    <Pagination
                        current={ currentPage }
                        total={ formData.length }
                        pageSize={ 10 }
                        onChange={ this.onPaginationUpdate }
                        showTotal={ total => `Всього ${ total } питань` }
                    />
                    </Popconfirm>
                </Form>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationForm);