class QuestionnaireOptionList extends React.PureComponent {
    state = {
        openQuestionId: null
    }
    
    render() {
        const questionElements = this.props.questions.map((question, index) =>
            <div key = {question.Id}>
                <QuestionnaireOption question={question} hospitalization={this.props.hospitalization} />
            </div>    
        )

        return (
            <span>
                {questionElements}
                <div className="ClearBox"></div>
            </span>
        )
    }
}