// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Button, Pagination, Popconfirm, Icon, } from 'antd';

// Helpers
import { 
    requestBody, 
    requestURL, 
    requestHeader, 
    typeDetector, 
    buttonItemLayout, 
} from '../../helpers';

const FormItem = Form.Item;

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
        // Тут должна вызываться функция this.loadAllData(); // First data loading
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

    render() {
        // Props to constants
        const { formData, currentPage, formOptions, isSubmitted, isPopupVisible, } = this.props.ui;
        const { uiActions } = this.props;
        // Filtering inputs by current value of pagination component
        const dataFilteredByPage = formData.filter(item => item.Page == currentPage);
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
                        <Button type="primary" htmlType="submit">Зберегти <Icon theme="filled" type="save" /></Button>
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
                        total={ formOptions.TotalParent }
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