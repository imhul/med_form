/* FormRadio */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;

class FormRadio extends Component {

    handleClick() {
        const QuestionId = this.props.question.Id;
        const QuestionName = this.props.question.Name;
        const QuestionValue = this.props.question.Value;

        const Hospital = this.props.hospitalization[0].Hospital;
        const Patient = this.props.hospitalization[0].Patient;
        const Hospitalization = this.props.hospitalization[0].Hospitalization;
        const Reception = this.props.hospitalization[0].Reception;

        $.ajax({
            url: 'https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue',
            method: 'POST',
            data: {
                'Owner': QuestionId,
                'Hospital': Hospital,
                'Patient': Patient,
                'Hospitalization': Hospitalization,
                'Reception': Reception,
                'Question': QuestionId,
                'Field': QuestionName,
                'Value': QuestionValue
            },
            success: function (result) {
                console.log(result);
            }.bind(this)
        });
    }

    render() {
        const { question, isOpen } = this.props

        FieldsOut = ''

        if (this.state.Clear) {

        }

        if (this.state.Child) {
            //window.location.reload(); 
            var Response = JSON.parse(this.state.Child);
            var FieldsList = JSON.parse(Response['Data']);

            var FieldsOut = <div className='Child'><QuestionnaireOptionList questions={FieldsList} hospitalization={this.props.hospitalization} /></div>
        }

        var ChildId = 'Child';

        //console.log(QuestionnaireQuestion.showChild);

        return (
            <span>

                <FormItem
                    label="Form Layout"
                    {...formItemLayout}
                >
                    <Radio.Group defaultValue="horizontal" >
                        <Radio.Button value="horizontal">Horizontal</Radio.Button>
                        <Radio.Button value="vertical">Vertical</Radio.Button>
                        <Radio.Button value="inline">Inline</Radio.Button>
                    </Radio.Group>
                </FormItem>


                <input
                    type='radio'
                    id={question.Name + '_' + question.Id}
                    name={question.Name}
                    value={question.Value}
                    owner={question.Owner}
                    defaultChecked={question.Value === question.Checked}
                    onClick={this.handleClick.bind(this)}
                />
                <label htmlFor={question.Name + '_' + question.Id}>{question.Value}</label>
                {question.Value === question.Checked ? '' : ''}
                {this.state.showChild && FieldsOut}
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormRadio);