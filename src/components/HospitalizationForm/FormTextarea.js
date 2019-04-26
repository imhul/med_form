class FormTextarea extends React.Component {
    state = {
        Child: 1,
        Value: 1
    }

    onChangeHandler = (e) => {
        this.setState({Value: e.currentTarget.value})
    }

    handleChange = (e) => {
        var InputText = e.target.value;
        if(this.timeout) clearTimeout(this.timeout);
        
        this.timeout = setTimeout(() => {

            const QuestionId = this.props.question.Id;
            const QuestionName = this.props.question.Name;
            const QuestionValue = InputText;
                        
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
                success: function(result) {
                    //this.setState({Child: result});
                    console.log(result);
                }.bind(this)
            });

        }, 1000);
    }

    componentDidUpdate () {
        
    }

    render() {
        const {question, isOpen} = this.props
        return(
            <textarea 
                type = 'text'
                id = {question.Name}     
                className = 'InputField'
                defaultValue={question.Checked ? question.Checked : ''} 
                onChange={this.handleChange.bind(this)}
                placeholder = 'Введіть текст'
            />
        )
    }
}