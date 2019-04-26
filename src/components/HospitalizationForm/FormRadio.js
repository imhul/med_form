/* FormRadio */
class FormRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: null,
            Child: null,
            Value: null,
            Checked: false,
            showChild: false
        };
    }

    componentDidMount()
    {
       //this.setState({'Name': this.props.question.Name})
       //console.log(this.props.question.Name)
    }

    componentWillUnmount(){
        //console.log('Unmount');
    }
    
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
            success: function(result) {
                console.log(result);
            }.bind(this)
        });
    }

    render()
    {
        const {question, isOpen} = this.props

        FieldsOut = ''
        
        if(this.state.Clear)
        {
            
        }

        if(this.state.Child)
        {
            //window.location.reload(); 
            var Response = JSON.parse(this.state.Child);
            var FieldsList = JSON.parse(Response['Data']);

            var FieldsOut = <div className='Child'><QuestionnaireOptionList questions={FieldsList} hospitalization={this.props.hospitalization} /></div>
        }

        var ChildId = 'Child';

        //console.log(QuestionnaireQuestion.showChild);

        return (
            <span>
                <input 
                    type='radio' 
                    id={question.Name+'_'+question.Id} 
                    name={question.Name} 
                    value={question.Value}
                    owner={question.Owner}
                    defaultChecked={question.Value === question.Checked}
                    onClick={this.handleClick.bind(this)}
                />
                <label htmlFor={question.Name+'_'+question.Id}>{question.Value}</label>
                {question.Value === question.Checked ? '' : ''}
                {this.state.showChild && FieldsOut}
            </span>
        );
    }
}