// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Button, Pagination, Popconfirm, Icon, Alert, message, } from 'antd';
import { Wave } from 'react-preloading-component';

// Helpers
import { 
    requestURL,
    requestBody,
    typeDetector,
    requestHeader,
    buttonItemLayout,
    
} from '../../helpers';

const FormItem = Form.Item;
const successLoadText = "Дані успішно завантажені!";
const errorLoadText = "Помилка з'єднання! Дані не завантажені!";
const successSaveText = "Дані успішно збережені!";
const errorSaveText = "Помилка з'єднання! Дані не були збережені!";

class HospitalizationForm extends Component {

    loadAllData() {
        const { uiActions } = this.props;
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
            headers: requestHeader,
            body: requestBody(data)
        })
        .then(response => {
            if(response.ok && (response.status === 200)) {
                message.success(successLoadText);
                return response.json()
            } else {
                message.error(errorLoadText);
                uiActions.loadError()
            }
        })
        .then(data => uiActions.loadData(data))
        .catch(error => message.error(error))
    };

    componentDidMount() {
        this.loadAllData = this.loadAllData.bind(this);
        this.onPopupConfirm = this.onPopupConfirm.bind(this);
        this.onPopupCancel = this.onPopupCancel.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onPaginationUpdate = this.onPaginationUpdate.bind(this);
        this.loadAllData();  // First data loading
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
        const currentPageData = newData.filter(item => item.Page == ui.currentPage);

        // Формируем список параметров для передачи на сервер
        const options = {
            'Hospital': document.getElementById("Hospital").value,
            'Patient': document.getElementById("Patient").value,
            'Hospitalization': document.getElementById("Hospitalization").value,
            'Reception': document.getElementById("Reception").value,
            'Department': document.getElementById("Department").value,
        };

        const request = {
            'Options' : options,
            'Data' : currentPageData
        };

        fetch('https://med.uax.co/api/?Method=SaveOptions', {
            method: 'post',  
            headers: requestHeader,
            body: 'Request='+JSON.stringify(request)
        })
        .then(response => { 
            if(response.ok && (response.status === 200)) {
                uiActions.formSubmit();
                message.success(successSaveText);
                return response.json()
            } else {
                message.error(errorSaveText);
                uiActions.submitError(response.status)
            }
        })
        .catch(error => message.error(error))
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
        const { formData, currentPage, formOptions, isSubmitted, isPopupVisible, isFormActivated, isInit } = this.props.ui;
        const { uiActions } = this.props;
        // Filtering inputs by current value of pagination component
        const dataFilteredByPage = formData.filter(item => item.Page == currentPage);
        // render
        return (
            <div className="flex-container" style={isInit === false ? { height: '100%' } : { height: 'auto' }}>
                { isInit === false ? <Wave color="#1890ff" /> : ( // preloader
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
                            <Button disabled={!isFormActivated} type="primary" htmlType="submit">
                                Зберегти <Icon theme="filled" type="save" />
                            </Button>
                        </FormItem>

                        {/* <Popconfirm 
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
                        /> */}
                        { !isSubmitted && isPopupVisible ? <Alert
                            message="Внесені дані не були збережені! Ви впевнені, що хочете перейти на іншу сторінку?"
                            description={ 
                                <Button onClick={this.onPopupConfirm} size="small">
                                    Ok
                                </Button> 
                            }
                            type="warning"
                            onClose={ this.onPopupCancel }
                            closable
                            showIcon
                            icon={<Icon
                                type="alert" 
                                theme="twoTone" 
                                twoToneColor="#faad14" 
                                style={{fontSize: '40px'}} 
                            />}
                        /> : null }
                        <Pagination
                            current={ currentPage }
                            total={ formOptions.TotalParent }
                            pageSize={ 10 }
                            onChange={ this.onPaginationUpdate }
                            showTotal={ total => `Всього ${ total } питань` }
                        />
                    </Form>
                ) }
                
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
