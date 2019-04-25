class QuestionnaireQuestionList extends React.PureComponent {
    constructor(props)
    {
        super(props)

        this.handler = this.handler.bind(this);

        this.state = {
            openQuestionId: null,
            showChild: false
        }
    }
    
    // This method will be sent to the child component
    handler()
    {
        this.setState({
            showChild: true
        });
    }

    render() {
        const questionElements = this.props.questions.map((question, index) =>
            <div key = {question.Id}>
                <QuestionnaireQuestion action={this.handler} parentState={this.state} question={question} hospitalization={this.props.hospitalization} />
            </div>    
        )
        return (
            <div>
                {questionElements}
                <div className="ClearBox"></div>
            </div>
        )
    }
}