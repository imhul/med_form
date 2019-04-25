/* FormCheckbox */
class FormCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: null,
            Child: null,
            Value: null,
            isChecked: true
        };
    }

    componentDidMount(){
       //this.setState({'Name': this.props.question.Name})
       //console.log(this.props.question.Name)
    }

    componentWillUnmount(){
        //console.log('Unmount');
    }
    
    handleClick() {
        this.setState({isChecked: !this.state.isChecked});

        if(this.state.isChecked) {
        console.log('checked');
        } else {
        console.log('unchecked');
        }

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
				'Value': (this.state.isChecked)?(QuestionValue):(false)
            },
            success: function(result) {
                this.setState({Child: result});
                console.log(result);
            }.bind(this)
        });
    }
    
    render() {
        const {question, isOpen} = this.props
        
        return (
            <span>
                <input 
                    type='checkbox' 
                    id={question.Name+'_'+question.Id} 
                    name={question.Name} 
                    value={question.Value}
                    onClick={this.handleClick.bind(this)}
                    defaultChecked={question.Value === question.Checked}
                    /*checked={this.state.selected === question.Text} onChange={(e) => this.setState({ selected: e.target.value })} */
                />
                <label htmlFor={question.Name+'_'+question.Id}>{question.Value}</label>
                {question.Value === question.Checked ? '' : ''}
                {this.state.showChild && FieldsOut}
            </span>
        );
    }
}