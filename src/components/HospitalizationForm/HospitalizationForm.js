// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import locale from 'antd/lib/date-picker/locale/uk_UA';
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
import { requestBody, requestURL, requestHeader } from '../../helpers';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const editIcon = <Icon type="form" />;

class HospitalizationForm extends Component {

    loadAllData() {

        // Формируем список параметров для передачи на сервер
        const data = {
            'Hospital': document.getElementById("Hospital").value,
            'Patient': document.getElementById("Patient").value,
            'Hospitalization': document.getElementById("Hospitalization").value,
            'Reception': document.getElementById("Reception").value,
            'Department': document.getElementById("Department").value,
        };

        // Отправляем данные на сервер
        fetch(requestURL, {
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

    onPaginationUpdate = (page) => {
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
        const { uiActions, ui } = this.props;
        const currentPage = newData.filter(item => item.Page == ui.currentPage);
        console.info("currentPage - object for submit: ", currentPage);
        // TODO: Тут будет функция отправки новых данных формы(newData), 
        // внутри которой будет вызван action formSubmit(),
        // указывающий на изменение состояния isSubmitted,
        // в случае успешной отправки формы на сервер: 
        uiActions.formSubmit(currentPage)
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

    onNumberUpdate = (value, id) => {
        this.props.uiActions.numberUpdate(value, id)
    };

    render() {
        // Props to constants
        const { formData, currentPage, formOptions, isSubmitted, isPopupVisible, } = this.props.ui;
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
        const typeDetector = (inputData, isChild) => {
            switch (inputData.Type) {
                case 'date':
                    if(isChild) {
                        return dateInput(inputData);
                    } else {
                        return null
                    };
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
                // case 'parent-checkbox':
                //     return (
                //         <FormItem label={inputData.Title} {...buttonItemLayout} key={inputData.Id}>
                //             {inputData.TextBefore}
                //             <CheckboxGroup>{checkboxGroup(inputData)}</CheckboxGroup>
                //             {inputData.textAfter}
                //         </FormItem>
                //     );
                case 'checkbox':
                    if(isChild) {
                        return checkboxInput(inputData);
                    } else {
                        return null
                    };
                    
                case 'radio': 
                    return null;
                default:
                    return console.warn(`unknown field type: ${inputData.Type}!`)
            }
        };
        // Filtering children by parent Id
        const ownerDetector = (inputId) => {
            return dataFilteredByPage.filter( item => item.Owner == inputId )
        };
        // Inputs
        const dateInput = (inputData) => {
            const DateInput = () => (
                <DatePicker 
                    onChange={(date, dateString) => uiActions.dateUpdate(date, dateString, inputData.Id)}
                    onPanelChange={(date, mode) => uiActions.dateUpdate(date, mode, inputData.Id)}
                    className={`child ${inputData.Mode.Mode}-picker`}
                    placeholder={inputData.Placeholder}
                    showTime={inputData.Mode.ShowTime}
                    format={inputData.Mode.Format}
                    mode={inputData.Mode.Mode}
                    value={inputData.Value}
                    id={inputData.Id}
                    locale={locale}
                />
            );
            if(inputData.Owner === null) {
                return (
                    <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                        {inputData.TextBefore}
                        <DateInput key={`${inputData.Id}_${inputData.Name}`} />
                        {inputData.textAfter}
                    </FormItem>
                )
            } else return <DateInput key={`${inputData.Id}_${inputData.Name}`} />
        };
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
        const radioGroup = (inputData) => {
            const child = ownerDetector(inputData.Id);
            return (
                <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                    {inputData.TextBefore}
                    <RadioGroup
                        key={`${inputData.Name}_${inputData.Id}`}
                        defaultValue={null}
                        name={inputData.Name}
                        id={inputData.Id}
                        buttonStyle="solid"
                        className={inputData.Owner === null ? "parent" : "child"}
                    >
                        {
                            child.map(subitem => (
                                <RadioButton
                                    key={subitem.Id}
                                    id={subitem.Id} 
                                    value={subitem.Value}
                                    className={`${subitem.Owner === null ? "parent child" : "child"}`}
                                    title={subitem.Owner}
                                >
                                    { subitem.Value }
                                </RadioButton>
                            ))
                        }
                        {
                            child.map(subitem => ownerDetector(subitem.Id).map(item => {
                                return subitem.Checked === true ? typeDetector(item, true) : null
                            }))
                        }
                    </RadioGroup>
                    {inputData.textAfter}
                </FormItem>
            )
        };
        const checkboxInput = (inputData) => {
            const child = ownerDetector(inputData.Id);
            return (
                <div className="check-box-wrapper" key={`${inputData.Name}_${inputData.Id}`}>
                    {inputData.TextBefore}
                    <Checkbox 
                        checked={inputData.Checked} 
                        id={inputData.Id} 
                        value={inputData.Value}
                        name={inputData.Name}
                        key={inputData.Id}
                        className={inputData.Owner === null ? "parent" : "child"}
                    >
                        {inputData.Value}
                        {
                            inputData.Checked ? 
                                child.map(subitem => typeDetector(subitem, true)) : null
                        }
                    </Checkbox>
                    {inputData.textAfter}
                </div>
            )
        };
        const numberInput = (inputData) => (
            <FormItem label={inputData.Title} {...formItemLayout} key={inputData.Id}>
                {inputData.TextBefore}
                {/* <Input
                    id={inputData.Id}
                    placeholder={inputData.Placeholder}
                    addonAfter={inputData.TextAfter}
                    addonBefore={editIcon}
                /> */}
                <InputNumber
                    defaultValue={ inputData.Value !== null ? inputData.Value : 0 }
                    // formatter={value => `${value}`.replace(inputData.Mode.Format, ',')}
                    // parser={value => value.replace(inputData.Mode.Prefix, '').replace(inputData.Mode.Suffix, '')}
                    step={inputData.Mode.Step}
                    min={inputData.Mode.Min} 
                    max={inputData.Mode.Max}
                    onChange={(value) => this.onNumberUpdate(value, inputData.Id)}
                />
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
                >   
                    <Icon type="solution" className="form-icon" />
                    <FormItem className="form-text-before" label={formOptions.formTextBefore} />

                    { dataFilteredByPage.map(inputs => typeDetector(inputs)) }

                    <FormItem className="form-text-after" label={formOptions.formTextAfter} />
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
                        icon={<Icon
                            type="alert" 
                            theme="twoTone" 
                            twoToneColor="#faad14" 
                            style={{fontSize: '40px'}} 
                        />}
                    />
                    <Pagination
                        current={ currentPage }
                        total={ formData.length }
                        pageSize={ 10 }
                        onChange={ this.onPaginationUpdate }
                        showTotal={ total => `Всього ${ total } питань` }
                    />
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