// Hospitalization Form Constructor
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

const mainRequestURL = 'https://med.uax.co/API.php?Unit=Hospital&Section=HospitalPatients&Special=HospitalizationReception&Patient=2190&Hospitalization=8&Thread=Call&Object=Hospitalization&Method=GetQuestionnaireQuestions';
const mainRequestHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
};

class HospitalizationForm extends Component {

    componentDidMount() {
        this.props.uiActions.initialize();

        const mainRequestOptions = {
            'Hospital': 1,
            'Patient': 2190,
            'Hospitalization': 8,
            'Reception': 6,
            'Page': 1
        };

        fetch("https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue", {
            method: "POST",
            headers: mainRequestHeaders,
            body: JSON.stringify(mainRequestOptions)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                this.props.uiActions.loadData(data)
            })
    };

    render() {

        const { formData } = this.props.ui;

        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        };

        return (
            <div>
                <Form
                    className="HospitalizationForm"
                    onFieldsChange={uiActions.formUpdate}
                >
                    {
                        formData.map((item) => {
                            switch (item.type) {
                                case 'text':
                                    return <FormInput />

                                case 'textarea':
                                    return <FormTextarea />

                                case 'radio':
                                    return <FormRadio />

                                case 'checkbox':
                                    return <FormCheckbox />

                                default:
                                    return <span>field type is empty!</span>
                            }
                        })
                    }

                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                    <Pagination defaultCurrent={6} total={500} />
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