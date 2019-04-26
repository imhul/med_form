// Main Request
API('Call',
{
    'Waiting': false,
    'Url': 'https://med.uax.co/API.php?Unit=Hospital&Section=HospitalPatients&Special=HospitalizationReception&Patient=2190&Hospitalization=8&Thread=Call&Object=Hospitalization&Method=GetQuestionnaireQuestions',
    'Data': {
        'Hospital': 1,
        'Patient': 2190,
        'Hospitalization': 8,
        'Reception': 6,
        'Page': 1
    },
    'Finally': function(Response) {
        
        var FieldsList = JSON.parse(Response['Data']);
        
        console.log(FieldsList);

        var HospitalizationList = JSON.parse(Response['Hospitalization']);
        
        var FieldsStr = '';
        
        ReactDOM.render(
            <QuestionnaireQuestionList questions={FieldsList} hospitalization={HospitalizationList} />,
            document.getElementById('HospitalizationReception')
        )

        Message('Common','Remove');
    }
});

// Textarea
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
    success: function(result) {
        //this.setState({Child: result});
        console.log(result);
    }.bind(this)
});

// Checkbox
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
        'Value': (this.state.isChecked)?(QuestionValue):(false)
    },
    success: function(result) {
        this.setState({Child: result});
        console.log(result);
    }.bind(this)
});

// Input
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
    success: function(result) {
        //this.setState({Child: result});
        console.log(result);
    }.bind(this)
});

// Radio
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
    success: function(result) {
        console.log(result);
    }.bind(this)
});