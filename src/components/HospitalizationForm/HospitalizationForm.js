import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Input, Button, Radio, Icon } from 'antd';

const FormItem = Form.Item;
const mainRequestURL = 'https://med.uax.co/API.php?Unit=Hospital&Section=HospitalPatients&Special=HospitalizationReception&Patient=2190&Hospitalization=8&Thread=Call&Object=Hospitalization&Method=GetQuestionnaireQuestions';
const mainRequestOptions = {
    'Data': {
        'Hospital': 1,
        'Patient': 2190,
        'Hospitalization': 8,
        'Reception': 6,
        'Page': 1
    }
};

class HospitalizationForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         formData: null
    //     }
    // };

    componentDidMount() {
        this.props.uiActions.initialize();
        // fetch( mainRequestURL, mainRequestOptions )
        // .then( response => response.json() )
        // .then( data => uiActions.loadData(data) )
    };


    handleFormLayoutChange = (e) => {
        this.props.uiActions.formUpdate(e.target.value)
    }

    render() {

        const { formData } = this.props.ui;
        const formItemLayout = formData === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;
        const buttonItemLayout = formData === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
        } : null;

        return (
            <div>
                <Form className="HospitalizationForm" layout={formData}>
                    <FormItem
                        label="Form Layout"
                        {...formItemLayout}
                        >
                        <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="horizontal">Horizontal</Radio.Button>
                            <Radio.Button value="vertical">Vertical</Radio.Button>
                            <Radio.Button value="inline">Inline</Radio.Button>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        label="Field A"
                        {...formItemLayout}
                        >
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem
                        label="Field B"
                        {...formItemLayout}
                        >
                        <Input placeholder="input placeholder" />
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">Submit</Button>
                    </FormItem>
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