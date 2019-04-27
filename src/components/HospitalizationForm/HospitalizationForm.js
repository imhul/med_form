// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Button, Pagination } from 'antd';

// Components
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';
import FormRadio from './FormRadio';
import FormTextarea from './FormTextarea';

// Helpers
import { requestBody } from '../../helpers/requestBody';

const FormItem = Form.Item;

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
        this.props.uiActions.initialize();
        // this.loadAllData(1); // First data loading
        this.onPaginationUpdate = this.onPaginationUpdate.bind(this)
    };

    onPaginationUpdate(page) {
        const { uiActions } = this.props;
        uiActions.paginationUpdate(page)
        // this.loadAllData(this.props.ui.currentPage) // data reloading
    };

    render() {
        const { uiActions } = this.props;
        const { formData, currentPage, textBefore, textAfter, } = this.props.ui;

        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        };

        return (
            <div>
                <Form
                    className="HospitalizationForm"
                    onChange={uiActions.formUpdate}
                >
                    {textBefore}
                    {
                        formData.map((item) => {
                            switch (item.Type) {
                                case 'text':
                                    return <FormInput key={ item.Id } />

                                case 'textarea':
                                    return <FormTextarea key={ item.Id } />

                                case 'radio':
                                    return <FormRadio key={ item.Id } />

                                case 'checkbox':
                                    return <FormCheckbox key={ item.Id } />

                                default:
                                    return <span key="error">field type is empty!</span>
                            }
                        })
                    }
                    {textAfter}

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">Submit</Button>
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