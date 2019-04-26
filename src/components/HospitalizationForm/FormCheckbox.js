/* FormCheckbox */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import { Checkbox } from 'antd';

const checkboxRequesURL = 'https://med.uax.co/API.php?Thread=Call&Object=Hospitalization&Method=EditReceptionValue';

class FormCheckbox extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Name: null,
    //         Child: null,
    //         Value: null,
    //     };
    // };

    onChange(e) {

        const QuestionId = this.props.question.Id;
        const QuestionName = this.props.question.Name;
        const QuestionValue = this.props.question.Value;

        const Hospital = this.props.hospitalization[0].Hospital;
        const Patient = this.props.hospitalization[0].Patient;
        const Hospitalization = this.props.hospitalization[0].Hospitalization;
        const Reception = this.props.hospitalization[0].Reception;

        fetch( checkboxRequesURL, {
            method: 'POST',
            data: { 
                'Owner': QuestionId,
                'Hospital': Hospital,
				'Patient': Patient,
                'Hospitalization': Hospitalization,
                'Reception': Reception,
				'Question': QuestionId,
				'Field': QuestionName,
				'Value': e.target.checked ? QuestionValue : false
            }})
            .then( response => response.json() )
            .then( data => this.setState({ Child: data }) )
    }
    
    render() {
        const 

        return (
            <Checkbox onChange={uiActions.checkboxUpdate}>
                {question.Value}
            </Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormCheckbox);